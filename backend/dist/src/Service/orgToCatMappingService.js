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
exports.addAllDefaultCatToOrg = exports.removeOrgToCatMapping = exports.getAllOrgToCatMappings = void 0;
const organizationService_1 = require("./organizationService");
const categoryService_1 = require("./categoryService");
const client_1 = __importDefault(require("../../client"));
/**
 * Get all organizationToCategory mappings
 * @returns
 * Returns all organizationToCategory mappings
 */
function getAllOrgToCatMappings() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let mappings = yield client_1.default.orgToCategoryMapping.findMany();
            return mappings;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to get all organizationToCategory mappings: ${error}`);
            throw new Error(`Failed to get all organizationToCategory mappings: ${error}`);
        }
    });
}
exports.getAllOrgToCatMappings = getAllOrgToCatMappings;
/**
 * Removes an organizationToCategory mapping by userID and categoryID
 * @param userId
 * id of the user removing the mapping
 * @param catId
 * id of the category
 * @returns
 * Returns the removed mapping
 */
function removeOrgToCatMapping(userId, catId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let organization = yield (0, organizationService_1.getOrganizationByUserId)(userId);
            let orgId = organization.id;
            let mapping;
            mapping = yield client_1.default.orgToCategoryMapping.delete({
                where: {
                    organizationId_categoryId: {
                        organizationId: orgId,
                        categoryId: catId
                    }
                }
            });
            return mapping;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to remove organizationToCategory mapping by userId ${userId}, categoryId ${catId}: ${error}`);
            throw new Error(`Failed to remove organizationToCategory mapping by userId ${userId}, categoryId ${catId}: ${error}`);
        }
    });
}
exports.removeOrgToCatMapping = removeOrgToCatMapping;
/**
 * Adds all default organizationToCategory mappings
 * @param orgId
 * id of the organization
 * @returns
 * Returns the added mappings
 */
function addAllDefaultCatToOrg(orgId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let mappings = [];
            let defaultCategories = yield (0, categoryService_1.getDefaultCategories)();
            for (let i = 0; i < defaultCategories.length; i++) {
                try {
                    let mapping = yield client_1.default.orgToCategoryMapping.create({
                        data: {
                            organizationId: orgId,
                            categoryId: defaultCategories[i].id
                        }
                    });
                    mappings.push(mapping);
                }
                catch (err) {
                    return err;
                }
            }
            return mappings;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to add all default categories to organization by organizationId ${orgId}: ${error}`);
            throw new Error(`Failed to add all default categories to organization by organizationId ${orgId}: ${error}`);
        }
    });
}
exports.addAllDefaultCatToOrg = addAllDefaultCatToOrg;
//# sourceMappingURL=orgToCatMappingService.js.map