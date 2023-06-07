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
Object.defineProperty(exports, "__esModule", { value: true });
const nc150_1 = require("./nc150");
function seedDefaultProblems(prisma) {
    return __awaiter(this, void 0, void 0, function* () {
        const isDefault = 1; // database needs 1 for true value
        const difficultyToIndex = new Map();
        // add difficulties
        for (let name of ['easy', 'medium', 'hard']) {
            let d = yield prisma.difficulty.upsert({
                where: { name },
                update: {},
                create: { name, isDefault }
            });
            difficultyToIndex.set(d.name, d.id);
        }
        // add categories
        for (let i = 0; i < nc150_1.categories.length; i++) {
            let name = nc150_1.categories[i];
            let id = i + 1; // offset by 1 since MySQL doesn't allow 0 values for keys
            yield prisma.category.upsert({
                where: { id },
                update: {},
                create: { name, isDefault }
            });
        }
        // add problems
        for (let i = 0; i < nc150_1.problems.length; i++) {
            let p = nc150_1.problems[i];
            const problemId = i + 1; // offset by 1 since MySQL doesn't allow 0
            let categoryId = p[0] + 1; // Add 1: MySql is 1 indexed (0 not valid index)
            let problem = {
                id: problemId,
                isDefault,
                difficultyId: difficultyToIndex.get(p[1]),
                name: p[2],
                linkUrl: p[3],
                videoUrl: p[4],
            };
            yield prisma.problem.upsert({
                where: {
                    id: problem.id,
                },
                update: {},
                create: problem
            });
            // add relational mapping from problem to its category
            let mapping = {
                problemId,
                categoryId
            };
            yield prisma.problemToCategory.upsert({
                where: {
                    problemId_categoryId: {
                        problemId,
                        categoryId
                    }
                },
                update: {},
                create: mapping,
            });
        }
    });
}
exports.default = seedDefaultProblems;
//# sourceMappingURL=defaultProblems.js.map