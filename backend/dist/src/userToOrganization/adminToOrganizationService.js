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
exports.deleteAdminToOrganization = exports.postAdminToOrganization = exports.getAdminToOrganization = exports.getAllAdminToOrganization = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getAllAdminToOrganization() {
    return __awaiter(this, void 0, void 0, function* () {
        let allAdminToOrganization = yield prisma.adminToOrganization.findMany();
        return allAdminToOrganization;
    });
}
exports.getAllAdminToOrganization = getAllAdminToOrganization;
function getAdminToOrganization(userid, organizationid) {
    return __awaiter(this, void 0, void 0, function* () {
        let adminToOrganization = yield prisma.adminToOrganization.findUniqueOrThrow({
            where: {
                userId_organizationId: {
                    userId: userid,
                    organizationId: organizationid
                }
            }
        });
        return adminToOrganization;
    });
}
exports.getAdminToOrganization = getAdminToOrganization;
function postAdminToOrganization(userid, organizationid) {
    return __awaiter(this, void 0, void 0, function* () {
        let adminToOrganization = yield prisma.adminToOrganization.create({
            data: {
                userId: userid,
                organizationId: organizationid
            }
        });
        return adminToOrganization;
    });
}
exports.postAdminToOrganization = postAdminToOrganization;
function deleteAdminToOrganization(userid, organizationid) {
    return __awaiter(this, void 0, void 0, function* () {
        let adminToOrganization = yield prisma.adminToOrganization.delete({
            where: {
                userId_organizationId: {
                    userId: userid,
                    organizationId: organizationid
                }
            }
        });
        return adminToOrganization;
    });
}
exports.deleteAdminToOrganization = deleteAdminToOrganization;
