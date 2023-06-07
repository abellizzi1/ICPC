import { Organization, PrismaClient } from "@prisma/client";
 
export default async function seedExampleData(prisma: PrismaClient) {
    seedExampleOrg(prisma);
    seedExampleUsers(prisma);
}

async function seedExampleOrg(prisma: PrismaClient) {
    const IsuOrg: Organization = {
        id: 1,
        name: 'Iowa State University'
    }

    await prisma.organization.upsert({
        where: {id: IsuOrg.id},
        update: {},
        create: IsuOrg
    })
}

async function seedExampleUsers(prisma: PrismaClient) {
    const sharedConfig = {
        isAdmin: 1,
        isHeadCoach: 0,
        isCoach: 0,
        isAssistantCoach: 0,
        isMentor: 0,
        isStudent: 1,
        isActive: 1,
        leetcodeUsername: null,
        codeforcesUsername: null,
        uhuntId: null
    }

    const exampleUsers = [
        // Start of Role: current students
        {
            lastName: 'Bellizzi',
            firstName: 'Angelo',
            email: 'angelo@iastate.edu',
            ... sharedConfig
        },
        {
            lastName: 'Duncan',
            firstName: 'Matthew',
            email: 'mlduncan@iastate.edu',
            ... sharedConfig
        },
        {
            lastName: 'Lawrinenko',
            firstName: 'Josh',
            email: 'jrl@iastate.edu',
            ... sharedConfig
        },
        {
            lastName: 'Meyer',
            firstName: 'Chris',
            email: 'cameyer1@iastate.edu',
            ... sharedConfig
        },
        {
            lastName: 'Sinnwell',
            firstName: 'Matt',
            email: 'mattds@iastate.edu',
            ... sharedConfig
        },

        // Role: Graduated students
        {
            lastName: 'Nobody',
            firstName: 'John',
            email: 'some@example.com',
            ... sharedConfig,
            isActive: 0
        },

        // Role: Head Coach
        {
            lastName: 'Mitra',
            firstName: 'Simanta',
            email: 'smitra@iastate.edu',
            ... sharedConfig,
            isHeadCoach: 1,
            isStudent: 0,
        }
    ];

    // pass hash translates to pass1234
    // hard coded so we don't have to pull in frontend dependencies just for this one
    const hash = '$2b$10$c.apAXySmQOKco/rAuU7dOyAsI7QvobCfWbuFZgGeDaofr29XoqG6';
    for (let user of exampleUsers) {
        await prisma.user.upsert({
            where: {email: user.email},
            update: {},
            create: {
                ...user,
                password: {create: {hash}}
            }
        });
    }
}