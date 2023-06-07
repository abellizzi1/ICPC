import express, {Express, Request, Response} from 'express';
import { getAllDifficulties } from '../Service/difficultyService';
import { getDifficultyByName } from '../Service/difficultyService';
import { getDifficultyById, getDifficultiesByUserId } from '../Service/difficultyService';
import { addNewDifficulty, getDifficultiesByOrgId } from '../Service/difficultyService';
import { removeOrgToDiffMapping } from '../Service/organizationToDifficultyMappingService';
import { getDefaultDifficulties, updateDifficulty } from '../Service/difficultyService';


export function registerDifficultyEndpoints(app: Express) {
    app.get('/difficulty', async (req: Request, res: Response) => {
        res.send('Hello, this is the Difficulty Controller');
    });

    /** 
    * Get All Difficulties
    * @param: path- none
    * @return: all difficulties
    */
    app.get('/difficulty/getAllDifficulties', async (req: Request, res: Response) => {
        try {
            let difficulties = await getAllDifficulties();
            res.send(difficulties);
        } catch(err) {
            console.log(err);
        }

    });

    // updates a difficulty by id
    app.put('/difficulty/updateDifficulty/:difficultyId', async (req: Request, res: Response) => {
        try {
            let difficulties = await updateDifficulty(Number(req.params.difficultyId), req.body.name);
            res.send(difficulties);
        } catch(err) {
            console.log(err);
        }

    });

    /**
     * Get Diffiulties By User ID
     * @param path: userid
     * @return all difficulties associated with that userid
     */
    app.get('/difficulty/getDifficultiesByUserId/:userid', async (req: Request, res: Response) => {
        try {
            let difficulties = await getDifficultiesByUserId(Number(req.params.userid));
            res.send(difficulties);
        } catch(err) {
            console.log(err);
        }

    });

    /**
     * Get Difficulty by Name
     * @param path - name of difficulty
     * @return difficulty with the given name
     */
    app.get('/difficulty/getDifficultyByName/:name', async (req: Request, res: Response) => {
        try {
            let difficulty = await getDifficultyByName(req.params.name);
            res.send(difficulty);
        } catch(err) {
            console.log(err);
        }

    });

    /**
     * Get All Difficulties By orgid
     * @param path - orgid
     * @return All dificuties for the organization associated with the given orgid
     */
    app.get('/difficulty/getDifficultiesByOrg/:orgid', async (req: Request, res: Response) => {
        /*
            Example axios call:
            axios.get('http://localhost:40000/difficulty/getDifficultiesByOrg/:orgid')
		    .then(response => console.log(response.data));
        */
        try {
            let difficulties = await getDifficultiesByOrgId(Number(req.params.orgid));
            res.send(difficulties);
        } catch(err) {
            console.log(err);
        }

    });

    /**
     * Get Difficulty by difficulty id
     * @param path: - id
     * @return difficuly associated with the given difficulty id
     */
    app.get('/difficulty/getDifficultyById/:id', async (req: Request, res: Response) => {
        /*
            Example axios call:
            axios.get('http://localhost:40000/difficulty/getDifficultyById/:id')
		    .then(response => console.log(response.data));
        */
        try {
            let difficulty = await getDifficultyById(Number(req.params.id));
            res.send(difficulty);
        } catch(err) {
            console.log(err);
        }

    });

    /**
     * Get All Default Difficulties
     * @param: none
     * @return all default difficulties
     */
    app.get('/difficulty/getDefaultDifficulties', async (req: Request, res: Response) => {
        /*
            Example axios call:
            axios.get('http://localhost:40000/difficulty/getDifficultyById/:id')
		    .then(response => console.log(response.data));
        */
        try {
            let difficulties = await getDefaultDifficulties();
            res.send(difficulties);
        } catch(err) {
            console.log(err);
        }

    });

    /**
     * Post New Difficulty
     * @param path: -name, userId
     * @return new difficulty posted with given name accociated with given userId
     */
    app.post('/difficulty/addNewDifficulty/:userId', async (req: Request, res: Response) => {
        try{
            let difficulty = await addNewDifficulty(req.body.name, Number(req.params.userId));
            res.send(difficulty);
        }
        catch(err){
            console.log(err)
        }
    });

    /**
     * Delete Difficulty
     * @param path:-orgId, diffId
     * @return mapping that was deleted associated with given orgId and diffId
     */
    app.delete('/difficulty/removeOrgToDiffMapping/:userId/:diffId', async (req: Request, res: Response) => {
        try{
            let difficultyMapping = await removeOrgToDiffMapping(Number(req.params.userId), Number(req.params.diffId));
            res.send(difficultyMapping);
        }
        catch(err){
            console.log(err)
        }
    });

}