import { PrismaClient, Team, TeamToOrganization } from '@prisma/client'
import { Organization } from '../Model/organization';
import { getAllTeamToOrgByOrgId, postTeamToOrganization } from './teamToOrganizationService';
import { getAllTeamToOrganization } from './teamToOrganizationService';
import { getOrganizationByUserId } from './organizationService';
import { getUserToTeamByTeamId } from './userToTeamService';
import { maxTeamSize } from '../constants';
import prisma from '../../client'

/**
 * Gets a team by id
 * @param id 
 * id of the team
 * @returns 
 * Returns the team with the matching id
 */
export async function getTeamById(id: number){
    try {
        let team = await prisma.team.findUniqueOrThrow({
            where: {
                id: id
            },
            
        });

        return team;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to get team by id ${id}: ${error}`);
        throw new Error(`Failed to get team by id ${id}: ${error}`);
      }
}

/**
 * Posts a team with the given name and maps that team to the organization
 * @param name 
 * name of the team to be created
 * @param userId
 * id of the user creating the team
 * @returns 
 * The created team
 */
export async function postTeam(name: string, userId: number){
    try {
        //find the organization for the user
        let organization: Organization = await getOrganizationByUserId(userId);

        //find the organizationId
        let organizationId = organization.id;

        //find all the teams for that organization
        let teams = await getAllTeamsByOrgId(organizationId)

        /*
            We can't make the team names in the team table unique because we might have two different
            organizations who want to each have a team with the same name.
        */
        //scroll through the teams to see if we have found that team name already used for this organization
        for (let i = 0; i < teams.length; i++) {
            let existingTeamName = teams[i].name;
            if (existingTeamName == name) {
                return "This team name already exists for this organization"
            }
        }

        //if the team name is unique for this organization, add the team
        let team = await prisma.team.create({
            data: {
                name: name
            }
        })

        //map the team to the organization
        let teamId = team.id

        let teamToOrgMapping = await postTeamToOrganization(teamId, organizationId);
        
        return team;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to post team by name ${name}, userId ${userId}: ${error}`);
        throw new Error(`Failed to post team by name ${name}, userId ${userId}: ${error}`);
      }
}

/**
 * Gets all teams in an organization by orgId
 * @param orgId 
 * id of the organization
 * @returns 
 * Returns all teams in the organization
 */
export async function getAllTeamsByOrgId(orgId: number){
    try {
        const teams: Team[] = await prisma.$queryRaw`
            SELECT t.id, t.name
            FROM TeamToOrganization tto
            JOIN Team t ON t.id = tto.teamId
            WHERE tto.organizationId = ${orgId};
        `;
    
        //the above query will return an array of elements
        //so we choose the first element of the array.
        return teams;
      } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to fetch teams for orgId ${orgId}: ${error}`);
        throw new Error(`Failed to fetch teams for orgId ${orgId}`);
      }
}

/**
 * Gets all teams in an organization by userI
 * @param userId 
 * id of the user
 * @returns 
 * Returns all teams in the organization the user is associted with
 */
export async function getAllTeamsByUserId(userId: number){

    try {
        const teams: Team[] = await prisma.$queryRaw`
            SELECT t.id, t.name
            FROM Team t
            JOIN TeamToOrganization tto ON tto.teamId = t.id
            JOIN UserToOrganization uto ON uto.organizationId = tto.organizationId
            WHERE uto.userId = ${userId};
        `;
  
        return teams;
      } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to fetch teams for userId ${userId}: ${error}`);
        throw new Error(`Failed to fetch teams for userId ${userId}`);
      }
}

/**
 * Gets all teams in an organization with less than max number
 * of members by orgID
 * @param orgId 
 * id of the organization
 * @returns 
 * Returns all teams in the organization
 */
export async function getAllAvailableTeamsByOrgId(orgId: number){
    try {
        const teams: Team[] = await prisma.$queryRaw`
            SELECT t.id, t.name
            FROM Team t
            INNER JOIN TeamToOrganization tto ON t.id = tto.teamId
            LEFT JOIN UserToTeam ut ON t.id = ut.teamId
            WHERE tto.organizationId = ${orgId}
            GROUP BY t.id, t.name
            HAVING COUNT(DISTINCT ut.userId) < ${maxTeamSize};
        `;
    
        //the above query will return an array of elements
        //so we choose the first element of the array.
        return teams;
      } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to fetch available teams for orgId ${orgId}: ${error}`);
        throw new Error(`Failed to fetch available teams for orgId ${orgId}`);
      }
}

/**
 * Gets all teams in an organization with less than max number
 * of members by userId
 * @param userId 
 * id of the organization
 * @returns 
 * Returns all teams in the organization that have less than 
 */
export async function getAllAvailableTeamsByUserId(userId: number){
    try {
        const teams: Team[] = await prisma.$queryRaw`
            SELECT t.id, t.name
            FROM Team t
            INNER JOIN TeamToOrganization tto ON t.id = tto.teamId
            INNER JOIN TeamToOrganization uo ON tto.organizationId = uo.organizationId
            LEFT JOIN UserToTeam ut ON t.id = ut.teamId
            WHERE uo.userId = ${userId}
            GROUP BY t.id, t.name
            HAVING COUNT(DISTINCT ut.userId) < ${maxTeamSize};
        `;
    
        //the above query will return an array of elements
        //so we choose the first element of the array.
        return teams;
      } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to fetch available teams for userId ${userId}: ${error}`);
        throw new Error(`Failed to fetch available teams for userId ${userId}`);
      }
}