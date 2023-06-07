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
exports.registerOrgToProbMappingEndpoints = void 0;
const orgToProbMappingService_1 = require("../orgToProbMapping/orgToProbMappingService");
function registerOrgToProbMappingEndpoints(app) {
    app.get('/orgToProbMapping', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send('Hello, this is the Org To Prob Mapping Controller');
    }));
    /*
    Get All Organization to Problem Mappings
    path params: none
    return: all mappings associating Organizations to Problems
    */
    app.get('/orgToProbMapping/getAllOrgToProbMappings', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            let mappings = yield (0, orgToProbMappingService_1.getAllOrgToProbMappings)();
            res.send(mappings);
        }
        catch (err) {
            console.log(err);
        }
    }));
}
exports.registerOrgToProbMappingEndpoints = registerOrgToProbMappingEndpoints;
//# sourceMappingURL=orgToProbMappingController.js.map