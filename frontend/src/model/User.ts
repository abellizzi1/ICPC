import {SessionToken} from '../services/UserService'

export type User = {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        isAdmin: number;
        isHeadCoach: number;
        isAssistantCoach: number;
        isCoach: number;
        isMentor: number;
        isStudent: number;
        isActive: number;
        leetcodeUsername: string;
        codeforcesUsername: string;
        uhuntId: number;
}

export class UserSession {
    accessToken: SessionToken
    user: User

    // TODO: Make types and fields explicit
    private constructor(login: any) {
        this.accessToken = login.sessionToken
        this.user = login;
    }

    public getUser() {
        return this.user;
    }
}