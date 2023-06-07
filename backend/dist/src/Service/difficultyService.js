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
exports.deleteDifficulty = exports.doesDifficultyMappingExist = exports.doesDifficultyExist = exports.addNewDifficulty = exports.updateDifficulty = exports.getDefaultDifficulties = exports.getDifficultyById = exports.getDifficultyByName = exports.getAllDifficulties = exports.getDifficultiesByUserId = exports.getDifficultiesByOrgId = void 0;
const organizationToDifficultyMappingService_1 = require("./organizationToDifficultyMappingService");
const organizationToDifficultyMappingService_2 = require("./organizationToDifficultyMappingService");
const organizationService_1 = require("./organizationService");
const client_1 = __importDefault(require("../../client"));
/**
 * Gets the difficulties by organization id
 * @param orgId
 * id of the organization
 * @returns
 * Returns all difficulties in the organization
 */
function getDifficultiesByOrgId(orgId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const difficulties = yield client_1.default.$queryRaw `
        SELECT d.id, d.name, d.isDefault
        FROM Difficulty d
        INNER JOIN OrganizationToDifficultyMapping otdm ON d.id = otdm.difficultyId
        WHERE otdm.organizationId = ${orgId};
      `;
            return difficulties;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to fetch difficulties for organizationId ${orgId}: ${error}`);
            throw new Error(`Failed to fetch difficulties for organizationId ${orgId}`);
        }
    });
}
exports.getDifficultiesByOrgId = getDifficultiesByOrgId;
/**
 * Get Difficulties by userId
 * @param userId
 * @returns difficulties associated with the organization the user belongs to
 */
function getDifficultiesByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const difficulties = yield client_1.default.$queryRaw `
      SELECT d.id, d.name, d.isDefault
      FROM Difficulty d
      INNER JOIN OrganizationToDifficultyMapping otdm ON d.id = otdm.difficultyId
      INNER JOIN UserToOrganization uto ON otdm.organizationId = uto.organizationId
      WHERE uto.userId = ${userId};
      `;
            return difficulties;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to fetch difficulties for userId ${userId}: ${error}`);
            throw new Error(`Failed to fetch difficulties for userId ${userId}`);
        }
    });
}
exports.getDifficultiesByUserId = getDifficultiesByUserId;
/**
 * Gets all difficulties
 * @returns
 * Returns all difficulties
 */
function getAllDifficulties() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let difficultyList = yield client_1.default.difficulty.findMany({});
            return difficultyList;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to fetch all difficulties: ${error}`);
            throw new Error(`Failed to fetch all difficulties: ${error}`);
        }
    });
}
exports.getAllDifficulties = getAllDifficulties;
/**
 * Gets a difficulty by name
 * @param name
 * name of the difficulty
 * @returns
 * Returns the difficulty with the same name
 */
function getDifficultyByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let difficulty = yield client_1.default.difficulty.findUniqueOrThrow({
                where: {
                    name: name
                },
            });
            return difficulty;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to fetch difficulty by name ${name}: ${error}`);
            throw new Error(`Failed to fetch difficulty by name ${name}: ${error}`);
        }
    });
}
exports.getDifficultyByName = getDifficultyByName;
/**
 * Gets a difficulty by id
 * @param id
 * id of the difficulty
 * @returns
 * Returns the difficulty with the same id
 */
