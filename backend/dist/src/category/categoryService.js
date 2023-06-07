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
exports.postCategory = exports.getCategoryByProbId = exports.getCategoriesByUserId = exports.getCategoriesByOrgId = exports.getAllCategories = exports.getDefaultCategories = exports.getCategoryById = void 0;
const organizationService_1 = require("../organization/organizationService");
const client_1 = __importDefault(require("../../client"));
/**
 * Gets a category by id
 * @param id
 * id of the category
 * @returns
 * Returns the category with the matching id
 */
function getCategoryById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let category = yield client_1.default.category.findUniqueOrThrow({
                where: {
                    id: id
                },
            });
            return category;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to fetch categories for Id ${id}: ${error}`);
            throw new Error(`Failed to fetch categories for Id ${id}: ${error}`);
        }
    });
}
exports.getCategoryById = getCategoryById;
/**
 * Gets all default categories
 * @param: none
 * @return: all default categories
 */
function getDefaultCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let defaultCategoryList = yield client_1.default.category.findMany({
                where: {
                    isDefault: 1
                },
            });
            return defaultCategoryList;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to fetch default categories: ${error}`);
            throw new Error(`Failed to fetch default categories: ${error}`);
        }
    });
}
exports.getDefaultCategories = getDefaultCategories;
/**
 * Gets all categories
 * @returns
 * Returns all categories
 */
function getAllCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let categoryList = yield client_1.default.category.findMany({});
            return categoryList;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to fetch all categories: ${error}`);
            throw new Error(`Failed to fetch all categories: ${error}`);
        }
    });
}
exports.getAllCategories = getAllCategories;
/**
 * Gets all categories in an organization by orgID
 * @param orgId
 * id of the organization
 * @returns
 * Returns all categories in the organization
 */
function getCategoriesByOrgId(orgId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categories = yield client_1.default.$queryRaw `
        SELECT category.id, category.name, category.isDefault
        FROM Category
        JOIN OrgToCategoryMapping ON category.id = OrgToCategoryMapping.categoryId
        WHERE OrgToCategoryMapping.organizationId = ${orgId};
      `;
            return categories;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to fetch categories for organizationId ${orgId}: ${error}`);
            throw new Error(`Failed to fetch categories for organizationId ${orgId}`);
        }
    });
}
exports.getCategoriesByOrgId = getCategoriesByOrgId;
/**
 * Gets all categories in an organization by userID
 * @param userId
 * id of the user
 * @returns
 * Returns all categories in the user's organization
 */
function getCategoriesByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categories = yield client_1.default.$queryRaw `
        SELECT c.*
        FROM Category c
        INNER JOIN OrgToCategoryMapping ocm ON c.id = ocm.categoryId
        INNER JOIN UserToOrganization uto ON ocm.organizationId = uto.organizationId
        WHERE uto.userId = ${userId};
      `;
            return categories;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to fetch categories for userId ${userId}: ${error}`);
            throw new Error(`Failed to fetch categories for userId ${userId}`);
        }
    });
}
exports.getCategoriesByUserId = getCategoriesByUserId;
/**
* Get category by Problem Id
* @param probId
* id of the problem
* @returns
* Returns category associated with a particular problem
*/
function getCategoryByProbId(probId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const category = yield client_1.default.$queryRaw `
    SELECT c.*
    FROM Category c
    JOIN ProblemToCategory ptc ON ptc.categoryId = c.id
    WHERE ptc.problemId = ${probId}
    LIMIT 1;
    `;
            //the above query will return an array of elements
            //so we choose the first element of the array.
            return category[0];
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to fetch category for probId ${probId}: ${error}`);
            throw new Error(`Failed to fetch category for probId ${probId}`);
        }
    });
}
exports.getCategoryByProbId = getCategoryByProbId;
/**
 * Create a category. Add an organizationToCategory mapping.
 * @param userId
 * id of the user creating the category
 * @param categoryName
 * name of the new category
 * @returns
 * Returns the created category
 */
function postCategory(userId, categoryName) {
    return __awaiter(this, void 0, void 0, function* () {
        // default error 
        try {
            let organization = yield (0, organizationService_1.getOrganizationByUserId)(userId);
            let orgId = Number(organization.id);
            //make a new category
            let category = yield client_1.default.category.create({
                data: {
                    name: categoryName,
                    isDefault: 0
                },
            });
            let catId = category.id;
            //make a new mapping from org to category
            let mapping = yield client_1.default.orgToCategoryMapping.create({
                data: {
                    organizationId: orgId,
                    categoryId: catId
                },
            });
            return category;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to post category for userId ${userId}, categoryName ${categoryName}: ${error}`);
            throw new Error(`Failed to post category for userId ${userId}, categoryName ${categoryName}: ${error}`);
        }
    });
}
exports.postCategory = postCategory;
//# sourceMappingURL=categoryService.js.map