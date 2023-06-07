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
exports.deleteUserToOrganization = exports.postUserToOrganization = exports.getUserToOrgMappingsByUserId = exports.getUserToOrgMappingsByOrgId = exports.getUserToOrganization = exports.getAllUserToOrganization = void 0;
const client_1 = __importDefault(require("../../client"));
/**
 * Gets all userToOrganization mappings
 * @returns
 * Returns all userToOrganization mappings
 */
function getAllUserToOrganization() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let allUserToOrganization = yield client_1.default.userToOrganization.findMany();
            return allUserToOrganization;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to get all userToOrganization mappings: ${error}`);
            throw new Error(`Failed to get all userToOrganization mappings: ${error}`);
        }
    });
}
exports.getAllUserToOrganization = getAllUserToOrganization;
/**
 * Gets a userToOrganization mapping by userID and organizationID
 * @param userid
 * The userID of the mapping we are getting
 * @param organizationid
 * The organizationID of the mapping we are getting
 * @returns
 * Returns the userToOrganization mapping
 */
function getUserToOrganization(userid, organizationid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let userToOrganization = yield client_1.default.userToOrganization.findUniqueOrThrow({
                where: {
                    userId_organizationId: {
                        userId: userid,
                        organizationId: organizationid
                    }
                }
            });
            return userToOrganization;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to get userToOrganization mapping by userId ${userid}, organizationId ${organizationid}: ${error}`);
            throw new Error(`Failed to get userToOrganization mapping by userId ${userid}, organizationId ${organizationid}: ${error}`);
        }
    });
}
exports.getUserToOrganization = getUserToOrganization;
/**
 * Gets all userToOrganization mappings by orgID
 * @param orgId
 * The id of the organization in the userToOrganization mappings
 * @returns
 * Returns all mappings with an equal orgID
 */
function getUserToOrgMappingsByOrgId(orgId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let mappings = yield client_1.default.userToOrganization.findMany({
                where: {
                    organizationId: orgId
                }
            });
            return mappings;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to get userToOrganization mappings by organizationId ${orgId}: ${error}`);
            throw new Error(`Failed to get userToOrganization mappings by organizationId ${orgId}: ${error}`);
        }
    });
}
exports.getUserToOrgMappingsByOrgId = getUserToOrgMappingsByOrgId;
/**
 * Gets all userToOrganization mappings by userID
 * @param userId
 * The userID in the userToOrganization mappings
 * @returns
 * Returns all userToOrganization mappings with an equal userID
 */
function getUserToOrgMappingsByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let mappings = yield client_1.default.userToOrganization.findMany({
                where: {
                    userId: userId
                }
            });
            return mappings;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to get userToOrganization mappings by userId ${userId}: ${error}`);
            throw new Error(`Failed to get userToOrganization mappings by userId ${userId}: ${error}`);
        }
    });
}
exports.getUserToOrgMappingsByUserId = getUserToOrgMappingsByUserId;
/**
 * Posts a userToOrganization mapping with the userID and organizationID
 * @param userid
 * The userID in the mapping that is being posted
 * @param organizationid
 * The organizationID in the mapping that is being posted
 * @returns
 * Returns the created userToOrganization mapping
 */
function postUserToOrganization(userid, organizationid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let userToOrganization = yield client_1.default.userToOrganization.create({
                data: {
                    userId: userid,
                    organizationId: organizationid
                }
            });
            return userToOrganization;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to post userToOrganization mapping by userId ${userid}, organizationId ${organizationid}: ${error}`);
            throw new Error(`Failed to post userToOrganization mapping by userId ${userid}, organizationId ${organizationid}: ${error}`);
        }
    });
}
exports.postUserToOrganization = postUserToOrganization;
/**
 * Deletes a userToOrganization mapping
 * @param userid
 * The userID of the mapping we are deleting
 * @param organizationid
 * The organizationID of the mapping we are deleting
 * @returns
 * Returns the deleted mapping
 */
function deleteUserToOrganization(userid, organizationid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let userToOrganization = yield client_1.default.userToOrganization.delete({
                where: {
                    userId_organizationId: {
                        userId: userid,
                        organizationId: organizationid
                    }
                }
            });
            return userToOrganization;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to delete userToOrganization mapping by userId ${userid}, organizationId ${organizationid}: ${error}`);
            throw new Error(`Failed to delete userToOrganization mapping by userId ${userid}, organizationId ${organizationid}: ${error}`);
        }
    });
}
exports.deleteUserToOrganization = deleteUserToOrganization;
//# sourceMappingURL=userToOrganizationService.js.map