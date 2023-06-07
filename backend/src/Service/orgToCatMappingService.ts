import { Category, PrismaClient } from '@prisma/client';
import { Organization } from '../Model/organization';
import { getOrganizationByUserId } from './organizationService';
import { getDefaultCategories } from './categoryService';
import { getUserById } from './userService';

import prisma from '../../client'

/**
 * Get all organizationToCategory mappings
 * @returns 
 * Returns all organizationToCategory mappings
 */
export async function getAllOrgToCatMappings(){
    try {
        let mappings = await prisma.orgToCategoryMapping.findMany();

        return mappings;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to get all organizationToCategory mappings: ${error}`);
        throw new Error(`Failed to get all organizationToCategory mappings: ${error}`);
    }
}

/**
 * Removes an organizationToCategory mapping by userID and categoryID
 * @param userId 
 * id of the user removing the mapping
 * @param catId 
 * id of the category 
 * @returns 
 * Returns the removed mapping
 */
export async function removeOrgToCatMapping(userId: number, catId: number){
    try {
        let organization: Organization = await getOrganizationByUserId(userId);
        let orgId = organization.id;

        let mapping;

        mapping = await prisma.orgToCategoryMapping.delete({
            where: {
                organizationId_categoryId: {
                    organizationId: orgId,
                    categoryId: catId
                }
            }
        });

        return mapping;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to remove organizationToCategory mapping by userId ${userId}, categoryId ${catId}: ${error}`);
        throw new Error(`Failed to remove organizationToCategory mapping by userId ${userId}, categoryId ${catId}: ${error}`);
      }
}

/**
 * Adds all default organizationToCategory mappings
 * @param orgId 
 * id of the organization
 * @returns 
 * Returns the added mappings
 */
export async function addAllDefaultCatToOrg(orgId: number){
    try {
        let mappings = [];
        let defaultCategories: Category[] = await getDefaultCategories();

        for (let i = 0; i < defaultCategories.length; i++) {
            try {
                let mapping = await prisma.orgToCategoryMapping.create({
                    data: {
                        organizationId: orgId,
                        categoryId: defaultCategories[i].id
                    }
                });

                mappings.push(mapping);
            } catch(err) {
                return err;
            }
        }


        return mappings;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to add all default categories to organization by organizationId ${orgId}: ${error}`);
        throw new Error(`Failed to add all default categories to organization by organizationId ${orgId}: ${error}`);
    }
}
