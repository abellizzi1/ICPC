import {Express, Request, Response} from 'express';
import { getOrganizationById, postOrganization } from '../Service/organizationService';
import { getOrganizationByUserId } from '../Service/organizationService';
import { getAllOrganizations } from '../Service/organizationService';

export function registerOrganizationEndpoints(app: Express) {

    /*
    Get Organization By Id
    path params: organization id
    return: organization with a particular organization id
    */
    app.get('/organization/getOrganizationById/:id', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.get('http://localhost:40000/organization/getOrganizationById/:id')
            .then(response => console.log(response.data));
        */
        let organization = await getOrganizationById(Number(req.params.id));
        res.send(organization);
    });

    /*
    Post Organization
    path params: none
    body params: organization
    return: organization that has been added
    */
    app.post('/organization/postOrganization', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            const organization = {
            name: "name here"
            }
            axios.post('http://localhost:40000/organization/postOrganization', organization)
            .then(response => console.log(response.data));
        */
        let organization = await postOrganization(req.body.name);
        res.send(organization);
    });

    /*
    Get Organization by UserId
    path params: UserId
    return: Organization for a particular User
    */
    app.get('/organization/getOrganizationByUserId/:userId', async (req: Request, res: Response) => {
        let organization = await getOrganizationByUserId(Number(req.params.userId));
        res.send(organization);
    });

    /*
    Get All Organizations
    path params: none
    return: all organizations
    */
    app.get('/organization/getAllOrganizations', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.get('http://localhost:40000/organization/getAllOrganizations')
            .then(response => console.log(response.data));
        */
        let user = await getAllOrganizations();
        res.send(user);
    });

}

