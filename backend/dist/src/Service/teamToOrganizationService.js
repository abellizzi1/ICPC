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
exports.getAllTeamToOrgByOrgId = exports.deleteTeamToOrganization = exports.postTeamToOrganization = exports.getTeamToOrganization = exports.getAllTeamToOrganization = void 0;
const client_1 = __importDefault(require("../../client"));
/**
 * Gets all teamToOrganization mappings
 * @returns
 * Returns all teamToOrganization mappings
 */
function getAllTeamToOrganization() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let allTeamToOrganization = yield client_1.default.teamToOrganization.findMany();
            return allTeamToOrganization;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to get all teamToOrganization mappings: ${error}`);
            throw new Error(`Failed to get all teamToOrganization mappings: ${error}`);
        }
    });
}
exports.getAllTeamToOrganization = getAllTeamToOrganization;
/**
 * Gets a teamToOrganization mapping by teamID and organizationID
 * @param teamid
 * teamID of the mapping
 * @param organizationid
 * organizationID of the mapping
 * @returns
 * Returns the mapping with the same teamID and organizationID
 */
function getTeamToOrganization(teamid, organizationid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let teamToOrganization = yield client_1.default.teamToOrganization.findUniqueOrThrow({
                where: {
                    teamId_organizationId: {
                        teamId: teamid,
                        organizationId: organizationid
                    }
                }
            });
            return teamToOrganization;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to get teamToOrganization mappings by teamId ${teamid}, organizationId ${organizationid}: ${error}`);
            throw new Error(`Failed to get teamToOrganization mappings by teamId ${teamid}, organizationId ${organizationid}: ${error}`);
        }
    });
}
exports.getTeamToOrganization = getTeamToOrganization;
/**
 * Posts a teamToOrganization mapping
 * @param teamid
 * teamID of the mapping
 * @param organizationid
 * organizationID of the mapping
 * @returns
 * Returns the created mapping
 */
function postTeamToOrganization(teamid, organizationid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let teamToOrganization = yield client_1.default.teamToOrganization.create({
                data: {
                    teamId: teamid,
                    organizationId: organizationid
                }
            });
            return teamToOrganization;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to post teamToOrganization mapping by teamId ${teamid}, organizationId ${organizationid}: ${error}`);
            throw new Error(`Failed to post teamToOrganization mapping by teamId ${teamid}, organizationId ${organizationid}: ${error}`);
        }
    });
}
exports.postTeamToOrganization = postTeamToOrganization;
/**
 * Deletes a teamToOrganization mapping
 * @param teamid
 * teamID of the mapping
 * @param organizationid
 * organizationID of the mapping
 * @returns
 * Returns the deleted mapping
 */
function deleteTeamToOrganization(teamid, organizationid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let teamToOrganization = yield client_1.default.teamToOrganization.delete({
                where: {
                    teamId_organizationId: {
                        teamId: teamid,
                        organizationId: organizationid
                    }
                }
            });
            return teamToOrganization;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to delete teamToOrganization mapping by teamId ${teamid}, organizationId ${organizationid}: ${error}`);
            throw new Error(`Failed to delete teamToOrganization mapping by teamId ${teamid}, organizationId ${organizationid}: ${error}`);
        }
    });
}
exports.deleteTeamToOrganization = deleteTeamToOrganization;
/**
 * Gets all mappings by orgID
 * @param orgId
 * organizationID of the mappings
 * @returns
 * Returns all mappings with the same organizationID (orgId)
 */
function getAllTeamToOrgByOrgId(orgId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let mappings = yield client_1.default.teamToOrganization.findMany({
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
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to get all teamToOrganization mappings by organizationId ${orgId}: ${error}`);
            throw new Error(`Failed to get all teamToOrganization mappings by organizationId ${orgId}: ${error}`);
        }
    });
}
exports.getAllTeamToOrgByOrgId = getAllTeamToOrgByOrgId;
//# sourceMappingURL=teamToOrganizationService.js.map