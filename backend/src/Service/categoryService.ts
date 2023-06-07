import { Category, Organization, PrismaClient, Problem } from '@prisma/client'
import { OrgToCategoryMapping } from '@prisma/client';
import { getAllOrgToCatMappings } from './orgToCatMappingService';
import { getOrganizationByUserId } from './organizationService';

import prisma from '../../client'

/**
 * Gets a category by id
 * @param id 
 * id of the category
 * @returns 
 * Returns the category with the matching id
 */
export async function getCategoryById(id: number){
    try {
      let category = await prisma.category.findUniqueOrThrow({
          where: {
              id: id
          },
          
      });

      return category;
    } catch (error) {
      // Handle any errors that occur during database query
      console.error(`Failed to fetch categories for Id ${id}: ${error}`);
      throw new Error(`Failed to fetch categories for Id ${id}: ${error}`);
    }
}

/**
 * Gets all default categories
 * @param: none
 * @return: all default categories
 */
export async function getDefaultCategories() {
    try {
      let defaultCategoryList = await prisma.category.findMany({
          where: {
              isDefault: 1
          },

      });

      return defaultCategoryList;
    } catch (error) {
      // Handle any errors that occur during database query
      console.error(`Failed to fetch default categories: ${error}`);
      throw new Error(`Failed to fetch default categories: ${error}`);
    }
}

/**
 * Gets all categories
 * @returns 
 * Returns all categories
 */
export async function getAllCategories() {
    try {
      let categoryList = await prisma.category.findMany({

      });

      return categoryList;
    } catch (error) {
      // Handle any errors that occur during database query
      console.error(`Failed to fetch all categories: ${error}`);
      throw new Error(`Failed to fetch all categories: ${error}`);
    }
}

/**
 * Gets all categories in an organization by orgID
 * @param orgId 
 * id of the organization
 * @returns 
 * Returns all categories in the organization
 */
export async function getCategoriesByOrgId(orgId: number) {
    try {
      const categories = await prisma.$queryRaw`
        SELECT category.id, category.name, category.isDefault
        FROM Category
        JOIN OrgToCategoryMapping ON category.id = OrgToCategoryMapping.categoryId
        WHERE OrgToCategoryMapping.organizationId = ${orgId};
      `;
  
      return categories;
    } catch (error) {
      // Handle any errors that occur during database query
      console.error(`Failed to fetch categories for organizationId ${orgId}: ${error}`);
      throw new Error(`Failed to fetch categories for organizationId ${orgId}`);
    }
  }

/**
 * Gets all categories in an organization by userID
 * @param userId 
 * id of the user
 * @returns 
 * Returns all categories in the user's organization
 */
export async function getCategoriesByUserId(userId: number) {
    try {
      const categories : Category[] = await prisma.$queryRaw`
        SELECT c.*
        FROM Category c
        INNER JOIN OrgToCategoryMapping ocm ON c.id = ocm.categoryId
        INNER JOIN UserToOrganization uto ON ocm.organizationId = uto.organizationId
        WHERE uto.userId = ${userId};
      `;
  
      return categories;
    } catch (error) {
      // Handle any errors that occur during database query
      console.error(`Failed to fetch categories for userId ${userId}: ${error}`);
      throw new Error(`Failed to fetch categories for userId ${userId}`);
    }
  }

  /**
 * Get category by Problem Id
 * @param probId 
 * id of the problem
 * @returns 
 * Returns category associated with a particular problem
 */
export async function getCategoryByProbId(probId: number) {
  try {
    const category: Category[] = await prisma.$queryRaw`
    SELECT c.*
    FROM Category c
    JOIN ProblemToCategory ptc ON ptc.categoryId = c.id
    WHERE ptc.problemId = ${probId}
    LIMIT 1;
    `;

    //the above query will return an array of elements
    //so we choose the first element of the array.
    return category[0];
  } catch (error) {
    // Handle any errors that occur during database query
    console.error(`Failed to fetch category for probId ${probId}: ${error}`);
    throw new Error(`Failed to fetch category for probId ${probId}`);
  }
}

/**
 * Create a category. Add an organizationToCategory mapping.
 * @param userId 
 * id of the user creating the category
 * @param categoryName 
 * name of the new category
 * @returns 
 * Returns the created category
 */
export async function postCategory(userId: number, categoryName: string){
    // default error 

    try {
    
    let organization: Organization = await getOrganizationByUserId(userId);

    let orgId = Number(organization.id);

    //make a new category
    let category = await prisma.category.create({
        data: {
            name: categoryName,
            isDefault: 0
        },
    });

    let catId = category.id;

    //make a new mapping from org to category
    let mapping = await prisma.orgToCategoryMapping.create({
        data: {
            organizationId: orgId,
            categoryId: catId
        },
    });

    return category;

  } catch (error) {
    // Handle any errors that occur during database query
    console.error(`Failed to post category for userId ${userId}, categoryName ${categoryName}: ${error}`);
    throw new Error(`Failed to post category for userId ${userId}, categoryName ${categoryName}: ${error}`);
  }
    
}

/**
 * Updates a category 
 * @param categoryId 
 * id of the category
 * @param updatedName
 * updated name 
 * @returns 
 * returns the updated category
 */
export async function updateCategory(categoryId: number, updatedName: string){
  try {
  let category = await prisma.category.update({
    where: {
      id: categoryId
    },
      data: {
          name: updatedName
      },
  });

  return category;

} catch (error) {
  // Handle any errors that occur during database query
  console.error(`Failed to update category for categoryId ${categoryId}: ${error}`);
  throw new Error(`Failed to update category for categoryId ${categoryId}: ${error}`);
}
  
}
