import {Express, Request, Response} from 'express';
import { getAllUserToOrganization, getUserToOrgMappingsByUserId, getUserToOrganization, postUserToOrganization, deleteUserToOrganization } from '../Service/userToOrganizationService';
import { getUserToOrgMappingsByOrgId } from '../Service/userToOrganizationService';

export function registerUserToOrganizationEndpoints(app: Express) {

    /*
    Get all user to organization mappings
    path params: none
    return: All mappings associating users to organizations
    */
    app.get('/userToOrganization/getAll', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.get('http://localhost:40000/userToOrganization/getAll')
            .then(response => console.log(response.data));
        */

        // console.log("We are in the get all user to organization endpoint");

        let userToOrganization = await getAllUserToOrganization();
        res.send(userToOrganization);
    });

    /*
    Get all User to Organiation mapping by org id
    path params: orgId
    return: All mappings associating users to a particular organization
    */
    app.get('/userToOrganization/getUserToOrgMappingsByOrgId/:orgId', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.get('http://localhost:40000/userToOrganization/getUserToOrgMappingsByOrgId/:orgId')
            .then(response => console.log(response.data));
        */

        // console.log("We are in the correct endpoint");

        let mappings = await getUserToOrgMappingsByOrgId(Number(req.params.orgId));
        res.send(mappings);
    });

    /*
    Get user to organization mapping by user Id
    path params: userId
    return: Mapping associating user to organization
    */
    app.get('/userToOrganization/getUserToOrgMappingsByUserId/:userId', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.get('http://localhost:40000/userToOrganization/getUserToOrgMappingsByUserId/:userId')
            .then(response => console.log(response.data));
        */

        let mappings = await getUserToOrgMappingsByUserId(Number(req.params.userId));
        res.send(mappings);
    });

    /*
    Post user to organization mapping
    path params: userId, organizationId
    return: New mapping associating user to organization
    */
    app.post('/userToOrganization/:userid/:organizationid', async (req: Request, res: Response) => {
        /*
            Example axios call:
            axios.post('http://localhost:40000/userToOrganization/[user id here]/[organization id here]')
		    .then(response => console.log(response.data));
        */
        let userToOrganization = await postUserToOrganization(Number(req.params.userid), Number(req.params.organizationid));
        res.send(userToOrganization);
    });

    /*
    Remove user to organization mapping
    path params: userId, organizationId
    return: mapping associating a particular user to a particular organization
    */
    app.delete('/userToOrganization/:userid/:organizationid', async (req: Request, res: Response) => {
        /*
            Example axios call:
            axios.delete('http://localhost:40000/userToOrganization/[user id here]/[organization id here]')
		    .then(response => console.log(response.data));
        */
        let userToOrganization = await deleteUserToOrganization(Number(req.params.userid), Number(req.params.organizationid));
        res.send(userToOrganization);
    });

}

