import { Organization, PrismaClient } from '@prisma/client'
import { getOrganizationByUserId } from './organizationService';
import prisma from '../../client'

/**
 * Get all organizationToDifficulty mappings
 * @returns 
 * Returns all organizationToDifficulty mappings
 */
export async function getAllOrgToDifficulty(){
    try {
        let mappings = await prisma.organizationToDifficultyMapping.findMany();

        return mappings;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to fetch allOrgToDifficulty: ${error}`);
        throw new Error(`Failed to fetch allOrgToDifficulty: ${error}`);
      }
}

/**
 * Get all mappings by orgID
 * @param id 
 * id of the organization
 * @returns 
 * Returns all mappings with the same orgID
 */
export async function getMappingsByOrgId(id: number){
    try {
        let mappings = await prisma.organizationToDifficultyMapping.findMany({
            where: {
                organizationId: id
            },
            
        });

        return mappings;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to fetch orgToDifficulty mappings by organizationId ${id}: ${error}`);
        throw new Error(`Failed to fetch orgToDifficulty mappings by organizationId ${id}: ${error}`);
      }
}

/**
 * Get all mappings by difficulty id
 * @param id 
 * id of the difficulty
 * @returns 
 * Returns all mappings with the same difficulty id
 */
export async function getMappingsByDiffId(id: number){
    try {
        let mappings = await prisma.organizationToDifficultyMapping.findMany({
            where: {
                difficultyId: id
            },
            
        });

        return mappings;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to fetch orgToDifficulty mappings by difficultyId ${id}: ${error}`);
        throw new Error(`Failed to fetch orgToDifficulty mappings by difficultyId ${id}: ${error}`);
      }
}

/**
 * Creates a new organizationToDifficulty mapping
 * @param orgId 
 * id of the organization
 * @param diffId 
 * id of the difficulty
 * @returns 
 * Returns the created mapping
 */
export async function addNewOrgToDiffMapping(orgId: number, diffId: number){
    try {
        let mapping = await prisma.organizationToDifficultyMapping.create({
            data: {
                organizationId: orgId,
                difficultyId: diffId
            },
        });

        return mapping;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to add new orgToDifficulty mapping by organizationId ${orgId}, difficultyId ${diffId}: ${error}`);
        throw new Error(`Failed to add new orgToDifficulty mapping by organizationId ${orgId}, difficultyId ${diffId}: ${error}`);
      }
}

/**
 * Deletes a mapping
 * @param orgId 
 * id of the organization
 * @param diffId 
 * id of the difficulty
 * @returns 
 * Returns the deleted mapping
 */
export async function removeOrgToDiffMapping(userId: number, diffId: number){
    try {
        let organization: Organization = await getOrganizationByUserId(userId);

        let orgId = Number(organization.id);

        let mapping = await prisma.organizationToDifficultyMapping.delete({
            where: {
                organizationId_difficultyId: {
                    organizationId: orgId,
                    difficultyId: diffId
                }
            }
        });
        return mapping;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to delete orgToDifficulty mapping by userId ${userId}, difficultyId ${diffId}: ${error}`);
        throw new Error(`Failed to delete orgToDifficulty mapping by userId ${userId}, difficultyId ${diffId}: ${error}`);
      }
}
