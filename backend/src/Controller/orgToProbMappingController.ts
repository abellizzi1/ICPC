import express, {Express, Request, Response} from 'express';
import { getAllOrgToProbMappings } from '../Service/orgToProbMappingService';

export function registerOrgToProbMappingEndpoints(app: Express) {
    app.get('/orgToProbMapping', async (req: Request, res: Response) => {
        res.send('Hello, this is the Org To Prob Mapping Controller');
    });

    /*
    Get All Organization to Problem Mappings
    path params: none
    return: all mappings associating Organizations to Problems
    */
    app.get('/orgToProbMapping/getAllOrgToProbMappings', async (req: Request, res: Response) => {
        try {
            let mappings = await getAllOrgToProbMappings();
            res.send(mappings);
        } catch(err) {
            console.log(err);
        }

    });

}