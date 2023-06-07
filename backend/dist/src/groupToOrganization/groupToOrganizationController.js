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
exports.registerGroupToOrganizationEndpoints = void 0;
const groupToOrganizationService_1 = require("./groupToOrganizationService");
function registerGroupToOrganizationEndpoints(app) {
    app.get('/groupToOrganization', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/groupToOrganization')
            .then(response => console.log(response.data));
        */
        let groupToOrganization = yield (0, groupToOrganizationService_1.getAllGroupToOrganization)();
        res.send(groupToOrganization);
    }));
    app.get('/groupToOrganization/:groupid/:organizationid', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/groupToOrganization/[group id here]/[organization id here]')
            .then(response => console.log(response.data));
        */
        let groupToOrganization = yield (0, groupToOrganizationService_1.getGroupToOrganization)(Number(req.params.groupid), Number(req.params.organizationid));
        res.send(groupToOrganization);
    }));
    app.post('/groupToOrganization/:groupid/:organizationid', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.post('http://localhost:40000/groupToOrganization/[group id here]/[organization id here]')
            .then(response => console.log(response.data));
        */
        let groupToOrganization = yield (0, groupToOrganizationService_1.postGroupToOrganization)(Number(req.params.groupid), Number(req.params.organizationid));
        res.send(groupToOrganization);
    }));
    app.delete('/groupToOrganization/:groupid/:organizationid', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.delete('http://localhost:40000/groupToOrganization/[group id here]/[organization id here]')
            .then(response => console.log(response.data));
        */
        let groupToOrganization = yield (0, groupToOrganizationService_1.deleteGroupToOrganization)(Number(req.params.groupid), Number(req.params.organizationid));
        res.send(groupToOrganization);
    }));
}
exports.registerGroupToOrganizationEndpoints = registerGroupToOrganizationEndpoints;
