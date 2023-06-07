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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAllDefaultProbToOrg = exports.getAllOrgToProbMappings = void 0;
const problemService_1 = require("./problemService");
const client_1 = __importDefault(require("../../client"));
/**
 * Gets all organizationToProblem mappings
 * @returns
 * Returns all organizationToProblem mappings
 */
function getAllOrgToProbMappings() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let orgToProbMappings = yield client_1.default.orgToProbMapping.findMany();
            return orgToProbMappings;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to get all organizationToProblem mappings: ${error}`);
            throw new Error(`Failed to get all organizationToProblem mappings: ${error}`);
        }
    });
}
exports.getAllOrgToProbMappings = getAllOrgToProbMappings;
/**
 * Adds all default problems to an organization
 * @param orgId
 * id of the organization
 * @returns
 * Returns the added mappings
 */
function addAllDefaultProbToOrg(orgId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let mappings = [];
            let defaultProblems = yield (0, problemService_1.getAllDefaultProblems)();
            for (let i = 0; i < defaultProblems.length; i++) {
                try {
                    let mapping = yield client_1.default.orgToProbMapping.create({
                        data: {
                            organizationId: orgId,
                            probId: defaultProblems[i].id
                        }
                    });
                    mappings.push(mapping);
                }
                catch (err) {
                    return err;
                }
            }
            return mappings;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to add all default problems to organization by organizationId ${orgId}: ${error}`);
            throw new Error(`Failed to add all default problems to organization by organizationId ${orgId}: ${error}`);
        }
    });
}
exports.addAllDefaultProbToOrg = addAllDefaultProbToOrg;
//# sourceMappingURL=orgToProbMappingService.js.map