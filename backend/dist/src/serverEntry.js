"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("./Controller/userController");
const categoryController_1 = require("./Controller/categoryController");
const submissionImageController_1 = require("./Controller/submissionImageController");
const difficultyController_1 = require("./Controller/difficultyController");
const problemController_1 = require("./Controller/problemController");
const teamController_1 = require("./Controller/teamController");
const userToTeamController_1 = require("./Controller/userToTeamController");
const teamToOrganizationController_1 = require("./Controller/teamToOrganizationController");
const userToOrganizationController_1 = require("./Controller/userToOrganizationController");
const organizationController_1 = require("./Controller/organizationController");
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const organizationToDifficultyMappingController_1 = require("./Controller/organizationToDifficultyMappingController");
const orgToCatMappingController_1 = require("./Controller/orgToCatMappingController");
const orgToProbMappingController_1 = require("./Controller/orgToProbMappingController");
const problemToCategoryController_1 = require("./Controller/problemToCategoryController");
const completedProblemsController_1 = require("./Controller/completedProblemsController");
const graduatedArchiveController_1 = require("./Controller/graduatedArchiveController");
const userStatsPageController_1 = require("./Controller/userStatsPageController");
const isProductionServer = (process.env.PRODUCTION) ? true : false;
const devFrontendLoc = path_1.default.join(__dirname, '../../../frontend/build');
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const port = (isProductionServer) ? 80 : 40000;
const frontendLoc = (isProductionServer) ? '/app/root' : devFrontendLoc;
app.use(express_1.default.static(frontendLoc));
// register routes with http server
(0, userController_1.registerEndpoints)(app);
(0, categoryController_1.registerCategoryEndpoints)(app);
(0, submissionImageController_1.registerSubmissionImageEndpoints)(app);
(0, difficultyController_1.registerDifficultyEndpoints)(app);
(0, problemController_1.registerProblemEndpoints)(app);
(0, teamController_1.registerTeamEndpoints)(app);
(0, userToTeamController_1.registerUserToTeamEndpoints)(app);
(0, teamToOrganizationController_1.registerTeamToOrganizationEndpoints)(app);
(0, organizationController_1.registerOrganizationEndpoints)(app);
(0, userToOrganizationController_1.registerUserToOrganizationEndpoints)(app);
(0, organizationToDifficultyMappingController_1.registerOrganizationToDifficultyMappingEndpoints)(app);
(0, orgToCatMappingController_1.registerOrgToCatMappingEndpoints)(app);
(0, orgToProbMappingController_1.registerOrgToProbMappingEndpoints)(app);
(0, problemToCategoryController_1.registerProblemToCategoryEndpoints)(app);
(0, completedProblemsController_1.registerCompletedProblemsEndpoints)(app);
(0, graduatedArchiveController_1.registerGraduatedEndpoints)(app);
(0, userStatsPageController_1.registerUserStatsPageEndpoints)(app);
// run http server
app.listen(port, () => {
    console.log(`[Server]: I am running at http://localhost:${port}`);
});
//# sourceMappingURL=serverEntry.js.map