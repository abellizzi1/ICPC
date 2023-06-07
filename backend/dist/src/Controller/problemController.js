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
exports.registerProblemEndpoints = void 0;
const problemService_1 = require("../Service/problemService");
const problemService_2 = require("../Service/problemService");
const problemService_3 = require("../Service/problemService");
const problemService_4 = require("../Service/problemService");
const problemService_5 = require("../Service/problemService");
const problemService_6 = require("../Service/problemService");
const problemService_7 = require("../Service/problemService");
function registerProblemEndpoints(app) {
    app.get('/problem', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send('Hello, this is the Problem Controller');
    }));
    app.get('/problem/getProblemsAndCategoriesByUserId/:userId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        let problem = yield (0, problemService_7.getProblemsAndCategoriesByUserId)(Number(req.params.userId));
        res.send(problem);
    }));
    /*
    Get Problem by ProblemId
    path params: probId
    return: problem associated with a particular id
    */
    app.get('/problem/getProblemById/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/problem/getProblemById/:id')
            .then(response => console.log(response.data));
        */
        let problem = yield (0, problemService_1.getProblemById)(Number(req.params.id));
        res.send(problem);
    }));
    /*
    Get All Default Problems
    path params: none
    return: All Default Problems
    */
    app.get('/problem/getAllDefaultProblems', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/problem/getAllDefaultProblems')
            .then(response => console.log(response.data));
        */
        let problems = yield (0, problemService_2.getAllDefaultProblems)();
        res.send(problems);
    }));
    // Updates a problem and returns it
    app.put('/problem/updateProblem', (req, res) => __awaiter(this, void 0, void 0, function* () {
        let problem = yield (0, problemService_7.updateProblem)(req.body);
        res.send(problem);
    }));
    /*
    Get All Problems
    path params: none
    return: All Problems
    */
    app.get('/problem/getAllProblems', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/problem/getAllProblems')
            .then(response => console.log(response.data));
        */
        let problemList = yield (0, problemService_3.getAllProblems)();
        res.send(problemList);
    }));
    /*
    Get Problem by user Id
    path params: userId
    return: all problems associated with a particular user
    */
    app.get('/problem/getProblemsByUserId/:userId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/problem/getProblemsByUserId/:userId')
            .then(response => console.log(response.data));
        */
        let problemList = yield (0, problemService_4.getProblemsByUserId)(Number(req.params.userId));
        res.send(problemList);
    }));
    /**
     * Get Problems By Organization Id
     * @param path orgId
     * @returns problems associated with a particular organization
     */
    app.get('/problem/getProblemsByOrgId/:orgId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/problem/getProblemsByUserId/:userId')
            .then(response => console.log(response.data));
        */
        let problemList = yield (0, problemService_7.getProblemsByOrgId)(Number(req.params.orgId));
        res.send(problemList);
    }));
    /*
    Get Problem by Category Id
    path params: catId
    return: all problems associated with a particular category
    */
    app.get('/problem/getProblemsByCategoryId/:categoryid', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/problem/getProblemsByCategoryId/[category id here]')
            .then(response => console.log(response.data));
        */
        let problemList = yield (0, problemService_4.getProblemsByCategoryId)(Number(req.params.categoryid));
        res.send(problemList);
    }));
    /*
    Post A New Problem
    path params: userId, catId
    return: problem that was added
    */
    app.post('/problem/postProblem/:userId/:catId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            let problem = req.body;
            problem = yield (0, problemService_5.postProblem)(Number(req.params.userId), Number(req.params.catId), problem);
            res.send(problem);
        }
        catch (err) {
            console.log(err);
        }
    }));
    /*
    Remove Problem
    path params: userId, probId
    return: mapping that was removed associating an organization to a problem
    */
    app.delete('/problem/removeProblem/:userId/:probId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            let orgToProbMapping = yield (0, problemService_6.removeProblem)(Number(req.params.userId), Number(req.params.probId));
            res.send(orgToProbMapping);
        }
        catch (err) {
            console.log(err);
        }
    }));
}
exports.registerProblemEndpoints = registerProblemEndpoints;
//# sourceMappingURL=problemController.js.map