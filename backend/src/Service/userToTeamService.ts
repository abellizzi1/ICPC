import { PrismaClient, UserToTeam } from '@prisma/client'
import { maxTeamSize } from '../constants';

import prisma from '../../client'
// export const maxTeamSize = 3;

/**
 * Gets all userToTeam mappings
 * @returns 
 * Returns all userToTeam mappings
 */
export async function getAllUserToTeam(){ 
    try {
        let allUserToTeam = await prisma.userToTeam.findMany();
        return allUserToTeam;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to get all userToTeam mappings: ${error}`);
        throw new Error(`Failed to get all userToTeam mappings: ${error}`);
      }
}

/**
 * Gets the userToTeam mapping with the userID and teamID given
 * @param userid 
 * The userID of the mapping
 * @param teamid 
 * The teamID of the mapping
 * @returns 
 * Returns the mapping with the same userID and teamID
 */
export async function getUserToTeam(userid: number, teamid: number){
    try {
        let userToTeam = await prisma.userToTeam.findUniqueOrThrow({
            where: {
                teamId_userId: {
                    teamId: teamid,
                    userId: userid
                }
            }
        });
        
        return userToTeam;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to get userToTeam mapping by userId ${userid}, teamId ${teamid}: ${error}`);
        throw new Error(`Failed to get userToTeam mapping by userId ${userid}, teamId ${teamid}: ${error}`);
      }
}

/**
 * Gets the userToTeam mappings with the same userID
 * @param userid 
 * The userID of the mappings
 * @returns 
 * Returns the mappings with the same userID
 */
export async function getUserToTeamByUserId(userid: number){
    let userToTeam : UserToTeam[] = [];
    try {
    userToTeam = await prisma.userToTeam.findMany({
        where: {
            userId: userid
        }
    });
    
    return userToTeam;
    } catch (err) {console.log(err)}

    return userToTeam;
}

/**
 * Gets the userToTeam mappings with the same teamID
 * @param teamid 
 * The teamID of the mappings
 * @returns 
 * Returns the mappings with the same teamID
 */
export async function getUserToTeamByTeamId(teamid: number){
    try {
        let userToTeam = await prisma.userToTeam.findMany({
            where: {
                teamId: teamid
            }
        });
        
        return userToTeam;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to get userToTeam mappings by teamId ${teamid}: ${error}`);
        throw new Error(`Failed to get userToTeam mappings by teamId ${teamid}: ${error}`);
      }
}

/**
 * Posts a userToTeam mapping
 * @param userid 
 * userID of the mapping being posted
 * @param teamid 
 * teamID of the mapping being posted
 * @returns 
 * Returns the created mapping
 */
export async function postUserToTeam(userid: number, teamid: number){
    try {
        //make sure the team isn't full
        let userToTeamMappings = await getUserToTeamByTeamId(teamid);

        if (userToTeamMappings.length >= maxTeamSize) {
            return "This team is already full."
        }

        let userToTeam = await prisma.userToTeam.create({
            data: {
                teamId: teamid,
                userId: userid
            }
        });
        
        return userToTeam;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to post userToTeam mapping by userId ${userid}, teamId ${teamid}: ${error}`);
        throw new Error(`Failed to post userToTeam mapping by userId ${userid}, teamId ${teamid}: ${error}`);
      }
}

/**
 * Deletes a mapping
 * @param userid 
 * userID of the mapping being deleted
 * @param teamid 
 * teamID of the mapping being deleted
 * @returns 
 * Returns the deleted mapping
 */
export async function deleteUserToTeam(userid: number, teamid: number){
    try {
        let userToTeam = await prisma.userToTeam.delete({
            where: {
                teamId_userId: {
                    teamId: teamid,
                    userId: userid
                }
            }
        });
        
        return userToTeam;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to delete userToTeam mapping by userId ${userid}, teamId ${teamid}: ${error}`);
        throw new Error(`Failed to delete userToTeam mapping by userId ${userid}, teamId ${teamid}: ${error}`);
      }
}