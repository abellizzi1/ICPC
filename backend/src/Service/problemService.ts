import { Category, CompletedProblems, PrismaClient, ProblemToCategory } from '@prisma/client'
import { Organization } from '@prisma/client';
import { Problem } from '@prisma/client';
import { OrgToProbMapping } from '@prisma/client';
import { getCategoryByProbId } from './categoryService';
import { getOrganizationByUserId } from './organizationService';
import { getAllOrgToProbMappings } from './orgToProbMappingService';
import { getAllProblemToCategory } from './problemToCategoryService';
import { getCategoriesByUserId } from './categoryService';
import { getCompletedProblemsByUserId } from './completedProblemsService';

import prisma from '../../client'

/**
 * Gets a problem by id
 * @param id 
 * id of the problem
 * @returns 
 * Returns the problem with the same id
 */
export async function getProblemById(id: number){
    try {
        let problem = await prisma.problem.findUniqueOrThrow({
            where: {
                id: id
            },
            
        });

        return problem;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to get problem by id ${id}: ${error}`);
        throw new Error(`Failed to get problem by id ${id}: ${error}`);
      }
}

/**
 * Gets all default problems
 * @returns 
 * Returns all default problems
 */
export async function getAllDefaultProblems(){
    try {
        let defaultProblems = await prisma.problem.findMany({
            where: {
                isDefault: 1
            },
            
        });

        return defaultProblems;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to get all default problems: ${error}`);
        throw new Error(`Failed to get all default problems: ${error}`);
      }
}

/**
 * Updates a problem by id
 * @param updatedProblemInfo 
 * updated problem
 * @returns 
 * Returns the updated problem
 */
export async function updateProblem (updatedProblemInfo: Problem) {
    try {
        let updatedProblem = await prisma.problem.update({
            where: {
                id: updatedProblemInfo.id
            },
            data: {
                name: updatedProblemInfo.name,
                linkUrl: updatedProblemInfo.linkUrl,
                videoUrl: updatedProblemInfo.videoUrl,
                difficultyId: updatedProblemInfo.difficultyId
            }
        })
        return updatedProblem;
    } catch(error) {
        // Handle any errors that occur during database query
        console.error(`Failed to update problem: ${error}`);
        throw new Error(`Failed to update problem: ${error}`);
    }
}

/**
 * Gets all problems
 * @returns 
 * Returns all problems
 */
export async function getAllProblems(){
    try {
        let problems = await prisma.problem.findMany();

        return problems;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to get all problems: ${error}`);
        throw new Error(`Failed to get all problems: ${error}`);
      }
}

/**
 * Gets all problems in an organization by OrgID
 * @param orgId 
 * id of the organization
 * @returns 
 * Returns all problems in an organization by orgId
 */
export async function getProblemsByOrgId(orgId: number) {
    try {
      const problems: Problem[] = await prisma.$queryRaw`
        SELECT p.*
        FROM OrgToProbMapping opm
        JOIN Problem p ON p.id = opm.probId
        WHERE opm.organizationId = ${orgId};
      `;

      return problems;
    } catch (error) {
      // Handle any errors that occur during database query
      console.error(`Failed to fetch problems for organizationId ${orgId}: ${error}`);
      throw new Error(`Failed to fetch problems for organizationId ${orgId}`);
    }
  }

/**
 * Gets problems in an organization by userID
 * @param userId 
 * id of the user
 * @returns 
 * Returns all problems in an organization by userId
 */
export async function getProblemsByUserId(userId: number) {
    try {
      const problems: Problem[] = await prisma.$queryRaw`
        SELECT p.*
        FROM Problem p
        JOIN OrgToProbMapping opm ON p.id = opm.probId
        JOIN UserToOrganization uto ON uto.organizationId = opm.organizationId
        WHERE uto.userId = ${userId};
      `;

      return problems;
    } catch (error) {
      // Handle any errors that occur during database query
      console.error(`Failed to fetch problems for userId ${userId}: ${error}`);
      throw new Error(`Failed to fetch problems for userId ${userId}`);
    }
  }

/**
 * Gets all problems in a category by categoryId
 * @param categoryid 
 * id of the category
 * @returns 
 * Returns all problems in a category
 */
export async function getProblemsByCategoryId(catId: number) {
    try {
      const problems: Problem[] = await prisma.$queryRaw`
        SELECT p.*
        FROM Problem p
        JOIN ProblemToCategory ptc ON ptc.problemId = p.id
        WHERE ptc.categoryId = ${catId};
      `;

      return problems;
    } catch (error) {
      // Handle any errors that occur during database query
      console.error(`Failed to fetch problems for categoryId ${catId}: ${error}`);
      throw new Error(`Failed to fetch problems for categoryId ${catId}`);
    }
  }

  export async function getProblemsAndCategoriesByUserId(userId: number) {
    try {
        type ProblemsArray = {problemId: number, problemName: string, difficulty: string, isCompleted: number, completedTimestamp: string}[];
        type ProblemAndDifficulty = {problemId: number, problemName: string, difficulty: string};

        // array of problems and categories to return
        const problemsAndCategories : {
            categoryId: number, 
            categoryName: string,
            problems: ProblemsArray
        }[] = [];

        // get the categories for the user
        const categories : Category[] = await getCategoriesByUserId(userId);
        // get all problems that have been completed by the user
        const completedProblems : CompletedProblems[] = await getCompletedProblemsByUserId(userId);

        for (let i = 0; i < categories.length; i++)
        {
            // for each category, get the problems and their difficulty in that category
            const problems: ProblemAndDifficulty[] = await prisma.$queryRaw`
                SELECT p.id as 'problemId', p.name as 'problemName', d.name as 'difficulty'
                FROM Problem p, Difficulty d, ProblemToCategory ptc
                WHERE ptc.problemId = p.id and ptc.categoryId = ${categories[i].id} and p.difficultyId = d.id;
            `;

            // array that will be pushed to and added in 'problems' in problemsAndCategories
            let problemsArrToAdd : ProblemsArray = [];

            for (let j = 0; j < problems.length; j++)
            {
                // check if the user has completed problems[j]
                let checkCompleted = 0;
                let findCompleted = completedProblems.filter(prob => (prob.problemId === problems[j].problemId && prob.userId === userId));
                let tempTimestamp = "";
                // if the user completed problems[j], findCompleted array length is >0
                if (findCompleted.length > 0) 
                { 
                    checkCompleted = 1;
                    tempTimestamp = findCompleted[0].timestamp;
                }

                // completedTimestamp is "" if the problem hasn't been completed, else it's a valid timestamp
                problemsArrToAdd.push({
                    problemId: problems[j].problemId,
                    problemName: problems[j].problemName,
                    difficulty: problems[j].difficulty,
                    isCompleted: checkCompleted,
                    completedTimestamp: checkCompleted === 1 ? tempTimestamp : ""
                });
            }

            problemsAndCategories.push({
                categoryId: categories[i].id,
                categoryName: categories[i].name,
                problems: problemsArrToAdd
            });
        }

        return problemsAndCategories;

      } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to fetch problems and categories for userId ${userId}: ${error}`);
        throw new Error(`Failed to fetch problems and categories for userId ${userId}: ${error}`);
      }
  }

