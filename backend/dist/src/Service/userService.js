"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserDetailsByEmail = exports.getAllActiveUsersByOrgId = exports.getAllUsersByOrgId = exports.getAllUsersByMultipleTeamIds = exports.getAllUsersByTeamId = exports.getAllUsersNotOnTeamByOrgId = exports.updateUserEmailByUserId = exports.updateUser = exports.checkForExistingEmail = exports.registerUser = exports.deactivateUserByUserId = exports.updateUhuntUserByEmail = exports.updateCodeforcesUserByEmail = exports.updateLeetcodeUserByEmail = exports.getAllUsers = exports.getUserByEmailPassword = exports.getUserById = exports.getUserByEmail = void 0;
const organizationService_1 = require("./organizationService");
const userToOrganizationService_1 = require("./userToOrganizationService");
const userToTeamService_1 = require("./userToTeamService");
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = __importDefault(require("../../client"));
// More rounds -> longer creation and comparison time
const PASS_SALTING_ROUNDS = 10;
/**
 * Gets a user by email
 * @param email
 * The email of the user we are retrieving
 * @returns
 * Returns the user that has an email equal to the parameter
 */
function getUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let user = yield client_1.default.user.findUniqueOrThrow({
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
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to get user by email ${email}: ${error}`);
            throw new Error(`Failed to get user by email ${email}: ${error}`);
        }
    });
}
exports.getUserByEmail = getUserByEmail;
/**
 * Gets a user by id
 * @param id
 * The id of the user
 * @returns
 * Returns the user that has a matching id
 */
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let user = yield client_1.default.user.findUniqueOrThrow({
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
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to get user by id ${id}: ${error}`);
            throw new Error(`Failed to get user by id ${id}: ${error}`);
        }
    });
}
exports.getUserById = getUserById;
/**
 * Gets a user by email and password
 * @param email
 * The email of the user
 * @param cleartextPassword
 * The password of the user, unhashed
 * @returns
 * The user with a matching email and password
 */
function getUserByEmailPassword(email, cleartextPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { password } = yield client_1.default.user.findUniqueOrThrow({
                where: {
                    email: email
                },
                select: {
                    password: true
                }
            });
            let { userId: id, hash } = password;
            const isMatch = yield bcrypt_1.default.compare(cleartextPassword, hash);
            if (!isMatch) {
                return "Invalid password";
            }
            let user = yield client_1.default.user.findUniqueOrThrow({
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
        }
        catch (error) {
            // Handle any errors that occur during database query
            // Don't return or log passwords
            console.error(`Failed to get user by email ${email}`);
            throw new Error(`Failed to get user by email ${email}`);
        }
    });
}
exports.getUserByEmailPassword = getUserByEmailPassword;
/**
 * Gets all users in the database
 * @returns
 * Returns all users in the database (everything except password is sent)
 */
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let user = yield client_1.default.user.findMany({
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
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to get all users: ${error}`);
            throw new Error(`Failed to get all users: ${error}`);
        }
    });
}
exports.getAllUsers = getAllUsers;
/**
 * Updates a user's leetcode username by email
 * @param email
 * The email of the user we are updating
 * @param leetcodeUsername
 * The new leetcode username
 * @returns
 * Returns a user with an updated leetcode username
 */
function updateLeetcodeUserByEmail(email, leetcodeUsername) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let updateLeetcode = yield client_1.default.user.update({
                where: {
                    email: email
                },
                data: {
                    leetcodeUsername: leetcodeUsername
                }
            });
            return updateLeetcode;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to update leetcode username by email ${email}, leetcodeUsername ${leetcodeUsername}: ${error}`);
            throw new Error(`Failed to update leetcode username by email ${email}, leetcodeUsername ${leetcodeUsername}: ${error}`);
        }
    });
}
exports.updateLeetcodeUserByEmail = updateLeetcodeUserByEmail;
/**
 * Updates a user's codeforces username by email
 * @param email
 * The email of the user we are updating
 * @param codeforcesUsername
 * The new codeforces username
 * @returns
 * Returns a user with an updated codeforces username
 */
