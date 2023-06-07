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
exports.removeOrgToDiffMapping = exports.addNewOrgToDiffMapping = exports.getMappingsByDiffId = exports.getMappingsByOrgId = exports.getAllOrgToDifficulty = void 0;
const organizationService_1 = require("./organizationService");
const client_1 = __importDefault(require("../../client"));
/**
 * Get all organizationToDifficulty mappings
 * @returns
 * Returns all organizationToDifficulty mappings
 */
function getAllOrgToDifficulty() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let mappings = yield client_1.default.organizationToDifficultyMapping.findMany();
            return mappings;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to fetch allOrgToDifficulty: ${error}`);
            throw new Error(`Failed to fetch allOrgToDifficulty: ${error}`);
        }
    });
}
exports.getAllOrgToDifficulty = getAllOrgToDifficulty;
/**
 * Get all mappings by orgID
 * @param id
 * id of the organization
 * @returns
 * Returns all mappings with the same orgID
 */
function getMappingsByOrgId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let mappings = yield client_1.default.organizationToDifficultyMapping.findMany({
                where: {
                    organizationId: id
                },
            });
            return mappings;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to fetch orgToDifficulty mappings by organizationId ${id}: ${error}`);
            throw new Error(`Failed to fetch orgToDifficulty mappings by organizationId ${id}: ${error}`);
        }
    });
}
exports.getMappingsByOrgId = getMappingsByOrgId;
/**
 * Get all mappings by difficulty id
 * @param id
 * id of the difficulty
 * @returns
 * Returns all mappings with the same difficulty id
 */
function getMappingsByDiffId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let mappings = yield client_1.default.organizationToDifficultyMapping.findMany({
                where: {
                    difficultyId: id
                },
            });
            return mappings;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to fetch orgToDifficulty mappings by difficultyId ${id}: ${error}`);
            throw new Error(`Failed to fetch orgToDifficulty mappings by difficultyId ${id}: ${error}`);
        }
    });
}
exports.getMappingsByDiffId = getMappingsByDiffId;
/**
 * Creates a new organizationToDifficulty mapping
 * @param orgId
 * id of the organization
 * @param diffId
 * id of the difficulty
 * @returns
 * Returns the created mapping
 */
function addNewOrgToDiffMapping(orgId, diffId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let mapping = yield client_1.default.organizationToDifficultyMapping.create({
                data: {
                    organizationId: orgId,
                    difficultyId: diffId
                },
            });
            return mapping;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to add new orgToDifficulty mapping by organizationId ${orgId}, difficultyId ${diffId}: ${error}`);
            throw new Error(`Failed to add new orgToDifficulty mapping by organizationId ${orgId}, difficultyId ${diffId}: ${error}`);
        }
    });
}
exports.addNewOrgToDiffMapping = addNewOrgToDiffMapping;
/**
 * Deletes a mapping
 * @param orgId
 * id of the organization
 * @param diffId
 * id of the difficulty
 * @returns
 * Returns the deleted mapping
 */
function removeOrgToDiffMapping(userId, diffId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let organization = yield (0, organizationService_1.getOrganizationByUserId)(userId);
            let orgId = Number(organization.id);
            let mapping = yield client_1.default.organizationToDifficultyMapping.delete({
                where: {
                    organizationId_difficultyId: {
                        organizationId: orgId,
                        difficultyId: diffId
                    }
                }
            });
            return mapping;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to delete orgToDifficulty mapping by userId ${userId}, difficultyId ${diffId}: ${error}`);
            throw new Error(`Failed to delete orgToDifficulty mapping by userId ${userId}, difficultyId ${diffId}: ${error}`);
        }
    });
}
exports.removeOrgToDiffMapping = removeOrgToDiffMapping;
//# sourceMappingURL=organizationToDifficultyMappingService.js.map