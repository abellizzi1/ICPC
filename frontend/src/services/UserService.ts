import axios from 'axios';
import pbkdf2 from 'pbkdf2'
// import crypto from 'crypto';
import {getBackendDomain } from './Service';
import {User} from '../model/User';

export enum LoginError {
	UsernameNotFound,
	InvalidPassword
}

// TODO: implement sessions
const PLACEHOLDER_TOKEN: SessionToken = "PLACEHOLDER_TOKEN"

export type SessionToken = string;
/**
 * User Services class is used to retrieve data about Users
*/
export class UserService {
	static routeName = 'user'

	/**
	 * 
	 * @param username "User's username as a string"
	 * @param pass "User's password"
	 * @returns A user JSON object
	 */
	// TODO: In the future this should return a UserSession
	public static async loginUser(username: string, pass: string): Promise<User> {
		let loginObject = {email: username, password: ""}
		loginObject.password = this.obsfucatePassword(pass);
		const response = await axios.post(`http://${getBackendDomain()}/${UserService.routeName}/logInUserByEmailPassword/`, loginObject);

		let user = response.data;
		console.log(user);

		if (user === "User email does not exist")
			throw LoginError.UsernameNotFound;
		else if (user === "Invalid password")
			throw LoginError.InvalidPassword;

		return user;
	}

	public async updateUhuntUser(userEmail: string, thirdpartyUserInfo: any): Promise<void> {
		const endpoint = "UhuntUserByEmail"
		return this.updateThirdpartyAccountUsername(endpoint, userEmail, thirdpartyUserInfo)
	}
	
	public async updateLeetcodeUser(userEmail: string, thirdpartyUserInfo: any): Promise<void> {
		const endpoint = "LeetcodeUserByEmail"
		return this.updateThirdpartyAccountUsername(endpoint, userEmail, thirdpartyUserInfo)
		
	}
	
	public async updateCodeforcesUser(userEmail: string, thirdpartyUserInfo: any): Promise<void> {
		const endpoint = "CodeforcesUserByEmail"
		return this.updateThirdpartyAccountUsername(endpoint, userEmail, thirdpartyUserInfo)
		
	}
	
	private async updateThirdpartyAccountUsername(endpoint: string, userEmail: string, thirdpartyUserInfo: any): Promise<void> {
		axios.put(`${getBackendDomain()}/${UserService.routeName}/update${endpoint}/${userEmail}`, thirdpartyUserInfo);
		// TODO: Error handling
	}
	
	// TODO: Will become private if we refactor the registration page. Only to be used externally there
	// to get us to production quickly. After refactor, should be private.
	public static obsfucatePassword(plaintextPassword: string): string {
		// Changing any of these will require registered users to all have their passwords reset 
		const ROUNDS = 10000;
		const LENGTH = 64;
		const S = 'Zio1vKVeSXjkOxETE7jR3Sk5XThRHLfffByc5jhn9y7ec5vVNNGA4IgoV8Sw2Mu9yDaHvPhGpTtqQ8MbwvP8Gg'

		const hash = pbkdf2.pbkdf2Sync(plaintextPassword, S, ROUNDS, LENGTH, 'sha512');
		
		return hash.toString('base64'); // TODO: Are we to encrypt this, hash, etc?
		// return plaintextPassword;
	}
}