function updateCodeforcesUserByEmail(email, codeforcesUsername) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let updateCodeforces = yield client_1.default.user.update({
                where: {
                    email: email
                },
                data: {
                    codeforcesUsername: codeforcesUsername
                }
            });
            return updateCodeforces;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to update codeforces username by email ${email}, codeforcesUsername ${codeforcesUsername}: ${error}`);
            throw new Error(`Failed to update codeforces username by email ${email}, codeforcesUsername ${codeforcesUsername}: ${error}`);
        }
    });
}
exports.updateCodeforcesUserByEmail = updateCodeforcesUserByEmail;
/**
 * Updates a user's uhunt id by email
 * @param email
 * The email of the user we are updating
 * @param uhuntId
 * The new uhunt id
 * @returns
 * Returns a user with an updated uhunt id
 */
function updateUhuntUserByEmail(email, uhuntId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let updateUhunt = yield client_1.default.user.update({
                where: {
                    email: email
                },
                data: {
                    uhuntId: uhuntId
                }
            });
            return updateUhunt;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to update uhunt id by email ${email}, uhuntId ${uhuntId}: ${error}`);
            throw new Error(`Failed to update uhunt id by email ${email}, uhuntId ${uhuntId}: ${error}`);
        }
    });
}
exports.updateUhuntUserByEmail = updateUhuntUserByEmail;
/**
 * Deactivates a user by userID
 * @param userId
 * The id of the user we are deactivating
 * @returns
 * Returns a user with an updated isActive = 0
 */
function deactivateUserByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let deactivatedUser = yield client_1.default.user.update({
                where: {
                    id: userId
                },
                data: {
                    isActive: 0
                }
            });
            return deactivatedUser;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to deactivate user by id ${userId}: ${error}`);
            throw new Error(`Failed to deactivate user by id ${userId}: ${error}`);
        }
    });
}
exports.deactivateUserByUserId = deactivateUserByUserId;
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
function registerUser(user, orgName, existingOrgId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //check to see if email already exists
            let email = user.email;
            let doesUserEmailAlreadyExist = yield checkForExistingEmail(email);
            if (doesUserEmailAlreadyExist) {
                return ("This Email is Already Registered");
            }
            let hash = yield bcrypt_1.default.hash(user.password, PASS_SALTING_ROUNDS);
            //create the user
            let registeredUser = yield client_1.default.user.create({
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
                let userToOrgMap = yield (0, userToOrganizationService_1.postUserToOrganization)(registeredUser.id, existingOrgId);
            }
            else {
                //create the org
                let organization = yield (0, organizationService_1.postOrganization)(orgName);
                //assign the user to the organization
                let orgId = organization.id;
                let userToOrgMap = yield (0, userToOrganizationService_1.postUserToOrganization)(registeredUser.id, orgId);
            }
            return registeredUser;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to register user by organization name ${orgName}, organizationId ${existingOrgId}: ${error}`);
            throw new Error(`Failed to register user by organization name ${orgName}, organizationId ${existingOrgId}: ${error}`);
        }
    });
}
exports.registerUser = registerUser;
/**
 * Checks if an email already exists in the User table
 * @param email
 * The email we are checking
 * @returns
 * Returns a boolean: True if exists, false if it doesn't
 */
function checkForExistingEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        let existingUserList;
        try {
            existingUserList = yield getUserByEmail(email);
        }
        catch (err) {
            return false;
        }
        // console.log("The value of the name you passed in was: " + name);
        // console.log("Is your difficulty list null?: " + existingDifficultyList != null);
        if (existingUserList != null) {
            return true;
        }
        return false;
    });
}
exports.checkForExistingEmail = checkForExistingEmail;
/**
 * Updates a user with the JSON object that is passed as parameter
 * Cannot update user email or password
 * @param updatedUserInfo
 * JSON object that has the updated user info
 * @returns
 * Returns the updated user
 */
