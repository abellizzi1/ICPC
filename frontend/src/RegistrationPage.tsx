import {useForm, SubmitHandler} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { SetTitle } from './lib/useRedux';
import { FormValues } from './lib/useForm';

import { useState, useEffect, useContext, CSSProperties } from 'react';
import { UserContext } from './lib/context/Context';
import { validator } from './lib/IOvalidation';

import { UserService } from './services/UserService';
import axios from 'axios';
import ClockLoader from "react-spinners/ClockLoader";

// selectLog = id, selectLog2 = name

const RegistrationPage = () => {
	// Call to update the page's title
	SetTitle("Registration");

	// registration submission forms
	const {register, handleSubmit} = useForm<FormValues>();

	// user detail context
	const context = useContext(UserContext);

	// object used to change color / scale of error displays on input
	const v = new validator();

	// a function to route between pages
	const navigate = useNavigate();
	const [path, setPath] = useState('/dashboard');

	const [existingOrgs, setExistingOrgs] = useState([]);

	// state for determining admin privelages
	const [isAdmin, setAdminPrivelages] = useState(1);

	// state for join/creating an org, 1 === joining, 2 === creating
	const [isJoiningOrg, updateJoinOrg] = useState(1);

	// state for updating the organizations name
	const [selectedOrgName, updateSelectOrgName] = useState("Default");

	// state for updating the organizations id
	const [selectedOrgId, updateSelectOrgId] = useState(-1);

	// states for updating the various input values
	const [FirstName, setFirstName] = useState("");
	const [LastName, setLastName] = useState("");
	const [Email, setEmail] = useState("");
	const [Password, setPassword] = useState("");
	const [Phone, setPhone] = useState("");
	
	// various rules for their associated input value
	const rulesFirstName = /^[A-Za-z]+$/i;
	const rulesLastName = /^[A-Za-z]+$/i;
	const rulesEmail = /^\S+@\S+$/i;
	const rulesPhone = /^\d{3}[-]\d{3}[-]\d{4}$/i;
	const passwordRulesLength = 6;

	// a state to call an in-use error for emails
	const [emailExistsError, setEmailExistsError] = useState("");

	// test value for if an email is already in use
	var emailExists: String = "This Email is Not Already Registered";

	const [loadingInProgress, setLoading] = useState(false);

	// call to get all existing organizations
	useEffect(() => {
		const getOrgs = async () => {
			// call to get all existing organizations
			axios.get(`http://${process.env.REACT_APP_DOMAIN!}/organization/getAllOrganizations`)
			.then((response) => {
				setExistingOrgs(response.data);
			}).catch((err) => {console.log(err)});
		}

		getOrgs().catch(console.error);
	}, []);

	// call to update the condition of joining or creating an org
	useEffect(() => {
		isAdmin === 1 ? setAdminPrivelages(0) : setAdminPrivelages(1);
		if(isJoiningOrg === 2) {
			updateSelectOrgId(0);
			updateSelectOrgName((document.getElementById("inputNewOrg") as HTMLInputElement).value);
		}

	}, [isJoiningOrg]);

	// call to update the FirstName input errors and displays
	useEffect(() => {
		let error = document.getElementById("validFirstName")!;
		if(!FirstName.localeCompare("") || rulesFirstName.test(FirstName)) {
			error.innerHTML = "";
			v.colorValidInput(document.getElementById("inputFirstName"));
		} else {
			error.innerHTML = "First name must consist of only letters.";
			v.colorInvalidInput(document.getElementById("inputFirstName"));
		}

	}, [FirstName]);

	// call to update the LastName input errors and displays
	useEffect(() => {
		let error = document.getElementById("validLastName")!;
		if(!LastName.localeCompare("") || rulesLastName.test(LastName)) {
			error.innerHTML = "";
			v.colorValidInput(document.getElementById("inputLastName"));
		} else {
			error.innerHTML = "Last name must consist of only letters.";
			v.colorInvalidInput(document.getElementById("inputLastName"));
		}

	}, [LastName]);

	// call to update the Email input errors and displays
	useEffect(() => {
		let error = document.getElementById("validEmail")!;
		if(!Email.localeCompare("") || rulesEmail.test(Email)) {
			error.innerHTML = "";
			v.colorValidInput(document.getElementById("inputEmail"));
		} else {
			error.innerHTML = "Email not of format: email@something.edu";
			v.colorInvalidInput(document.getElementById("inputEmail"));
		}

	}, [Email]);

	// call to update the Password input errors and displays
	useEffect(() => {
		let error = document.getElementById("validPassword")!;
		if(!Password.localeCompare("") || Password.length >= passwordRulesLength) {
			error.innerHTML = "";
			v.colorValidInput(document.getElementById("inputPassword"));
		} else {
			error.innerHTML = "Password must be at least 6 characters long.";
			v.colorInvalidInput(document.getElementById("inputPassword"));
		}

	}, [Password]);

	// call to update the Phone input errors and displays
	useEffect(() => {
		let error = document.getElementById("validPhone")!;
		if(!Phone.localeCompare("") || rulesPhone.test(Phone)) {
			error.innerHTML = "";
			v.colorValidInput(document.getElementById("inputPhone"));
		} else {
			error.innerHTML = "Phone number not of format: 515-123-4567.";
			if(Phone.length !== 0 && Phone.length < 10) {error.innerHTML += "<br /> Input number is under 10 digits long."; } 
			else if(Phone.length !== 0 && Phone.length > 12) {error.innerHTML += "<br /> Input number is over 12 digits long.";}
			v.colorInvalidInput(document.getElementById("inputPhone"));
		}

	}, [Phone]);

	useEffect(() => {
		let error = document.getElementById("validEmail")!;
		let error2 = document.getElementById("inputEmail")!;
		if(emailExistsError === "This Email is Already Registered") {
			error.innerHTML = "This Email is Already Registered";
			v.colorInvalidInput(error2);
		} else {
			error.innerHTML = "";
			v.colorValidInput(error2);
		}

	}, [emailExistsError]);

	// Function to register a new user
	async function registerUser (dataFromForm: any) {
		// a backend call to register a new user
		setLoading(true);
		await axios.post(`http://${process.env.REACT_APP_DOMAIN!}/user/registerUser/${selectedOrgName}/` + Number(selectedOrgId), 
		{
			lastName: dataFromForm.lname,
			firstName: dataFromForm.fname,
			email: dataFromForm.email,
			password: UserService.obsfucatePassword(dataFromForm.pword as string),
			phone: dataFromForm.cellnum,
			isAdmin: isAdmin,
			isHeadCoach: 0,
			isAssistantCoach: 0,
			isCoach: 0,
			isMentor: 0,
			isStudent: 1,
			isActive: 1
		}).then((response) => {
			let user = response.data;
			setLoading(false);
			console.log(user);
			if(user !== "This Email is Already Registered") {
				context.globalContext.updateUser(user);
				localStorage.setItem("loggedInUser", JSON.stringify(user));
				emailExists = "This Email is Not Already Registered";
				setEmailExistsError("This Email is Not Already Registered");
			} else {
				emailExists = user;
				setEmailExistsError("This Email is Already Registered");
			}
		}).catch((err) => {console.log(err)});
	}

	// call to test for readiness to submit
	function testSubmit() {
		if(rulesFirstName.test(FirstName) && rulesLastName.test(LastName) && rulesEmail.test(Email) 
		&& rulesPhone.test(Phone) && Password.length >= passwordRulesLength && selectedOrgId !== -1 && selectedOrgName !== "") {
			return true;
		} else {
			return false;
		}
	}

	// call to route between pages
	const routChange = () => {
		navigate(path);
	}
	
	// call to register the new user and route to the dashboard
	const onSubmit: SubmitHandler<FormValues> = async data => {
		if(testSubmit() === true) {
			setEmailExistsError("");
			await registerUser(data);
			if(emailExists === "This Email is Not Already Registered") {
				routChange();
			}
			
		}
	}

	return (
		<div>
			<DisplayUserRegistrationFields onSubmit={onSubmit} handleSubmit={handleSubmit} register={register} updateJoinOrg={updateJoinOrg} 
			updateSelectOrgId={updateSelectOrgId} updateSelectOrgName={updateSelectOrgName} isJoiningOrg={isJoiningOrg} existingOrgs={existingOrgs}
			setFirstName={setFirstName} setLastName={setLastName} setPhone={setPhone} setEmail={setEmail} setPassword={setPassword} loadingInProgress={loadingInProgress}/>
		</div>
	)

} 

