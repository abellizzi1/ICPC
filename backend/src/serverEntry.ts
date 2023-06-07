import express, {Express} from 'express';
import { registerEndpoints as registerUserEndpoints } from './Controller/userController';
import { registerCategoryEndpoints } from './Controller/categoryController';
import { registerSubmissionImageEndpoints } from './Controller/submissionImageController';
import { registerDifficultyEndpoints } from './Controller/difficultyController';
import { registerProblemEndpoints } from './Controller/problemController';
import { registerTeamEndpoints } from './Controller/teamController';
import { registerUserToTeamEndpoints } from './Controller/userToTeamController';
import { registerTeamToOrganizationEndpoints } from './Controller/teamToOrganizationController';
import { registerUserToOrganizationEndpoints } from './Controller/userToOrganizationController';
import { registerOrganizationEndpoints } from './Controller/organizationController';
import path from 'path';
import cors from "cors";
import { registerOrganizationToDifficultyMappingEndpoints } from './Controller/organizationToDifficultyMappingController';
import { registerOrgToCatMappingEndpoints } from './Controller/orgToCatMappingController';
import { registerOrgToProbMappingEndpoints } from './Controller/orgToProbMappingController';
import { registerProblemToCategoryEndpoints } from './Controller/problemToCategoryController';
import { registerCompletedProblemsEndpoints } from './Controller/completedProblemsController';
import { registerGraduatedEndpoints } from './Controller/graduatedArchiveController';
import { registerUserStatsPageEndpoints } from './Controller/userStatsPageController';

const isProductionServer: boolean = (process.env.PRODUCTION) ? true : false;
const devFrontendLoc = path.join(__dirname, '../../../frontend/build');

const app: Express = express();
app.use(cors());
app.use(express.json());

const port = (isProductionServer) ? 80 : 40_000;
const frontendLoc = (isProductionServer) ? '/app/root' : devFrontendLoc;

app.use(express.static(frontendLoc));

// register routes with http server
registerUserEndpoints(app);
registerCategoryEndpoints(app);
registerSubmissionImageEndpoints(app);
registerDifficultyEndpoints(app);
registerProblemEndpoints(app);
registerTeamEndpoints(app);
registerUserToTeamEndpoints(app);
registerTeamToOrganizationEndpoints(app);
registerOrganizationEndpoints(app);
registerUserToOrganizationEndpoints(app);
registerOrganizationToDifficultyMappingEndpoints(app);
registerOrgToCatMappingEndpoints(app);
registerOrgToProbMappingEndpoints(app);
registerProblemToCategoryEndpoints(app);
registerCompletedProblemsEndpoints(app);
registerGraduatedEndpoints(app);
registerUserStatsPageEndpoints(app);

// run http server
app.listen(port, ()=> {
    console.log(`[Server]: I am running at http://localhost:${port}`);
});
