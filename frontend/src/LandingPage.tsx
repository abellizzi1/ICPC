import { useForm, SubmitHandler} from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';

import { SetTitle } from './lib/useRedux';
import { FormValues } from './lib/useForm';

import { useContext, useRef } from 'react';
import { UserContext } from './lib/context/Context';
import { UserService, LoginError } from './services/UserService';
import { validator } from './lib/IOvalidation';
import { current } from '@reduxjs/toolkit';


export default function LandingPage() {
	SetTitle("Login");
	let navigate = useNavigate();
	
	// set up forms
	const {register, handleSubmit} = useForm<FormValues>();
	const {ref: emailRefReg, ...emailReg} = register("email");
	const {ref: pwordRefReg, ...pwordReg } = register("pword");
	const rulesEmail = /^\S+@\S+$/i;

	// declare references to forms
	const inputEmailRef = useRef<HTMLInputElement | null>(null);
	const validEmailRef = useRef<HTMLInputElement>(null);
	const inputPasswordRef = useRef<HTMLInputElement | null>(null);
	const validPasswordRef = useRef<HTMLInputElement>(null);


	// user values for dispatch to backend when logging in
	const context = useContext(UserContext);
	const v = new validator();

	// Function to test for authentication, login, and route to dashboard on success
	const onSubmit: SubmitHandler<FormValues> = data => {
		// correct email and password formatting before attempted login
		if(rulesEmail.test(data.email) === true && data.pword.length > 0) {
			getUserByEmailAndPassword(data.email, data.pword);
		} else {
			let inputEmail = inputEmailRef.current!;
			let validEmail = validEmailRef.current!;
			let inputPassword = inputPasswordRef.current!;
			let validPassword = validPasswordRef.current!;
			// display error for failed email
			if(rulesEmail.test(data.email) === false) {
				v.colorInvalidInput(inputEmail);
				validEmail.hidden = false;
			} else {
				// hide errors on correct submission
				v.colorValidInput(inputEmail);
				validEmail.hidden = true;
			}
			// displaying error message for failed 
			if (data.pword.length < 1) {
				v.colorInvalidInput(inputPassword);
				validPassword.hidden = false;
			} else {
				// hides error message on correct submission
				v.colorValidInput(inputPassword);
				validPassword.hidden = true;
			}
		}
	}

	// function to test the user's credentials and "log in"
	const getUserByEmailAndPassword = (email: string, pword: string) => {
		let inputEmail = inputEmailRef.current!;
		let validEmail = validEmailRef.current!;
		let inputPassword = inputPasswordRef.current!;
		let validPassword = validPasswordRef.current!;

		UserService.loginUser(email, pword)
			.then((user) => {
				context.globalContext.updateUser(user);
				/*
				This is how to get the logged in user as a JSON object:
				var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")!);
				(see ModHeader component for an example of checking if it's null before getting its value)
				*/
				localStorage.setItem("loggedInUser", JSON.stringify(user));
				navigate('/dashboard');


			}).catch((error) => {
				v.colorInvalidInput(inputEmail);
				validEmail.hidden = false;
				v.colorValidInput(inputPassword);
				validPassword.hidden = true;
				if (LoginError.UsernameNotFound === error) {
					// Display logical errors to user
					v.colorInvalidInput(inputEmail);
					validEmail.hidden = false;
					v.colorValidInput(inputPassword);
					validPassword.hidden = true;

				} else if (LoginError.InvalidPassword === error) {
					// displaying error message for failed password
					v.colorInvalidInput(inputPassword);
					validPassword.hidden = false;
					v.colorValidInput(inputEmail);
					validEmail.hidden = true;
				}
			});
	}

	// test for displaying a user is already logged in so they don't log in a second time
	if (localStorage.getItem("loggedInUser") === null || localStorage.getItem("loggedInUser") === "") {
		return (
			<div>
				<div>Log In Or Register:</div>
				<form className="RegForm" onSubmit={handleSubmit(onSubmit)}>
					<input {...emailReg} ref={(e) => {emailRefReg(e); inputEmailRef.current = e}} type="text" id="inputEmail" placeholder="Email" />
					<small ref={validEmailRef} id="validEmail"  hidden>Invalid user</small>
					<input {...pwordReg} ref={(e) => {pwordRefReg(e); inputPasswordRef.current = e}} type="password" id="inputPassword" placeholder="Password"/>
					<small ref={validPasswordRef} id="validPassword" hidden>Invalid password</small>
					<input type="submit" value={"Log In"} />
					<input type="button" onClick={() => {navigate('/registration')}} value={"Register"}/>
				</form>
			</div>
		);
	}
	else {
		// user is already logged in, go to dashbord
		return ( <Navigate to="/dashboard" /> );
	}
}