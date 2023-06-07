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
exports.deleteCompletedProblems = exports.postCompletedProblems = exports.getCompletedProblemsByUserIdProblemId = exports.getCompletedProblemsByOrgId = exports.getCompletedProblemsByTeamId = exports.getCompletedProblemsByUserId = exports.getAllCompletedProblems = void 0;
const moment_1 = __importDefault(require("moment"));
const userToTeamService_1 = require("./userToTeamService");
const userToOrganizationService_1 = require("./userToOrganizationService");
const client_1 = __importDefault(require("../../client"));
/**
 * Gets all completed problems
 * @returns
 * Returns all completed problems
 */
function getAllCompletedProblems() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let allCompletedProblems = yield client_1.default.completedProblems.findMany();
            return allCompletedProblems;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to fetch all completed problems: ${error}`);
            throw new Error(`Failed to fetch all completed problems: ${error}`);
        }
    });
}
exports.getAllCompletedProblems = getAllCompletedProblems;
/**
 * Gets all completed problems by userID
 * @param userid
 * id of the user
 * @returns
 * Returns all completed problems by userID
 */
function getCompletedProblemsByUserId(userid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let completedProblems = yield client_1.default.completedProblems.findMany({
                where: {
                    userId: userid
                }
            });
            return completedProblems;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to fetch completed problems for userId ${userid}: ${error}`);
            throw new Error(`Failed to fetch completed problems for userId ${userid}: ${error}`);
        }
    });
}
exports.getCompletedProblemsByUserId = getCompletedProblemsByUserId;
/**
 * Gets all completed problems within a team by teamID
 * @param teamid
 * id of the team
 * @returns
 * Returns all completed problems in a team
 */
function getCompletedProblemsByTeamId(teamid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // userToTeams stores the userToTeam mappings where teamId = teamid
            var userToTeams = [];
            userToTeams = yield (0, userToTeamService_1.getUserToTeamByTeamId)(teamid);
            // get all the completed problems where userId is equal to 
            // a userId in the userToTeams array
            var completedProblems = [];
            for (let i = 0; i < userToTeams.length; i++) {
                var problemsByUserId = yield getCompletedProblemsByUserId(userToTeams[i].userId);
                completedProblems = completedProblems.concat(problemsByUserId);
            }
            return completedProblems;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to fetch completed problems for teamId ${teamid}: ${error}`);
            throw new Error(`Failed to fetch completed problems for teamId ${teamid}: ${error}`);
        }
    });
}
exports.getCompletedProblemsByTeamId = getCompletedProblemsByTeamId;
/**
 * Gets all completed problems in an organization by orgID
 * @param orgid
 * id of the organization
 * @returns
 * Returns all completed problems in an organization
 */
function getCompletedProblemsByOrgId(orgid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // usersToOrg stores the userToOrg mappings where orgId = orgid
            var usersToOrg = [];
            usersToOrg = yield (0, userToOrganizationService_1.getUserToOrgMappingsByOrgId)(orgid);
            // get all the completed problems where userId is equal to 
            // a userid in the usersToOrg array
            var completedProblems = [];
            for (let i = 0; i < usersToOrg.length; i++) {
                var problemsByUserId = yield getCompletedProblemsByUserId(usersToOrg[i].userId);
                completedProblems = completedProblems.concat(problemsByUserId);
            }
            return completedProblems;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to fetch completed problems for organizationId ${orgid}: ${error}`);
            throw new Error(`Failed to fetch completed problems for organizationId ${orgid}: ${error}`);
        }
    });
}
exports.getCompletedProblemsByOrgId = getCompletedProblemsByOrgId;
/**
 * Gets a completed problem by userID and problemID
 * @param userid
 * id of the user
 * @param problemid
 * id of the problem
 * @returns
 * Returns a completed problem
 */
function getCompletedProblemsByUserIdProblemId(userid, problemid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let completedProblems = yield client_1.default.completedProblems.findUniqueOrThrow({
                where: {
                    userId_problemId: {
                        userId: userid,
                        problemId: problemid
                    }
                }
            });
            return completedProblems;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to fetch completed problems for userId ${userid}, problemId ${problemid}: ${error}`);
            throw new Error(`Failed to fetch completed problems for userId ${userid}, problemId ${problemid}: ${error}`);
        }
    });
}
exports.getCompletedProblemsByUserIdProblemId = getCompletedProblemsByUserIdProblemId;
/**
 * Creates a completed problem
 * @param userid
 * id of the user who completed the problem
 * @param problemid
 * id of the problem completed
 * @returns
 * Returns the created completedProblem
 */
function postCompletedProblems(userid, problemid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let completedProblems = yield client_1.default.completedProblems.create({
                data: {
                    userId: userid,
                    problemId: problemid,
                    timestamp: (0, moment_1.default)(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                }
            });
            return completedProblems;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to post completed problem for userId ${userid}, problemId ${problemid}: ${error}`);
            throw new Error(`Failed to post completed problem for userId ${userid}, problemId ${problemid}: ${error}`);
        }
    });
}
exports.postCompletedProblems = postCompletedProblems;
/**
 * Deletes a completed problem
 * @param userid
 * id of the user
 * @param problemid
 * id of the problem
 * @returns
 * Returns the deleted completed problem
 */
function deleteCompletedProblems(userid, problemid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let completedProblems = yield client_1.default.completedProblems.delete({
                where: {
                    userId_problemId: {
                        userId: userid,
                        problemId: problemid
                    }
                }
            });
            return completedProblems;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to delete completed problem for userId ${userid}, problemId ${problemid}: ${error}`);
            throw new Error(`Failed to delete completed problem for userId ${userid}, problemId ${problemid}: ${error}`);
        }
    });
}
exports.deleteCompletedProblems = deleteCompletedProblems;
//# sourceMappingURL=completedProblemsService.js.map