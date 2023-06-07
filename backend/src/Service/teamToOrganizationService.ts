import { PrismaClient } from '@prisma/client'

import prisma from '../../client'

/**
 * Gets all teamToOrganization mappings
 * @returns 
 * Returns all teamToOrganization mappings
 */
export async function getAllTeamToOrganization(){ 
    try {
        let allTeamToOrganization = await prisma.teamToOrganization.findMany();
        return allTeamToOrganization;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to get all teamToOrganization mappings: ${error}`);
        throw new Error(`Failed to get all teamToOrganization mappings: ${error}`);
      }
}

/**
 * Gets a teamToOrganization mapping by teamID and organizationID
 * @param teamid 
 * teamID of the mapping
 * @param organizationid
 * organizationID of the mapping 
 * @returns 
 * Returns the mapping with the same teamID and organizationID
 */
export async function getTeamToOrganization(teamid: number, organizationid: number){
    try {
        let teamToOrganization = await prisma.teamToOrganization.findUniqueOrThrow({
            where: {
                teamId_organizationId: {
                    teamId: teamid,
                    organizationId: organizationid
                }
            }
        });
        
        return teamToOrganization;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to get teamToOrganization mappings by teamId ${teamid}, organizationId ${organizationid}: ${error}`);
        throw new Error(`Failed to get teamToOrganization mappings by teamId ${teamid}, organizationId ${organizationid}: ${error}`);
      }
}

/**
 * Posts a teamToOrganization mapping
 * @param teamid 
 * teamID of the mapping
 * @param organizationid
 * organizationID of the mapping 
 * @returns 
 * Returns the created mapping
 */
export async function postTeamToOrganization(teamid: number, organizationid: number){
    try {
        let teamToOrganization = await prisma.teamToOrganization.create({
            data: {
                teamId: teamid,
                organizationId: organizationid
            }
        });
        
        return teamToOrganization;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to post teamToOrganization mapping by teamId ${teamid}, organizationId ${organizationid}: ${error}`);
        throw new Error(`Failed to post teamToOrganization mapping by teamId ${teamid}, organizationId ${organizationid}: ${error}`);
      }
}

/**
 * Deletes a teamToOrganization mapping
 * @param teamid 
 * teamID of the mapping
 * @param organizationid
 * organizationID of the mapping 
 * @returns 
 * Returns the deleted mapping
 */
export async function deleteTeamToOrganization(teamid: number, organizationid: number){
    try {
        let teamToOrganization = await prisma.teamToOrganization.delete({
            where: {
                teamId_organizationId: {
                    teamId: teamid,
                    organizationId: organizationid
                }
            }
        });
        
        return teamToOrganization;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to delete teamToOrganization mapping by teamId ${teamid}, organizationId ${organizationid}: ${error}`);
        throw new Error(`Failed to delete teamToOrganization mapping by teamId ${teamid}, organizationId ${organizationid}: ${error}`);
      }
}

/**
 * Gets all mappings by orgID
 * @param orgId 
 * organizationID of the mappings
 * @returns 
 * Returns all mappings with the same organizationID (orgId)
 */
export async function getAllTeamToOrgByOrgId(orgId: number){
    try {
        let mappings = await prisma.teamToOrganization.findMany({
            // where: {
            //     teamId_organizationId: {
            //         teamId: teamid,
            //         organizationId: organizationid
            //     }
            // }
            where: {
                organizationId: orgId
            }
        });
        
        return mappings;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to get all teamToOrganization mappings by organizationId ${orgId}: ${error}`);
        throw new Error(`Failed to get all teamToOrganization mappings by organizationId ${orgId}: ${error}`);
      }
}