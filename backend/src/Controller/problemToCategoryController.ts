import {Express, Request, Response} from 'express';
import { getAllProblemToCategory, updateProblemToCategory, getProblemToCategory, postProblemToCategory, deleteProblemToCategory } from '../Service/problemToCategoryService'

export function registerProblemToCategoryEndpoints(app: Express) {

    /*
    Get All Problem To Category Mappings
    path params: none
    return: all mappings associating problems to their category
    */
    app.get('/problemToCategory/getAll', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.get('http://localhost:40000/problemToCategory/getAll')
            .then(response => console.log(response.data));
        */
        let problemToCategory = await getAllProblemToCategory();
        res.send(problemToCategory);
    });

    //updates a problemToCategory mapping
    app.put('/problemToCategory/updateProblemToCategory/:problemId/:newCategoryId', async (req: Request, res: Response) => {
        let problemToCategory = await updateProblemToCategory(Number(req.params.problemId), Number(req.params.newCategoryId));
        res.send(problemToCategory);
    });

    /*
    Get Problem To Category Mapping by problemId and catId
    path params: probId, catId
    return: mapping associating a particular problem to it's category
    */
    app.get('/problemToCategory/problemToCategoryByProblemIdCategoryId:problemid/:categoryid', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.get('http://localhost:40000/problemToCategory/problemToCategoryByProblemIdCategoryId:problemid/:categoryid')
            .then(response => console.log(response.data));
        */
        let problemToCategory = await getProblemToCategory(Number(req.params.problemid), Number(req.params.categoryid));
        res.send(problemToCategory);
    });

    /*
    Post New Problem To Category Mapping
    path params: problemId, categoryId
    return: mapping associating  a particular problem to its category
    */
    app.post('/problemToCategory/:problemid/:categoryid', async (req: Request, res: Response) => {
        /*
            Example axios call:
            axios.post('http://localhost:40000/problemToCategory/[problem id here]/[category id here]')
		    .then(response => console.log(response.data));
        */
        let problemToCategory = await postProblemToCategory(Number(req.params.problemid), Number(req.params.categoryid));
        res.send(problemToCategory);
    });

    /*
    Remove Problem To Category Mapping
    path params: problemId, categoryId
    return: mapping associating a particular problem to its category that was removed
    */
    app.delete('/problemToCategory/:problemid/:categoryid', async (req: Request, res: Response) => {
        /*
            Example axios call:
            axios.delete('http://localhost:40000/problemToCategory/[problem id here]/[category id here]')
		    .then(response => console.log(response.data));
        */
        let problemToCategory = await deleteProblemToCategory(Number(req.params.problemid), Number(req.params.categoryid));
        res.send(problemToCategory);
    });

}

