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
const teamService_1 = require("../src/Service/teamService");
describe('Team service tests', function () {
    test('Getting a team', () => __awaiter(this, void 0, void 0, function* () {
        const team = {
            id: 1,
            name: "Test team"
        };
        singleton_1.prismaMock.team.findUniqueOrThrow.mockResolvedValue(team);
        yield expect((0, teamService_1.getTeamById)(1)).resolves.toEqual({
            id: 1,
            name: "Test team"
        });
    }));
});
//# sourceMappingURL=teamServiceTests.t.js.map