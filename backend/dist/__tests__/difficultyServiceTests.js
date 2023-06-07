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
const difficultyService_1 = require("../src/Service/difficultyService");
const singleton_1 = require("../singleton");
const difficultyService_2 = require("../src/Service/difficultyService");
const difficultyService_3 = require("../src/Service/difficultyService");
const difficultyService_4 = require("../src/Service/difficultyService");
const difficultyService_5 = require("../src/Service/difficultyService");
const difficultyService_6 = require("../src/Service/difficultyService");
describe('Difficulty Tests', function () {
    test('creating a difficulty', () => __awaiter(this, void 0, void 0, function* () {
        const difficulty = {
            id: 1,
            name: "Test difficulty",
            isDefault: 0
        };
        singleton_1.prismaMock.difficulty.create.mockResolvedValue(difficulty);
        yield expect((0, difficultyService_1.addNewDifficulty)("Test difficulty", 1)).resolves.toEqual({
            id: 1,
            name: "Test difficulty",
            isDefault: 0
        });
    }));
    test('getting difficulties by orgId', () => __awaiter(this, void 0, void 0, function* () {
        const orgId = 1;
        const difficulty1 = {
            id: 1,
            name: 'Difficulty 1',
            isDefault: 0,
        };
        const difficulty2 = {
            id: 2,
            name: 'Difficulty 2',
            isDefault: 0,
        };
        const difficulties = [difficulty1, difficulty2];
        const organizationToDifficultyMappings = [
            { organizationId: orgId, difficultyId: 1 },
            { organizationId: orgId, difficultyId: 2 },
        ];
        singleton_1.prismaMock.$queryRaw.mockResolvedValue(difficulties);
        singleton_1.prismaMock.organizationToDifficultyMapping.findMany.mockResolvedValue(organizationToDifficultyMappings);
        const result = yield (0, difficultyService_2.getDifficultiesByOrgId)(orgId);
        expect(result).toEqual(difficulties);
    }));
    test('getting difficulties by userId', () => __awaiter(this, void 0, void 0, function* () {
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
        const difficulty1 = {
            id: 1,
            name: 'Test Difficulty 1',
            isDefault: 0
        };
        const difficulty2 = {
            id: 2,
            name: 'Test Difficulty 2',
            isDefault: 0
        };
        const userToOrganization = {
            userId: user.id,
            organizationId: organization.id
        };
        const orgToDiffMapping1 = {
            organizationId: organization.id,
            difficultyId: difficulty1.id
        };
        const orgToDiffMapping2 = {
            organizationId: organization.id,
            difficultyId: difficulty2.id
        };
        // Mock the database queries
        singleton_1.prismaMock.$queryRaw
            .mockResolvedValueOnce([difficulty1, difficulty2])
            .mockResolvedValueOnce([userToOrganization])
            .mockResolvedValueOnce([orgToDiffMapping1, orgToDiffMapping2]);
        // Call the function
        const difficulties = yield (0, difficultyService_3.getDifficultiesByUserId)(user.id);
        // Assert that the correct difficulties are returned
        expect(difficulties).toEqual(expect.arrayContaining([
            {
                id: difficulty1.id,
                name: difficulty1.name,
                isDefault: difficulty1.isDefault
            },
            {
                id: difficulty2.id,
                name: difficulty2.name,
                isDefault: difficulty2.isDefault
            }
        ]));
    }));
    test('get all difficulties', () => __awaiter(this, void 0, void 0, function* () {
        const difficulties = [
            { id: 1, name: 'Easy', isDefault: 1 },
            { id: 2, name: 'Medium', isDefault: 0 },
            { id: 3, name: 'Hard', isDefault: 0 },
        ];
        singleton_1.prismaMock.difficulty.findMany.mockResolvedValue(difficulties);
        const result = yield (0, difficultyService_4.getAllDifficulties)();
        expect(result).toEqual(difficulties);
    }));
    test('get difficulty by name', () => __awaiter(this, void 0, void 0, function* () {
        const difficulty = { id: 1, name: 'Test Difficulty', isDefault: 1 };
        singleton_1.prismaMock.difficulty.findUniqueOrThrow.mockResolvedValue(difficulty);
        const result = yield (0, difficultyService_1.getDifficultyByName)('Test Difficulty');
        expect(result).toEqual(difficulty);
    }));
    test('get difficulty by id', () => __awaiter(this, void 0, void 0, function* () {
        const difficulty = { id: 1, name: 'Easy', isDefault: 1 };
        singleton_1.prismaMock.difficulty.findUniqueOrThrow.mockResolvedValue(difficulty);
        const result = yield (0, difficultyService_5.getDifficultyById)(1);
        expect(result).toEqual(difficulty);
    }));
    test('get all default difficulties', () => __awaiter(this, void 0, void 0, function* () {
        const defaultDifficulties = [
            { id: 1, name: 'Easy', isDefault: 1 },
            { id: 2, name: 'Medium', isDefault: 1 },
            { id: 3, name: 'Hard', isDefault: 1 },
        ];
        // Mock the Prisma query
        singleton_1.prismaMock.difficulty.findMany.mockResolvedValue(defaultDifficulties);
        const result = yield (0, difficultyService_6.getDefaultDifficulties)();
        expect(result).toEqual(defaultDifficulties);
    }));
    // test('addNewDifficulty', async () => {
    //   const orgId = 1;
    //   const existingDifficulty = { id: 1, name: 'Easy', isDefault: 1 };
    //   const newDifficulty = { id: 2, name: 'Medium', isDefault: 0 };
    //   const existingMapping = { id: 1, organizationId: 1, difficultyId: 1 };
    //   const prismaMock = {
    //     difficulty: {
    //       findUnique: jest.fn(),
    //       findFirst: jest.fn(),
    //       findMany: jest.fn(),
    //       create: jest.fn(),
    //     },
    //     organizationToDifficulty: {
    //       findFirst: jest.fn(),
    //       create: jest.fn(),
    //     },
    //   };
    //   // scenario 1: the difficulty already exists and there is already a mapping from the organization to the difficulty
    //   prismaMock.difficulty.findUnique.mockResolvedValue(existingDifficulty);
    //   prismaMock.organizationToDifficulty.findFirst.mockResolvedValue(existingMapping);
    //   const result1 = await addNewDifficulty(existingDifficulty.name, orgId);
    //   expect(result1).toEqual(existingDifficulty);
    //   // scenario 2: the difficulty already exists and there is not already a mapping from the organization to the difficulty
    //   prismaMock.organizationToDifficulty.findFirst.mockResolvedValue(null);
    //   const result2 = await addNewDifficulty(existingDifficulty.name, orgId);
    //   expect(result2).toEqual(existingDifficulty);
    //   expect(prismaMock.organizationToDifficulty.create).toHaveBeenCalledTimes(1);
    //   expect(prismaMock.organizationToDifficulty.create).toHaveBeenCalledWith({
    //     data: {
    //       organizationId: orgId,
    //       difficultyId: existingDifficulty.id,
    //     },
    //   });
    //   // scenario 3: the difficulty doesn't already exist
    //   prismaMock.difficulty.findUnique.mockResolvedValue(null);
    //   prismaMock.difficulty.create.mockResolvedValue(newDifficulty);
    //   const result3 = await addNewDifficulty(newDifficulty.name, orgId);
    //   expect(result3).toEqual(newDifficulty);
    //   expect(prismaMock.difficulty.create).toHaveBeenCalledTimes(1);
    //   expect(prismaMock.difficulty.create).toHaveBeenCalledWith({
    //     data: {
    //       name: newDifficulty.name,
    //       isDefault: 0,
    //     },
    //   });
    //   expect(prismaMock.organizationToDifficulty.create).toHaveBeenCalledTimes(2);
    //   expect(prismaMock.organizationToDifficulty.create).toHaveBeenNthCalledWith(1, {
    //     data: {
    //       organizationId: orgId,
    //       difficultyId: existingDifficulty.id,
    //     },
    //   });
    //   expect(prismaMock.organizationToDifficulty.create).toHaveBeenNthCalledWith(2, {
    //     data: {
    //       organizationId: orgId,
    //       difficultyId: newDifficulty.id,
    //     },
    //   });
    // });
});
//# sourceMappingURL=difficultyServiceTests.js.map