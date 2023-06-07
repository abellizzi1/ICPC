import { PrismaClient, UserToOrganization, UserToTeam, Password } from '@prisma/client'
import { postOrganization } from './organizationService';
import { getUserToOrgMappingsByOrgId, postUserToOrganization } from './userToOrganizationService';
import { getUserToTeamByTeamId, getUserToTeamByUserId } from './userToTeamService';
import { User } from '../Model/user';

import bcrypt from 'bcrypt'
import { UserStatsPageLogical } from '../userStatsPageLogical';

import prisma from '../../client'


// More rounds -> longer creation and comparison time
const PASS_SALTING_ROUNDS = 10;


/**
 * Gets a user by email
 * @param email 
 * The email of the user we are retrieving
 * @returns 
 * Returns the user that has an email equal to the parameter
 */
export async function getUserByEmail(email:string) {
    try {
        let user = await prisma.user.findUniqueOrThrow({
            where: {
                email: email
            },
            
            //Do Not Send The Password!!!
            select: {
                id: true, 
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                isAdmin: true,
                isHeadCoach: true,
                isAssistantCoach: true,
                isCoach: true,
                isMentor: true,
                isStudent: true,
                isActive: true,
                leetcodeUsername: true,
                codeforcesUsername: true,
                uhuntId: true
            }
        });
        
        return user;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to get user by email ${email}: ${error}`);
        throw new Error(`Failed to get user by email ${email}: ${error}`);
      }

}

/**
 * Gets a user by id
 * @param id 
 * The id of the user
 * @returns 
 * Returns the user that has a matching id
 */
export async function getUserById(id:number) {
    try {
        let user = await prisma.user.findUniqueOrThrow({
            where: {
                id: id
            },
            
            //Do Not Send The Password!!!
            select: {
                id: true, 
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                isAdmin: true,
                isHeadCoach: true,
                isAssistantCoach: true,
                isCoach: true,
                isMentor: true,
                isStudent: true,
                isActive: true,
                leetcodeUsername: true,
                codeforcesUsername: true,
                uhuntId: true
            }
        });
        
        return user;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to get user by id ${id}: ${error}`);
        throw new Error(`Failed to get user by id ${id}: ${error}`);
      }

}

/**
 * Gets a user by email and password
 * @param email 
 * The email of the user
 * @param cleartextPassword 
 * The password of the user, unhashed
 * @returns 
 * The user with a matching email and password
 */
export async function getUserByEmailPassword(email: string, cleartextPassword: string) {

    try {
        let { password } = await prisma.user.findUniqueOrThrow({
            where: {
                email: email
            },

            select: {
                password: true
            }
        });

        let {userId: id, hash}: Password = password!;

        const isMatch = await bcrypt.compare(cleartextPassword, hash);
        if(!isMatch) {
            return "Invalid password";
        }

        let user = await prisma.user.findUniqueOrThrow({
        where: { id },

        select: {
            id: true, 
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            isAdmin: true,
            isHeadCoach: true,
            isAssistantCoach: true,
            isCoach: true,
            isMentor: true,
            isStudent: true,
            isActive: true,
            leetcodeUsername: true,
            codeforcesUsername: true,
            uhuntId: true,
            password: false //Do Not Send The Password!!!
        }
        });
        
        return user;
    } catch (error) {
        // Handle any errors that occur during database query
        // Don't return or log passwords
        console.error(`Failed to get user by email ${email}`);
        throw new Error(`Failed to get user by email ${email}`);
    }
}

/**
 * Gets all users in the database
 * @returns 
 * Returns all users in the database (everything except password is sent)
 */
