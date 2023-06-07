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
exports.registerEndpoints = void 0;
const userService_1 = require("../Service/userService");
const userService_2 = require("../Service/userService");
const userService_3 = require("../Service/userService");
const userService_4 = require("../Service/userService");
const userService_5 = require("../Service/userService");
const userService_6 = require("../Service/userService");
const axios_1 = __importDefault(require("axios"));
function registerEndpoints(app) {
    /**
     * user log in by email and password
     * @param body email
     * email of the user
     * @returns
     * Returns the user after a successful login
     */
    app.post('/user/logInUserByEmailPassword/', (req, res) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        /*
            Example axios call:
            axios.put('http://localhost:40000/user/logInUserByEmailPassword/')
            .then(response => console.log(response.data));

            note that this is a put, so that an object can be sent to server
        */
        try {
            let user = yield (0, userService_1.getUserByEmailPassword)(req.body.email, req.body.password);
            res.send(user);
        }
        catch (_b) {
            console.log(`Error logging in user: ${(_a = req.body) === null || _a === void 0 ? void 0 : _a.email}`);
            res.sendStatus(500);
        }
    }));
    /**
     * User Exists By Email
     * @param email
     * an email address
     * @returns
     * A boolean showing whether or not the email already exists in the database
     */
    app.get('/user/userExistsByEmail/:email', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/user/userExistsByEmail/:email')
            .then(response => console.log(response.data));
        */
        let user = yield (0, userService_1.checkForExistingEmail)(req.params.email);
        res.send(user);
    }));
    /**
     * Gets all users that are not on a team for a particular organization
     * @param orgId
     * organizationID
     * @returns
     * Returns all users that are not on a team for the organization associated with the orgId
     */
    app.get('/user/getAllUsersNotOnTeamByOrgId/:orgId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/user/getAllUsersNotOnTeamByOrgId/:orgId')
            .then(response => console.log(response.data));
        */
        let user = yield (0, userService_5.getAllUsersNotOnTeamByOrgId)(Number(req.params.orgId));
        res.send(user);
    }));
    /**
     * Gets a user for a particular id
     * @param id
     * id of a user
     * @returns
     * the user assocaited with a particular id
     */
    app.get('/user/getUserById/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/user/getUserById/[user id here]')
            .then(response => console.log(response.data));
        */
        let user = yield (0, userService_6.getUserById)(Number(req.params.id));
        res.send(user);
    }));
    /**
     * Gets all users
     * @param none
     * @returns
     * Returns all users
     */
    app.get('/user/getAllUsers', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/user/getAllUsers')
            .then(response => console.log(response.data));
        */
        let user = yield (0, userService_1.getAllUsers)();
        res.send(user);
    }));
    /**
     * Get All Active Users for an Organization
     * @param orgId
     * id for an organization
     * @returns
     * Returns all active users for an organization associated with a particular orgId
     */
    app.get('/user/getAllActiveUsersByOrgId/:orgId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/user/getAllActiveUsersByOrgId/:orgId')
            .then(response => console.log(response.data));
        */
        let activeUsers = yield (0, userService_4.getAllActiveUsersByOrgId)(Number(req.params.orgId));
        res.send(activeUsers);
    }));
    /**
     * Get All Users for an Organization
     * @param orgId
     * id for an organization
     * @returns
     * Returns all users for an organization associated with a particular orgId
     */
    app.get('/user/getAllUsersByOrgId/:orgId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/user/getAllUsersByOrgId/:orgId')
            .then(response => console.log(response.data));
        */
        let allUsers = yield (0, userService_1.getAllUsersByOrgId)(Number(req.params.orgId));
        res.send(allUsers);
    }));
    /**
     * Get All Users on a team
     * @param teamId
     * id for a team
     * @returns
     * Returns all users on a team associated with a particular team id
     */
    app.get('/user/getAllUsersByTeamId/:teamId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/user/getAllUsersByTeamId/:teamId')
            .then(response => console.log(response.data));
        */
        let allUsers = yield (0, userService_5.getAllUsersByTeamId)(Number(req.params.teamId));
        res.send(allUsers);
    }));
    app.get('/user/getAllUsersByMultipleTeamIds', (req, res) => __awaiter(this, void 0, void 0, function* () {
        // Example axios call in ManageTeamsPage
        let allUsers = yield (0, userService_5.getAllUsersByMultipleTeamIds)(req.query.teamIds);
        res.send(allUsers);
    }));
    /*
    Gets the leetcode data required for the User statistics page
    Must call the endpoint from the backend since it has cors preventing a call from the frontend.
    */
    app.get('/user/getLeetcodeData/:username', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.get('http://localhost:40000/user/getLeetcodeData/:username')
            .then(response => console.log(response.data));
        */
        yield axios_1.default.get("https://leetcode.com/graphql?query=query{allQuestionsCount { difficulty count } matchedUser(username: \"" + req.params.username + "\") { contributions { points } profile { reputation ranking } submissionCalendar submitStats { acSubmissionNum { difficulty count submissions } totalSubmissionNum { difficulty count submissions } } } }")
            .then((response) => __awaiter(this, void 0, void 0, function* () {
            res.send(response.data);
        })).catch((err) => console.log(err));
    }));
    /**
     * Post a new user
     * @param param
     * newOrgName, existingOrgId
     * @returns
     * Returns new user
     */
    //if the user is NOT joining an existing org, the existingOrgId should be 0
    app.post('/user/registerUser/:newOrgName/:existingOrgId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.post('http://localhost:40000/user/registerUser/:newOrgName/:existingOrgId')
            .then(response => console.log(response.data));
        */
        try {
            let user = req.body;
            user = yield (0, userService_1.registerUser)(user, req.params.newOrgName, Number(req.params.existingOrgId));
            res.send(user);
        }
        catch (err) {
            console.log(err);
        }
    }));
    /*
    Updates the user's leetcode username
    path params: email
    body params: leetcode username
    return: updated user
    */
    app.put('/user/updateLeetcodeUserByEmail/:email', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            const leetcodeUser = {
            leetcodeUsername: "username here"
            }
            axios.put('http://localhost:40000/user/updateLeetcodeUserByEmail/[user email here]', leetcodeUser)
            .then(response => console.log(response.data));
        */
        let user = yield (0, userService_1.updateLeetcodeUserByEmail)(req.params.email, req.body.leetcodeUsername);
        res.send(user);
    }));
    /*
    Updates the user's codeforces username
    path params: email
    body params: codeforces username
    return: updated user
    */
    app.put('/user/updateCodeforcesUserByEmail/:email', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            const codeforcesUser = {
            codeforcesUsername: "username here"
            }
            axios.put('http://localhost:40000/user/updateCodeforcesUserByEmail/[user email here]', codeforcesUser)
            .then(response => console.log(response.data));
        */
        let user = yield (0, userService_1.updateCodeforcesUserByEmail)(req.params.email, req.body.codeforcesUsername);
        res.send(user);
    }));
    /*
    Updates the user's uhunt id
    path params: email
    body params: uhunt id
    return: updated user
    */
    app.put('/user/updateUhuntUserByEmail/:email', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            const uhuntUser = {
            uhuntId: id here (integer)
            }
            axios.put('http://localhost:40000/user/updateUhuntUserByEmail/[user email here]', uhuntUser)
            .then(response => console.log(response.data));
        */
        let user = yield (0, userService_1.updateUhuntUserByEmail)(req.params.email, req.body.uhuntId);
        res.send(user);
    }));
    /**
     * Update User Info
     * @body
     * user info
     * @returns
     * Returns user with updated info
     */
    //This endpoint can be used to edit any of a user's info except email address.
    //You need to use the updateUserEmailByUserId endpoint to edit a user's email address
    app.put('/user/updateUserInfo', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            let user = req.body;
            let updatedUser = yield (0, userService_2.updateUser)(user);
            res.send(updatedUser);
        }
        catch (err) {
            console.log(err);
        }
    }));
    /**
     * Update user email by user id
     * @param userId
     * id for a user
     * @param email
     * new email
     * @returns
     * Returns updated user with new email if requested email is not already in use
     */
    app.put('/user/updateUserEmailByUserId/:userId/:email', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.put('http://localhost:40000/user/updateUserEmailByUserId/:userId/:email')
            .then(response => console.log(response.data));
        */
        try {
            let updatedUser = yield (0, userService_3.updateUserEmailByUserId)(Number(req.params.userId), req.params.email);
            res.send(updatedUser);
        }
        catch (err) {
            console.log(err);
        }
    }));
    /**
     * Deactivate a user
     * @param userId
     * id for a user
     * @returns
     * Returns user that was deactivated
     */
    app.put('/user/deactivateUserByUserId/:userId', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.put('http://localhost:40000/user/deactivateUserByUserId/:userId')
            .then(response => console.log(response.data));
        */
        let user = yield (0, userService_5.deactivateUserByUserId)(Number(req.params.userId));
        res.send(user);
    }));
    /**
     * Update a user by email
     * @param email
     * email for the user to be updated
     * @body testEmail
     * @body detail
     * @returns
     * Returns updated user
     */
    app.put('/user/updateUserDetailsByEmail/:email', (req, res) => __awaiter(this, void 0, void 0, function* () {
        /*
            Example axios call:
            axios.put('http://localhost:40000/user/updateUserDetailsByEmail/:email')
            .then(response => console.log(response.data));
        */
        let user = yield (0, userService_1.updateUserDetailsByEmail)(req.body.testEmail, req.body.detail, req.body.update);
        res.send(user);
    }));
}
exports.registerEndpoints = registerEndpoints;
//# sourceMappingURL=userController.js.map