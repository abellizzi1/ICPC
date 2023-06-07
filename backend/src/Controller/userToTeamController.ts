import {Express, Request, Response} from 'express';
import { getAllUserToTeam, getUserToTeam, postUserToTeam, deleteUserToTeam, getUserToTeamByTeamId, getUserToTeamByUserId } from '../Service/userToTeamService';

export function registerUserToTeamEndpoints(app: Express) {

    /*
    Get all user to team mappings
    path params: none
    return: All mappings associating users to teams
    */
    app.get('/userToTeam/getAll', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.get('http://localhost:40000/userToTeam/getAll')
            .then(response => console.log(response.data));
        */
        let userToTeam = await getAllUserToTeam();
        res.send(userToTeam);
    });

    /*
    Get user to team mappings by userId and team Id 
    path params: userId, teamId
    return: Mapping associating a particular user to a particular team
    */
    app.get('/userToTeam/getUserToTeamByUserIdTeamId/:userid/:teamid', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.get('http://localhost:40000/userToTeam/getUserToTeamByUserIdTeamId/:userid/:teamid')
            .then(response => console.log(response.data));
        */
        let userToTeam = await getUserToTeam(Number(req.params.userid), Number(req.params.teamid));
        res.send(userToTeam);
    });

    /*
    Get user to team mapping by user Id
    path params: userId
    return: Mapping associating a particular user to team
    */
    app.get('/userToTeam/getUserToTeamByUserId/:userid', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.get('http://localhost:40000/userToTeam/getUserToTeamByUserId/:userid')
            .then(response => console.log(response.data));
        */
        let userToTeam = await getUserToTeamByUserId(Number(req.params.userid));
        res.send(userToTeam);
    });

    /*
    Get User to team mappings by team id
    path params: team
    return: All mappings associating a particular team to their users
    */
    app.get('/userToTeam/getUserToTeamByTeamId/:teamid', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.get('http://localhost:40000/userToTeam/getUserToTeamByTeamId/:teamid')
            .then(response => console.log(response.data));
        */
        let userToTeam = await getUserToTeamByTeamId(Number(req.params.teamid));
        res.send(userToTeam);
    });

    /*
    Post new user to team mapping
    path params: userId, teamid
    return: New mapping associating a particular user to a particular team
    */
    app.post('/userToTeam/:userid/:teamid', async (req: Request, res: Response) => {
        /*
            Example axios call:
            axios.post('http://localhost:40000/userToTeam/[user id here]/[team id here]')
		    .then(response => console.log(response.data));
        */
        let userToTeam = await postUserToTeam(Number(req.params.userid), Number(req.params.teamid));
        res.send(userToTeam);
    });

    /*
    Remove user to team mapping
    path params: userId, teamId
    return: Mapping that was removed associating a particular user to a particular team
    */
    app.delete('/userToTeam/:userid/:teamid', async (req: Request, res: Response) => {
        /*
            Example axios call:
            axios.delete('http://localhost:40000/userToTeam/[user id here]/[team id here]')
		    .then(response => console.log(response.data));
        */
        let userToTeam = await deleteUserToTeam(Number(req.params.userid), Number(req.params.teamid));
        res.send(userToTeam);
    });

}

