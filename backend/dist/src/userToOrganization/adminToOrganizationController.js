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
exports.registerAdminToOrganizationEndpoints = void 0;
const adminToOrganizationService_1 = require("./adminToOrganizationService");
function registerAdminToOrganizationEndpoints(app) {
    app.get('/adminToOrganization', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/adminToOrganization')
            .then(response => console.log(response.data));
        */
        let adminToOrganization = yield (0, adminToOrganizationService_1.getAllAdminToOrganization)();
        res.send(adminToOrganization);
    }));
    app.get('/adminToOrganization/:userid/:organizationid', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/adminToOrganization/[user id here]/[organization id here]')
            .then(response => console.log(response.data));
        */
        let adminToOrganization = yield (0, adminToOrganizationService_1.getAdminToOrganization)(Number(req.params.userid), Number(req.params.organizationid));
        res.send(adminToOrganization);
    }));
    app.post('/adminToOrganization/:userid/:organizationid', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.post('http://localhost:40000/adminToOrganization/[user id here]/[organization id here]')
            .then(response => console.log(response.data));
        */
        let adminToOrganization = yield (0, adminToOrganizationService_1.postAdminToOrganization)(Number(req.params.userid), Number(req.params.organizationid));
        res.send(adminToOrganization);
    }));
    app.delete('/adminToOrganization/:userid/:organizationid', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.delete('http://localhost:40000/adminToOrganization/[user id here]/[organization id here]')
            .then(response => console.log(response.data));
        */
        let adminToOrganization = yield (0, adminToOrganizationService_1.deleteAdminToOrganization)(Number(req.params.userid), Number(req.params.organizationid));
        res.send(adminToOrganization);
    }));
}
exports.registerAdminToOrganizationEndpoints = registerAdminToOrganizationEndpoints;