function updateUser(updatedUserInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let updatedUser = yield client_1.default.user.update({
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
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to update user: ${error}`);
            throw new Error(`Failed to update user: ${error}`);
        }
    });
}
exports.updateUser = updateUser;
/**
 * Updates a user's email by userId
 * @param userId
 * The id of the user we are updating
 * @param updatedEmail
 * The updated email we are assigning to the user
 * @returns
 * Returns an updated user
 */
function updateUserEmailByUserId(userId, updatedEmail) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let doesUserEmailAlreadyExist = yield checkForExistingEmail(updatedEmail);
            if (doesUserEmailAlreadyExist) {
                return "This Email Is Already Registered";
            }
            else {
                let updatedUser = yield client_1.default.user.update({
                    where: {
                        id: userId
                    },
                    data: {
                        email: updatedEmail
                    }
                });
                return updatedUser;
            }
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to update user email by userId ${userId}, updatedEmail ${updatedEmail}: ${error}`);
            throw new Error(`Failed to update user email by userId ${userId}, updatedEmail ${updatedEmail}: ${error}`);
        }
    });
}
exports.updateUserEmailByUserId = updateUserEmailByUserId;
/**
 * Finds all users in an organization that are not on a team.
 * @param orgId
 * the id of the organization
 * @returns
 * Returns all users in an organization that aren't on a team.
 */
function getAllUsersNotOnTeamByOrgId(orgId) {
    return __awaiter(this, void 0, void 0, function* () {
        let usersInOrg = [];
        try {
            usersInOrg = yield getAllActiveUsersByOrgId(orgId);
        }
        catch (error) {
            console.log(error);
        }
        // iterate through all usersInOrg to find the users who aren't on a team
        let usersToReturn = [];
        for (let i = 0; i < usersInOrg.length; i++) {
            try {
                if (usersInOrg[i].length > 0) {
                    let userToTeam = yield (0, userToTeamService_1.getUserToTeamByUserId)(usersInOrg[i][0].id);
                    if (userToTeam.length === 0) //the user is not on a team
                     {
                        usersToReturn.push(usersInOrg[i][0]);
                    }
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        return usersToReturn;
    });
}
exports.getAllUsersNotOnTeamByOrgId = getAllUsersNotOnTeamByOrgId;
/**
 * Gets all users in a team by teamID
 * @param teamid
 * The teamID of the team we are searching for users in
 * @returns
 * Returns all users in the team
 */
function getAllUsersByTeamId(teamId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield client_1.default.$queryRaw `
        SELECT u.id, u.firstName, u.lastName, u.email, u.phone, u.isAdmin, u.isHeadCoach, u.isAssistantCoach, u.isCoach, u.isMentor, u.isStudent, u.isActive, u.codeforcesUsername, u.leetcodeUsername, u.uhuntId
        FROM User u
        JOIN UserToTeam ut ON ut.userId = u.id
        WHERE ut.teamId = ${teamId};
      `;
            return users;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to fetch users for teamId ${teamId}: ${error}`);
            throw new Error(`Failed to fetch users for teamId ${teamId}`);
        }
    });
}
exports.getAllUsersByTeamId = getAllUsersByTeamId;
/**
 * An array of teamIds sent as strings is iterated through to find all users in each team.
 * The users in each team and the corresponding teamIds are returned.
 * @param teamIds
 * array of teamIds sent as strings
 * @returns
 * The users in each team and the corresponding teamIds are returned.
 */
function getAllUsersByMultipleTeamIds(teamIds) {
    return __awaiter(this, void 0, void 0, function* () {
        let users = [];
        for (let t = 0; t < teamIds.length; t++) {
            //use userToTeam to find the users that belong to that teamid
            let mappings = [];
            try {
                mappings = yield (0, userToTeamService_1.getUserToTeamByTeamId)(Number(teamIds[t]));
            }
            catch (err) {
                console.log(err);
            }
            //find all the userIds that belong to our team
            //and grab the user associated with that userId
            let tempUsers = [];
            for (let i = 0; i < mappings.length; i++) {
                if (mappings[i].teamId === Number(teamIds[t])) {
                    let thisId = mappings[i].userId;
                    try {
                        let user = yield client_1.default.user.findUniqueOrThrow({
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
                    }
                    catch (err) {
                        console.log(err);
                    }
                }
            }
            users.push({
                teamId: Number(teamIds[t]),
                users: tempUsers
            });
        }
        return users;
    });
}
exports.getAllUsersByMultipleTeamIds = getAllUsersByMultipleTeamIds;
/**
 * Gets all users in a organization by orgID
 * @param orgId
 * The id of the organization we are searching for users in
 * @returns
 * Returns all users in a organization
 */
function getAllUsersByOrgId(orgId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //use userToOrgMapping to find the users that belong to that orgId
            let mappings = [];
            mappings = yield (0, userToOrganizationService_1.getUserToOrgMappingsByOrgId)(orgId);
            //find all the userIds that belong to our organization
            //and grab the user associated with that userId
            let users = [];
            for (let i = 0; i < mappings.length; i++) {
                if (mappings[i].organizationId == orgId) {
                    let thisId = mappings[i].userId;
                    let user = yield client_1.default.user.findUniqueOrThrow({
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
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to get all users by organizationId ${orgId}: ${error}`);
            throw new Error(`Failed to get all users by organizationId ${orgId}: ${error}`);
        }
    });
}
exports.getAllUsersByOrgId = getAllUsersByOrgId;
/**
 * Gets all active users in an organization
 * @param orgId
 * The id of the organization we are searching for active users in
 * @returns
 * Returns all active users in an organization
 */