export async function getAllUsers(){
    try {
        let user = await prisma.user.findMany({
            
            //Do Not Send The Password!!!
            select: {
                id: true, 
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                isAdmin: true,
                isHeadCoach: true,
                isAssistantCoach: true,
                isCoach: true,
                isMentor: true,
                isStudent: true,
                isActive: true,
                leetcodeUsername: true,
                codeforcesUsername: true,
                uhuntId: true
            }
        });
        
        

        return user;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to get all users: ${error}`);
        throw new Error(`Failed to get all users: ${error}`);
      }
}

/**
 * Updates a user's leetcode username by email
 * @param email 
 * The email of the user we are updating
 * @param leetcodeUsername 
 * The new leetcode username
 * @returns 
 * Returns a user with an updated leetcode username
 */
export async function updateLeetcodeUserByEmail(email: string, leetcodeUsername: string) {
    try {
        let updateLeetcode = await prisma.user.update({
            where: {
                email: email
            },
            data: {
                leetcodeUsername: leetcodeUsername
            }
        });
        return updateLeetcode;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to update leetcode username by email ${email}, leetcodeUsername ${leetcodeUsername}: ${error}`);
        throw new Error(`Failed to update leetcode username by email ${email}, leetcodeUsername ${leetcodeUsername}: ${error}`);
      }
}

/**
 * Updates a user's codeforces username by email
 * @param email 
 * The email of the user we are updating
 * @param codeforcesUsername 
 * The new codeforces username
 * @returns 
 * Returns a user with an updated codeforces username
 */
export async function updateCodeforcesUserByEmail(email: string, codeforcesUsername: string) {
    try {
        let updateCodeforces = await prisma.user.update({
            where: {
                email: email
            },
            data: {
                codeforcesUsername: codeforcesUsername
            }
        });
        return updateCodeforces;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to update codeforces username by email ${email}, codeforcesUsername ${codeforcesUsername}: ${error}`);
        throw new Error(`Failed to update codeforces username by email ${email}, codeforcesUsername ${codeforcesUsername}: ${error}`);
      }
}

/**
 * Updates a user's uhunt id by email
 * @param email 
 * The email of the user we are updating
 * @param uhuntId 
 * The new uhunt id
 * @returns 
 * Returns a user with an updated uhunt id
 */
export async function updateUhuntUserByEmail(email: string, uhuntId: number) {
    try {
        let updateUhunt = await prisma.user.update({
            where: {
                email: email
            },
            data: {
                uhuntId: uhuntId
            }
        });
        return updateUhunt;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to update uhunt id by email ${email}, uhuntId ${uhuntId}: ${error}`);
        throw new Error(`Failed to update uhunt id by email ${email}, uhuntId ${uhuntId}: ${error}`);
      }
}

/**
 * Deactivates a user by userID
 * @param userId 
 * The id of the user we are deactivating
 * @returns 
 * Returns a user with an updated isActive = 0
 */
export async function deactivateUserByUserId(userId: number) {
    try {
        let deactivatedUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                isActive: 0
            }
        });
        return deactivatedUser;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to deactivate user by id ${userId}: ${error}`);
        throw new Error(`Failed to deactivate user by id ${userId}: ${error}`);
      }
}

/**
 * Creates a user and assigns them to an existing or new organization
 * @param user 
 * The user that is being created
 * @param orgName 
 * The organization name that is being created/joined
 * @param existingOrgId 
 * The organization id that is being joined
 * @returns 
 * Returns the created user
 */
export async function registerUser(user: User, orgName: string, existingOrgId: number) {
    try {
        //check to see if email already exists
        let email = user.email;
        let doesUserEmailAlreadyExist = await checkForExistingEmail(email);

        if (doesUserEmailAlreadyExist) {
            return("This Email is Already Registered")
        }

    let hash = await bcrypt.hash(user.password, PASS_SALTING_ROUNDS);

    //create the user
    let registeredUser = await prisma.user.create({
        data: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: { create: { hash } },
            phone: user.phone,
            isAdmin: user.isAdmin,
            isHeadCoach: user.isHeadCoach,
            isAssistantCoach: user.isAssistantCoach,
            isCoach: user.isCoach,
            isMentor: user.isMentor,
            isStudent: user.isStudent,
            isActive: user.isActive,
            codeforcesUsername: user.codeforcesUsername,
            leetcodeUsername: user.leetcodeUsername,
            uhuntId: user.uhuntId
        },
    });

    // if user is being added to an existing organization
    if (existingOrgId != 0) {
        //assign the user to the organization
        let userToOrgMap = await postUserToOrganization(registeredUser.id, existingOrgId);
    } else {
        //create the org
        let organization = await postOrganization(orgName);

            //assign the user to the organization
            let orgId = organization.id;
            let userToOrgMap = await postUserToOrganization(registeredUser.id, orgId);

        }
        

        

        return registeredUser;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to register user by organization name ${orgName}, organizationId ${existingOrgId}: ${error}`);
        throw new Error(`Failed to register user by organization name ${orgName}, organizationId ${existingOrgId}: ${error}`);
      }
}

