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
exports.registerProblemToCategoryEndpoints = void 0;
const problemToCategoryService_1 = require("../Service/problemToCategoryService");
function registerProblemToCategoryEndpoints(app) {
    /*
    Get All Problem To Category Mappings
    path params: none
    return: all mappings associating problems to their category
    */
    app.get('/problemToCategory/getAll', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/problemToCategory/getAll')
            .then(response => console.log(response.data));
        */
        let problemToCategory = yield (0, problemToCategoryService_1.getAllProblemToCategory)();
        res.send(problemToCategory);
    }));
    //updates a problemToCategory mapping
    app.put('/problemToCategory/updateProblemToCategory/:problemId/:newCategoryId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        let problemToCategory = yield (0, problemToCategoryService_1.updateProblemToCategory)(Number(req.params.problemId), Number(req.params.newCategoryId));
        res.send(problemToCategory);
    }));
    /*
    Get Problem To Category Mapping by problemId and catId
    path params: probId, catId
    return: mapping associating a particular problem to it's category
    */
    app.get('/problemToCategory/problemToCategoryByProblemIdCategoryId:problemid/:categoryid', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/problemToCategory/problemToCategoryByProblemIdCategoryId:problemid/:categoryid')
            .then(response => console.log(response.data));
        */
        let problemToCategory = yield (0, problemToCategoryService_1.getProblemToCategory)(Number(req.params.problemid), Number(req.params.categoryid));
        res.send(problemToCategory);
    }));
    /*
    Post New Problem To Category Mapping
    path params: problemId, categoryId
    return: mapping associating  a particular problem to its category
    */
    app.post('/problemToCategory/:problemid/:categoryid', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.post('http://localhost:40000/problemToCategory/[problem id here]/[category id here]')
            .then(response => console.log(response.data));
        */
        let problemToCategory = yield (0, problemToCategoryService_1.postProblemToCategory)(Number(req.params.problemid), Number(req.params.categoryid));
        res.send(problemToCategory);
    }));
    /*
    Remove Problem To Category Mapping
    path params: problemId, categoryId
    return: mapping associating a particular problem to its category that was removed
    */
    app.delete('/problemToCategory/:problemid/:categoryid', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.delete('http://localhost:40000/problemToCategory/[problem id here]/[category id here]')
            .then(response => console.log(response.data));
        */
        let problemToCategory = yield (0, problemToCategoryService_1.deleteProblemToCategory)(Number(req.params.problemid), Number(req.params.categoryid));
        res.send(problemToCategory);
    }));
}
exports.registerProblemToCategoryEndpoints = registerProblemToCategoryEndpoints;
//# sourceMappingURL=problemToCategoryController.js.map