function getAllActiveUsersByOrgId(orgId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //use userToOrgMapping to find the users that belong to that orgId
            let mappings = [];
            mappings = yield (0, userToOrganizationService_1.getUserToOrgMappingsByOrgId)(orgId);
            //find all the userIds that belong to our organization
            //and grab the user associated with that userId
            let users = [];
            for (let i = 0; i < mappings.length; i++) {
                if (mappings[i].organizationId == orgId) {
                    let thisId = mappings[i].userId;
                    let user = yield client_1.default.user.findMany({
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
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to get all active users by organizationId ${orgId}: ${error}`);
            throw new Error(`Failed to get all active users by organizationId ${orgId}: ${error}`);
        }
    });
}
exports.getAllActiveUsersByOrgId = getAllActiveUsersByOrgId;
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
function updateUserDetailsByEmail(email, details, update) {
    return __awaiter(this, void 0, void 0, function* () {
        let updateDetails;
        try {
            switch (details) {
                case "fname":
                    updateDetails = yield client_1.default.user.update({
                        where: { email: email },
                        data: { firstName: update }
                    });
                    return "Updated fName";
                case "lname":
                    updateDetails = yield client_1.default.user.update({
                        where: { email: email },
                        data: { lastName: update }
                    });
                    return "Updated lName";
                case "phone":
                    updateDetails = yield client_1.default.user.update({
                        where: { email: email },
                        data: { phone: update }
                    });
                    return "Updated phone number";
                case "email": {
                    let doesUserEmailAlreadyExist = yield checkForExistingEmail(update);
                    if (doesUserEmailAlreadyExist) {
                        return "This Email Is Already Registered";
                    }
                    else {
                        updateDetails = yield client_1.default.user.update({
                            where: { email: email },
                            data: { email: update }
                        });
                        return "Updated email";
                    }
                }
                default: {
                    const newPass = update;
                    const oldPass = details.substring(8, details.length);
                    let { password } = yield client_1.default.user.findUniqueOrThrow({
                        where: {
                            email
                        },
                        select: {
                            password: true
                        }
                    });
                    console.debug("hash", password.hash);
                    const isMatch = yield bcrypt_1.default.compare(oldPass, password.hash);
                    if (!isMatch) {
                        return "Invalid password";
                    }
                    const hash = yield bcrypt_1.default.hash(newPass, PASS_SALTING_ROUNDS);
                    updateDetails = yield client_1.default.user.update({
                        where: { email: email },
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
        }
        catch (error) {
            return "Invalid user data";
        }
    });
}
exports.updateUserDetailsByEmail = updateUserDetailsByEmail;
//# sourceMappingURL=userService.js.map