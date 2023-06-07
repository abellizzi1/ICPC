import { Organization, PrismaClient } from '@prisma/client';
import multer from 'multer';
import { getMappingsByOrgId } from './organizationToDifficultyMappingService';
import { Difficulty } from '@prisma/client';
import { OrganizationToDifficultyMapping } from '@prisma/client';
import { addNewOrgToDiffMapping, getAllOrgToDifficulty } from './organizationToDifficultyMappingService';
import { getOrganizationByUserId } from './organizationService';

import prisma from '../../client'

/**
 * Gets the difficulties by organization id
 * @param orgId 
 * id of the organization
 * @returns 
 * Returns all difficulties in the organization
 */
export async function getDifficultiesByOrgId(orgId: number) {
    try {
      const difficulties = await prisma.$queryRaw`
        SELECT d.id, d.name, d.isDefault
        FROM Difficulty d
        INNER JOIN OrganizationToDifficultyMapping otdm ON d.id = otdm.difficultyId
        WHERE otdm.organizationId = ${orgId};
      `;

      return difficulties;
    } catch (error) {
      // Handle any errors that occur during database query
      console.error(`Failed to fetch difficulties for organizationId ${orgId}: ${error}`);
      throw new Error(`Failed to fetch difficulties for organizationId ${orgId}`);
    }
  }

/**
 * Get Difficulties by userId
 * @param userId 
 * @returns difficulties associated with the organization the user belongs to
 */
export async function getDifficultiesByUserId(userId: number) {
    try {
      const difficulties = await prisma.$queryRaw`
      SELECT d.id, d.name, d.isDefault
      FROM Difficulty d
      INNER JOIN OrganizationToDifficultyMapping otdm ON d.id = otdm.difficultyId
      INNER JOIN UserToOrganization uto ON otdm.organizationId = uto.organizationId
      WHERE uto.userId = ${userId};
      `;

      return difficulties;
    } catch (error) {
      // Handle any errors that occur during database query
      console.error(`Failed to fetch difficulties for userId ${userId}: ${error}`);
      throw new Error(`Failed to fetch difficulties for userId ${userId}`);
    }
  }

/**
 * Gets all difficulties
 * @returns 
 * Returns all difficulties
 */
export async function getAllDifficulties() {
    try {
        let difficultyList = await prisma.difficulty.findMany({

        });

        return difficultyList;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to fetch all difficulties: ${error}`);
        throw new Error(`Failed to fetch all difficulties: ${error}`);
      }
}

/**
 * Gets a difficulty by name
 * @param name 
 * name of the difficulty
 * @returns 
 * Returns the difficulty with the same name
 */
export async function getDifficultyByName(name: string){
    try {
        let difficulty = await prisma.difficulty.findUniqueOrThrow({
            where: {
                name: name
            },
            
        });

        return difficulty;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to fetch difficulty by name ${name}: ${error}`);
        throw new Error(`Failed to fetch difficulty by name ${name}: ${error}`);
      }
}

/**
 * Gets a difficulty by id
 * @param id 
 * id of the difficulty
 * @returns 
 * Returns the difficulty with the same id
 */
export async function getDifficultyById(id: number){
    try {
        let difficulty = await prisma.difficulty.findUniqueOrThrow({
            where: {
                id: id
            },
            
        });

        return difficulty;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to fetch difficulty by id ${id}: ${error}`);
        throw new Error(`Failed to fetch difficulty by id ${id}: ${error}`);
      }
}

/**
 * Gets all default difficulties
 * @returns 
 * Returns all default difficulties
 */
export async function getDefaultDifficulties() {
    try {
        let defaultDifficultyList = await prisma.difficulty.findMany({
            where: {
                isDefault: 1
            },

        });

        return defaultDifficultyList;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to fetch all default difficulties: ${error}`);
        throw new Error(`Failed to fetch all default difficulties: ${error}`);
      }
}

