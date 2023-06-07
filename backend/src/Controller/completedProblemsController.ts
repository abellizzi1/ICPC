import express, {Express, Request, Response} from 'express';
import { getAllCompletedProblems, getCompletedProblemsByUserId, getCompletedProblemsByUserIdProblemId, postCompletedProblems, deleteCompletedProblems, getCompletedProblemsByTeamId, getCompletedProblemsByOrgId } from '../Service/completedProblemsService';

export function registerCompletedProblemsEndpoints(app: Express) {
    
    /*
    Get All Completed Problems
    path params: none
    return: all problems that have been completed
    */
    app.get('/completedProblems/getAll', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.get('http://localhost:40000/completedProblems/getAll')
            .then(response => console.log(response.data));
        */
        let completedProblems = await getAllCompletedProblems();
        res.send(completedProblems);
    });

    /*
    Get All Completed Problems by userId
    path params: userId
    return: all problems that have been completed by a particular user
    */
    app.get('/completedProblems/getCompletedProblemsByUserId/:userid', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.get('http://localhost:40000/completedProblems/getCompletedProblemsByUserId/:userid')
            .then(response => console.log(response.data));
        */
        let completedProblems = await getCompletedProblemsByUserId(Number(req.params.userid));
        res.send(completedProblems);
    });

    /*
    Get All Completed Problems by Team
    path params: teamId
    return: all problems that have been completed by a particular team
    */
    app.get('/completedProblems/getCompletedProblemsByTeamId/:teamid', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.get('http://localhost:40000/completedProblems/getCompletedProblemsByTeamId/:teamid')
            .then(response => console.log(response.data));
        */
        let completedProblems = await getCompletedProblemsByTeamId(Number(req.params.teamid));
        res.send(completedProblems);
    });

    /*
    Get All Completed Problems by Organization
    path params: orgId
    return: all problems that have been completed by a particular organization
    */
    app.get('/completedProblems/getCompletedProblemsByOrgId/:orgid', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.get('http://localhost:40000/completedProblems/getCompletedProblemsByOrgId/:orgid')
            .then(response => console.log(response.data));
        */
        let completedProblems = await getCompletedProblemsByOrgId(Number(req.params.orgid));
        res.send(completedProblems);
    });

    app.get('/completedProblems/getCompletedProblemsByUserIdProblemId/:userid/:problemid', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.get('http://localhost:40000/completedProblems/getCompletedProblemsByUserIdProblemId/:userid/:problemid')
            .then(response => console.log(response.data));
        */
        let completedProblems = await getCompletedProblemsByUserIdProblemId(Number(req.params.userid), Number(req.params.problemid));
        res.send(completedProblems);
    });

    /*
    Post completed problem
    path params: userId, problemId
    return: the mapping associated with the problem that has been completed by the user
    */
    app.post('/completedProblems/:userid/:problemid', async (req: Request, res: Response) => {
        /*
            Example axios call:
            axios.post('http://localhost:40000/completedProblems/[user id here]/[problem id here]')
		    .then(response => console.log(response.data));
        */
        let completedProblems = await postCompletedProblems(Number(req.params.userid), Number(req.params.problemid));
        res.send(completedProblems);
    });

    /*
    Delete Completed Problem by userId
    path params: userId, problemId
    return: the mapping associated with the problem and user
    */
    app.delete('/completedProblems/:userid/:problemid', async (req: Request, res: Response) => {
        /*
            Example axios call:
            axios.delete('http://localhost:40000/completedProblems/[user id here]/[problem id here]')
		    .then(response => console.log(response.data));
        */
        let completedProblems = await deleteCompletedProblems(Number(req.params.userid), Number(req.params.problemid));
        res.send(completedProblems);
    });

}