/**
 * Creates a problem, problemToCategory mapping, and organizationToProblem mapping
 * @param userId 
 * id of the user creating the problem
 * @param catId 
 * id of the category the problem will be in
 * @param prob 
 * the problem being created
 * @returns 
 * Returns the created problem
 */
export async function postProblem(userId: number, catId: number,  prob: Problem){

    try {
    
        let organization: Organization = await getOrganizationByUserId(userId);

        let orgId = Number(organization.id);

        //add the new problem
        let problem = await prisma.problem.create({
            data: {
                name: prob.name,
                linkUrl: prob.linkUrl,
                videoUrl: prob.videoUrl,
                difficultyId: prob.difficultyId,
                isDefault: 0
            },
        });

        let newProbId = problem.id;

        //make a new mapping from problem to category
        let probToCatMapping = await prisma.problemToCategory.create({
            data: {
                problemId: newProbId,
                categoryId: catId
            },
        });

        //make a new mapping from org to problem
        let orgToProbMapping = await prisma.orgToProbMapping.create({
            data: {
                organizationId: orgId,
                probId: newProbId
            },
        });

        return problem;

    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to post problem by userId ${userId}, categoryId ${catId}: ${error}`);
        throw new Error(`Failed to post problem by userId ${userId}, categoryId ${catId}: ${error}`);
    }
    
}

/**
 * Removes a problem from problemToCategory and organizationToProblem
 * @param userId 
 * id of the user deleting the problem
 * @param probId 
 * id of the problem being removed
 * @returns 
 * The removed organizationToProblem mapping
 */
export async function removeProblem(userId: number, probId: number){
    try {
        //find the organization for the user
        const organization: Organization = await getOrganizationByUserId(userId);
        const orgId = organization.id;

        let category: Category = await getCategoryByProbId(probId);
        let catId = category.id;

        //remove catToProbMapping
        let catToProbMapping = await prisma.problemToCategory.delete({
            where: {
                problemId_categoryId: {
                    problemId: probId,
                    categoryId: catId
                }
            }
        });

        //remove orgToProbMapping
        let orgToProbMapping = await prisma.orgToProbMapping.delete({
            where: {
                organizationId_probId: {
                    organizationId: orgId,
                    probId: probId
                }
            }
        });

        //remove Problem
        let problem = await prisma.problem.delete({
            where: {
                id: probId
            }
        });

        return problem;

    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to remove problem for userId ${userId}, probId ${probId}: ${error}`);
        throw new Error(`Failed to remove problem for userId ${userId}, probId ${probId}: ${error}`);
      }

}