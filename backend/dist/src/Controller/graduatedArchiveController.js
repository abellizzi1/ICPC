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
exports.registerGraduatedEndpoints = void 0;
const graduatedArchiveService_1 = require("../Service/graduatedArchiveService");
function registerGraduatedEndpoints(app) {
    /*
    Get All Graduated
    path params: none
    return: all graduated users
    */
    app.get('/graduated/getAll', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/graduated/getAll')
            .then(response => console.log(response.data));
        */
        let graduated = yield (0, graduatedArchiveService_1.getAllGraduated)();
        res.send(graduated);
    }));
    /*
    Get All Graduated by UserID
    path params: userId
    return: all graduated users for a particular organization
    */
    app.get('/graduated/getGraduatedInOrganizationByUserId/:userId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/graduated/getGraduatedInOrganizationByUserId/:userId')
            .then(response => console.log(response.data));
        */
        let graduated = yield (0, graduatedArchiveService_1.getGraduatedInOrganizationByUserId)(Number(req.params.userId));
        res.send(graduated);
    }));
    /*
    Get Graduated By User Id
    path params: userId
    return: user that has graduated
    */
    app.get('/graduated/getGraduatedByUserId/:userId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/graduated/getGraduatedByUserId/:userId')
            .then(response => console.log(response.data));
        */
        let graduated = yield (0, graduatedArchiveService_1.getGraduatedByUserId)(Number(req.params.userId));
        res.send(graduated);
    }));
    /*
    Post Graduated
    path params: userId
    return: add a user to the graduated database
    */
    app.post('/graduated/post/:userId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            const graduated = {
            major: "major here",
            yearGraduated: year graduated here (int)
            }
            axios.post('http://localhost:40000/graduated/post/:userId', graduated)
            .then(response => console.log(response.data));
        */
        let graduated = yield (0, graduatedArchiveService_1.postGraduated)(Number(req.params.userId), req.body.major, req.body.yearGraduated);
        res.send(graduated);
    }));
    /*
    Remove Graduated
    path params: userId
    return: removed user from being graduated
    */
    app.delete('/graduated/delete/:userId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.delete('http://localhost:40000/graduated/delete/:userId')
            .then(response => console.log(response.data));
        */
        let graduated = yield (0, graduatedArchiveService_1.deleteGraduated)(Number(req.params.userId));
        res.send(graduated);
    }));
}
exports.registerGraduatedEndpoints = registerGraduatedEndpoints;
//# sourceMappingURL=graduatedArchiveController.js.map