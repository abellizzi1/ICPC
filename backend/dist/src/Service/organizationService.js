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
exports.getAllOrganizations = exports.getOrganizationByUserId = exports.postOrganization = exports.getOrganizationById = void 0;
const orgToCatMappingService_1 = require("./orgToCatMappingService");
const orgToProbMappingService_1 = require("./orgToProbMappingService");
const client_1 = __importDefault(require("../../client"));
/**
 * Gets an organization by ID
 * @param id
 * id of the organization
 * @returns
 * Returns an organization with the same id
 */
function getOrganizationById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let organization = yield client_1.default.organization.findUniqueOrThrow({
                where: {
                    id: id
                },
            });
            return organization;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to get organization by id ${id}: ${error}`);
            throw new Error(`Failed to get organization by id ${id}: ${error}`);
        }
    });
}
exports.getOrganizationById = getOrganizationById;
/**
 * Creates an organization and adds all default categories and problems
 * @param name
 * name of the new organization
 * @returns
 * Returns the created organization
 */
function postOrganization(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let organization = yield client_1.default.organization.create({
                data: {
                    name: name
                }
            });
            let orgId = organization.id;
            //assign the default categories to the org
            let orgToCatMappings = yield (0, orgToCatMappingService_1.addAllDefaultCatToOrg)(orgId);
            //assign the default problems to the org
            let orgToProbMappings = yield (0, orgToProbMappingService_1.addAllDefaultProbToOrg)(orgId);
            //assign the default difficulties to the org???
            return organization;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to post organization by name ${name}: ${error}`);
            throw new Error(`Failed to post organization by name ${name}: ${error}`);
        }
    });
}
exports.postOrganization = postOrganization;
/**
 * Gets an organization by userID
 * @param userId
 * id of the user
 * @returns
 * Returns the organization that the userID is in
 */
function getOrganizationByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const organization = yield client_1.default.$queryRaw `
        SELECT o.id, o.name
        FROM Organization o
        INNER JOIN UserToOrganization uto ON o.id = uto.organizationId
        WHERE uto.userId = ${userId}
        LIMIT 1;
      `;
            //the above query will return an array of organizations
            //so we choose the first element of the array
            return organization[0];
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to fetch organization for userId ${userId}: ${error}`);
            throw new Error(`Failed to fetch organization for userId ${userId}`);
        }
    });
}
exports.getOrganizationByUserId = getOrganizationByUserId;
/**
 * Gets all organizations
 * @returns
 * Returns all organizations
 */
function getAllOrganizations() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let organizations = yield client_1.default.organization.findMany({
                //Do Not Send The Password!!!
                select: {
                    id: true,
                    name: true,
                }
            });
            return organizations;
        }
        catch (error) {
            // Handle any errors that occur during database query
            console.error(`Failed to fetch all organizations: ${error}`);
            throw new Error(`Failed to fetch all organizations: ${error}`);
        }
    });
}
exports.getAllOrganizations = getAllOrganizations;
//# sourceMappingURL=organizationService.js.map