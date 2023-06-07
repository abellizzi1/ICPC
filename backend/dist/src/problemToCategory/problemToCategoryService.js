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
exports.deleteProblemToCategory = exports.postProblemToCategory = exports.getProblemToCategory = exports.getAllProblemToCategory = void 0;
const client_1 = __importDefault(require("../../client"));
/**
 * Get all problemToCategory mappings
 * @returns
 * Returns all problemToCategory mappings
 */
function getAllProblemToCategory() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let allProblemToCategory = yield client_1.default.problemToCategory.findMany();
            return allProblemToCategory;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to get all problemToCategory mappings: ${error}`);
            throw new Error(`Failed to get all problemToCategory mappings: ${error}`);
        }
    });
}
exports.getAllProblemToCategory = getAllProblemToCategory;
/**
 * Get problemToCategory mapping by problemID and categoryID
 * @param problemid
 * id of the problem
 * @param categoryid
 * id of the category
 * @returns
 * Returns a problemToCategory mapping with a matching problemID and categoryID
 */
function getProblemToCategory(problemid, categoryid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let problemToCategory = yield client_1.default.problemToCategory.findUniqueOrThrow({
                where: {
                    problemId_categoryId: {
                        problemId: problemid,
                        categoryId: categoryid
                    }
                }
            });
            return problemToCategory;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to get problemToCategory mapping by problemId ${problemid}, categoryId ${categoryid}: ${error}`);
            throw new Error(`Failed to get problemToCategory mapping by problemId ${problemid}, categoryId ${categoryid}: ${error}`);
        }
    });
}
exports.getProblemToCategory = getProblemToCategory;
/**
 * Posts a problemToCategory mapping
 * @param problemid
 * id of the problem
 * @param categoryid
 * id of the category
 * @returns
 * Returns the created mapping
 */
function postProblemToCategory(problemid, categoryid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let problemToCategory = yield client_1.default.problemToCategory.create({
                data: {
                    problemId: problemid,
                    categoryId: categoryid
                }
            });
            return problemToCategory;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to post problemToCategory mapping by problemId ${problemid}, categoryId ${categoryid}: ${error}`);
            throw new Error(`Failed to post problemToCategory mapping by problemId ${problemid}, categoryId ${categoryid}: ${error}`);
        }
    });
}
exports.postProblemToCategory = postProblemToCategory;
/**
 * Deletes a mapping
 * @param problemid
 * id of the problem
 * @param categoryid
 * id of the category
 * @returns
 * Returns the deleted mapping
 */
function deleteProblemToCategory(problemid, categoryid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let problemToCategory = yield client_1.default.problemToCategory.delete({
                where: {
                    problemId_categoryId: {
                        problemId: problemid,
                        categoryId: categoryid
                    }
                }
            });
            return problemToCategory;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to delete problemToCategory mapping by problemId ${problemid}, categoryId ${categoryid}: ${error}`);
            throw new Error(`Failed to delete problemToCategory mapping by problemId ${problemid}, categoryId ${categoryid}: ${error}`);
        }
    });
}
exports.deleteProblemToCategory = deleteProblemToCategory;
//# sourceMappingURL=problemToCategoryService.js.map