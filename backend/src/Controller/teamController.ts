import express, {Express, Request, Response} from 'express';
import { getAllAvailableTeamsByUserId, getTeamById, postTeam } from '../Service/teamService';
import { getAllTeamsByOrgId } from '../Service/teamService';
import { getAllAvailableTeamsByOrgId } from '../Service/teamService';
import { getAllTeamsByUserId } from '../Service/teamService';


export function registerTeamEndpoints(app: Express) {
    
    /**
     * Get Team By Id
     * @param path team id
     * @returns team associated with the id
     */
    app.get('/team/getTeamById/:id', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.get('http://localhost:40000/team/getTeamById/[team id here]')
            .then(response => console.log(response.data));
        */
        let team = await getTeamById(Number(req.params.id));
        res.send(team);
    });

    /**
     * Post new team
     * @param path userId
     * @param body name of the team to be added
     * @returns new team added to organization the userId is associated with
     */
    app.post('/team/postTeam/:userId', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            const team = {
            name: "name here"
            }
            axios.post('http://localhost:40000/team/postTeam/:userId', team)
            .then(response => console.log(response.data));
        */
        let team = await postTeam(req.body.name, Number(req.params.userId));
        res.send(team);
    });

    /**
     * Get Teams By orgId
     * @param path orgId
     * @returns teams associated with the orgId
     */
    app.get('/team/getAllTeamsByOrgId/:orgId', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.get('http://localhost:40000/team/getTeamById/[team id here]')
            .then(response => console.log(response.data));
        */
        let teams = await getAllTeamsByOrgId(Number(req.params.orgId));
        res.send(teams);
    });

    /**
     * Get Teams By userId
     * @param path userId
     * @returns teams associated with the organization the userId belongs to.
     */
    app.get('/team/getAllTeamsByUserId/:userId', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.get('http://localhost:40000/team/getAllTeamsByUserId/:userId')
            .then(response => console.log(response.data));
        */
        let teams = await getAllTeamsByUserId(Number(req.params.userId));
        res.send(teams);
    });

    /**
     * Get Availble Teams By orgId
     * @param path orgId
     * @returns teams associated with the organization
     * that have less than the max number of users on that team.
     */
    app.get('/team/getAllAvailableTeamsByOrgId/:orgId', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.get('http://localhost:40000/team/getTeamById/[team id here]')
            .then(response => console.log(response.data));
        */
        let teams = await getAllAvailableTeamsByOrgId(Number(req.params.orgId));
        res.send(teams);
    });

    /**
     * Get Availble Teams By userId
     * @param path userId
     * @returns teams associated with the organization the userId belongs to
     * that have less than the max number of users on that team.
     */
    app.get('/team/getAllAvailableTeamsByUserId/:userId', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.get('http://localhost:40000/team/getTeamById/[team id here]')
            .then(response => console.log(response.data));
        */
        let teams = await getAllAvailableTeamsByUserId(Number(req.params.userId));
        res.send(teams);
    });

}