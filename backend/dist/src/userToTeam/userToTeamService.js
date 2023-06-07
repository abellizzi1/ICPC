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
exports.deleteUserToTeam = exports.postUserToTeam = exports.getUserToTeamByTeamId = exports.getUserToTeamByUserId = exports.getUserToTeam = exports.getAllUserToTeam = void 0;
const constants_1 = require("../constants");
const client_1 = __importDefault(require("../../client"));
// export const maxTeamSize = 3;
/**
 * Gets all userToTeam mappings
 * @returns
 * Returns all userToTeam mappings
 */
function getAllUserToTeam() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let allUserToTeam = yield client_1.default.userToTeam.findMany();
            return allUserToTeam;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to get all userToTeam mappings: ${error}`);
            throw new Error(`Failed to get all userToTeam mappings: ${error}`);
        }
    });
}
exports.getAllUserToTeam = getAllUserToTeam;
/**
 * Gets the userToTeam mapping with the userID and teamID given
 * @param userid
 * The userID of the mapping
 * @param teamid
 * The teamID of the mapping
 * @returns
 * Returns the mapping with the same userID and teamID
 */
function getUserToTeam(userid, teamid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let userToTeam = yield client_1.default.userToTeam.findUniqueOrThrow({
                where: {
                    teamId_userId: {
                        teamId: teamid,
                        userId: userid
                    }
                }
            });
            return userToTeam;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to get userToTeam mapping by userId ${userid}, teamId ${teamid}: ${error}`);
            throw new Error(`Failed to get userToTeam mapping by userId ${userid}, teamId ${teamid}: ${error}`);
        }
    });
}
exports.getUserToTeam = getUserToTeam;
/**
 * Gets the userToTeam mappings with the same userID
 * @param userid
 * The userID of the mappings
 * @returns
 * Returns the mappings with the same userID
 */
function getUserToTeamByUserId(userid) {
    return __awaiter(this, void 0, void 0, function* () {
        let userToTeam = [];
        try {
            userToTeam = yield client_1.default.userToTeam.findMany({
                where: {
                    userId: userid
                }
            });
            return userToTeam;
        }
        catch (err) {
            console.log(err);
        }
        return userToTeam;
    });
}
exports.getUserToTeamByUserId = getUserToTeamByUserId;
/**
 * Gets the userToTeam mappings with the same teamID
 * @param teamid
 * The teamID of the mappings
 * @returns
 * Returns the mappings with the same teamID
 */
function getUserToTeamByTeamId(teamid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let userToTeam = yield client_1.default.userToTeam.findMany({
                where: {
                    teamId: teamid
                }
            });
            return userToTeam;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to get userToTeam mappings by teamId ${teamid}: ${error}`);
            throw new Error(`Failed to get userToTeam mappings by teamId ${teamid}: ${error}`);
        }
    });
}
exports.getUserToTeamByTeamId = getUserToTeamByTeamId;
/**
 * Posts a userToTeam mapping
 * @param userid
 * userID of the mapping being posted
 * @param teamid
 * teamID of the mapping being posted
 * @returns
 * Returns the created mapping
 */
function postUserToTeam(userid, teamid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //make sure the team isn't full
            let userToTeamMappings = yield getUserToTeamByTeamId(teamid);
            if (userToTeamMappings.length >= constants_1.maxTeamSize) {
                return "This team is already full.";
            }
            let userToTeam = yield client_1.default.userToTeam.create({
                data: {
                    teamId: teamid,
                    userId: userid
                }
            });
            return userToTeam;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to post userToTeam mapping by userId ${userid}, teamId ${teamid}: ${error}`);
            throw new Error(`Failed to post userToTeam mapping by userId ${userid}, teamId ${teamid}: ${error}`);
        }
    });
}
exports.postUserToTeam = postUserToTeam;
/**
 * Deletes a mapping
 * @param userid
 * userID of the mapping being deleted
 * @param teamid
 * teamID of the mapping being deleted
 * @returns
 * Returns the deleted mapping
 */
function deleteUserToTeam(userid, teamid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let userToTeam = yield client_1.default.userToTeam.delete({
                where: {
                    teamId_userId: {
                        teamId: teamid,
                        userId: userid
                    }
                }
            });
            return userToTeam;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to delete userToTeam mapping by userId ${userid}, teamId ${teamid}: ${error}`);
            throw new Error(`Failed to delete userToTeam mapping by userId ${userid}, teamId ${teamid}: ${error}`);
        }
    });
}
exports.deleteUserToTeam = deleteUserToTeam;
//# sourceMappingURL=userToTeamService.js.map