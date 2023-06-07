import { Problem } from '@prisma/client';
import express, {Express, Request, Response} from 'express';
import { getProblemById } from '../Service/problemService';
import { getAllDefaultProblems } from '../Service/problemService';
import { getAllProblems } from '../Service/problemService';
import { getProblemsByUserId, getProblemsByCategoryId } from '../Service/problemService';
import { postProblem } from '../Service/problemService';
import { removeProblem } from '../Service/problemService';
import { getProblemsByOrgId, getProblemsAndCategoriesByUserId, updateProblem } from '../Service/problemService';

export function registerProblemEndpoints(app: Express) {
    app.get('/problem', async (req: Request, res: Response) => {
        res.send('Hello, this is the Problem Controller');
    });

    app.get('/problem/getProblemsAndCategoriesByUserId/:userId', async (req: Request, res: Response) => {
        let problem = await getProblemsAndCategoriesByUserId(Number(req.params.userId));
        res.send(problem);
    });

    /*
    Get Problem by ProblemId
    path params: probId
    return: problem associated with a particular id
    */
    app.get('/problem/getProblemById/:id', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.get('http://localhost:40000/problem/getProblemById/:id')
            .then(response => console.log(response.data));
        */
        let problem = await getProblemById(Number(req.params.id));
        res.send(problem);
    });

    /*
    Get All Default Problems
    path params: none
    return: All Default Problems
    */
    app.get('/problem/getAllDefaultProblems', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.get('http://localhost:40000/problem/getAllDefaultProblems')
            .then(response => console.log(response.data));
        */
        let problems = await getAllDefaultProblems();
        res.send(problems);
    });

    // Updates a problem and returns it
    app.put('/problem/updateProblem', async (req: Request, res: Response) => {
        let problem = await updateProblem(req.body);
        res.send(problem);
    });

    /*
    Get All Problems
    path params: none
    return: All Problems
    */
    app.get('/problem/getAllProblems', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.get('http://localhost:40000/problem/getAllProblems')
            .then(response => console.log(response.data));
        */
        let problemList = await getAllProblems();
        res.send(problemList);
    });


    /*
    Get Problem by user Id
    path params: userId
    return: all problems associated with a particular user
    */
    app.get('/problem/getProblemsByUserId/:userId', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.get('http://localhost:40000/problem/getProblemsByUserId/:userId')
            .then(response => console.log(response.data));
        */
        let problemList = await getProblemsByUserId(Number(req.params.userId));
        res.send(problemList);
    });

    /**
     * Get Problems By Organization Id
     * @param path orgId
     * @returns problems associated with a particular organization
     */
    app.get('/problem/getProblemsByOrgId/:orgId', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.get('http://localhost:40000/problem/getProblemsByUserId/:userId')
            .then(response => console.log(response.data));
        */
        let problemList = await getProblemsByOrgId(Number(req.params.orgId));
        res.send(problemList);
    });

    /*
    Get Problem by Category Id
    path params: catId
    return: all problems associated with a particular category
    */
    app.get('/problem/getProblemsByCategoryId/:categoryid', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.get('http://localhost:40000/problem/getProblemsByCategoryId/[category id here]')
            .then(response => console.log(response.data));
        */
        let problemList = await getProblemsByCategoryId(Number(req.params.categoryid));
        res.send(problemList);
    });

    /*
    Post A New Problem
    path params: userId, catId
    return: problem that was added
    */
    app.post('/problem/postProblem/:userId/:catId', async (req: Request, res: Response) => {

        try {
            let problem = req.body;
            problem = await postProblem(Number(req.params.userId), Number(req.params.catId), problem);
            res.send(problem);

        } catch(err) {
            console.log(err);
        }   

    });

    /*
    Remove Problem
    path params: userId, probId
    return: mapping that was removed associating an organization to a problem
    */
    app.delete('/problem/removeProblem/:userId/:probId', async (req: Request, res: Response) => {
        try{
            let orgToProbMapping = await removeProblem(Number(req.params.userId), Number(req.params.probId));
            res.send(orgToProbMapping);
        }
        catch(err){
            console.log(err)
        }
    });

    

}