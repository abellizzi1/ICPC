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
exports.getUserStatsPageLogical = void 0;
const client_1 = __importDefault(require("../../client"));
/**
 * Get's info to load the user stats page
 * @param userId
 * The id of the user
 * @returns
 * Returns a userStatsPageLogical
 */
function getUserStatsPageLogical(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userStatsPageLogical = yield client_1.default.$queryRaw `
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
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to fetch category for probId ${userId}: ${error}`);
            throw new Error(`Failed to fetch category for probId ${userId}`);
        }
    });
}
exports.getUserStatsPageLogical = getUserStatsPageLogical;
//# sourceMappingURL=userStatsPageService.js.map