/**
 * Checks if an email already exists in the User table
 * @param email 
 * The email we are checking
 * @returns 
 * Returns a boolean: True if exists, false if it doesn't
 */
export async function checkForExistingEmail(email: string) {

    let existingUserList;
    
    try {
        existingUserList = await getUserByEmail(email);
    } catch(err) {
        return false;
    }

    // console.log("The value of the name you passed in was: " + name);
    // console.log("Is your difficulty list null?: " + existingDifficultyList != null);
    if (existingUserList != null) {
        return true;
    }

    return false;
}

/**
 * Updates a user with the JSON object that is passed as parameter
 * Cannot update user email or password
 * @param updatedUserInfo 
 * JSON object that has the updated user info
 * @returns 
 * Returns the updated user
 */
export async function updateUser(updatedUserInfo: User) {
    try {
        let updatedUser = await prisma.user.update({
            where: {
                id: updatedUserInfo.id
            },
            data: {
                firstName: updatedUserInfo.firstName,
                lastName: updatedUserInfo.lastName,
                phone: updatedUserInfo.phone,
                isAdmin: updatedUserInfo.isAdmin,
                isHeadCoach: updatedUserInfo.isHeadCoach,
                isAssistantCoach: updatedUserInfo.isAssistantCoach,
                isCoach: updatedUserInfo.isCoach,
                isMentor: updatedUserInfo.isMentor,
                isStudent: updatedUserInfo.isStudent,
                isActive: updatedUserInfo.isActive,
                codeforcesUsername: updatedUserInfo.codeforcesUsername,
                leetcodeUsername: updatedUserInfo.leetcodeUsername,
                uhuntId: updatedUserInfo.uhuntId
            }
        });
        return updatedUser;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to update user: ${error}`);
        throw new Error(`Failed to update user: ${error}`);
      }
}

/**
 * Updates a user's email by userId
 * @param userId 
 * The id of the user we are updating
 * @param updatedEmail 
 * The updated email we are assigning to the user
 * @returns 
 * Returns an updated user
 */
export async function updateUserEmailByUserId(userId: number, updatedEmail: string) {
    try {
        let doesUserEmailAlreadyExist = await checkForExistingEmail(updatedEmail);

        if (doesUserEmailAlreadyExist) {
            return "This Email Is Already Registered";
        } else {
            let updatedUser = await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    email: updatedEmail
                }
            });

            return updatedUser;
        }
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to update user email by userId ${userId}, updatedEmail ${updatedEmail}: ${error}`);
        throw new Error(`Failed to update user email by userId ${userId}, updatedEmail ${updatedEmail}: ${error}`);
      }
}

/**
 * Finds all users in an organization that are not on a team.
 * @param orgId 
 * the id of the organization
 * @returns 
 * Returns all users in an organization that aren't on a team.
 */
