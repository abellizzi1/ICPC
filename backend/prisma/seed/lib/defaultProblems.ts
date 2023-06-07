// This file is how we seed our database.
// use "upsert" so that that seeding is idempotent
//
// This file initializes a new instance of the database with default
// problems, difficulties, and categories that will be used for all
// organizations
import {PrismaClient, Problem, ProblemToCategory} from '@prisma/client'
import {categories, problems} from './nc150'

export default async function seedDefaultProblems(prisma: PrismaClient) {
  const isDefault = 1; // database needs 1 for true value

  const difficultyToIndex = new Map();
  // add difficulties
  for (let name of ['easy', 'medium', 'hard']) {
    let d = await prisma.difficulty.upsert({
      where: {name},
      update: {},
      create: {name, isDefault}
    });

    difficultyToIndex.set(d.name, d.id);
  }

  // add categories
  for (let i=0; i < categories.length; i++) {
    let name = categories[i]
    let id = i+1 // offset by 1 since MySQL doesn't allow 0 values for keys

    await prisma.category.upsert({
      where: {id},
      update: {},
      create: {name, isDefault}
    });
  }

  // add problems
  for (let i=0; i < problems.length; i++) {
    let p = problems[i];
    const problemId = i+1 // offset by 1 since MySQL doesn't allow 0
    let categoryId = (p[0] as number) + 1 // Add 1: MySql is 1 indexed (0 not valid index)

    let problem: Problem = {
      id: problemId,
      isDefault,
      difficultyId: difficultyToIndex.get(p[1]),
      name: p[2] as string,
      linkUrl: p[3] as string,
      videoUrl: p[4] as string,
    };

    await prisma.problem.upsert({
      where: {
        id: problem.id,
      },
      update: {},
      create: problem
    })

    // add relational mapping from problem to its category
    let mapping: ProblemToCategory = {
      problemId,
      categoryId
    }

    await prisma.problemToCategory.upsert({
      where: {
        problemId_categoryId: {
          problemId,
          categoryId
        }
      },
      update: {},
      create: mapping,
    })

  }
}
