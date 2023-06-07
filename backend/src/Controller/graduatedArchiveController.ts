import {Express, Request, Response} from 'express';
import { getAllGraduated, getGraduatedInOrganizationByUserId, getGraduatedByUserId, postGraduated, deleteGraduated } from '../Service/graduatedArchiveService';

export function registerGraduatedEndpoints(app: Express) {

    /*
    Get All Graduated
    path params: none
    return: all graduated users
    */
    app.get('/graduated/getAll', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.get('http://localhost:40000/graduated/getAll')
            .then(response => console.log(response.data));
        */
        let graduated = await getAllGraduated();
        res.send(graduated);
    });

    /*
    Get All Graduated by UserID
    path params: userId
    return: all graduated users for a particular organization
    */
    app.get('/graduated/getGraduatedInOrganizationByUserId/:userId', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.get('http://localhost:40000/graduated/getGraduatedInOrganizationByUserId/:userId')
            .then(response => console.log(response.data));
        */
        let graduated = await getGraduatedInOrganizationByUserId(Number(req.params.userId));
        res.send(graduated);
    });

    /*
    Get Graduated By User Id
    path params: userId
    return: user that has graduated
    */
    app.get('/graduated/getGraduatedByUserId/:userId', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.get('http://localhost:40000/graduated/getGraduatedByUserId/:userId')
            .then(response => console.log(response.data));
        */
        let graduated = await getGraduatedByUserId(Number(req.params.userId));
        res.send(graduated);
    });

    /*
    Post Graduated
    path params: userId
    return: add a user to the graduated database
    */
    app.post('/graduated/post/:userId', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            const graduated = {
            major: "major here",
            yearGraduated: year graduated here (int)
            }
            axios.post('http://localhost:40000/graduated/post/:userId', graduated)
            .then(response => console.log(response.data));
        */
        let graduated = await postGraduated(Number(req.params.userId), req.body.major, req.body.yearGraduated);
        res.send(graduated);
    });

    /*
    Remove Graduated
    path params: userId
    return: removed user from being graduated
    */
    app.delete('/graduated/delete/:userId', async (req: Request, res: Response) => {
        /*
            Example axios call:
            axios.delete('http://localhost:40000/graduated/delete/:userId')
		    .then(response => console.log(response.data));
        */
        let graduated = await deleteGraduated(Number(req.params.userId));
        res.send(graduated);
    });

}

