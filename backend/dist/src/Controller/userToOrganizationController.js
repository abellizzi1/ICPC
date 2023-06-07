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
exports.registerUserToOrganizationEndpoints = void 0;
const userToOrganizationService_1 = require("../Service/userToOrganizationService");
const userToOrganizationService_2 = require("../Service/userToOrganizationService");
function registerUserToOrganizationEndpoints(app) {
    /*
    Get all user to organization mappings
    path params: none
    return: All mappings associating users to organizations
    */
    app.get('/userToOrganization/getAll', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/userToOrganization/getAll')
            .then(response => console.log(response.data));
        */
        // console.log("We are in the get all user to organization endpoint");
        let userToOrganization = yield (0, userToOrganizationService_1.getAllUserToOrganization)();
        res.send(userToOrganization);
    }));
    /*
    Get all User to Organiation mapping by org id
    path params: orgId
    return: All mappings associating users to a particular organization
    */
    app.get('/userToOrganization/getUserToOrgMappingsByOrgId/:orgId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/userToOrganization/getUserToOrgMappingsByOrgId/:orgId')
            .then(response => console.log(response.data));
        */
        // console.log("We are in the correct endpoint");
        let mappings = yield (0, userToOrganizationService_2.getUserToOrgMappingsByOrgId)(Number(req.params.orgId));
        res.send(mappings);
    }));
    /*
    Get user to organization mapping by user Id
    path params: userId
    return: Mapping associating user to organization
    */
    app.get('/userToOrganization/getUserToOrgMappingsByUserId/:userId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/userToOrganization/getUserToOrgMappingsByUserId/:userId')
            .then(response => console.log(response.data));
        */
        let mappings = yield (0, userToOrganizationService_1.getUserToOrgMappingsByUserId)(Number(req.params.userId));
        res.send(mappings);
    }));
    /*
    Post user to organization mapping
    path params: userId, organizationId
    return: New mapping associating user to organization
    */
    app.post('/userToOrganization/:userid/:organizationid', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.post('http://localhost:40000/userToOrganization/[user id here]/[organization id here]')
            .then(response => console.log(response.data));
        */
        let userToOrganization = yield (0, userToOrganizationService_1.postUserToOrganization)(Number(req.params.userid), Number(req.params.organizationid));
        res.send(userToOrganization);
    }));
    /*
    Remove user to organization mapping
    path params: userId, organizationId
    return: mapping associating a particular user to a particular organization
    */
    app.delete('/userToOrganization/:userid/:organizationid', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.delete('http://localhost:40000/userToOrganization/[user id here]/[organization id here]')
            .then(response => console.log(response.data));
        */
        let userToOrganization = yield (0, userToOrganizationService_1.deleteUserToOrganization)(Number(req.params.userid), Number(req.params.organizationid));
        res.send(userToOrganization);
    }));
}
exports.registerUserToOrganizationEndpoints = registerUserToOrganizationEndpoints;
//# sourceMappingURL=userToOrganizationController.js.map