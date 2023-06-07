import { UserToTeam } from '@prisma/client';
import { prismaMock } from '../singleton';
import { getAllUserToTeam, deleteUserToTeam, postUserToTeam, getUserToTeamByTeamId, getUserToTeam, getUserToTeamByUserId } from '../src/Service/userToTeamService';

describe('UserToTeam service tests', function() {

    test('Getting all UserToTeam mappings', async () => {
        const userToTeam : UserToTeam = {
            userId: 1,
            teamId: 1
        }

        prismaMock.userToTeam.findMany.mockResolvedValue([userToTeam]);

        await expect(getAllUserToTeam()).resolves.toEqual([{
            userId: 1,
            teamId: 1
        }])
    })

    test('Getting a specific UserToTeam mapping', async () => {
        const userToTeam : UserToTeam = {
            userId: 1,
            teamId: 1
        }

        prismaMock.userToTeam.findUniqueOrThrow.mockResolvedValue(userToTeam);

        await expect(getUserToTeam(1, 1)).resolves.toEqual({
            userId: 1,
            teamId: 1
        })
    })

    test('Getting UserToTeam mappings by User id', async () => {
        const userToTeam : UserToTeam = {
            userId: 1,
            teamId: 1
        }

        prismaMock.userToTeam.findMany.mockResolvedValue([userToTeam]);

        await expect(getUserToTeamByUserId(1)).resolves.toEqual([{
            userId: 1,
            teamId: 1
        }])
    })

    test('Getting UserToTeam mappings by Team id', async () => {
        const userToTeam : UserToTeam = {
            userId: 1,
            teamId: 1
        }

        prismaMock.userToTeam.findMany.mockResolvedValue([userToTeam]);

        await expect(getUserToTeamByTeamId(1)).resolves.toEqual([{
            userId: 1,
            teamId: 1
        }])
    })

    test('Deleting a UserToTeam mapping', async () => {
        const userToTeam : UserToTeam = {
            userId: 1,
            teamId: 1
        }

        prismaMock.userToTeam.delete.mockResolvedValue(userToTeam);

        await expect(deleteUserToTeam(1, 1)).resolves.toEqual({
            userId: 1,
            teamId: 1
        })
    })

})