// the displayed input fields for account details
const DisplayUserRegistrationFields = ({onSubmit, handleSubmit, register, updateJoinOrg, updateSelectOrgId, updateSelectOrgName, isJoiningOrg, existingOrgs,
setFirstName, setLastName, setPhone, setEmail, setPassword, loadingInProgress}:
	{onSubmit: any, handleSubmit: any, register: any, updateJoinOrg: any, updateSelectOrgId: any, updateSelectOrgName: any, isJoiningOrg: Number, existingOrgs: any,
	setFirstName: any, setLastName: any, setPhone: any, setEmail: any, setPassword: any, loadingInProgress: any}) => {
	return (
		<div>
			<header>User Registration:</header>
			<form className="RegForm" onSubmit={handleSubmit(onSubmit)}>
				<input type="text" id="inputFirstName" placeholder="John" onChangeCapture={(event) => {setFirstName(event.currentTarget.value)}} {...register("fname")}/>
				<small id="validFirstName" data-testid="firstNameErrorMessage"></small>
				<input type="text" id="inputLastName" placeholder="Smith" onChangeCapture={(event) => {setLastName(event.currentTarget.value)}} {...register("lname")}/>
				<small id="validLastName" data-testid="lastNameErrorMessage"></small>
				<div>{<DisplayEmail setEmail={setEmail} register={register}/>}</div>
				<input type="password" id="inputPassword" placeholder="password" onChangeCapture={(event) => {setPassword(event.currentTarget.value)}} {...register("pword")}/>
				<small id="validPassword" data-testid="passwordErrorMessage"></small>
				<input type="tel" id="inputPhone" placeholder="555-555-5555" onChangeCapture={(event) => {setPhone(event.currentTarget.value)}} {...register("cellnum")}/>
				<small id="validPhone" data-testid="phoneNumberErrorMessage"></small>
				<label id="orgSelectorLabel" htmlFor="orgSelector">Organization interaction selector</label>
				<select id="orgSelector" onChange={(event) => {updateJoinOrg(Number(event.target.value))}}>
					<option value={1}>Join an organization</option>
					<option value={2}>Create an organization</option>
				</select>
				{isJoiningOrg === 1 ? 
					<div>{<DisplayJoinOrg updateSelectOrgId={updateSelectOrgId} updateSelectOrgName={updateSelectOrgName} existingOrgs={existingOrgs}/>}</div> : 
					<div>{<DisplayCreatOrg register={register} updateSelectOrgName={updateSelectOrgName}/>}</div>}
				<input type ="submit"/>
				<ClockLoader color="#36d7b7" cssOverride={override} loading={loadingInProgress}/> 
			</form>
		</div>
	)
}