function getDifficultyById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let difficulty = yield client_1.default.difficulty.findUniqueOrThrow({
                where: {
                    id: id
                },
            });
            return difficulty;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to fetch difficulty by id ${id}: ${error}`);
            throw new Error(`Failed to fetch difficulty by id ${id}: ${error}`);
        }
    });
}
exports.getDifficultyById = getDifficultyById;
/**
 * Gets all default difficulties
 * @returns
 * Returns all default difficulties
 */
function getDefaultDifficulties() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let defaultDifficultyList = yield client_1.default.difficulty.findMany({
                where: {
                    isDefault: 1
                },
            });
            return defaultDifficultyList;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to fetch all default difficulties: ${error}`);
            throw new Error(`Failed to fetch all default difficulties: ${error}`);
        }
    });
}
exports.getDefaultDifficulties = getDefaultDifficulties;
function updateDifficulty(difficultyId, updatedName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let category = yield client_1.default.difficulty.update({
                where: {
                    id: difficultyId
                },
                data: {
                    name: updatedName
                },
            });
            return category;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to update difficulty for difficultyId ${difficultyId}: ${error}`);
            throw new Error(`Failed to update difficulty for difficultyId ${difficultyId}: ${error}`);
        }
    });
}
exports.updateDifficulty = updateDifficulty;
/**
 * Creates a new difficulty. Adds the organizationToDifficulty mapping
 * @param name
 * name of the new difficulty
 * @param orgId
 * id of the organization the difficulty is being created for
 * @returns
 * Returns the created difficulty
 */
function addNewDifficulty(name, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let organization = yield (0, organizationService_1.getOrganizationByUserId)(userId);
            let orgId = Number(organization.id);
            let diff;
            let difficultyId;
            //check to see if the difficulty already exists
            let doesDiffExist = yield doesDifficultyExist(name);
            //if it does, 
            if (doesDiffExist) {
                //find the Id of the diff
                diff = yield getDifficultyByName(name);
                difficultyId = diff.id;
                //check to see if there is already a mapping for this org and diff
                let doesDiffMapExist = doesDifficultyMappingExist(orgId, difficultyId);
                //if there is already a mapping
                if (yield doesDiffMapExist) {
                    // console.log("This difficulty already exists for this organization.")
                    return diff;
                }
                else {
                    //assign a mapping to that organization
                    let mapping = (0, organizationToDifficultyMappingService_2.addNewOrgToDiffMapping)(orgId, difficultyId);
                    //find the difficulty that already exists
                    diff = yield getDifficultyById(difficultyId);
                    return diff;
                }
            }
            else {
                //create the difficulty
                diff = yield client_1.default.difficulty.create({
                    data: {
                        name: name,
                        isDefault: 0
                    },
                });
                //assign a mapping to that difficulty
                difficultyId = diff.id;
                //assign a mapping to that organization
                let mapping = (0, organizationToDifficultyMappingService_2.addNewOrgToDiffMapping)(orgId, difficultyId);
                return diff;
            }
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to add new difficulty by name ${name}, userId ${userId}: ${error}`);
            throw new Error(`Failed to add new difficulty by name ${name}, userId ${userId}: ${error}`);
        }
    });
}
exports.addNewDifficulty = addNewDifficulty;
/**
 * Checks if a difficulty already exists
 * @param name
 * name of the difficulty
 * @returns
 * Returns a boolean: True if exists, else false
 */
function doesDifficultyExist(name) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("You are inside doesDifficultyExist");
        let existingDifficultyList;
        try {
            existingDifficultyList = yield getDifficultyByName(name);
        }
        catch (err) {
            return false;
        }
        if (existingDifficultyList != null) {
            return true;
        }
        return false;
    });
}
exports.doesDifficultyExist = doesDifficultyExist;
/**
 * Checks if a organizationToDifficulty mapping already exists
 * @param orgId
 * id of the organization
 * @param diffId
 * id of the difficulty
 * @returns
 * Returns a boolean: True if exists, else false
 */
function doesDifficultyMappingExist(orgId, diffId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            var existingMappingList = yield (0, organizationToDifficultyMappingService_1.getMappingsByOrgId)(orgId);
            if (existingMappingList != null) {
                for (let i = 0; i < existingMappingList.length; i++) {
                    if (existingMappingList[i].difficultyId == diffId) {
                        return true;
                    }
                }
            }
            return false;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to check if difficulty mapping exists by organizationId ${orgId}, difficultyId ${diffId}: ${error}`);
            throw new Error(`Failed to check if difficulty mapping exists by organizationId ${orgId}, difficultyId ${diffId}: ${error}`);
        }
    });
}
exports.doesDifficultyMappingExist = doesDifficultyMappingExist;
/**
 * Usually isn't used when a difficulty is removed, since you would want to keep
 * the difficulty in the table but remove the OrgToDifficulty mapping.
 * This was created for testing purposes.
 * @param diffId
 * id of the difficulty
 * @returns
 * Returns the deleted difficulty
 */
function deleteDifficulty(diffId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let difficulty = yield client_1.default.difficulty.delete({
                where: {
                    id: diffId
                }
            });
            return difficulty;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to delete difficulty by id ${diffId}: ${error}`);
            throw new Error(`Failed to delete difficulty by id ${diffId}: ${error}`);
        }
    });
}
exports.deleteDifficulty = deleteDifficulty;
//# sourceMappingURL=difficultyService.js.map