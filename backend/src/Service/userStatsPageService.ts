import { PrismaClient} from '@prisma/client'


import bcrypt from 'bcrypt'
import { UserStatsPageLogical } from '../userStatsPageLogical';

import prisma from '../../client'

/**
 * Get's info to load the user stats page
 * @param userId 
 * The id of the user
 * @returns 
 * Returns a userStatsPageLogical
 */
export async function getUserStatsPageLogical(userId: number) {

    try {
        const userStatsPageLogical: UserStatsPageLogical[] = await prisma.$queryRaw`
            SELECT u.id as userId, 
                CAST(COUNT(cp.problemId) AS DOUBLE) as numCompletedProblems,
                COALESCE(u.leetcodeUsername, '') AS leetcodeUsername, 
                COALESCE(u.codeforcesUsername, '') AS codeforcesUsername, 
                CAST(COALESCE(u.uhuntId, -1) AS DOUBLE) AS uhuntId
            FROM UserToOrganization uo
            JOIN User u ON u.id = uo.userId
            LEFT JOIN CompletedProblems cp ON cp.userId = u.id
            WHERE uo.organizationId = (SELECT organizationId FROM UserToOrganization WHERE userId = ${userId})
            GROUP BY u.id;
        `;

        return userStatsPageLogical;

      } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to fetch category for probId ${userId}: ${error}`);
        throw new Error(`Failed to fetch category for probId ${userId}`);
      }
}