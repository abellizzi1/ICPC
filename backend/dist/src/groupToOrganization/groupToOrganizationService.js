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
exports.deleteGroupToOrganization = exports.postGroupToOrganization = exports.getGroupToOrganization = exports.getAllGroupToOrganization = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getAllGroupToOrganization() {
    return __awaiter(this, void 0, void 0, function* () {
        let allGroupToOrganization = yield prisma.groupToOrganization.findMany();
        return allGroupToOrganization;
    });
}
exports.getAllGroupToOrganization = getAllGroupToOrganization;
function getGroupToOrganization(groupid, organizationid) {
    return __awaiter(this, void 0, void 0, function* () {
        let groupToOrganization = yield prisma.groupToOrganization.findUniqueOrThrow({
            where: {
                groupId_organizationId: {
                    groupId: groupid,
                    organizationId: organizationid
                }
            }
        });
        return groupToOrganization;
    });
}
exports.getGroupToOrganization = getGroupToOrganization;
function postGroupToOrganization(groupid, organizationid) {
    return __awaiter(this, void 0, void 0, function* () {
        let groupToOrganization = yield prisma.groupToOrganization.create({
            data: {
                groupId: groupid,
                organizationId: organizationid
            }
        });
        return groupToOrganization;
    });
}
exports.postGroupToOrganization = postGroupToOrganization;
function deleteGroupToOrganization(groupid, organizationid) {
    return __awaiter(this, void 0, void 0, function* () {
        let groupToOrganization = yield prisma.groupToOrganization.delete({
            where: {
                groupId_organizationId: {
                    groupId: groupid,
                    organizationId: organizationid
                }
            }
        });
        return groupToOrganization;
    });
}
exports.deleteGroupToOrganization = deleteGroupToOrganization;