export async function updateDifficulty(difficultyId: number, updatedName: string){
    try {
    let category = await prisma.difficulty.update({
      where: {
        id: difficultyId
      },
        data: {
            name: updatedName
        },
    });
  
    return category;
  
  } catch (error) {
    // Handle any errors that occur during database query
    console.error(`Failed to update difficulty for difficultyId ${difficultyId}: ${error}`);
    throw new Error(`Failed to update difficulty for difficultyId ${difficultyId}: ${error}`);
  }
    
  }

/**
 * Creates a new difficulty. Adds the organizationToDifficulty mapping
 * @param name 
 * name of the new difficulty
 * @param orgId 
 * id of the organization the difficulty is being created for
 * @returns 
 * Returns the created difficulty
 */
export async function addNewDifficulty(name: string, userId: number){
    try {
        let organization: Organization = await getOrganizationByUserId(userId);

        let orgId = Number(organization.id);
        let diff: Difficulty;
        let difficultyId;
        //check to see if the difficulty already exists
        let doesDiffExist = await doesDifficultyExist(name);
        //if it does, 
        if (doesDiffExist) {
            
            //find the Id of the diff
            diff = await getDifficultyByName(name);
            difficultyId = diff.id;
            
            //check to see if there is already a mapping for this org and diff
            let doesDiffMapExist = doesDifficultyMappingExist(orgId, difficultyId);
            
            //if there is already a mapping
            if (await doesDiffMapExist) {
                // console.log("This difficulty already exists for this organization.")
                return diff;
            } else {

                //assign a mapping to that organization
                let mapping = addNewOrgToDiffMapping(orgId, difficultyId);
                
                //find the difficulty that already exists
                diff = await getDifficultyById(difficultyId);
                return diff;
            }    
        } else {
            //create the difficulty
            diff = await prisma.difficulty.create({
                data: {
                    name: name,
                    isDefault: 0
                },
            });

            //assign a mapping to that difficulty
            difficultyId = diff.id;
            
            //assign a mapping to that organization
            let mapping = addNewOrgToDiffMapping(orgId, difficultyId);

            return diff;

        }
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to add new difficulty by name ${name}, userId ${userId}: ${error}`);
        throw new Error(`Failed to add new difficulty by name ${name}, userId ${userId}: ${error}`);
      }
}

/**
 * Checks if a difficulty already exists
 * @param name 
 * name of the difficulty
 * @returns 
 * Returns a boolean: True if exists, else false
 */
export async function doesDifficultyExist(name: string) {
    console.log("You are inside doesDifficultyExist");

    let existingDifficultyList;
    
    try {
        existingDifficultyList = await getDifficultyByName(name);
    } catch(err) {
        return false;
    }

    if (existingDifficultyList != null) {
        return true;
    }

    return false;
}

/**
 * Checks if a organizationToDifficulty mapping already exists
 * @param orgId 
 * id of the organization
 * @param diffId 
 * id of the difficulty
 * @returns 
 * Returns a boolean: True if exists, else false
 */
export async function doesDifficultyMappingExist(orgId: number, diffId: number) {
    try {
        var existingMappingList: OrganizationToDifficultyMapping[]  = await getMappingsByOrgId(orgId);

        if (existingMappingList != null) {
            for (let i = 0; i < existingMappingList.length; i++) {
                if (existingMappingList[i].difficultyId == diffId) {
                    return true;
                }
            }
        }

        return false;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to check if difficulty mapping exists by organizationId ${orgId}, difficultyId ${diffId}: ${error}`);
        throw new Error(`Failed to check if difficulty mapping exists by organizationId ${orgId}, difficultyId ${diffId}: ${error}`);
      }
}

/**
 * Usually isn't used when a difficulty is removed, since you would want to keep 
 * the difficulty in the table but remove the OrgToDifficulty mapping. 
 * This was created for testing purposes.
 * @param diffId 
 * id of the difficulty
 * @returns 
 * Returns the deleted difficulty
 */
export async function deleteDifficulty(diffId: number){
    try {
        let difficulty = await prisma.difficulty.delete({
            where: {
                id: diffId
            }
        });
        return difficulty;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to delete difficulty by id ${diffId}: ${error}`);
        throw new Error(`Failed to delete difficulty by id ${diffId}: ${error}`);
      }
}
