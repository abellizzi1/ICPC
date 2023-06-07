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
const userToTeamService_1 = require("../src/Service/userToTeamService");
describe('UserToTeam service tests', function () {
    test('Getting all UserToTeam mappings', () => __awaiter(this, void 0, void 0, function* () {
        const userToTeam = {
            userId: 1,
            teamId: 1
        };
        singleton_1.prismaMock.userToTeam.findMany.mockResolvedValue([userToTeam]);
        yield expect((0, userToTeamService_1.getAllUserToTeam)()).resolves.toEqual([{
                userId: 1,
                teamId: 1
            }]);
    }));
    test('Getting a specific UserToTeam mapping', () => __awaiter(this, void 0, void 0, function* () {
        const userToTeam = {
            userId: 1,
            teamId: 1
        };
        singleton_1.prismaMock.userToTeam.findUniqueOrThrow.mockResolvedValue(userToTeam);
        yield expect((0, userToTeamService_1.getUserToTeam)(1, 1)).resolves.toEqual({
            userId: 1,
            teamId: 1
        });
    }));
    test('Getting UserToTeam mappings by User id', () => __awaiter(this, void 0, void 0, function* () {
        const userToTeam = {
            userId: 1,
            teamId: 1
        };
        singleton_1.prismaMock.userToTeam.findMany.mockResolvedValue([userToTeam]);
        yield expect((0, userToTeamService_1.getUserToTeamByUserId)(1)).resolves.toEqual([{
                userId: 1,
                teamId: 1
            }]);
    }));
    test('Getting UserToTeam mappings by Team id', () => __awaiter(this, void 0, void 0, function* () {
        const userToTeam = {
            userId: 1,
            teamId: 1
        };
        singleton_1.prismaMock.userToTeam.findMany.mockResolvedValue([userToTeam]);
        yield expect((0, userToTeamService_1.getUserToTeamByTeamId)(1)).resolves.toEqual([{
                userId: 1,
                teamId: 1
            }]);
    }));
    test('Deleting a UserToTeam mapping', () => __awaiter(this, void 0, void 0, function* () {
        const userToTeam = {
            userId: 1,
            teamId: 1
        };
        singleton_1.prismaMock.userToTeam.delete.mockResolvedValue(userToTeam);
        yield expect((0, userToTeamService_1.deleteUserToTeam)(1, 1)).resolves.toEqual({
            userId: 1,
            teamId: 1
        });
    }));
});
//# sourceMappingURL=userToTeamServiceTests.t.js.map