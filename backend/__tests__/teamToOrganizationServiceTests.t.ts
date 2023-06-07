import { TeamToOrganization } from '@prisma/client';
import { prismaMock } from '../singleton';
import { getAllTeamToOrganization, getAllTeamToOrgByOrgId, getTeamToOrganization, postTeamToOrganization, deleteTeamToOrganization } from '../src/Service/teamToOrganizationService';

describe('TeamToOrganization service tests', function() {

    test('Getting all TeamToOrganization mappings', async () => {
        const teamToOrganization : TeamToOrganization = {
            teamId: 1,
            organizationId: 1
        }
        prismaMock.teamToOrganization.findMany.mockResolvedValue([teamToOrganization]);

        await expect(getAllTeamToOrganization()).resolves.toEqual([{
            teamId: 1,
            organizationId: 1
        }])
    })

    test('Getting a specific TeamToOrganization mapping', async () => {
        const teamToOrganization : TeamToOrganization = {
            teamId: 1,
            organizationId: 1
        }
        prismaMock.teamToOrganization.findUniqueOrThrow.mockResolvedValue(teamToOrganization);

        await expect(getTeamToOrganization(1, 1)).resolves.toEqual({
            teamId: 1,
            organizationId: 1
        })
    })

    test('Posting a TeamToOrganization mapping', async () => {
        const teamToOrganization : TeamToOrganization = {
            teamId: 1,
            organizationId: 1
        }
        prismaMock.teamToOrganization.create.mockResolvedValue(teamToOrganization);

        await expect(postTeamToOrganization(1, 1)).resolves.toEqual({
            teamId: 1,
            organizationId: 1
        })
    })

    test('Deleting a TeamToOrganization mapping', async () => {
        const teamToOrganization : TeamToOrganization = {
            teamId: 1,
            organizationId: 1
        }
        prismaMock.teamToOrganization.delete.mockResolvedValue(teamToOrganization);

        await expect(deleteTeamToOrganization(1, 1)).resolves.toEqual({
            teamId: 1,
            organizationId: 1
        })
    })

    test('Finding many TeamToOrganization mappings by OrgId', async () => {
        const teamToOrganization : TeamToOrganization = {
            teamId: 1,
            organizationId: 1
        }
        prismaMock.teamToOrganization.findMany.mockResolvedValue([teamToOrganization]);

        await expect(getAllTeamToOrgByOrgId(1)).resolves.toEqual([{
            teamId: 1,
            organizationId: 1
        }])
    })

})