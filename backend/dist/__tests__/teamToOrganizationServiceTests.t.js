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
const teamToOrganizationService_1 = require("../src/Service/teamToOrganizationService");
describe('TeamToOrganization service tests', function () {
    test('Getting all TeamToOrganization mappings', () => __awaiter(this, void 0, void 0, function* () {
        const teamToOrganization = {
            teamId: 1,
            organizationId: 1
        };
        singleton_1.prismaMock.teamToOrganization.findMany.mockResolvedValue([teamToOrganization]);
        yield expect((0, teamToOrganizationService_1.getAllTeamToOrganization)()).resolves.toEqual([{
                teamId: 1,
                organizationId: 1
            }]);
    }));
    test('Getting a specific TeamToOrganization mapping', () => __awaiter(this, void 0, void 0, function* () {
        const teamToOrganization = {
            teamId: 1,
            organizationId: 1
        };
        singleton_1.prismaMock.teamToOrganization.findUniqueOrThrow.mockResolvedValue(teamToOrganization);
        yield expect((0, teamToOrganizationService_1.getTeamToOrganization)(1, 1)).resolves.toEqual({
            teamId: 1,
            organizationId: 1
        });
    }));
    test('Posting a TeamToOrganization mapping', () => __awaiter(this, void 0, void 0, function* () {
        const teamToOrganization = {
            teamId: 1,
            organizationId: 1
        };
        singleton_1.prismaMock.teamToOrganization.create.mockResolvedValue(teamToOrganization);
        yield expect((0, teamToOrganizationService_1.postTeamToOrganization)(1, 1)).resolves.toEqual({
            teamId: 1,
            organizationId: 1
        });
    }));
    test('Deleting a TeamToOrganization mapping', () => __awaiter(this, void 0, void 0, function* () {
        const teamToOrganization = {
            teamId: 1,
            organizationId: 1
        };
        singleton_1.prismaMock.teamToOrganization.delete.mockResolvedValue(teamToOrganization);
        yield expect((0, teamToOrganizationService_1.deleteTeamToOrganization)(1, 1)).resolves.toEqual({
            teamId: 1,
            organizationId: 1
        });
    }));
    test('Finding many TeamToOrganization mappings by OrgId', () => __awaiter(this, void 0, void 0, function* () {
        const teamToOrganization = {
            teamId: 1,
            organizationId: 1
        };
        singleton_1.prismaMock.teamToOrganization.findMany.mockResolvedValue([teamToOrganization]);
        yield expect((0, teamToOrganizationService_1.getAllTeamToOrgByOrgId)(1)).resolves.toEqual([{
                teamId: 1,
                organizationId: 1
            }]);
    }));
});
//# sourceMappingURL=teamToOrganizationServiceTests.t.js.map