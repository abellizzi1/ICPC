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
const userService_1 = require("../src/Service/userService");
describe('User service tests', function () {
    const testUser = {
        id: 1,
        firstName: "Test",
        lastName: "Test",
        email: "test@email.com",
        phone: "555-555-5555",
        isAdmin: 0,
        isHeadCoach: 0,
        isAssistantCoach: 0,
        isCoach: 0,
        isMentor: 0,
        isStudent: 1,
        isActive: 1,
        leetcodeUsername: "test",
        codeforcesUsername: "test",
        uhuntId: 0
    };
    test('Getting a user by email', () => __awaiter(this, void 0, void 0, function* () {
        const user = testUser;
        singleton_1.prismaMock.user.findUniqueOrThrow.mockResolvedValue(user);
        yield expect((0, userService_1.getUserByEmail)("test@email.com")).resolves.toEqual({
            id: 1,
            firstName: "Test",
            lastName: "Test",
            email: "test@email.com",
            phone: "555-555-5555",
            isAdmin: 0,
            isHeadCoach: 0,
            isAssistantCoach: 0,
            isCoach: 0,
            isMentor: 0,
            isStudent: 1,
            isActive: 1,
            leetcodeUsername: "test",
            codeforcesUsername: "test",
            uhuntId: 0
        });
    }));
    test('Getting a user by id', () => __awaiter(this, void 0, void 0, function* () {
        const user = testUser;
        singleton_1.prismaMock.user.findUniqueOrThrow.mockResolvedValue(user);
        yield expect((0, userService_1.getUserById)(1)).resolves.toEqual({
            id: 1,
            firstName: "Test",
            lastName: "Test",
            email: "test@email.com",
            phone: "555-555-5555",
            isAdmin: 0,
            isHeadCoach: 0,
            isAssistantCoach: 0,
            isCoach: 0,
            isMentor: 0,
            isStudent: 1,
            isActive: 1,
            leetcodeUsername: "test",
            codeforcesUsername: "test",
            uhuntId: 0
        });
    }));
    test('Getting all users', () => __awaiter(this, void 0, void 0, function* () {
        const user = testUser;
        singleton_1.prismaMock.user.findMany.mockResolvedValue([user]);
        yield expect((0, userService_1.getAllUsers)()).resolves.toEqual([{
                id: 1,
                firstName: "Test",
                lastName: "Test",
                email: "test@email.com",
                phone: "555-555-5555",
                isAdmin: 0,
                isHeadCoach: 0,
                isAssistantCoach: 0,
                isCoach: 0,
                isMentor: 0,
                isStudent: 1,
                isActive: 1,
                leetcodeUsername: "test",
                codeforcesUsername: "test",
                uhuntId: 0
            }]);
    }));
    test('Updating leetcode username by email', () => __awaiter(this, void 0, void 0, function* () {
        const user = testUser;
        singleton_1.prismaMock.user.update.mockResolvedValue(user);
        yield expect((0, userService_1.updateLeetcodeUserByEmail)("test@email.com", "test")).resolves.toEqual({
            id: 1,
            firstName: "Test",
            lastName: "Test",
            email: "test@email.com",
            phone: "555-555-5555",
            isAdmin: 0,
            isHeadCoach: 0,
            isAssistantCoach: 0,
            isCoach: 0,
            isMentor: 0,
            isStudent: 1,
            isActive: 1,
            leetcodeUsername: "test",
            codeforcesUsername: "test",
            uhuntId: 0
        });
    }));
    test('Updating codeforces username by email', () => __awaiter(this, void 0, void 0, function* () {
        const user = testUser;
        singleton_1.prismaMock.user.update.mockResolvedValue(user);
        yield expect((0, userService_1.updateCodeforcesUserByEmail)("test@email.com", "test")).resolves.toEqual({
            id: 1,
            firstName: "Test",
            lastName: "Test",
            email: "test@email.com",
            phone: "555-555-5555",
            isAdmin: 0,
            isHeadCoach: 0,
            isAssistantCoach: 0,
            isCoach: 0,
            isMentor: 0,
            isStudent: 1,
            isActive: 1,
            leetcodeUsername: "test",
            codeforcesUsername: "test",
            uhuntId: 0
        });
    }));
    test('Updating Uhunt id by email', () => __awaiter(this, void 0, void 0, function* () {
        const user = testUser;
        singleton_1.prismaMock.user.update.mockResolvedValue(user);
        yield expect((0, userService_1.updateUhuntUserByEmail)("test@email.com", 0)).resolves.toEqual({
            id: 1,
            firstName: "Test",
            lastName: "Test",
            email: "test@email.com",
            phone: "555-555-5555",
            isAdmin: 0,
            isHeadCoach: 0,
            isAssistantCoach: 0,
            isCoach: 0,
            isMentor: 0,
            isStudent: 1,
            isActive: 1,
            leetcodeUsername: "test",
            codeforcesUsername: "test",
            uhuntId: 0
        });
    }));
    test('Deactivate user by user id', () => __awaiter(this, void 0, void 0, function* () {
        const user = testUser;
        user.isActive = 0;
        singleton_1.prismaMock.user.update.mockResolvedValue(user);
        yield expect((0, userService_1.deactivateUserByUserId)(1)).resolves.toEqual({
            id: 1,
            firstName: "Test",
            lastName: "Test",
            email: "test@email.com",
            phone: "555-555-5555",
            isAdmin: 0,
            isHeadCoach: 0,
            isAssistantCoach: 0,
            isCoach: 0,
            isMentor: 0,
            isStudent: 1,
            isActive: 0,
            leetcodeUsername: "test",
            codeforcesUsername: "test",
            uhuntId: 0
        });
    }));
});
//# sourceMappingURL=userServiceTests.t.js.map