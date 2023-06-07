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
exports.registerDifficultyEndpoints = void 0;
const difficultyService_1 = require("./difficultyService");
const difficultyService_2 = require("./difficultyService");
const difficultyService_3 = require("./difficultyService");
const difficultyService_4 = require("./difficultyService");
const organizationToDifficultyMappingService_1 = require("../organizationToDifficultyMapping/organizationToDifficultyMappingService");
const difficultyService_5 = require("./difficultyService");
function registerDifficultyEndpoints(app) {
    app.get('/difficulty', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send('Hello, this is the Difficulty Controller');
    }));
    /**
    * Get All Difficulties
    * @param: path- none
    * @return: all difficulties
    */
    app.get('/difficulty/getAllDifficulties', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            let difficulties = yield (0, difficultyService_1.getAllDifficulties)();
            res.send(difficulties);
        }
        catch (err) {
            console.log(err);
        }
    }));
    /**
     * Get Diffiulties By User ID
     * @param path: userid
     * @return all difficulties associated with that userid
     */
    app.get('/difficulty/getDifficultiesByUserId/:userid', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            let difficulties = yield (0, difficultyService_3.getDifficultiesByUserId)(Number(req.params.userid));
            res.send(difficulties);
        }
        catch (err) {
            console.log(err);
        }
    }));
    /**
     * Get Difficulty by Name
     * @param path - name of difficulty
     * @return difficulty with the given name
     */
    app.get('/difficulty/getDifficultyByName/:name', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            let difficulty = yield (0, difficultyService_2.getDifficultyByName)(req.params.name);
            res.send(difficulty);
        }
        catch (err) {
            console.log(err);
        }
    }));
    /**
     * Get All Difficulties By orgid
     * @param path - orgid
     * @return All dificuties for the organization associated with the given orgid
     */
    app.get('/difficulty/getDifficultiesByOrg/:orgid', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/difficulty/getDifficultiesByOrg/:orgid')
            .then(response => console.log(response.data));
        */
        try {
            let difficulties = yield (0, difficultyService_4.getDifficultiesByOrgId)(Number(req.params.orgid));
            res.send(difficulties);
        }
        catch (err) {
            console.log(err);
        }
    }));
    /**
     * Get Difficulty by difficulty id
     * @param path: - id
     * @return difficuly associated with the given difficulty id
     */
    app.get('/difficulty/getDifficultyById/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/difficulty/getDifficultyById/:id')
            .then(response => console.log(response.data));
        */
        try {
            let difficulty = yield (0, difficultyService_3.getDifficultyById)(Number(req.params.id));
            res.send(difficulty);
        }
        catch (err) {
            console.log(err);
        }
    }));
    /**
     * Get All Default Difficulties
     * @param: none
     * @return all default difficulties
     */
    app.get('/difficulty/getDefaultDifficulties', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/difficulty/getDifficultyById/:id')
            .then(response => console.log(response.data));
        */
        try {
            let difficulties = yield (0, difficultyService_5.getDefaultDifficulties)();
            res.send(difficulties);
        }
        catch (err) {
            console.log(err);
        }
    }));
    /**
     * Post New Difficulty
     * @param path: -name, orgId
     * @return new difficulty posted with given name accociated with given orgId
     */
    app.post('/difficulty/addNewDifficulty/:name/:orgId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            let name = req.params.name;
            let difficulty = yield (0, difficultyService_4.addNewDifficulty)(name, Number(req.params.orgId));
            res.send(difficulty);
        }
        catch (err) {
            console.log(err);
        }
    }));
    /**
     * Delete Difficulty
     * @param path:-orgId, diffId
     * @return mapping that was deleted associated with given orgId and diffId
     */
    app.delete('/difficulty/removeOrgToDiffMapping/:orgId/:diffId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            let difficultyMapping = yield (0, organizationToDifficultyMappingService_1.removeOrgToDiffMapping)(Number(req.params.orgId), Number(req.params.diffId));
            res.send(difficultyMapping);
        }
        catch (err) {
            console.log(err);
        }
    }));
}
exports.registerDifficultyEndpoints = registerDifficultyEndpoints;
//# sourceMappingURL=difficultyController.js.map