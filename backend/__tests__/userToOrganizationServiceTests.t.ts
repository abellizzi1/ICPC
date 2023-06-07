import { UserToOrganization } from '@prisma/client';
import { prismaMock } from '../singleton';
import { getAllUserToOrganization, deleteUserToOrganization, postUserToOrganization, getUserToOrgMappingsByUserId, getUserToOrganization, getUserToOrgMappingsByOrgId } from '../src/Service/userToOrganizationService';

describe('UserToOrganization service tests', function() {

    test('Getting all UserToOrganization mappings', async () => {
        const userToOrganization : UserToOrganization = {
            userId: 1,
            organizationId: 1
        }
        prismaMock.userToOrganization.findMany.mockResolvedValue([userToOrganization]);

        await expect(getAllUserToOrganization()).resolves.toEqual([{
            userId: 1,
            organizationId: 1
        }])
    })

    test('Getting a specific UserToOrganization mapping', async () => {
        const userToOrganization : UserToOrganization = {
            userId: 1,
            organizationId: 1
        }
        prismaMock.userToOrganization.findUniqueOrThrow.mockResolvedValue(userToOrganization);

        await expect(getUserToOrganization(1, 1)).resolves.toEqual({
            userId: 1,
            organizationId: 1
        })
    })

    test('Getting UserToOrganization mappings by OrgId', async () => {
        const userToOrganization : UserToOrganization = {
            userId: 1,
            organizationId: 1
        }
        prismaMock.userToOrganization.findMany.mockResolvedValue([userToOrganization]);

        await expect(getUserToOrgMappingsByOrgId(1)).resolves.toEqual([{
            userId: 1,
            organizationId: 1
        }])
    })

    test('Getting UserToOrganization mappings by UserId', async () => {
        const userToOrganization : UserToOrganization = {
            userId: 1,
            organizationId: 1
        }
        prismaMock.userToOrganization.findMany.mockResolvedValue([userToOrganization]);

        await expect(getUserToOrgMappingsByUserId(1)).resolves.toEqual([{
            userId: 1,
            organizationId: 1
        }])
    })

    test('Posting a UserToOrganization mapping', async () => {
        const userToOrganization : UserToOrganization = {
            userId: 1,
            organizationId: 1
        }
        prismaMock.userToOrganization.create.mockResolvedValue(userToOrganization);

        await expect(postUserToOrganization(1, 1)).resolves.toEqual({
            userId: 1,
            organizationId: 1
        })
    })

    test('Deleting a UserToOrganization mapping', async () => {
        const userToOrganization : UserToOrganization = {
            userId: 1,
            organizationId: 1
        }
        prismaMock.userToOrganization.delete.mockResolvedValue(userToOrganization);

        await expect(deleteUserToOrganization(1, 1)).resolves.toEqual({
            userId: 1,
            organizationId: 1
        })
    })

})