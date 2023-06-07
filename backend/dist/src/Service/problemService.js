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
exports.removeProblem = exports.postProblem = exports.getProblemsAndCategoriesByUserId = exports.getProblemsByCategoryId = exports.getProblemsByUserId = exports.getProblemsByOrgId = exports.getAllProblems = exports.updateProblem = exports.getAllDefaultProblems = exports.getProblemById = void 0;
const categoryService_1 = require("./categoryService");
const organizationService_1 = require("./organizationService");
const categoryService_2 = require("./categoryService");
const completedProblemsService_1 = require("./completedProblemsService");
const client_1 = __importDefault(require("../../client"));
/**
 * Gets a problem by id
 * @param id
 * id of the problem
 * @returns
 * Returns the problem with the same id
 */
function getProblemById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let problem = yield client_1.default.problem.findUniqueOrThrow({
                where: {
                    id: id
                },
            });
            return problem;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to get problem by id ${id}: ${error}`);
            throw new Error(`Failed to get problem by id ${id}: ${error}`);
        }
    });
}
exports.getProblemById = getProblemById;
/**
 * Gets all default problems
 * @returns
 * Returns all default problems
 */
function getAllDefaultProblems() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let defaultProblems = yield client_1.default.problem.findMany({
                where: {
                    isDefault: 1
                },
            });
            return defaultProblems;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to get all default problems: ${error}`);
            throw new Error(`Failed to get all default problems: ${error}`);
        }
    });
}
exports.getAllDefaultProblems = getAllDefaultProblems;
/**
 * Updates a problem by id
 * @param updatedProblemInfo
 * updated problem
 * @returns
 * Returns the updated problem
 */
function updateProblem(updatedProblemInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let updatedProblem = yield client_1.default.problem.update({
                where: {
                    id: updatedProblemInfo.id
                },
                data: {
                    name: updatedProblemInfo.name,
                    linkUrl: updatedProblemInfo.linkUrl,
                    videoUrl: updatedProblemInfo.videoUrl,
                    difficultyId: updatedProblemInfo.difficultyId
                }
            });
            return updatedProblem;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to update problem: ${error}`);
            throw new Error(`Failed to update problem: ${error}`);
        }
    });
}
exports.updateProblem = updateProblem;
/**
 * Gets all problems
 * @returns
 * Returns all problems
 */
function getAllProblems() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let problems = yield client_1.default.problem.findMany();
            return problems;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to get all problems: ${error}`);
            throw new Error(`Failed to get all problems: ${error}`);
        }
    });
}
exports.getAllProblems = getAllProblems;
/**
 * Gets all problems in an organization by OrgID
 * @param orgId
 * id of the organization
 * @returns
 * Returns all problems in an organization by orgId
 */
function getProblemsByOrgId(orgId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const problems = yield client_1.default.$queryRaw `
        SELECT p.*
        FROM OrgToProbMapping opm
        JOIN Problem p ON p.id = opm.probId
        WHERE opm.organizationId = ${orgId};
      `;
            return problems;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to fetch problems for organizationId ${orgId}: ${error}`);
            throw new Error(`Failed to fetch problems for organizationId ${orgId}`);
        }
    });
}
exports.getProblemsByOrgId = getProblemsByOrgId;
/**
 * Gets problems in an organization by userID
 * @param userId
 * id of the user
 * @returns
 * Returns all problems in an organization by userId
 */
function getProblemsByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const problems = yield client_1.default.$queryRaw `
        SELECT p.*
        FROM Problem p
        JOIN OrgToProbMapping opm ON p.id = opm.probId
        JOIN UserToOrganization uto ON uto.organizationId = opm.organizationId
        WHERE uto.userId = ${userId};
      `;
            return problems;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to fetch problems for userId ${userId}: ${error}`);
            throw new Error(`Failed to fetch problems for userId ${userId}`);
        }
    });
}
exports.getProblemsByUserId = getProblemsByUserId;
/**
 * Gets all problems in a category by categoryId
 * @param categoryid
 * id of the category
 * @returns
 * Returns all problems in a category
 */
