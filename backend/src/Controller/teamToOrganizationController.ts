import {Express, Request, Response} from 'express';
import { getAllTeamToOrganization, getTeamToOrganization, postTeamToOrganization, deleteTeamToOrganization } from '../Service/teamToOrganizationService';

export function registerTeamToOrganizationEndpoints(app: Express) {

    /*
    Get All Team to Organization Mappings
    path params: none
    return: all mappings associating teams to their organizations
    */
    app.get('/teamToOrganization/getAll', async (req: Request, res: Response) => {
        /*
            Example axios call: 
            axios.get('http://localhost:40000/teamToOrganization/getAll')
            .then(response => console.log(response.data));
        */
        let teamToOrganization = await getAllTeamToOrganization();
        res.send(teamToOrganization);
    });
    
    /*
    Get Team to Organization Mapping by team and organization
    path params: teamId, orgId
    return: mapping associating a particular team to its organization
    */
    app.get('/teamToOrganization/getTeamToOrganizationByTeamIdOrgId/:teamid/:organizationid', async (req: Request, res: Response) => {
        /*
            Example axios call:
            axios.get('http://localhost:40000/teamToOrganization/getTeamToOrganizationByTeamIdOrgId/:teamid/:organizationid')
		    .then(response => console.log(response.data));
        */
        let teamToOrganization = await getTeamToOrganization(Number(req.params.teamid), Number(req.params.organizationid));
        res.send(teamToOrganization);
    });

    /*
    Post new Team to Organization Mapping
    path params: teamId, organizationId
    return: new mapping created associating a particular team to its organizations
    */
    app.post('/teamToOrganization/:teamid/:organizationid', async (req: Request, res: Response) => {
        /*
            Example axios call:
            axios.post('http://localhost:40000/teamToOrganization/[team id here]/[organization id here]')
		    .then(response => console.log(response.data));
        */
        let teamToOrganization = await postTeamToOrganization(Number(req.params.teamid), Number(req.params.organizationid));
        res.send(teamToOrganization);
    });

    /*
    Delete Team to Organization Mapping
    path params: teamId, orgId
    return: all mapping that was removed associating a particular team to its organization
    */
    app.delete('/teamToOrganization/:teamid/:organizationid', async (req: Request, res: Response) => {
        /*
            Example axios call:
            axios.delete('http://localhost:40000/teamToOrganization/[team id here]/[organization id here]')
		    .then(response => console.log(response.data));
        */
        let teamToOrganization = await deleteTeamToOrganization(Number(req.params.teamid), Number(req.params.organizationid));
        res.send(teamToOrganization);
    });
}

