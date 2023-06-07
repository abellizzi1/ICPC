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
exports.registerUserToGroupEndpoints = void 0;
const userToGroupService_1 = require("./userToGroupService");
function registerUserToGroupEndpoints(app) {
    app.get('/userToGroup', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/userToGroup')
            .then(response => console.log(response.data));
        */
        let userToGroup = yield (0, userToGroupService_1.getAllUserToGroup)();
        res.send(userToGroup);
    }));
    app.get('/userToGroup/:userid/:groupid', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/userToGroup/[user id here]/[group id here]')
            .then(response => console.log(response.data));
        */
        let userToGroup = yield (0, userToGroupService_1.getUserToGroup)(Number(req.params.userid), Number(req.params.groupid));
        res.send(userToGroup);
    }));
    app.post('/userToGroup/:userid/:groupid', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.post('http://localhost:40000/userToGroup/[user id here]/[group id here]')
            .then(response => console.log(response.data));
        */
        let userToGroup = yield (0, userToGroupService_1.postUserToGroup)(Number(req.params.userid), Number(req.params.groupid));
        res.send(userToGroup);
    }));
    app.delete('/userToGroup/:userid/:groupid', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.delete('http://localhost:40000/userToGroup/[user id here]/[group id here]')
            .then(response => console.log(response.data));
        */
        let userToGroup = yield (0, userToGroupService_1.deleteUserToGroup)(Number(req.params.userid), Number(req.params.groupid));
        res.send(userToGroup);
    }));
}
exports.registerUserToGroupEndpoints = registerUserToGroupEndpoints;