function getProblemsByCategoryId(catId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const problems = yield client_1.default.$queryRaw `
        SELECT p.*
        FROM Problem p
        JOIN ProblemToCategory ptc ON ptc.problemId = p.id
        WHERE ptc.categoryId = ${catId};
      `;
            return problems;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to fetch problems for categoryId ${catId}: ${error}`);
            throw new Error(`Failed to fetch problems for categoryId ${catId}`);
        }
    });
}
exports.getProblemsByCategoryId = getProblemsByCategoryId;
function getProblemsAndCategoriesByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // array of problems and categories to return
            const problemsAndCategories = [];
            // get the categories for the user
            const categories = yield (0, categoryService_2.getCategoriesByUserId)(userId);
            // get all problems that have been completed by the user
            const completedProblems = yield (0, completedProblemsService_1.getCompletedProblemsByUserId)(userId);
            for (let i = 0; i < categories.length; i++) {
                // for each category, get the problems and their difficulty in that category
                const problems = yield client_1.default.$queryRaw `
                SELECT p.id as 'problemId', p.name as 'problemName', d.name as 'difficulty'
                FROM Problem p, Difficulty d, ProblemToCategory ptc
                WHERE ptc.problemId = p.id and ptc.categoryId = ${categories[i].id} and p.difficultyId = d.id;
            `;
                // array that will be pushed to and added in 'problems' in problemsAndCategories
                let problemsArrToAdd = [];
                for (let j = 0; j < problems.length; j++) {
                    // check if the user has completed problems[j]
                    let checkCompleted = 0;
                    let findCompleted = completedProblems.filter(prob => (prob.problemId === problems[j].problemId && prob.userId === userId));
                    let tempTimestamp = "";
                    // if the user completed problems[j], findCompleted array length is >0
                    if (findCompleted.length > 0) {
                        checkCompleted = 1;
                        tempTimestamp = findCompleted[0].timestamp;
                    }
                    // completedTimestamp is "" if the problem hasn't been completed, else it's a valid timestamp
                    problemsArrToAdd.push({
                        problemId: problems[j].problemId,
                        problemName: problems[j].problemName,
                        difficulty: problems[j].difficulty,
                        isCompleted: checkCompleted,
                        completedTimestamp: checkCompleted === 1 ? tempTimestamp : ""
                    });
                }
                problemsAndCategories.push({
                    categoryId: categories[i].id,
                    categoryName: categories[i].name,
                    problems: problemsArrToAdd
                });
            }
            return problemsAndCategories;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to fetch problems and categories for userId ${userId}: ${error}`);
            throw new Error(`Failed to fetch problems and categories for userId ${userId}: ${error}`);
        }
    });
}
exports.getProblemsAndCategoriesByUserId = getProblemsAndCategoriesByUserId;
/**
 * Creates a problem, problemToCategory mapping, and organizationToProblem mapping
 * @param userId
 * id of the user creating the problem
 * @param catId
 * id of the category the problem will be in
 * @param prob
 * the problem being created
 * @returns
 * Returns the created problem
 */
function postProblem(userId, catId, prob) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let organization = yield (0, organizationService_1.getOrganizationByUserId)(userId);
            let orgId = Number(organization.id);
            //add the new problem
            let problem = yield client_1.default.problem.create({
                data: {
                    name: prob.name,
                    linkUrl: prob.linkUrl,
                    videoUrl: prob.videoUrl,
                    difficultyId: prob.difficultyId,
                    isDefault: 0
                },
            });
            let newProbId = problem.id;
            //make a new mapping from problem to category
            let probToCatMapping = yield client_1.default.problemToCategory.create({
                data: {
                    problemId: newProbId,
                    categoryId: catId
                },
            });
            //make a new mapping from org to problem
            let orgToProbMapping = yield client_1.default.orgToProbMapping.create({
                data: {
                    organizationId: orgId,
                    probId: newProbId
                },
            });
            return problem;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to post problem by userId ${userId}, categoryId ${catId}: ${error}`);
            throw new Error(`Failed to post problem by userId ${userId}, categoryId ${catId}: ${error}`);
        }
    });
}
exports.postProblem = postProblem;
/**
 * Removes a problem from problemToCategory and organizationToProblem
 * @param userId
 * id of the user deleting the problem
 * @param probId
 * id of the problem being removed
 * @returns
 * The removed organizationToProblem mapping
 */
function removeProblem(userId, probId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //find the organization for the user
            const organization = yield (0, organizationService_1.getOrganizationByUserId)(userId);
            const orgId = organization.id;
            let category = yield (0, categoryService_1.getCategoryByProbId)(probId);
            let catId = category.id;
            //remove catToProbMapping
            let catToProbMapping = yield client_1.default.problemToCategory.delete({
                where: {
                    problemId_categoryId: {
                        problemId: probId,
                        categoryId: catId
                    }
                }
            });
            //remove orgToProbMapping
            let orgToProbMapping = yield client_1.default.orgToProbMapping.delete({
                where: {
                    organizationId_probId: {
                        organizationId: orgId,
                        probId: probId
                    }
                }
            });
            //remove Problem
            let problem = yield client_1.default.problem.delete({
                where: {
                    id: probId
                }
            });
            return problem;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to remove problem for userId ${userId}, probId ${probId}: ${error}`);
            throw new Error(`Failed to remove problem for userId ${userId}, probId ${probId}: ${error}`);
        }
    });
}
exports.removeProblem = removeProblem;
//# sourceMappingURL=problemService.js.map