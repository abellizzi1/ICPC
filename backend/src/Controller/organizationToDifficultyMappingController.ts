import express, {Express, Request, Response} from 'express';
import { getMappingsByOrgId } from '../Service/organizationToDifficultyMappingService';
import { getMappingsByDiffId } from '../Service/organizationToDifficultyMappingService';
import { addNewOrgToDiffMapping } from '../Service/organizationToDifficultyMappingService';
import { removeOrgToDiffMapping, getAllOrgToDifficulty } from '../Service/organizationToDifficultyMappingService';

export function registerOrganizationToDifficultyMappingEndpoints(app: Express) {
    app.get('/organizationToDifficultyMapping', async (req: Request, res: Response) => {
        res.send('Hello, this is the organizationToDifficultyMapping Controller');
    });

    /*
    Get Organization to Difficulty Mapping by Org Id
    path params: orgId
    return: mappings associated to a particular organization
    */
    app.get('/organizationToDifficultyMapping/getMappingsByOrgId/:id', async (req: Request, res: Response) => {
        try {
            let mappings = await getMappingsByOrgId(Number(req.params.id));
            res.send(mappings);
        } catch(err) {
            console.log(err);
        }
    });

    /*
    Get All Organization to Difficulty Mappings
    path params: none
    return: all Organization to Difficulty Mappings
    */
    app.get('/organizationToDifficultyMapping', async (req: Request, res: Response) => {
        try {
            let mappings = await getAllOrgToDifficulty();
            res.send(mappings);
        } catch(err) {
            console.log(err);
        }
    });

    /*
    Get Organization to Difficulty Mapping by DifficultyId
    path params: difficultyId
    return: mappings associated to a particular difficulty
    */
    app.get('/organizationToDifficultyMapping/getMappingsByDiffId/:id', async (req: Request, res: Response) => {
        try {
            let mappings = await getMappingsByDiffId(Number(req.params.id));
            res.send(mappings);
        } catch(err) {
            console.log(err);
        }

    });

    /*
    Post Organization to Difficulty Mapping
    path params: orgId, diffId
    return: mapping that was created associated to a particular organization and difficulty
    */
    app.post('/organizationToDifficultyMapping/addNewOrgToDiffMapping/:orgId/:diffId', async (req: Request, res: Response) => {
        try{
            let mapping = await addNewOrgToDiffMapping(Number(req.params.orgId), Number(req.params.diffId));
            res.send(mapping);
        }
        catch(err){
            console.log(err)
        }
    });

    /*
    Remove Organization to Difficulty Mapping
    path params: orgId, diffId
    return: mapping that was removed associated to a particular organization and difficulty 
    */
    app.delete('/organizationToDifficultyMapping/deleteOrgToDiffMapping/:orgId/:diffId', async (req: Request, res: Response) => {
        try{
            let mapping = await removeOrgToDiffMapping(Number(req.params.orgId), Number(req.params.diffId));
            res.send(mapping);
        }
        catch(err){
            console.log(err)
        }
    });
}