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
exports.registerUserToTeamEndpoints = void 0;
const userToTeamService_1 = require("../Service/userToTeamService");
function registerUserToTeamEndpoints(app) {
    /*
    Get all user to team mappings
    path params: none
    return: All mappings associating users to teams
    */
    app.get('/userToTeam/getAll', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/userToTeam/getAll')
            .then(response => console.log(response.data));
        */
        let userToTeam = yield (0, userToTeamService_1.getAllUserToTeam)();
        res.send(userToTeam);
    }));
    /*
    Get user to team mappings by userId and team Id
    path params: userId, teamId
    return: Mapping associating a particular user to a particular team
    */
    app.get('/userToTeam/getUserToTeamByUserIdTeamId/:userid/:teamid', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/userToTeam/getUserToTeamByUserIdTeamId/:userid/:teamid')
            .then(response => console.log(response.data));
        */
        let userToTeam = yield (0, userToTeamService_1.getUserToTeam)(Number(req.params.userid), Number(req.params.teamid));
        res.send(userToTeam);
    }));
    /*
    Get user to team mapping by user Id
    path params: userId
    return: Mapping associating a particular user to team
    */
    app.get('/userToTeam/getUserToTeamByUserId/:userid', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/userToTeam/getUserToTeamByUserId/:userid')
            .then(response => console.log(response.data));
        */
        let userToTeam = yield (0, userToTeamService_1.getUserToTeamByUserId)(Number(req.params.userid));
        res.send(userToTeam);
    }));
    /*
    Get User to team mappings by team id
    path params: team
    return: All mappings associating a particular team to their users
    */
    app.get('/userToTeam/getUserToTeamByTeamId/:teamid', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/userToTeam/getUserToTeamByTeamId/:teamid')
            .then(response => console.log(response.data));
        */
        let userToTeam = yield (0, userToTeamService_1.getUserToTeamByTeamId)(Number(req.params.teamid));
        res.send(userToTeam);
    }));
    /*
    Post new user to team mapping
    path params: userId, teamid
    return: New mapping associating a particular user to a particular team
    */
    app.post('/userToTeam/:userid/:teamid', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.post('http://localhost:40000/userToTeam/[user id here]/[team id here]')
            .then(response => console.log(response.data));
        */
        let userToTeam = yield (0, userToTeamService_1.postUserToTeam)(Number(req.params.userid), Number(req.params.teamid));
        res.send(userToTeam);
    }));
    /*
    Remove user to team mapping
    path params: userId, teamId
    return: Mapping that was removed associating a particular user to a particular team
    */
    app.delete('/userToTeam/:userid/:teamid', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.delete('http://localhost:40000/userToTeam/[user id here]/[team id here]')
            .then(response => console.log(response.data));
        */
        let userToTeam = yield (0, userToTeamService_1.deleteUserToTeam)(Number(req.params.userid), Number(req.params.teamid));
        res.send(userToTeam);
    }));
}
exports.registerUserToTeamEndpoints = registerUserToTeamEndpoints;
//# sourceMappingURL=userToTeamController.js.map