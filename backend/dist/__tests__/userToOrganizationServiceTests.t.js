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
const userToOrganizationService_1 = require("../src/Service/userToOrganizationService");
describe('UserToOrganization service tests', function () {
    test('Getting all UserToOrganization mappings', () => __awaiter(this, void 0, void 0, function* () {
        const userToOrganization = {
            userId: 1,
            organizationId: 1
        };
        singleton_1.prismaMock.userToOrganization.findMany.mockResolvedValue([userToOrganization]);
        yield expect((0, userToOrganizationService_1.getAllUserToOrganization)()).resolves.toEqual([{
                userId: 1,
                organizationId: 1
            }]);
    }));
    test('Getting a specific UserToOrganization mapping', () => __awaiter(this, void 0, void 0, function* () {
        const userToOrganization = {
            userId: 1,
            organizationId: 1
        };
        singleton_1.prismaMock.userToOrganization.findUniqueOrThrow.mockResolvedValue(userToOrganization);
        yield expect((0, userToOrganizationService_1.getUserToOrganization)(1, 1)).resolves.toEqual({
            userId: 1,
            organizationId: 1
        });
    }));
    test('Getting UserToOrganization mappings by OrgId', () => __awaiter(this, void 0, void 0, function* () {
        const userToOrganization = {
            userId: 1,
            organizationId: 1
        };
        singleton_1.prismaMock.userToOrganization.findMany.mockResolvedValue([userToOrganization]);
        yield expect((0, userToOrganizationService_1.getUserToOrgMappingsByOrgId)(1)).resolves.toEqual([{
                userId: 1,
                organizationId: 1
            }]);
    }));
    test('Getting UserToOrganization mappings by UserId', () => __awaiter(this, void 0, void 0, function* () {
        const userToOrganization = {
            userId: 1,
            organizationId: 1
        };
        singleton_1.prismaMock.userToOrganization.findMany.mockResolvedValue([userToOrganization]);
        yield expect((0, userToOrganizationService_1.getUserToOrgMappingsByUserId)(1)).resolves.toEqual([{
                userId: 1,
                organizationId: 1
            }]);
    }));
    test('Posting a UserToOrganization mapping', () => __awaiter(this, void 0, void 0, function* () {
        const userToOrganization = {
            userId: 1,
            organizationId: 1
        };
        singleton_1.prismaMock.userToOrganization.create.mockResolvedValue(userToOrganization);
        yield expect((0, userToOrganizationService_1.postUserToOrganization)(1, 1)).resolves.toEqual({
            userId: 1,
            organizationId: 1
        });
    }));
    test('Deleting a UserToOrganization mapping', () => __awaiter(this, void 0, void 0, function* () {
        const userToOrganization = {
            userId: 1,
            organizationId: 1
        };
        singleton_1.prismaMock.userToOrganization.delete.mockResolvedValue(userToOrganization);
        yield expect((0, userToOrganizationService_1.deleteUserToOrganization)(1, 1)).resolves.toEqual({
            userId: 1,
            organizationId: 1
        });
    }));
});
//# sourceMappingURL=userToOrganizationServiceTests.t.js.map