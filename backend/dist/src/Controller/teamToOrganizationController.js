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
exports.registerTeamToOrganizationEndpoints = void 0;
const teamToOrganizationService_1 = require("../Service/teamToOrganizationService");
function registerTeamToOrganizationEndpoints(app) {
    /*
    Get All Team to Organization Mappings
    path params: none
    return: all mappings associating teams to their organizations
    */
    app.get('/teamToOrganization/getAll', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/teamToOrganization/getAll')
            .then(response => console.log(response.data));
        */
        let teamToOrganization = yield (0, teamToOrganizationService_1.getAllTeamToOrganization)();
        res.send(teamToOrganization);
    }));
    /*
    Get Team to Organization Mapping by team and organization
    path params: teamId, orgId
    return: mapping associating a particular team to its organization
    */
    app.get('/teamToOrganization/getTeamToOrganizationByTeamIdOrgId/:teamid/:organizationid', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/teamToOrganization/getTeamToOrganizationByTeamIdOrgId/:teamid/:organizationid')
            .then(response => console.log(response.data));
        */
        let teamToOrganization = yield (0, teamToOrganizationService_1.getTeamToOrganization)(Number(req.params.teamid), Number(req.params.organizationid));
        res.send(teamToOrganization);
    }));
    /*
    Post new Team to Organization Mapping
    path params: teamId, organizationId
    return: new mapping created associating a particular team to its organizations
    */
    app.post('/teamToOrganization/:teamid/:organizationid', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.post('http://localhost:40000/teamToOrganization/[team id here]/[organization id here]')
            .then(response => console.log(response.data));
        */
        let teamToOrganization = yield (0, teamToOrganizationService_1.postTeamToOrganization)(Number(req.params.teamid), Number(req.params.organizationid));
        res.send(teamToOrganization);
    }));
    /*
    Delete Team to Organization Mapping
    path params: teamId, orgId
    return: all mapping that was removed associating a particular team to its organization
    */
    app.delete('/teamToOrganization/:teamid/:organizationid', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.delete('http://localhost:40000/teamToOrganization/[team id here]/[organization id here]')
            .then(response => console.log(response.data));
        */
        let teamToOrganization = yield (0, teamToOrganizationService_1.deleteTeamToOrganization)(Number(req.params.teamid), Number(req.params.organizationid));
        res.send(teamToOrganization);
    }));
}
exports.registerTeamToOrganizationEndpoints = registerTeamToOrganizationEndpoints;
//# sourceMappingURL=teamToOrganizationController.js.map