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
exports.getAllAvailableTeamsByUserId = exports.getAllAvailableTeamsByOrgId = exports.getAllTeamsByUserId = exports.getAllTeamsByOrgId = exports.postTeam = exports.getTeamById = void 0;
const teamToOrganizationService_1 = require("./teamToOrganizationService");
const organizationService_1 = require("./organizationService");
const constants_1 = require("../constants");
const client_1 = __importDefault(require("../../client"));
/**
 * Gets a team by id
 * @param id
 * id of the team
 * @returns
 * Returns the team with the matching id
 */
function getTeamById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let team = yield client_1.default.team.findUniqueOrThrow({
                where: {
                    id: id
                },
            });
            return team;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to get team by id ${id}: ${error}`);
            throw new Error(`Failed to get team by id ${id}: ${error}`);
        }
    });
}
exports.getTeamById = getTeamById;
/**
 * Posts a team with the given name and maps that team to the organization
 * @param name
 * name of the team to be created
 * @param userId
 * id of the user creating the team
 * @returns
 * The created team
 */
function postTeam(name, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //find the organization for the user
            let organization = yield (0, organizationService_1.getOrganizationByUserId)(userId);
            //find the organizationId
            let organizationId = organization.id;
            //find all the teams for that organization
            let teams = yield getAllTeamsByOrgId(organizationId);
            /*
                We can't make the team names in the team table unique because we might have two different
                organizations who want to each have a team with the same name.
            */
            //scroll through the teams to see if we have found that team name already used for this organization
            for (let i = 0; i < teams.length; i++) {
                let existingTeamName = teams[i].name;
                if (existingTeamName == name) {
                    return "This team name already exists for this organization";
                }
            }
            //if the team name is unique for this organization, add the team
            let team = yield client_1.default.team.create({
                data: {
                    name: name
                }
            });
            //map the team to the organization
            let teamId = team.id;
            let teamToOrgMapping = yield (0, teamToOrganizationService_1.postTeamToOrganization)(teamId, organizationId);
            return team;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to post team by name ${name}, userId ${userId}: ${error}`);
            throw new Error(`Failed to post team by name ${name}, userId ${userId}: ${error}`);
        }
    });
}
exports.postTeam = postTeam;
/**
 * Gets all teams in an organization by orgId
 * @param orgId
 * id of the organization
 * @returns
 * Returns all teams in the organization
 */
function getAllTeamsByOrgId(orgId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const teams = yield client_1.default.$queryRaw `
            SELECT t.id, t.name
            FROM TeamToOrganization tto
            JOIN Team t ON t.id = tto.teamId
            WHERE tto.organizationId = ${orgId};
        `;
            //the above query will return an array of elements
            //so we choose the first element of the array.
            return teams;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to fetch teams for orgId ${orgId}: ${error}`);
            throw new Error(`Failed to fetch teams for orgId ${orgId}`);
        }
    });
}
exports.getAllTeamsByOrgId = getAllTeamsByOrgId;
/**
 * Gets all teams in an organization by userI
 * @param userId
 * id of the user
 * @returns
 * Returns all teams in the organization the user is associted with
 */
function getAllTeamsByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const teams = yield client_1.default.$queryRaw `
            SELECT t.id, t.name
            FROM Team t
            JOIN TeamToOrganization tto ON tto.teamId = t.id
            JOIN UserToOrganization uto ON uto.organizationId = tto.organizationId
            WHERE uto.userId = ${userId};
        `;
            return teams;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to fetch teams for userId ${userId}: ${error}`);
            throw new Error(`Failed to fetch teams for userId ${userId}`);
        }
    });
}
exports.getAllTeamsByUserId = getAllTeamsByUserId;
/**
 * Gets all teams in an organization with less than max number
 * of members by orgID
 * @param orgId
 * id of the organization
 * @returns
 * Returns all teams in the organization
 */
function getAllAvailableTeamsByOrgId(orgId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const teams = yield client_1.default.$queryRaw `
            SELECT t.id, t.name
            FROM Team t
            INNER JOIN TeamToOrganization tto ON t.id = tto.teamId
            LEFT JOIN UserToTeam ut ON t.id = ut.teamId
            WHERE tto.organizationId = ${orgId}
            GROUP BY t.id, t.name
            HAVING COUNT(DISTINCT ut.userId) < ${constants_1.maxTeamSize};
        `;
            //the above query will return an array of elements
            //so we choose the first element of the array.
            return teams;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to fetch available teams for orgId ${orgId}: ${error}`);
            throw new Error(`Failed to fetch available teams for orgId ${orgId}`);
        }
    });
}
exports.getAllAvailableTeamsByOrgId = getAllAvailableTeamsByOrgId;
/**
 * Gets all teams in an organization with less than max number
 * of members by userId
 * @param userId
 * id of the organization
 * @returns
 * Returns all teams in the organization that have less than
 */
function getAllAvailableTeamsByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const teams = yield client_1.default.$queryRaw `
            SELECT t.id, t.name
            FROM Team t
            INNER JOIN TeamToOrganization tto ON t.id = tto.teamId
            INNER JOIN TeamToOrganization uo ON tto.organizationId = uo.organizationId
            LEFT JOIN UserToTeam ut ON t.id = ut.teamId
            WHERE uo.userId = ${userId}
            GROUP BY t.id, t.name
            HAVING COUNT(DISTINCT ut.userId) < ${constants_1.maxTeamSize};
        `;
            //the above query will return an array of elements
            //so we choose the first element of the array.
            return teams;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to fetch available teams for userId ${userId}: ${error}`);
            throw new Error(`Failed to fetch available teams for userId ${userId}`);
        }
    });
}
exports.getAllAvailableTeamsByUserId = getAllAvailableTeamsByUserId;
//# sourceMappingURL=teamService.js.map