// display for a in-progress / loading spinner
const override: CSSProperties = {
	left: "40%"
  };

// component to display creation inputs for organizations
const DisplayEmail = ({setEmail, register}: {setEmail: any, register: any}) => {
	return (
		<form className="RegForm">
			<input type="text" id="inputEmail" placeholder="jsmith@email.com" onChangeCapture={(event) => {setEmail(event.currentTarget.value)}} {...register("email")}/>
			<small id="validEmail" data-testid="emailErrorMessage"></small>
		</form>
	)
};

// component for displaying joinable organizations
const DisplayJoinOrg = ({updateSelectOrgId, updateSelectOrgName, existingOrgs}: {updateSelectOrgId: any, updateSelectOrgName: any, existingOrgs: any}) => {
	return (
		<form className="RegForm">
			<label id="selectExistingOrgLabel" htmlFor="selectExistingOrg">Select an existing organization</label>
			<select id="selectExistingOrg" onChange={(event) => {
				updateSelectOrgId(Number(event.target.value.substring(0, event.target.value.indexOf(" "))));
				updateSelectOrgName(event.target.value.substring(event.target.value.indexOf(" ")+1, event.target.value.length))}}>
				<option value={-1 + " Default"}>Default</option>
				{existingOrgs?.map((anOrg: any) => {
					return (
						<option value={anOrg.id + " " + anOrg.name} key={anOrg.id} id={anOrg.name}>{anOrg.name}</option>
					)
				})}
			</select>
		</form>
	)
};

// component to display creation inputs for organizations
const DisplayCreatOrg = ({register, updateSelectOrgName}: {register: any, updateSelectOrgName: any}) => {
	return (
		<form className="RegForm">
			<label id="inputNewOrgLabel" htmlFor="inputNewOrg">Input a new organization name</label>
			<input type="text" id="inputNewOrg" placeholder="Iowa State University" onChangeCapture={(event) => {updateSelectOrgName(event.currentTarget.value)}} {...register("univ")}/>
			<small id="validOrg" hidden></small>
		</form>
	)
};


export default RegistrationPage