export async function getAllUsersNotOnTeamByOrgId(orgId: number) {
    let usersInOrg : any[] = [];
    try {
        usersInOrg = await getAllActiveUsersByOrgId(orgId);
    }
    catch (error) { console.log(error) }
    
    // iterate through all usersInOrg to find the users who aren't on a team
    let usersToReturn = [];
    for (let i = 0; i < usersInOrg.length; i++)
    {
        try {
            if (usersInOrg[i].length > 0)
            {
                let userToTeam = await getUserToTeamByUserId(usersInOrg[i][0].id);
                if (userToTeam.length === 0) //the user is not on a team
                {
                    usersToReturn.push(usersInOrg[i][0]);
                }
            }
        }
        catch (error) { console.log(error) }
    }

    return usersToReturn;
}

/**
 * Gets all users in a team by teamID
 * @param teamid 
 * The teamID of the team we are searching for users in
 * @returns 
 * Returns all users in the team
 */
export async function getAllUsersByTeamId(teamId: number) {
    try {
      const users: User[] = await prisma.$queryRaw`
        SELECT u.id, u.firstName, u.lastName, u.email, u.phone, u.isAdmin, u.isHeadCoach, u.isAssistantCoach, u.isCoach, u.isMentor, u.isStudent, u.isActive, u.codeforcesUsername, u.leetcodeUsername, u.uhuntId
        FROM User u
        JOIN UserToTeam ut ON ut.userId = u.id
        WHERE ut.teamId = ${teamId};
      `;

      return users;
    } catch (error) {
      // Handle any errors that occur during database query
      console.error(`Failed to fetch users for teamId ${teamId}: ${error}`);
      throw new Error(`Failed to fetch users for teamId ${teamId}`);
    }
  }

/**
 * An array of teamIds sent as strings is iterated through to find all users in each team. 
 * The users in each team and the corresponding teamIds are returned.
 * @param teamIds 
 * array of teamIds sent as strings
 * @returns 
 * The users in each team and the corresponding teamIds are returned.
 */
export async function getAllUsersByMultipleTeamIds(teamIds: any) {
    let users = [];
    for (let t = 0; t < teamIds.length; t++)
    {
        //use userToTeam to find the users that belong to that teamid
        let mappings: UserToTeam[] = [];
        try {
            mappings = await getUserToTeamByTeamId(Number(teamIds[t]));
        }
        catch (err) {
            console.log(err);
        }

        //find all the userIds that belong to our team
        //and grab the user associated with that userId
        let tempUsers = [];
        for (let i = 0; i < mappings.length; i++) {
            if (mappings[i].teamId === Number(teamIds[t])) {
                let thisId = mappings[i].userId
                try {
                    let user = await prisma.user.findUniqueOrThrow({
                
                    //     //Do Not Send The Password!!!
                        where: {
                            id: thisId
                        },
                        select: {
                            id: true, 
                            firstName: true,
                            lastName: true,
                            email: true,
                            phone: true,
                            isAdmin: true,
                            isHeadCoach: true,
                            isAssistantCoach: true,
                            isCoach: true,
                            isMentor: true,
                            isStudent: true,
                            isActive: true,
                            leetcodeUsername: true,
                            codeforcesUsername: true,
                            uhuntId: true
                        }
                    });
                    tempUsers.push(user);
                } catch (err) { console.log(err) }
            }
        }
        users.push({
            teamId: Number(teamIds[t]),
            users: tempUsers
        });
    }
    
    return users;
}

/**
 * Gets all users in a organization by orgID
 * @param orgId 
 * The id of the organization we are searching for users in
 * @returns 
 * Returns all users in a organization
 */
