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
exports.registerTeamEndpoints = void 0;
const teamService_1 = require("./teamService");
const teamService_2 = require("./teamService");
const teamService_3 = require("./teamService");
const teamService_4 = require("./teamService");
function registerTeamEndpoints(app) {
    /**
     * Get Team By Id
     * @param path team id
     * @returns team associated with the id
     */
    app.get('/team/getTeamById/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/team/getTeamById/[team id here]')
            .then(response => console.log(response.data));
        */
        let team = yield (0, teamService_1.getTeamById)(Number(req.params.id));
        res.send(team);
    }));
    /**
     * Post new team
     * @param path userId
     * @param body name of the team to be added
     * @returns new team added to organization the userId is associated with
     */
    app.post('/team/postTeam/:userId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            const team = {
            name: "name here"
            }
            axios.post('http://localhost:40000/team/postTeam/:userId', team)
            .then(response => console.log(response.data));
        */
        let team = yield (0, teamService_1.postTeam)(req.body.name, Number(req.params.userId));
        res.send(team);
    }));
    /**
     * Get Teams By orgId
     * @param path orgId
     * @returns teams associated with the orgId
     */
    app.get('/team/getAllTeamsByOrgId/:orgId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/team/getTeamById/[team id here]')
            .then(response => console.log(response.data));
        */
        let teams = yield (0, teamService_2.getAllTeamsByOrgId)(Number(req.params.orgId));
        res.send(teams);
    }));
    /**
     * Get Teams By userId
     * @param path userId
     * @returns teams associated with the organization the userId belongs to.
     */
    app.get('/team/getAllTeamsByUserId/:userId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/team/getAllTeamsByUserId/:userId')
            .then(response => console.log(response.data));
        */
        let teams = yield (0, teamService_4.getAllTeamsByUserId)(Number(req.params.userId));
        res.send(teams);
    }));
    /**
     * Get Availble Teams By orgId
     * @param path orgId
     * @returns teams associated with the organization
     * that have less than the max number of users on that team.
     */
    app.get('/team/getAllAvailableTeamsByOrgId/:orgId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/team/getTeamById/[team id here]')
            .then(response => console.log(response.data));
        */
        let teams = yield (0, teamService_3.getAllAvailableTeamsByOrgId)(Number(req.params.orgId));
        res.send(teams);
    }));
    /**
     * Get Availble Teams By userId
     * @param path userId
     * @returns teams associated with the organization the userId belongs to
     * that have less than the max number of users on that team.
     */
    app.get('/team/getAllAvailableTeamsByUserId/:userId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/team/getTeamById/[team id here]')
            .then(response => console.log(response.data));
        */
        let teams = yield (0, teamService_1.getAllAvailableTeamsByUserId)(Number(req.params.userId));
        res.send(teams);
    }));
}
exports.registerTeamEndpoints = registerTeamEndpoints;
//# sourceMappingURL=teamController.js.map