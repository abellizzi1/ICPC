import {Express, Request, Response} from 'express';
import { registerUser, getAllUsersByOrgId, getUserByEmailPassword, getAllUsers, updateCodeforcesUserByEmail, updateLeetcodeUserByEmail, updateUhuntUserByEmail, updateUserDetailsByEmail, checkForExistingEmail  } from '../Service/userService'
import { updateUser } from '../Service/userService';
import { updateUserEmailByUserId } from '../Service/userService';
import { getAllActiveUsersByOrgId } from '../Service/userService';
import { deactivateUserByUserId, getAllUsersByTeamId, getAllUsersByMultipleTeamIds, getAllUsersNotOnTeamByOrgId } from '../Service/userService';
import { getUserById } from '../Service/userService';
import axios from 'axios'

export function registerEndpoints(app: Express) {

    /**
     * user log in by email and password
     * @param body email
     * email of the user
     * @returns 
     * Returns the user after a successful login
     */
    app.post('/user/logInUserByEmailPassword/', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.put('http://localhost:40000/user/logInUserByEmailPassword/')
            .then(response => console.log(response.data));

            note that this is a put, so that an object can be sent to server
        */
        try {
            let user = await getUserByEmailPassword(req.body.email, req.body.password);
            res.send(user);
        } catch {
            console.log(`Error logging in user: ${req.body?.email}`);
            res.sendStatus(500);
        }
    });

    /**
     * User Exists By Email
     * @param email
     * an email address
     * @returns 
     * A boolean showing whether or not the email already exists in the database
     */
    app.get('/user/userExistsByEmail/:email', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.get('http://localhost:40000/user/userExistsByEmail/:email')
            .then(response => console.log(response.data));
        */
        let user = await checkForExistingEmail(req.params.email);
        res.send(user);
    });

    /**
     * Gets all users that are not on a team for a particular organization
     * @param orgId 
     * organizationID
     * @returns 
     * Returns all users that are not on a team for the organization associated with the orgId
     */
    app.get('/user/getAllUsersNotOnTeamByOrgId/:orgId', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.get('http://localhost:40000/user/getAllUsersNotOnTeamByOrgId/:orgId')
            .then(response => console.log(response.data));
        */
        let user = await getAllUsersNotOnTeamByOrgId(Number(req.params.orgId));
        res.send(user);
    });

    /**
     * Gets a user for a particular id
     * @param id
     * id of a user
     * @returns 
     * the user assocaited with a particular id
     */
    app.get('/user/getUserById/:id', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.get('http://localhost:40000/user/getUserById/[user id here]')
            .then(response => console.log(response.data));
        */
        let user = await getUserById(Number(req.params.id));
        res.send(user);
    });

    /**
     * Gets all users
     * @param none
     * @returns 
     * Returns all users
     */
    app.get('/user/getAllUsers', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.get('http://localhost:40000/user/getAllUsers')
            .then(response => console.log(response.data));
        */
        let user = await getAllUsers();
        res.send(user);
    });

    /**
     * Get All Active Users for an Organization
     * @param orgId 
     * id for an organization
     * @returns 
     * Returns all active users for an organization associated with a particular orgId
     */
    app.get('/user/getAllActiveUsersByOrgId/:orgId', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.get('http://localhost:40000/user/getAllActiveUsersByOrgId/:orgId')
            .then(response => console.log(response.data));
        */
        let activeUsers = await getAllActiveUsersByOrgId(Number(req.params.orgId));
        res.send(activeUsers);
    });

    /**
     * Get All Users for an Organization
     * @param orgId 
     * id for an organization
     * @returns 
     * Returns all users for an organization associated with a particular orgId
     */
    app.get('/user/getAllUsersByOrgId/:orgId', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.get('http://localhost:40000/user/getAllUsersByOrgId/:orgId')
            .then(response => console.log(response.data));
        */
        let allUsers = await getAllUsersByOrgId(Number(req.params.orgId));
        res.send(allUsers);
    });

    /**
     * Get All Users on a team
     * @param teamId
     * id for a team
     * @returns 
     * Returns all users on a team associated with a particular team id
     */
    app.get('/user/getAllUsersByTeamId/:teamId', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.get('http://localhost:40000/user/getAllUsersByTeamId/:teamId')
            .then(response => console.log(response.data));
        */
        let allUsers = await getAllUsersByTeamId(Number(req.params.teamId));
        res.send(allUsers);
    });

    app.get('/user/getAllUsersByMultipleTeamIds', async (req: Request, res: Response) => {
        // Example axios call in ManageTeamsPage
        let allUsers = await getAllUsersByMultipleTeamIds(req.query.teamIds);
        res.send(allUsers);
    });

    /*
    Gets the leetcode data required for the User statistics page
    Must call the endpoint from the backend since it has cors preventing a call from the frontend.
    */
    app.get('/user/getLeetcodeData/:username', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.get('http://localhost:40000/user/getLeetcodeData/:username')
            .then(response => console.log(response.data));
        */
        await axios.get("https://leetcode.com/graphql?query=query{allQuestionsCount { difficulty count } matchedUser(username: \"" + req.params.username +"\") { contributions { points } profile { reputation ranking } submissionCalendar submitStats { acSubmissionNum { difficulty count submissions } totalSubmissionNum { difficulty count submissions } } } }")
            .then(async (response: { data: any; }) => {
                res.send(response.data);
            }).catch((err) => console.log(err));
        
    });

    /**
     * Post a new user
     * @param param
     * newOrgName, existingOrgId
     * @returns 
     * Returns new user
     */
    //if the user is NOT joining an existing org, the existingOrgId should be 0
    app.post('/user/registerUser/:newOrgName/:existingOrgId', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.post('http://localhost:40000/user/registerUser/:newOrgName/:existingOrgId')
            .then(response => console.log(response.data));
        */
        try {
            let user = req.body;
            user = await registerUser(user, req.params.newOrgName, Number(req.params.existingOrgId));
            res.send(user);
        } catch(err) {
            console.log(err);
        }

    });

    /*
    Updates the user's leetcode username
    path params: email
    body params: leetcode username
    return: updated user
    */
    app.put('/user/updateLeetcodeUserByEmail/:email', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            const leetcodeUser = {
            leetcodeUsername: "username here"
            }
            axios.put('http://localhost:40000/user/updateLeetcodeUserByEmail/[user email here]', leetcodeUser)
            .then(response => console.log(response.data));
        */
        let user = await updateLeetcodeUserByEmail(req.params.email, req.body.leetcodeUsername);
        res.send(user);
    });

    /*
    Updates the user's codeforces username
    path params: email
    body params: codeforces username
    return: updated user
    */
    app.put('/user/updateCodeforcesUserByEmail/:email', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            const codeforcesUser = {
            codeforcesUsername: "username here"
            }
            axios.put('http://localhost:40000/user/updateCodeforcesUserByEmail/[user email here]', codeforcesUser)
            .then(response => console.log(response.data));
        */
        let user = await updateCodeforcesUserByEmail(req.params.email, req.body.codeforcesUsername);
        res.send(user);
    });

    /*
    Updates the user's uhunt id
    path params: email
    body params: uhunt id
    return: updated user
    */
    app.put('/user/updateUhuntUserByEmail/:email', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            const uhuntUser = {
            uhuntId: id here (integer)
            }
            axios.put('http://localhost:40000/user/updateUhuntUserByEmail/[user email here]', uhuntUser)
            .then(response => console.log(response.data));
        */
        let user = await updateUhuntUserByEmail(req.params.email, req.body.uhuntId);
        res.send(user);
    });

    /**
     * Update User Info
     * @body
     * user info
     * @returns 
     * Returns user with updated info
     */
    //This endpoint can be used to edit any of a user's info except email address.
    //You need to use the updateUserEmailByUserId endpoint to edit a user's email address
    app.put('/user/updateUserInfo', async (req: Request, res: Response) => {
       try {
        let user = req.body;
        let updatedUser = await updateUser(user);
        res.send(updatedUser);
       } catch(err) {
        console.log(err);
       }

    });

    /**
     * Update user email by user id
     * @param userId
     * id for a user
     * @param email
     * new email
     * @returns 
     * Returns updated user with new email if requested email is not already in use
     */
    app.put('/user/updateUserEmailByUserId/:userId/:email', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.put('http://localhost:40000/user/updateUserEmailByUserId/:userId/:email')
            .then(response => console.log(response.data));
        */
       try {
        let updatedUser = await updateUserEmailByUserId(Number(req.params.userId), req.params.email);
        res.send(updatedUser);
       } catch(err) {
        console.log(err);
       }

    });


    /**
     * Deactivate a user
     * @param userId
     * id for a user
     * @returns 
     * Returns user that was deactivated
     */
    app.put('/user/deactivateUserByUserId/:userId', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.put('http://localhost:40000/user/deactivateUserByUserId/:userId')
            .then(response => console.log(response.data));
        */
        let user = await deactivateUserByUserId(Number(req.params.userId));
        res.send(user);
    });

    /**
     * Update a user by email
     * @param email
     * email for the user to be updated
     * @body testEmail
     * @body detail
     * @returns 
     * Returns updated user
     */
    app.put('/user/updateUserDetailsByEmail/:email', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.put('http://localhost:40000/user/updateUserDetailsByEmail/:email')
            .then(response => console.log(response.data));
        */
        let user = await updateUserDetailsByEmail(req.body.testEmail, req.body.detail, req.body.update);
        res.send(user);
    });

}

