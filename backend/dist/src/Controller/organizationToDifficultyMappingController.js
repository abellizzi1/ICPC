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
exports.registerOrganizationToDifficultyMappingEndpoints = void 0;
const organizationToDifficultyMappingService_1 = require("../Service/organizationToDifficultyMappingService");
const organizationToDifficultyMappingService_2 = require("../Service/organizationToDifficultyMappingService");
const organizationToDifficultyMappingService_3 = require("../Service/organizationToDifficultyMappingService");
const organizationToDifficultyMappingService_4 = require("../Service/organizationToDifficultyMappingService");
function registerOrganizationToDifficultyMappingEndpoints(app) {
    app.get('/organizationToDifficultyMapping', (req, res) => __awaiter(this, void 0, void 0, function* () {
        res.send('Hello, this is the organizationToDifficultyMapping Controller');
    }));
    /*
    Get Organization to Difficulty Mapping by Org Id
    path params: orgId
    return: mappings associated to a particular organization
    */
    app.get('/organizationToDifficultyMapping/getMappingsByOrgId/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            let mappings = yield (0, organizationToDifficultyMappingService_1.getMappingsByOrgId)(Number(req.params.id));
            res.send(mappings);
        }
        catch (err) {
            console.log(err);
        }
    }));
    /*
    Get All Organization to Difficulty Mappings
    path params: none
    return: all Organization to Difficulty Mappings
    */
    app.get('/organizationToDifficultyMapping', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            let mappings = yield (0, organizationToDifficultyMappingService_4.getAllOrgToDifficulty)();
            res.send(mappings);
        }
        catch (err) {
            console.log(err);
        }
    }));
    /*
    Get Organization to Difficulty Mapping by DifficultyId
    path params: difficultyId
    return: mappings associated to a particular difficulty
    */
    app.get('/organizationToDifficultyMapping/getMappingsByDiffId/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            let mappings = yield (0, organizationToDifficultyMappingService_2.getMappingsByDiffId)(Number(req.params.id));
            res.send(mappings);
        }
        catch (err) {
            console.log(err);
        }
    }));
    /*
    Post Organization to Difficulty Mapping
    path params: orgId, diffId
    return: mapping that was created associated to a particular organization and difficulty
    */
    app.post('/organizationToDifficultyMapping/addNewOrgToDiffMapping/:orgId/:diffId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            let mapping = yield (0, organizationToDifficultyMappingService_3.addNewOrgToDiffMapping)(Number(req.params.orgId), Number(req.params.diffId));
            res.send(mapping);
        }
        catch (err) {
            console.log(err);
        }
    }));
    /*
    Remove Organization to Difficulty Mapping
    path params: orgId, diffId
    return: mapping that was removed associated to a particular organization and difficulty
    */
    app.delete('/organizationToDifficultyMapping/deleteOrgToDiffMapping/:orgId/:diffId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            let mapping = yield (0, organizationToDifficultyMappingService_4.removeOrgToDiffMapping)(Number(req.params.orgId), Number(req.params.diffId));
            res.send(mapping);
        }
        catch (err) {
            console.log(err);
        }
    }));
}
exports.registerOrganizationToDifficultyMappingEndpoints = registerOrganizationToDifficultyMappingEndpoints;
//# sourceMappingURL=organizationToDifficultyMappingController.js.map