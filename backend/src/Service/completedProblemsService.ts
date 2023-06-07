import { CompletedProblems, PrismaClient, UserToOrganization, UserToTeam } from '@prisma/client';
import moment from 'moment';
import { getUserToTeamByTeamId } from './userToTeamService';
import { getUserToOrgMappingsByOrgId } from './userToOrganizationService';

import prisma from '../../client'

/**
 * Gets all completed problems
 * @returns 
 * Returns all completed problems
 */
export async function getAllCompletedProblems(){ 
    try {
        let allCompletedProblems = await prisma.completedProblems.findMany();
        return allCompletedProblems;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to fetch all completed problems: ${error}`);
        throw new Error(`Failed to fetch all completed problems: ${error}`);
      }
}

/**
 * Gets all completed problems by userID
 * @param userid 
 * id of the user
 * @returns 
 * Returns all completed problems by userID
 */
export async function getCompletedProblemsByUserId(userid: number){
    try {
        let completedProblems = await prisma.completedProblems.findMany({
            where: {
                userId: userid
            }
        });
        
        return completedProblems;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to fetch completed problems for userId ${userid}: ${error}`);
        throw new Error(`Failed to fetch completed problems for userId ${userid}: ${error}`);
      }
}

/**
 * Gets all completed problems within a team by teamID
 * @param teamid 
 * id of the team
 * @returns 
 * Returns all completed problems in a team
 */
export async function getCompletedProblemsByTeamId(teamid: number) {
    try {
        // userToTeams stores the userToTeam mappings where teamId = teamid
        var userToTeams: UserToTeam[] = [];
        userToTeams = await getUserToTeamByTeamId(teamid);

        // get all the completed problems where userId is equal to 
        // a userId in the userToTeams array
        var completedProblems : CompletedProblems[] = [];
        for (let i = 0; i < userToTeams.length; i++)
        {
            var problemsByUserId = await getCompletedProblemsByUserId(userToTeams[i].userId);
            completedProblems = completedProblems.concat(problemsByUserId);
        }

        return completedProblems;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to fetch completed problems for teamId ${teamid}: ${error}`);
        throw new Error(`Failed to fetch completed problems for teamId ${teamid}: ${error}`);
      }
}

/**
 * Gets all completed problems in an organization by orgID
 * @param orgid 
 * id of the organization
 * @returns 
 * Returns all completed problems in an organization
 */
export async function getCompletedProblemsByOrgId(orgid: number) {
    try {
        // usersToOrg stores the userToOrg mappings where orgId = orgid
        var usersToOrg: UserToOrganization[] = [];
        usersToOrg = await getUserToOrgMappingsByOrgId(orgid);

        // get all the completed problems where userId is equal to 
        // a userid in the usersToOrg array
        var completedProblems : CompletedProblems[] = [];
        for (let i = 0; i < usersToOrg.length; i++)
        {
            var problemsByUserId = await getCompletedProblemsByUserId(usersToOrg[i].userId);
            completedProblems = completedProblems.concat(problemsByUserId);
        }

        return completedProblems;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to fetch completed problems for organizationId ${orgid}: ${error}`);
        throw new Error(`Failed to fetch completed problems for organizationId ${orgid}: ${error}`);
      }
}

/**
 * Gets a completed problem by userID and problemID
 * @param userid 
 * id of the user
 * @param problemid 
 * id of the problem
 * @returns 
 * Returns a completed problem 
 */
export async function getCompletedProblemsByUserIdProblemId(userid: number, problemid: number){
    try {
        let completedProblems = await prisma.completedProblems.findUniqueOrThrow({
            where: {
                userId_problemId: {
                    userId: userid,
                    problemId: problemid
                }
            }
        });
        
        return completedProblems;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to fetch completed problems for userId ${userid}, problemId ${problemid}: ${error}`);
        throw new Error(`Failed to fetch completed problems for userId ${userid}, problemId ${problemid}: ${error}`);
    }
}

/**
 * Creates a completed problem 
 * @param userid 
 * id of the user who completed the problem
 * @param problemid 
 * id of the problem completed
 * @returns 
 * Returns the created completedProblem
 */
export async function postCompletedProblems(userid: number, problemid: number){
    try {
        let completedProblems = await prisma.completedProblems.create({
            data: {
                userId: userid,
                problemId: problemid,
                timestamp: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
            }
        });
        
        return completedProblems;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to post completed problem for userId ${userid}, problemId ${problemid}: ${error}`);
        throw new Error(`Failed to post completed problem for userId ${userid}, problemId ${problemid}: ${error}`);
      }
}

/**
 * Deletes a completed problem
 * @param userid 
 * id of the user
 * @param problemid 
 * id of the problem
 * @returns 
 * Returns the deleted completed problem
 */
export async function deleteCompletedProblems(userid: number, problemid: number){
    try {
        let completedProblems = await prisma.completedProblems.delete({
            where: {
                userId_problemId: {
                    userId: userid,
                    problemId: problemid
                }
            }
        });
        
        return completedProblems;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to delete completed problem for userId ${userid}, problemId ${problemid}: ${error}`);
        throw new Error(`Failed to delete completed problem for userId ${userid}, problemId ${problemid}: ${error}`);
      }
}