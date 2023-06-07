import { Team, UserToOrganization } from '@prisma/client';
import { prismaMock } from '../singleton';
import { getTeamById, postTeam } from '../src/Service/teamService';
import { postUserToOrganization } from '../src/Service/userToOrganizationService';
import { Organization } from '../src/Model/organization';

describe('Team service tests', function() {

    test('Getting a team', async () => {
        const team : Team = {
            id: 1,
            name: "Test team"
        }
        prismaMock.team.findUniqueOrThrow.mockResolvedValue(team);

        await expect(getTeamById(1)).resolves.toEqual({
            id: 1,
            name: "Test team"
        })
    })

})