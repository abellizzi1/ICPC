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
exports.registerCompletedProblemsEndpoints = void 0;
const completedProblemsService_1 = require("../Service/completedProblemsService");
function registerCompletedProblemsEndpoints(app) {
    /*
    Get All Completed Problems
    path params: none
    return: all problems that have been completed
    */
    app.get('/completedProblems/getAll', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/completedProblems/getAll')
            .then(response => console.log(response.data));
        */
        let completedProblems = yield (0, completedProblemsService_1.getAllCompletedProblems)();
        res.send(completedProblems);
    }));
    /*
    Get All Completed Problems by userId
    path params: userId
    return: all problems that have been completed by a particular user
    */
    app.get('/completedProblems/getCompletedProblemsByUserId/:userid', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/completedProblems/getCompletedProblemsByUserId/:userid')
            .then(response => console.log(response.data));
        */
        let completedProblems = yield (0, completedProblemsService_1.getCompletedProblemsByUserId)(Number(req.params.userid));
        res.send(completedProblems);
    }));
    /*
    Get All Completed Problems by Team
    path params: teamId
    return: all problems that have been completed by a particular team
    */
    app.get('/completedProblems/getCompletedProblemsByTeamId/:teamid', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/completedProblems/getCompletedProblemsByTeamId/:teamid')
            .then(response => console.log(response.data));
        */
        let completedProblems = yield (0, completedProblemsService_1.getCompletedProblemsByTeamId)(Number(req.params.teamid));
        res.send(completedProblems);
    }));
    /*
    Get All Completed Problems by Organization
    path params: orgId
    return: all problems that have been completed by a particular organization
    */
    app.get('/completedProblems/getCompletedProblemsByOrgId/:orgid', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/completedProblems/getCompletedProblemsByOrgId/:orgid')
            .then(response => console.log(response.data));
        */
        let completedProblems = yield (0, completedProblemsService_1.getCompletedProblemsByOrgId)(Number(req.params.orgid));
        res.send(completedProblems);
    }));
    app.get('/completedProblems/getCompletedProblemsByUserIdProblemId/:userid/:problemid', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/completedProblems/getCompletedProblemsByUserIdProblemId/:userid/:problemid')
            .then(response => console.log(response.data));
        */
        let completedProblems = yield (0, completedProblemsService_1.getCompletedProblemsByUserIdProblemId)(Number(req.params.userid), Number(req.params.problemid));
        res.send(completedProblems);
    }));
    /*
    Post completed problem
    path params: userId, problemId
    return: the mapping associated with the problem that has been completed by the user
    */
    app.post('/completedProblems/:userid/:problemid', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.post('http://localhost:40000/completedProblems/[user id here]/[problem id here]')
            .then(response => console.log(response.data));
        */
        let completedProblems = yield (0, completedProblemsService_1.postCompletedProblems)(Number(req.params.userid), Number(req.params.problemid));
        res.send(completedProblems);
    }));
    /*
    Delete Completed Problem by userId
    path params: userId, problemId
    return: the mapping associated with the problem and user
    */
    app.delete('/completedProblems/:userid/:problemid', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.delete('http://localhost:40000/completedProblems/[user id here]/[problem id here]')
            .then(response => console.log(response.data));
        */
        let completedProblems = yield (0, completedProblemsService_1.deleteCompletedProblems)(Number(req.params.userid), Number(req.params.problemid));
        res.send(completedProblems);
    }));
}
exports.registerCompletedProblemsEndpoints = registerCompletedProblemsEndpoints;
//# sourceMappingURL=completedProblemsController.js.map