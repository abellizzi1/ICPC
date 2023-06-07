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
exports.registerGroupEndpoints = void 0;
const groupService_1 = require("./groupService");
function registerGroupEndpoints(app) {
    app.get('/group/getGroupById/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/group/getGroupById/[group id here]')
            .then(response => console.log(response.data));
        */
        let group = yield (0, groupService_1.getGroupById)(Number(req.params.id));
        res.send(group);
    }));
    app.post('/group/postGroup', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            const group = {
            name: "name here"
            }
            axios.post('http://localhost:40000/group/postGroup', group)
            .then(response => console.log(response.data));
        */
        let group = yield (0, groupService_1.postGroup)(req.body.name);
        res.send(group);
    }));
}
exports.registerGroupEndpoints = registerGroupEndpoints;
