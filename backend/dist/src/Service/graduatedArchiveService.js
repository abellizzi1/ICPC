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
exports.deleteGraduated = exports.postGraduated = exports.getGraduatedInOrganizationByUserId = exports.getGraduatedByUserId = exports.getAllGraduated = void 0;
const client_1 = __importDefault(require("../../client"));
/**
 * Gets all graduated
 * @returns
 * Returns all graduated
 */
function getAllGraduated() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let allGraduated = yield client_1.default.graduatedArchive.findMany();
            return allGraduated;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to fetch all graduated users: ${error}`);
            throw new Error(`Failed to fetch all graduated users: ${error}`);
        }
    });
}
exports.getAllGraduated = getAllGraduated;
/**
 * Gets a graduated entry by userID
 * @param userid
 * id of the user
 * @returns
 * Returns a graduatedArchive entry
 */
function getGraduatedByUserId(userid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let graduated = yield client_1.default.graduatedArchive.findUniqueOrThrow({
                where: {
                    userId: userid
                }
            });
            return graduated;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to fetch graduated user by userId ${userid}: ${error}`);
            throw new Error(`Failed to fetch graduated user by userid ${userid}: ${error}`);
        }
    });
}
exports.getGraduatedByUserId = getGraduatedByUserId;
/**
 * Gets all graduated users in an organization by userID
 * @param userId
 * id of the user that's in the organization
 * @returns
 * Returns all graduated users in an organization
 */
function getGraduatedInOrganizationByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const graduated = yield client_1.default.$queryRaw `
            SELECT u.id as 'userId', u.firstName, u.lastName, g.major, g.yearGraduated
            FROM User u, GraduatedArchive g, UserToOrganization uto
            WHERE uto.userId = u.id and g.userId = u.id and uto.organizationId = (SELECT organizationId FROM UserToOrganization WHERE userId = ${userId});
            `;
            return graduated;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to fetch graduated users in organization by userId ${userId}: ${error}`);
            throw new Error(`Failed to fetch graduated users in organization by userId ${userId}: ${error}`);
        }
    });
}
exports.getGraduatedInOrganizationByUserId = getGraduatedInOrganizationByUserId;
/**
 * Creates an entry in graduatedArchive
 * @param userid
 * id of the user that graduated
 * @param major
 * major of the user that graduated
 * @param yearGraduated
 * year that the user graduated
 * @returns
 * Returns the created entry
 */
function postGraduated(userid, major, yearGraduated) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let graduated = yield client_1.default.graduatedArchive.create({
                data: {
                    userId: userid,
                    major: major,
                    yearGraduated: yearGraduated
                }
            });
            return graduated;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to post graduated user by userId ${userid}, major ${major}, yearGraduated ${yearGraduated}: ${error}`);
            throw new Error(`Failed to post graduated user by userId ${userid}, major ${major}, yearGraduated ${yearGraduated}: ${error}`);
        }
    });
}
exports.postGraduated = postGraduated;
/**
 * Deletes an entry in graduatedArchive
 * @param userid
 * id of the user being deleted
 * @returns
 * Returns the deleted entry
 */
function deleteGraduated(userid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let graduated = yield client_1.default.graduatedArchive.delete({
                where: {
                    userId: userid
                }
            });
            return graduated;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to delete graduated user by userId ${userid}: ${error}`);
            throw new Error(`Failed to delete graduated user by userId ${userid}: ${error}`);
        }
    });
}
exports.deleteGraduated = deleteGraduated;
//# sourceMappingURL=graduatedArchiveService.js.map