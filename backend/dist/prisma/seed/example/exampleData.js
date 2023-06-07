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
function seedExampleData(prisma) {
    return __awaiter(this, void 0, void 0, function* () {
        seedExampleOrg(prisma);
        seedExampleUsers(prisma);
    });
}
exports.default = seedExampleData;
function seedExampleOrg(prisma) {
    return __awaiter(this, void 0, void 0, function* () {
        const IsuOrg = {
            id: 1,
            name: 'Iowa State University'
        };
        yield prisma.organization.upsert({
            where: { id: IsuOrg.id },
            update: {},
            create: IsuOrg
        });
    });
}
function seedExampleUsers(prisma) {
    return __awaiter(this, void 0, void 0, function* () {
        const sharedConfig = {
            isAdmin: 1,
            isHeadCoach: 0,
            isCoach: 0,
            isAssistantCoach: 0,
            isMentor: 0,
            isStudent: 1,
            isActive: 1,
            leetcodeUsername: null,
            codeforcesUsername: null,
            uhuntId: null
        };
        const exampleUsers = [
            Object.assign({ lastName: 'Bellizzi', firstName: 'Angelo', email: 'angelo@iastate.edu' }, sharedConfig),
            Object.assign({ lastName: 'Duncan', firstName: 'Matthew', email: 'mlduncan@iastate.edu' }, sharedConfig),
            Object.assign({ lastName: 'Lawrinenko', firstName: 'Josh', email: 'jrl@iastate.edu' }, sharedConfig),
            Object.assign({ lastName: 'Meyer', firstName: 'Chris', email: 'cameyer1@iastate.edu' }, sharedConfig),
            Object.assign({ lastName: 'Sinnwell', firstName: 'Matt', email: 'mattds@iastate.edu' }, sharedConfig),
            Object.assign(Object.assign({ lastName: 'Nobody', firstName: 'John', email: 'some@example.com' }, sharedConfig), { isActive: 0 }),
            Object.assign(Object.assign({ lastName: 'Mitra', firstName: 'Simanta', email: 'smitra@iastate.edu' }, sharedConfig), { isHeadCoach: 1, isStudent: 0 })
        ];
        // pass hash translates to pass1234
        // hard coded so we don't have to pull in frontend dependencies just for this one
        const hash = '$2b$10$c.apAXySmQOKco/rAuU7dOyAsI7QvobCfWbuFZgGeDaofr29XoqG6';
        for (let user of exampleUsers) {
            yield prisma.user.upsert({
                where: { email: user.email },
                update: {},
                create: Object.assign(Object.assign({}, user), { password: { create: { hash } } })
            });
        }
    });
}
//# sourceMappingURL=exampleData.js.map