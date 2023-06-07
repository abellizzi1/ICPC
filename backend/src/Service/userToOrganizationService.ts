import { PrismaClient } from '@prisma/client'

import prisma from '../../client'

/**
 * Gets all userToOrganization mappings
 * @returns 
 * Returns all userToOrganization mappings
 */
export async function getAllUserToOrganization(){ 
    try {
        let allUserToOrganization = await prisma.userToOrganization.findMany();
        return allUserToOrganization;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to get all userToOrganization mappings: ${error}`);
        throw new Error(`Failed to get all userToOrganization mappings: ${error}`);
      }
}

/**
 * Gets a userToOrganization mapping by userID and organizationID
 * @param userid 
 * The userID of the mapping we are getting
 * @param organizationid 
 * The organizationID of the mapping we are getting
 * @returns 
 * Returns the userToOrganization mapping
 */
export async function getUserToOrganization(userid: number, organizationid: number){
    try {
        let userToOrganization = await prisma.userToOrganization.findUniqueOrThrow({
            where: {
                userId_organizationId: {
                    userId: userid,
                    organizationId: organizationid
                }
            }
        });
        
        return userToOrganization;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to get userToOrganization mapping by userId ${userid}, organizationId ${organizationid}: ${error}`);
        throw new Error(`Failed to get userToOrganization mapping by userId ${userid}, organizationId ${organizationid}: ${error}`);
      }
}

/**
 * Gets all userToOrganization mappings by orgID
 * @param orgId 
 * The id of the organization in the userToOrganization mappings
 * @returns 
 * Returns all mappings with an equal orgID
 */
export async function getUserToOrgMappingsByOrgId(orgId: number){
    try {
        let mappings = await prisma.userToOrganization.findMany({
            where: {
                organizationId: orgId
            }
        });
        
        return mappings;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to get userToOrganization mappings by organizationId ${orgId}: ${error}`);
        throw new Error(`Failed to get userToOrganization mappings by organizationId ${orgId}: ${error}`);
      }
}

/**
 * Gets all userToOrganization mappings by userID
 * @param userId 
 * The userID in the userToOrganization mappings
 * @returns 
 * Returns all userToOrganization mappings with an equal userID
 */
export async function getUserToOrgMappingsByUserId(userId: number){
    try {
        let mappings = await prisma.userToOrganization.findMany({
            where: {
                userId: userId
            }
        });
        
        return mappings;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to get userToOrganization mappings by userId ${userId}: ${error}`);
        throw new Error(`Failed to get userToOrganization mappings by userId ${userId}: ${error}`);
      }
}

/**
 * Posts a userToOrganization mapping with the userID and organizationID
 * @param userid 
 * The userID in the mapping that is being posted
 * @param organizationid 
 * The organizationID in the mapping that is being posted
 * @returns 
 * Returns the created userToOrganization mapping
 */
export async function postUserToOrganization(userid: number, organizationid: number){
    try {
        let userToOrganization = await prisma.userToOrganization.create({
            data: {
                userId: userid,
                organizationId: organizationid
            }
        });
        
        return userToOrganization;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to post userToOrganization mapping by userId ${userid}, organizationId ${organizationid}: ${error}`);
        throw new Error(`Failed to post userToOrganization mapping by userId ${userid}, organizationId ${organizationid}: ${error}`);
      }
}

/**
 * Deletes a userToOrganization mapping
 * @param userid 
 * The userID of the mapping we are deleting
 * @param organizationid 
 * The organizationID of the mapping we are deleting
 * @returns 
 * Returns the deleted mapping
 */
export async function deleteUserToOrganization(userid: number, organizationid: number){
    try {
        let userToOrganization = await prisma.userToOrganization.delete({
            where: {
                userId_organizationId: {
                    userId: userid,
                    organizationId: organizationid
                }
            }
        });
        
        return userToOrganization;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to delete userToOrganization mapping by userId ${userid}, organizationId ${organizationid}: ${error}`);
        throw new Error(`Failed to delete userToOrganization mapping by userId ${userid}, organizationId ${organizationid}: ${error}`);
      }
}