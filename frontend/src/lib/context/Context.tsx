import { createContext } from "react";
// import { Navigator } from '../useRoutes';
// import axios from 'axios';

/**
 * Utility file for providing user permissions throughout the site
 */

export enum UserTypes {
	NA,
	STUDENT,
	HEADCOACH,
	ASSISTANTCOACH,
	ADMIN
};

export interface FeatureTypes {
	userInfo: boolean,
	userAccount: boolean,
	teamViewMembers: boolean,
	teamAddMember: boolean,
	teamRemoveMember: boolean,
	teamCreateTeam: boolean,
	teamJoinTeam: boolean,
	teamLeaveTeam: boolean,
	teamDeleteTeam: boolean,
	challengesSolved: boolean,
	challengesAssigned: boolean,
	challengesAssign: boolean,
	clubForum: boolean,
	adminDeleteUser: boolean,
	adminAddUser: boolean,
	adminChangeUserPriv: boolean
};

export const defaultUser: FeatureTypes = {
	userInfo: false,
	userAccount: false,
	teamViewMembers: false,
	teamAddMember: false,
	teamRemoveMember: false,
	teamCreateTeam: false,
	teamJoinTeam: false,
	teamLeaveTeam: false,
	teamDeleteTeam: false,
	challengesSolved: false,
	challengesAssigned: false,
	challengesAssign: false,
	clubForum: false,
	adminDeleteUser: false,
	adminAddUser: false,
	adminChangeUserPriv: false
};

export const studentUser: FeatureTypes = {
	userInfo: true,
	userAccount: true,
	teamViewMembers: true,
	teamAddMember: false,
	teamRemoveMember: false,
	teamCreateTeam: false,
	teamJoinTeam: true,
	teamLeaveTeam: true,
	teamDeleteTeam: false,
	challengesSolved: true,
	challengesAssigned: true,
	challengesAssign: false,
	clubForum: true,
	adminDeleteUser: false,
	adminAddUser: false,
	adminChangeUserPriv: false
};

export const headcoachUser: FeatureTypes = {
	userInfo: true,
	userAccount: true,
	teamViewMembers: true,
	teamAddMember: true,
	teamRemoveMember: true,
	teamCreateTeam: true,
	teamJoinTeam: true,
	teamLeaveTeam: true,
	teamDeleteTeam: true,
	challengesSolved: true,
	challengesAssigned: true,
	challengesAssign: true,
	clubForum: true,
	adminDeleteUser: false,
	adminAddUser: false,
	adminChangeUserPriv: false
};

export const assistantcoachUser: FeatureTypes = {
	userInfo: true,
	userAccount: true,
	teamViewMembers: true,
	teamAddMember: true,
	teamRemoveMember: true,
	teamCreateTeam: true,
	teamJoinTeam: true,
	teamLeaveTeam: true,
	teamDeleteTeam: false,
	challengesSolved: true,
	challengesAssigned: true,
	challengesAssign: true,
	clubForum: true,
	adminDeleteUser: false,
	adminAddUser: false,
	adminChangeUserPriv: false
};

export const adminUser: FeatureTypes = {
	userInfo: true,
	userAccount: true,
	teamViewMembers: true,
	teamAddMember: true,
	teamRemoveMember: true,
	teamCreateTeam: true,
	teamJoinTeam: true,
	teamLeaveTeam: true,
	teamDeleteTeam: true,
	challengesSolved: true,
	challengesAssigned: true,
	challengesAssign: true,
	clubForum: true,
	adminDeleteUser: true,
	adminAddUser: true,
	adminChangeUserPriv: true
};

/**
 * Context data to be accessed with functionality for updating values
 */
export class UserContextData {
	type: UserTypes;
	priveledges: FeatureTypes;
	email: string;
	fname: string;
	lname: string;
	id: number | null;
	isActive: number;
	isAdmin: number;
	isAssistantCoach: number;
	isHeadCoach: number;
	isMentor: number;
	isStudent: number;
	leetcodeUsername: string | null;
	codeforcesUsername: string | null;
	phone: string;
	uhuntId: number | null;
	// navigator: Navigator;

	constructor() {
		this.type = UserTypes.NA;
		this.priveledges = adminUser;
		this.email = "";
		this.fname = "";
		this.lname = "";
		this.id = null;
		this.isActive = 0;
		this.isAdmin = 0;
		this.isAssistantCoach = 0;
		this.isHeadCoach = 0;
		this.isMentor = 0;
		this.isStudent = 0;
		this.leetcodeUsername = null;
		this.codeforcesUsername = null;
		this.phone = "";
		this.uhuntId = null;
		
		// this.navigator = new Navigator();
	}

	setUserType(utype: UserTypes) {
		this.type = utype;
		if (utype === UserTypes.NA) this.priveledges = defaultUser;
		else if (utype === UserTypes.STUDENT) this.priveledges = studentUser;
		else if (utype === UserTypes.HEADCOACH) this.priveledges = headcoachUser;
		else if (utype === UserTypes.ASSISTANTCOACH) this.priveledges = assistantcoachUser;
		else if (utype === UserTypes.ADMIN) this.priveledges = adminUser;
	}

	updateUser(user : any) {
		this.email = user.email;
		this.fname = user.firstName;
		this.lname = user.lastName;
		this.id = user.id;
		this.isActive = user.isActive;
		this.isAdmin = user.isAdmin;
		this.isAssistantCoach = user.isAssistantCoach;
		this.isHeadCoach = user.isHeadCoach;
		this.isMentor = user.isMentor;
		this.isStudent = user.isStudent;
		this.leetcodeUsername = user.leetcodeUsername;
		this.codeforcesUsername = user.codeforcesUsername;
		this.phone = user.phone;
		this.uhuntId = user.uhuntId;

        if (this.isAdmin == 1) {
            this.setUserType(UserTypes.ADMIN)
        }
        else if (this.isAssistantCoach == 1) {
            this.setUserType(UserTypes.ASSISTANTCOACH)
        }
        else if (this.isHeadCoach == 1) {
            this.setUserType(UserTypes.HEADCOACH)
        }
        else if (this.isMentor == 1) {
            this.setUserType(UserTypes.ASSISTANTCOACH)
        }
        else if (this.isStudent == 1) {
            this.setUserType(UserTypes.STUDENT)
        }
	}

	logoutUser() {
		this.type = UserTypes.NA;
		this.priveledges = defaultUser;
		this.email = "";
		this.fname = "";
		this.lname = "";
		this.id = null;
		this.isActive = 0;
		this.isAdmin = 0;
		this.isAssistantCoach = 0;
		this.isHeadCoach = 0;
		this.isMentor = 0;
		this.isStudent = 0;
		this.leetcodeUsername = null;
		this.codeforcesUsername = null;
		this.phone = "";
		this.uhuntId = null;
		localStorage.setItem("loggedInUser", "");
	}

}

// export const UserContext = createContext<UserContextData>({
// 	type: UserTypes.NA
// });

export const UserContext = createContext({globalContext: new UserContextData()});
