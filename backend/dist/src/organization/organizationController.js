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
exports.registerOrganizationEndpoints = void 0;
const organizationService_1 = require("./organizationService");
const organizationService_2 = require("./organizationService");
const organizationService_3 = require("./organizationService");
function registerOrganizationEndpoints(app) {
    /*
    Get Organization By Id
    path params: organization id
    return: organization with a particular organization id
    */
    app.get('/organization/getOrganizationById/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/organization/getOrganizationById/:id')
            .then(response => console.log(response.data));
        */
        let organization = yield (0, organizationService_1.getOrganizationById)(Number(req.params.id));
        res.send(organization);
    }));
    /*
    Post Organization
    path params: none
    body params: organization
    return: organization that has been added
    */
    app.post('/organization/postOrganization', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            const organization = {
            name: "name here"
            }
            axios.post('http://localhost:40000/organization/postOrganization', organization)
            .then(response => console.log(response.data));
        */
        let organization = yield (0, organizationService_1.postOrganization)(req.body.name);
        res.send(organization);
    }));
    /*
    Get Organization by UserId
    path params: UserId
    return: Organization for a particular User
    */
    app.get('/organization/getOrganizationByUserId/:userId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        let organization = yield (0, organizationService_2.getOrganizationByUserId)(Number(req.params.userId));
        res.send(organization);
    }));
    /*
    Get All Organizations
    path params: none
    return: all organizations
    */
    app.get('/organization/getAllOrganizations', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/organization/getAllOrganizations')
            .then(response => console.log(response.data));
        */
        let user = yield (0, organizationService_3.getAllOrganizations)();
        res.send(user);
    }));
}
exports.registerOrganizationEndpoints = registerOrganizationEndpoints;
//# sourceMappingURL=organizationController.js.map