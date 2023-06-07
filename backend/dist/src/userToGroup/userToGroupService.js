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
exports.deleteUserToGroup = exports.postUserToGroup = exports.getUserToGroup = exports.getAllUserToGroup = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getAllUserToGroup() {
    return __awaiter(this, void 0, void 0, function* () {
        let allUserToGroup = yield prisma.userToGroup.findMany();
        return allUserToGroup;
    });
}
exports.getAllUserToGroup = getAllUserToGroup;
function getUserToGroup(userid, groupid) {
    return __awaiter(this, void 0, void 0, function* () {
        let userToGroup = yield prisma.userToGroup.findUniqueOrThrow({
            where: {
                groupId_userId: {
                    groupId: groupid,
                    userId: userid
                }
            }
        });
        return userToGroup;
    });
}
exports.getUserToGroup = getUserToGroup;
function postUserToGroup(userid, groupid) {
    return __awaiter(this, void 0, void 0, function* () {
        let userToGroup = yield prisma.userToGroup.create({
            data: {
                groupId: groupid,
                userId: userid
            }
        });
        return userToGroup;
    });
}
exports.postUserToGroup = postUserToGroup;
function deleteUserToGroup(userid, groupid) {
    return __awaiter(this, void 0, void 0, function* () {
        let userToGroup = yield prisma.userToGroup.delete({
            where: {
                groupId_userId: {
                    groupId: groupid,
                    userId: userid
                }
            }
        });
        return userToGroup;
    });
}
exports.deleteUserToGroup = deleteUserToGroup;
