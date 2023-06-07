export type User = {
    id: number, 
    firstName: string, 
    lastName: string,
    email: string,
    password: string,
    phone: string,
    isAdmin: number,
    isHeadCoach: number,
    isAssistantCoach: number,
    isCoach: number,
    isMentor: number,
    isStudent: number,
    isActive: number,
    codeforcesUsername: string,
    leetcodeUsername: string,
    uhuntId: number
}

export type UserWithoutPassword = {
    id: number, 
    firstName: string, 
    lastName: string,
    email: string,
    phone: string,
    isAdmin: number,
    isHeadCoach: number,
    isAssistantCoach: number,
    isCoach: number,
    isMentor: number,
    isStudent: number,
    isActive: number,
    codeforcesUsername: string,
    leetcodeUsername: string,
    uhuntId: number
}

export type Problem = {
    id: number,
    name: string,
    linkUrl: string,
    videoUrl: string,
    difficultyId: number,
    isDefault: number
}

export type CompletedProblem = {
    userId: number,
    problemId: number,
    timestamp: string
}

export type Team = {
    id: number,
    name: string
}