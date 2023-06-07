import { GraduatedArchive, PrismaClient, UserToOrganization } from '@prisma/client'
import { getUserToOrgMappingsByOrgId } from './userToOrganizationService'

import prisma from '../../client'

/**
 * Gets all graduated
 * @returns 
 * Returns all graduated
 */
export async function getAllGraduated(){ 
    try {
        let allGraduated = await prisma.graduatedArchive.findMany();
        return allGraduated;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to fetch all graduated users: ${error}`);
        throw new Error(`Failed to fetch all graduated users: ${error}`);
    }
}

/**
 * Gets a graduated entry by userID
 * @param userid 
 * id of the user
 * @returns 
 * Returns a graduatedArchive entry
 */
export async function getGraduatedByUserId(userid: number){
    try {
        let graduated = await prisma.graduatedArchive.findUniqueOrThrow({
            where: {
                userId: userid
            }
        });
        
        return graduated;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to fetch graduated user by userId ${userid}: ${error}`);
        throw new Error(`Failed to fetch graduated user by userid ${userid}: ${error}`);
      }
}

/**
 * Gets all graduated users in an organization by userID
 * @param userId 
 * id of the user that's in the organization
 * @returns 
 * Returns all graduated users in an organization
 */
export async function getGraduatedInOrganizationByUserId(userId: number) {
    try {
        type GraduatedUser = {userId: number, firstName: string, lastName: string, major: string, yearGraduated: number};

        const graduated: GraduatedUser[] = await prisma.$queryRaw`
            SELECT u.id as 'userId', u.firstName, u.lastName, g.major, g.yearGraduated
            FROM User u, GraduatedArchive g, UserToOrganization uto
            WHERE uto.userId = u.id and g.userId = u.id and uto.organizationId = (SELECT organizationId FROM UserToOrganization WHERE userId = ${userId});
            `;

        return graduated;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to fetch graduated users in organization by userId ${userId}: ${error}`);
        throw new Error(`Failed to fetch graduated users in organization by userId ${userId}: ${error}`);
      }
}

/**
 * Creates an entry in graduatedArchive
 * @param userid 
 * id of the user that graduated
 * @param major 
 * major of the user that graduated
 * @param yearGraduated 
 * year that the user graduated
 * @returns 
 * Returns the created entry
 */
export async function postGraduated(userid: number, major: string, yearGraduated: number){
    try {
        let graduated = await prisma.graduatedArchive.create({
            data: {
                userId: userid,
                major: major,
                yearGraduated: yearGraduated
            }
        });
        
        return graduated;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to post graduated user by userId ${userid}, major ${major}, yearGraduated ${yearGraduated}: ${error}`);
        throw new Error(`Failed to post graduated user by userId ${userid}, major ${major}, yearGraduated ${yearGraduated}: ${error}`);
      }
}

/**
 * Deletes an entry in graduatedArchive
 * @param userid 
 * id of the user being deleted
 * @returns 
 * Returns the deleted entry
 */
export async function deleteGraduated(userid: number){
    try {
        let graduated = await prisma.graduatedArchive.delete({
            where: {
                userId: userid
            }
        });
        
        return graduated;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to delete graduated user by userId ${userid}: ${error}`);
        throw new Error(`Failed to delete graduated user by userId ${userid}: ${error}`);
      }
}