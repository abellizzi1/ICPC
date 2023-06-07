// This file is how we seed our production database with default problems
// It will not run automatically, so if modifications are needed, please use
// npx prisma db seed
// use "upsert" so that that seeding is idempotent
//
// For the official documentation on seeding with Prisma,
// see: https://www.prisma.io/docs/guides/database/seed-database

import {PrismaClient} from '@prisma/client'
import seedExampleData from './lib/exampleData'
import seedDefaultProblems from './lib/defaultProblems'

const prisma = new PrismaClient();

async function main() {
    await seedDefaultProblems(prisma);
    await seedExampleData(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })