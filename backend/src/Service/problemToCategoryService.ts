import { PrismaClient, ProblemToCategory } from '@prisma/client'

import prisma from '../../client'

/**
 * Get all problemToCategory mappings
 * @returns 
 * Returns all problemToCategory mappings
 */
export async function getAllProblemToCategory(){ 
    try {
        let allProblemToCategory = await prisma.problemToCategory.findMany();
        return allProblemToCategory;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to get all problemToCategory mappings: ${error}`);
        throw new Error(`Failed to get all problemToCategory mappings: ${error}`);
      }
}

/**
 * Get problemToCategory mapping by problemID and categoryID
 * @param problemid 
 * id of the problem
 * @param categoryid
 * id of the category 
 * @returns 
 * Returns a problemToCategory mapping with a matching problemID and categoryID
 */
export async function getProblemToCategory(problemid: number, categoryid: number){
    try {
        let problemToCategory = await prisma.problemToCategory.findUniqueOrThrow({
            where: {
                problemId_categoryId: {
                    problemId: problemid,
                    categoryId: categoryid
                }
            }
        });
        
        return problemToCategory;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to get problemToCategory mapping by problemId ${problemid}, categoryId ${categoryid}: ${error}`);
        throw new Error(`Failed to get problemToCategory mapping by problemId ${problemid}, categoryId ${categoryid}: ${error}`);
      }
}

export async function getProblemToCategoryByProblemId(problemid: number){
    try {
        let problemToCategory = await prisma.problemToCategory.findMany({
            where: {
                problemId: problemid,
            }
        });
        
        return problemToCategory;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to get problemToCategory mapping by problemId ${problemid}: ${error}`);
        throw new Error(`Failed to get problemToCategory mapping by problemId ${problemid}: ${error}`);
      }
}

/**
 * Posts a problemToCategory mapping
 * @param problemid 
 * id of the problem
 * @param categoryid
 * id of the category 
 * @returns 
 * Returns the created mapping
 */
export async function postProblemToCategory(problemid: number, categoryid: number){
    try {
        let problemToCategory = await prisma.problemToCategory.create({
            data: {
                problemId: problemid,
                categoryId: categoryid
            }
        });
        
        return problemToCategory;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to post problemToCategory mapping by problemId ${problemid}, categoryId ${categoryid}: ${error}`);
        throw new Error(`Failed to post problemToCategory mapping by problemId ${problemid}, categoryId ${categoryid}: ${error}`);
      }
}

/**
 * Updates problemToCategory mapping
 * @param problemId 
 * id of the problem
 * @param newCategoryId
 * new category id 
 * @returns 
 * Returns updated mapping
 */
export async function updateProblemToCategory(problemId: number, newCategoryId: number) {
    try {
        var prevProbToCat : ProblemToCategory[] = await getProblemToCategoryByProblemId(problemId);

        let updatedProblem = await prisma.problemToCategory.update({
            where: {
                problemId_categoryId: {
                    problemId: problemId,
                    categoryId: prevProbToCat[0].categoryId
                }
            },
            data: {
                problemId: problemId,
                categoryId: newCategoryId
            }
        })
        return updatedProblem;
    } catch(error) {
        // Handle any errors that occur during database query
        console.error(`Failed to update problemToCategory mapping: ${error}`);
        throw new Error(`Failed to update problemToCategory mapping: ${error}`);
    }
}

/**
 * Deletes a mapping
 * @param problemid 
 * id of the problem
 * @param categoryid
 * id of the category 
 * @returns 
 * Returns the deleted mapping
 */
export async function deleteProblemToCategory(problemid: number, categoryid: number){
    try {
        let problemToCategory = await prisma.problemToCategory.delete({
            where: {
                problemId_categoryId: {
                    problemId: problemid,
                    categoryId: categoryid
                }
            }
        });
        
        return problemToCategory;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to delete problemToCategory mapping by problemId ${problemid}, categoryId ${categoryid}: ${error}`);
        throw new Error(`Failed to delete problemToCategory mapping by problemId ${problemid}, categoryId ${categoryid}: ${error}`);
      }
}