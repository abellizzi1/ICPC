import { Category, PrismaClient } from '@prisma/client'
import { UserToOrganization } from '@prisma/client';
import { categories } from '../../prisma/seed/lib/nc150';
import { getDefaultCategories } from './categoryService';
import { addAllDefaultCatToOrg } from './orgToCatMappingService';
import { getAllUserToOrganization } from './userToOrganizationService';
import { addAllDefaultProbToOrg } from './orgToProbMappingService';
import { Organization } from '../Model/organization';


import prisma from '../../client'

/**
 * Gets an organization by ID
 * @param id 
 * id of the organization
 * @returns 
 * Returns an organization with the same id
 */
export async function getOrganizationById(id: number){
    try {
        let organization = await prisma.organization.findUniqueOrThrow({
            where: {
                id: id
            },
            
        });

        return organization;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to get organization by id ${id}: ${error}`);
        throw new Error(`Failed to get organization by id ${id}: ${error}`);
      }
}

/**
 * Creates an organization and adds all default categories and problems
 * @param name 
 * name of the new organization
 * @returns 
 * Returns the created organization
 */
export async function postOrganization(name: string){
    try {
        let organization = await prisma.organization.create({
            data: {
                name: name
            }
        });
    
        let orgId = organization.id;
    
        //assign the default categories to the org
        let orgToCatMappings = await addAllDefaultCatToOrg(orgId);
    
        //assign the default problems to the org
        let orgToProbMappings = await addAllDefaultProbToOrg(orgId);
    
        //assign the default difficulties to the org???
    
    
        return organization;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to post organization by name ${name}: ${error}`);
        throw new Error(`Failed to post organization by name ${name}: ${error}`);
      }

}

/**
 * Gets an organization by userID
 * @param userId 
 * id of the user
 * @returns 
 * Returns the organization that the userID is in
 */
export async function getOrganizationByUserId(userId: number) {
    try {
      const organization: Organization[] = await prisma.$queryRaw`
        SELECT o.id, o.name
        FROM Organization o
        INNER JOIN UserToOrganization uto ON o.id = uto.organizationId
        WHERE uto.userId = ${userId}
        LIMIT 1;
      `;

      //the above query will return an array of organizations
      //so we choose the first element of the array
      return organization[0];
    } catch (error) {
      // Handle any errors that occur during database query
      console.error(`Failed to fetch organization for userId ${userId}: ${error}`);
      throw new Error(`Failed to fetch organization for userId ${userId}`);
    }
  }

/**
 * Gets all organizations
 * @returns 
 * Returns all organizations
 */
export async function getAllOrganizations(){
    try {
        let organizations = await prisma.organization.findMany({
            
            //Do Not Send The Password!!!
            select: {
                id: true, 
                name: true,
            }
        });
        
        return organizations;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to fetch all organizations: ${error}`);
        throw new Error(`Failed to fetch all organizations: ${error}`);
      }
}