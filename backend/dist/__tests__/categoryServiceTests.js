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
const singleton_1 = require("../singleton");
const categoryService_1 = require("../src/Service/categoryService");
const categoryService_2 = require("../src/Service/categoryService");
const categoryService_3 = require("../src/Service/categoryService");
const categoryService_4 = require("../src/Service/categoryService");
const categoryService_5 = require("../src/Service/categoryService");
const categoryService_6 = require("../src/Service/categoryService");
describe('Category Tests', function () {
    test('get category by id', () => __awaiter(this, void 0, void 0, function* () {
        const cat = {
            id: 1,
            name: "Test category",
            isDefault: 1
        };
        singleton_1.prismaMock.category.findUniqueOrThrow.mockResolvedValue(cat);
        yield expect((0, categoryService_1.getCategoryById)(1)).resolves.toEqual({
            id: 1,
            name: "Test category",
            isDefault: 1
        });
    }));
    test('get default categories', () => __awaiter(this, void 0, void 0, function* () {
        const defaultCategories = [
            {
                id: 1,
                name: 'Default Category 1',
                isDefault: 1
            },
            {
                id: 2,
                name: 'Default Category 2',
                isDefault: 1
            }
        ];
        singleton_1.prismaMock.category.findMany.mockResolvedValue(defaultCategories);
        yield expect((0, categoryService_2.getDefaultCategories)()).resolves.toEqual(defaultCategories);
    }));
    test("get all categories", () => __awaiter(this, void 0, void 0, function* () {
        const categories = [
            {
                id: 1,
                name: "Category 1",
                isDefault: 0,
            },
            {
                id: 2,
                name: "Category 2",
                isDefault: 0,
            },
        ];
        singleton_1.prismaMock.category.findMany.mockResolvedValue(categories);
        yield expect((0, categoryService_3.getAllCategories)()).resolves.toEqual(categories);
    }));
    test('get categories by orgId', () => __awaiter(this, void 0, void 0, function* () {
        const orgId = 1;
        const category1 = {
            id: 1,
            name: 'Category 1',
            isDefault: 0,
        };
        const category2 = {
            id: 2,
            name: 'Category 2',
            isDefault: 0,
        };
        const categories = [category1, category2];
        const organizationToCategoryMappings = [
            { organizationId: orgId, categoryId: 1 },
            { organizationId: orgId, categoryId: 2 },
        ];
        singleton_1.prismaMock.$queryRaw.mockResolvedValue(categories);
        singleton_1.prismaMock.orgToCategoryMapping.findMany.mockResolvedValue(organizationToCategoryMappings);
        const result = yield (0, categoryService_4.getCategoriesByOrgId)(orgId);
        expect(result).toEqual(categories);
    }));
    test('get categories by userId', () => __awaiter(this, void 0, void 0, function* () {
        const user = {
            id: 1,
            firstName: 'Test',
            lastName: 'User',
            email: 'testuser@example.com',
            password: 'password',
            phone: '123-456-7890',
            isAdmin: 0,
            isHeadCoach: 0,
            isAssistantCoach: 0,
            isCoach: 1,
            isMentor: 0,
            isStudent: 1,
            isActive: 1,
            leetcodeUsername: null,
            codeforcesUsername: null,
            uhuntId: null
        };
        const organization = {
            id: 1,
            name: 'Test Organization'
        };
        const category1 = {
            id: 1,
            name: 'Test Category 1',
            isDefault: 0
        };
        const category2 = {
            id: 2,
            name: 'Test Category 2',
            isDefault: 0
        };
        const userToOrganization = {
            userId: user.id,
            organizationId: organization.id
        };
        const orgToCatMapping1 = {
            organizationId: organization.id,
            categoryId: category1.id
        };
        const orgToCatMapping2 = {
            organizationId: organization.id,
            categoryId: category2.id
        };
        // Mock the database queries
        singleton_1.prismaMock.$queryRaw
            .mockResolvedValueOnce([category1, category2])
            .mockResolvedValueOnce([userToOrganization])
            .mockResolvedValueOnce([orgToCatMapping1, orgToCatMapping2]);
        // Call the function
        const categories = yield (0, categoryService_5.getCategoriesByUserId)(user.id);
        // Assert that the correct categories are returned
        expect(categories).toEqual(expect.arrayContaining([
            {
                id: category1.id,
                name: category1.name,
                isDefault: category1.isDefault
            },
            {
                id: category2.id,
                name: category2.name,
                isDefault: category2.isDefault
            }
        ]));
    }));
    test('get category by problem id', () => __awaiter(this, void 0, void 0, function* () {
        const probId = 1;
        const category = {
            id: 1,
            name: 'Category 1',
            isDefault: 1
        };
        const problemToCategory = {
            problemId: probId,
            categoryId: category.id
        };
        // Mock the database queries
        singleton_1.prismaMock.$queryRaw
            .mockResolvedValueOnce([category])
            .mockResolvedValueOnce([problemToCategory]);
        // Call the function
        const result = yield (0, categoryService_6.getCategoryByProbId)(probId);
        // Assert that the correct category is returned
        expect(result).toEqual(category);
    }));
});
//# sourceMappingURL=categoryServiceTests.js.map