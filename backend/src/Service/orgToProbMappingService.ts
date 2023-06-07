import { PrismaClient, Problem } from '@prisma/client';
import { OrgToProbMapping } from '@prisma/client';
import { getAllDefaultProblems } from './problemService';

import prisma from '../../client'

/**
 * Gets all organizationToProblem mappings
 * @returns 
 * Returns all organizationToProblem mappings
 */
export async function getAllOrgToProbMappings() {
    try {
        let orgToProbMappings = await prisma.orgToProbMapping.findMany();

        return orgToProbMappings;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to get all organizationToProblem mappings: ${error}`);
        throw new Error(`Failed to get all organizationToProblem mappings: ${error}`);
      }
}

/**
 * Adds all default problems to an organization
 * @param orgId 
 * id of the organization
 * @returns 
 * Returns the added mappings
 */
export async function addAllDefaultProbToOrg(orgId: number){
    try {
        let mappings = [];
        let defaultProblems: Problem[] = await getAllDefaultProblems();

        for (let i = 0; i < defaultProblems.length; i++) {
            try {
                let mapping = await prisma.orgToProbMapping.create({
                    data: {
                        organizationId: orgId,
                        probId: defaultProblems[i].id
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
        console.error(`Failed to add all default problems to organization by organizationId ${orgId}: ${error}`);
        throw new Error(`Failed to add all default problems to organization by organizationId ${orgId}: ${error}`);
      }
}