export async function getAllUsersByOrgId(orgId: number){
    try {
        //use userToOrgMapping to find the users that belong to that orgId
        let mappings: UserToOrganization[] = []
        mappings = await getUserToOrgMappingsByOrgId(orgId);

        //find all the userIds that belong to our organization
        //and grab the user associated with that userId
        let users = [];
        for (let i = 0; i < mappings.length; i++) {
            if (mappings[i].organizationId == orgId) {
                let thisId = mappings[i].userId
                let user = await prisma.user.findUniqueOrThrow({
            
                //     //Do Not Send The Password!!!
                    where: {
                        id: thisId
                    },
                    select: {
                        id: true, 
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true,
                        isAdmin: true,
                        isHeadCoach: true,
                        isAssistantCoach: true,
                        isCoach: true,
                        isMentor: true,
                        isStudent: true,
                        isActive: true,
                        leetcodeUsername: true,
                        codeforcesUsername: true,
                        uhuntId: true
                    }
                });
                
                users.push(user);
            }
        }

        return users;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to get all users by organizationId ${orgId}: ${error}`);
        throw new Error(`Failed to get all users by organizationId ${orgId}: ${error}`);
      }
}

/**
 * Gets all active users in an organization
 * @param orgId 
 * The id of the organization we are searching for active users in
 * @returns 
 * Returns all active users in an organization
 */
export async function getAllActiveUsersByOrgId(orgId: number){
    try {
        //use userToOrgMapping to find the users that belong to that orgId
        let mappings: UserToOrganization[] = []
        mappings = await getUserToOrgMappingsByOrgId(orgId);

        //find all the userIds that belong to our organization
        //and grab the user associated with that userId
        let users = [];
        for (let i = 0; i < mappings.length; i++) {
            if (mappings[i].organizationId == orgId) {
                let thisId = mappings[i].userId
                let user = await prisma.user.findMany({
            
                //     //Do Not Send The Password!!!
                    where: {
                        id: thisId,
                        isActive: 1
                    },
                    select: {
                        id: true, 
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true,
                        isAdmin: true,
                        isHeadCoach: true,
                        isAssistantCoach: true,
                        isCoach: true,
                        isMentor: true,
                        isStudent: true,
                        isActive: true,
                        leetcodeUsername: true,
                        codeforcesUsername: true,
                        uhuntId: true
                    }
                });
                
                users.push(user);
            }
        }

        return users;
    } catch (error) {
        // Handle any errors that occur during database query
        console.error(`Failed to get all active users by organizationId ${orgId}: ${error}`);
        throw new Error(`Failed to get all active users by organizationId ${orgId}: ${error}`);
      }
}

/**
 * Updates user details by email
 * @param email 
 * The email of the user we are updating
 * @param details 
 * The column we are updating
 * @param update 
 * The new value for the column we are updating
 * @returns 
 * Returns a string saying which value was updated.
 */
export async function updateUserDetailsByEmail(email: string, details: string, update: string) {
    let updateDetails;
    try {
        switch(details) {
            case "fname": 
                updateDetails = await prisma.user.update({
                    where: {email: email},
                    data: {firstName: update}
                    });
                    return "Updated fName";
            case "lname":
                updateDetails = await prisma.user.update({
                    where: {email: email},
                    data: {lastName: update}
                });
                return "Updated lName";
            case "phone":
                updateDetails = await prisma.user.update({
                    where: {email: email},
                    data: {phone: update}
                });
                return "Updated phone number";
            case "email": {
                let doesUserEmailAlreadyExist = await checkForExistingEmail(update);

                if (doesUserEmailAlreadyExist) {
                    return "This Email Is Already Registered";
                } else {
                    updateDetails = await prisma.user.update({
                        where: {email: email},
                        data: {email: update}
                    });
                    return "Updated email";
                }
            }
            default: {
                const newPass = update;
                const oldPass = details.substring(8, details.length);

                let {password} = await prisma.user.findUniqueOrThrow({
                    where: {
                        email
                    },

                    select: {
                        password: true
                    }
                });

                console.debug("hash", password!.hash);
                
                const isMatch = await bcrypt.compare(oldPass, password!.hash);
                if(!isMatch) {
                    return "Invalid password";
                }

                const hash = await bcrypt.hash(newPass, PASS_SALTING_ROUNDS);

                updateDetails = await prisma.user.update({
                    where: {email: email},
                    data: {
                        password: {
                            update: {
                                hash
                            }
                        } 
                    }
                });
                return "Updated password";
            }
    }
    
    } catch (error) {
        return "Invalid user data";
    }


}
