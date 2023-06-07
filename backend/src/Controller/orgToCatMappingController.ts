import express, {Express, Request, Response} from 'express';
import { getAllOrgToCatMappings } from '../Service/orgToCatMappingService';

export function registerOrgToCatMappingEndpoints(app: Express) {
    app.get('/orgToCatMapping', async (req: Request, res: Response) => {
        res.send('Hello, this is the orgToCatMapping Controller');
    });

    /*
    Get All Organization to Category Mappings
    path params: none
    return: All Organization to Category Mappings
    */
    app.get('/difficulty/getAllOrgToCatMappings', async (req: Request, res: Response) => {
        try {
            let mappings = await getAllOrgToCatMappings();
            res.send(mappings);
        } catch(err) {
            console.log(err);
        }

    });
}