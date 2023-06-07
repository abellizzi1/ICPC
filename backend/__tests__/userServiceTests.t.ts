import { User } from '@prisma/client';
import { prismaMock } from '../singleton';
import { getUserByEmail, deactivateUserByUserId, updateUhuntUserByEmail, updateCodeforcesUserByEmail, getUserById, getAllUsers, updateLeetcodeUserByEmail } from '../src/Service/userService';

describe('User service tests', function() {

    const testUser : User = {
        id: 1,
        firstName: "Test",
        lastName: "Test",
        email: "test@email.com",
        phone: "555-555-5555",
        isAdmin: 0,
        isHeadCoach: 0,
        isAssistantCoach: 0,
        isCoach: 0,
        isMentor: 0,
        isStudent: 1,
        isActive: 1,
        leetcodeUsername: "test",
        codeforcesUsername: "test",
        uhuntId: 0
    }

    test('Getting a user by email', async () => {
        const user : User = testUser;
        prismaMock.user.findUniqueOrThrow.mockResolvedValue(user);

        await expect(getUserByEmail("test@email.com")).resolves.toEqual({
            id: 1,
            firstName: "Test",
            lastName: "Test",
            email: "test@email.com",
            phone: "555-555-5555",
            isAdmin: 0,
            isHeadCoach: 0,
            isAssistantCoach: 0,
            isCoach: 0,
            isMentor: 0,
            isStudent: 1,
            isActive: 1,
            leetcodeUsername: "test",
            codeforcesUsername: "test",
            uhuntId: 0
        })
    })

    test('Getting a user by id', async () => {
        const user : User = testUser;
        prismaMock.user.findUniqueOrThrow.mockResolvedValue(user);

        await expect(getUserById(1)).resolves.toEqual({
            id: 1,
            firstName: "Test",
            lastName: "Test",
            email: "test@email.com",
            phone: "555-555-5555",
            isAdmin: 0,
            isHeadCoach: 0,
            isAssistantCoach: 0,
            isCoach: 0,
            isMentor: 0,
            isStudent: 1,
            isActive: 1,
            leetcodeUsername: "test",
            codeforcesUsername: "test",
            uhuntId: 0
        })
    })

    test('Getting all users', async () => {
        const user : User = testUser;
        prismaMock.user.findMany.mockResolvedValue([user]);

        await expect(getAllUsers()).resolves.toEqual([{
            id: 1,
            firstName: "Test",
            lastName: "Test",
            email: "test@email.com",
            phone: "555-555-5555",
            isAdmin: 0,
            isHeadCoach: 0,
            isAssistantCoach: 0,
            isCoach: 0,
            isMentor: 0,
            isStudent: 1,
            isActive: 1,
            leetcodeUsername: "test",
            codeforcesUsername: "test",
            uhuntId: 0
        }])
    })

    test('Updating leetcode username by email', async () => {
        const user : User = testUser;
        prismaMock.user.update.mockResolvedValue(user);

        await expect(updateLeetcodeUserByEmail("test@email.com", "test")).resolves.toEqual({
            id: 1,
            firstName: "Test",
            lastName: "Test",
            email: "test@email.com",
            phone: "555-555-5555",
            isAdmin: 0,
            isHeadCoach: 0,
            isAssistantCoach: 0,
            isCoach: 0,
            isMentor: 0,
            isStudent: 1,
            isActive: 1,
            leetcodeUsername: "test",
            codeforcesUsername: "test",
            uhuntId: 0
        })
    })

    test('Updating codeforces username by email', async () => {
        const user : User = testUser;
        prismaMock.user.update.mockResolvedValue(user);

        await expect(updateCodeforcesUserByEmail("test@email.com", "test")).resolves.toEqual({
            id: 1,
            firstName: "Test",
            lastName: "Test",
            email: "test@email.com",
            phone: "555-555-5555",
            isAdmin: 0,
            isHeadCoach: 0,
            isAssistantCoach: 0,
            isCoach: 0,
            isMentor: 0,
            isStudent: 1,
            isActive: 1,
            leetcodeUsername: "test",
            codeforcesUsername: "test",
            uhuntId: 0
        })
    })

    test('Updating Uhunt id by email', async () => {
        const user : User = testUser;
        prismaMock.user.update.mockResolvedValue(user);

        await expect(updateUhuntUserByEmail("test@email.com", 0)).resolves.toEqual({
            id: 1,
            firstName: "Test",
            lastName: "Test",
            email: "test@email.com",
            phone: "555-555-5555",
            isAdmin: 0,
            isHeadCoach: 0,
            isAssistantCoach: 0,
            isCoach: 0,
            isMentor: 0,
            isStudent: 1,
            isActive: 1,
            leetcodeUsername: "test",
            codeforcesUsername: "test",
            uhuntId: 0
        })
    })

    test('Deactivate user by user id', async () => {
        const user : User = testUser;
        user.isActive = 0;
        prismaMock.user.update.mockResolvedValue(user);

        await expect(deactivateUserByUserId(1)).resolves.toEqual({
            id: 1,
            firstName: "Test",
            lastName: "Test",
            email: "test@email.com",
            phone: "555-555-5555",
            isAdmin: 0,
            isHeadCoach: 0,
            isAssistantCoach: 0,
            isCoach: 0,
            isMentor: 0,
            isStudent: 1,
            isActive: 0,
            leetcodeUsername: "test",
            codeforcesUsername: "test",
            uhuntId: 0
        })
    })

})