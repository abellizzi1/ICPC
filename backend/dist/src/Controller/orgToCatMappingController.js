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
exports.registerOrgToCatMappingEndpoints = void 0;
const orgToCatMappingService_1 = require("../Service/orgToCatMappingService");
function registerOrgToCatMappingEndpoints(app) {
    app.get('/orgToCatMapping', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send('Hello, this is the orgToCatMapping Controller');
    }));
    /*
    Get All Organization to Category Mappings
    path params: none
    return: All Organization to Category Mappings
    */
    app.get('/difficulty/getAllOrgToCatMappings', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            let mappings = yield (0, orgToCatMappingService_1.getAllOrgToCatMappings)();
            res.send(mappings);
        }
        catch (err) {
            console.log(err);
        }
    }));
}
exports.registerOrgToCatMappingEndpoints = registerOrgToCatMappingEndpoints;
//# sourceMappingURL=orgToCatMappingController.js.map