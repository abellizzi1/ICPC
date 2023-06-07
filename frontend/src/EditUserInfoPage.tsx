import { useNavigate } from 'react-router-dom';
import {useForm, SubmitHandler} from 'react-hook-form';
import { SetTitle } from './lib/useRedux';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from './lib/context/Context';
import { validator } from './lib/IOvalidation';
import { UserService } from './services/UserService';

function EditUserInfoPage() {

    let navigate = useNavigate();

	SetTitle("Edit User Information");
	var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")!);

	// email used to login for user lookup
	var testEmail = loggedInUser.email;

	// validator to alter textboxes to "error" and "no-error" display states
	const v = new validator();
	

	// a call to update the user's first name
	const changeFirstName = () => {
		var firstName = document.getElementById('firstNameInput');
		let exists = document.getElementById('validFirstName');
		if ((firstName as HTMLInputElement).value != null)
		{
			v.colorValidInput(firstName);
			//put new first name in db
			const rulesFn = /^[A-Za-z]+$/i;
			let update: string = (firstName as HTMLInputElement).value;
			let detail = "fname";
			// test for acceptable new first name
			if(rulesFn.test(update)) {
				const user = {testEmail, detail, update}
				// call to update the detail
				axios.put(`http://${process.env.REACT_APP_DOMAIN!}/user/updateUserDetailsByEmail/` + loggedInUser.email, user)
				.then(response => console.log(response.data)).catch((err) => {console.log(err)});
				loggedInUser.firstName = update;
				localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
				// call to hide any errors
				if(exists !== null) {
					exists.hidden = true;
				}
			} else {
				// call to display an error message on fail
				v.colorInvalidInput(firstName);
				if (exists !== null) {
					exists.hidden = false;
				}
			}
		}
	}

	// a call to update the user's last name
	const changeLastName = () => {
		var lastName = document.getElementById('lastNameInput');
		let exists = document.getElementById('validLastName');
		if ((lastName as HTMLInputElement).value != null)
		{
			v.colorValidInput(lastName);
			//put new last name in db
			const rulesLn = /^[A-Za-z]+$/i;
			let update: string = (lastName as HTMLInputElement).value;
			let detail = "lname";
			// call to test for valid input
			if(rulesLn.test(update)) {
				const user = {testEmail, detail, update}
				// call to update user detail
				axios.put(`http://${process.env.REACT_APP_DOMAIN!}/user/updateUserDetailsByEmail/` + loggedInUser.email, user)
				.then(response => console.log(response.data)).catch((err) => {console.log(err)});
				loggedInUser.lastName = update;
				localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
				// call to hide displayed errors
				if(exists !== null) {
					exists.hidden = true;
				}
			} else {
				// call to display errors on fail
				v.colorInvalidInput(lastName);
				if(exists !== null) {
					exists.hidden = false;
				}
			}
		}
	}

	// a call to update the user's password
	const changePassword = () => {
		var pass = document.getElementById('passwordInput');
		var pass2 = document.getElementById('confirmPasswordInput');
		var currentPass = document.getElementById('currentPasswordInput');
		let exists1 = document.getElementById('validCurrentPassword');
		let exists2 = document.getElementById('validPassword1');
		let exists3 = document.getElementById('validPassword2');
		let exists4 = document.getElementById('samePassword');
		if ((pass as HTMLInputElement).value != null)
		{
			//put new password in db
			let update: string = (pass as HTMLInputElement).value;
			let update2: string = (pass2 as HTMLInputElement).value;
			let detail = "password"+UserService.obsfucatePassword((currentPass as HTMLInputElement).value);
			// test for equivalent new passwords
			if(update === update2) {
				// testing on valid inputs up to 5 characters and removal of errors 
				v.colorValidInput(pass);
				v.colorValidInput(pass2);
				if(update.length > 5) {
					if(exists4) {
						exists4.hidden = true;
					}
					if(exists2 && exists3) {
						exists2.hidden = true;
						exists3.hidden = true;
					}
					v.colorValidInput(pass);
					v.colorValidInput(pass2);
					v.colorValidInput(currentPass);
					update = UserService.obsfucatePassword(update);
					const user = {testEmail, detail, update}
					// call to update detail
					axios.put(`http://${process.env.REACT_APP_DOMAIN!}/user/updateUserDetailsByEmail/` + loggedInUser.email, user)
					.then((response) =>  {
						console.log(response.data);
						let l = response.data;
						// hide displayed errors on successful update
						if((l === "Updated password")) {
							v.colorValidInput(currentPass);
							if(exists1) {
								exists1.hidden = true;
							}
						} else {
							// display error on failed update
							v.colorInvalidInput(currentPass);
							if(exists1) {
								exists1.hidden = false;
							}
						}
					}).catch((err) => {console.log(err)});
				} else {
					// display error on invalid new passwords
					v.colorInvalidInput(pass);
					v.colorInvalidInput(pass2);
					if(exists2 && exists3) {
						exists2.hidden = false;
						exists3.hidden = false;
					}
				}
			} else {
				// display error on invalid new passwords
				v.colorInvalidInput(pass);
				v.colorInvalidInput(pass2);
				if(exists4 !== null) {
					exists4.hidden = false;
				}
			}
		}
	}

	// a call to update the user's email
	const changeEmail = () => {
		var email = document.getElementById('emailInput');
		if ((email as HTMLInputElement).value != null)
		{
			//put new email in db
			const rulesE = /^\S+@\S+$/i;
			let update: string = (email as HTMLInputElement).value;
			let detail = "email";
			let exists2 = document.getElementById('validEmail');
			// testing for valid input
			if(rulesE.test(update)) {
				if(exists2) {
					exists2.hidden = true;
				}
				let exists = document.getElementById('emailExists');
				let user = {testEmail, detail, update}
				// call to update user detail
				axios.put(`http://${process.env.REACT_APP_DOMAIN!}/user/updateUserDetailsByEmail/` + loggedInUser.email, user)
				.then((response) => {
					// hide errors on successful update
					if(response.data === "Updated email") {
						v.colorValidInput(email);
						loggedInUser.email = update;
						localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
						testEmail = update;
						if(exists !== null) {
							exists.hidden = true;
						}
					} else {
						// display errors on failed update
						if(exists != null) {
							exists.hidden = false;
						}
						v.colorInvalidInput(email);
						console.log("Email already in use");
					}
				}).catch((err) => {console.log(err)});
			} else {
				// display errors on invalid input
				v.colorInvalidInput(email);
				if(exists2) {
					exists2.hidden = false;
				}
			}
		}
	}

	// a call to update the user's phone number
	const changePhoneNumber = () => {
		var phone = document.getElementById('cellnum');
		let exists = document.getElementById('validPhone');
		if ((phone as HTMLInputElement).value != null)
		{
			//put new phone number in db
			const rulesPN1 = /^\d{3}[-]\d{3}[-]\d{4}$/i;
			let update: string = (phone as HTMLInputElement).value;
			let detail = "phone";
			if(update.length >= 10 && update.length <= 12 && rulesPN1.test(update)) {
				v.colorValidInput(phone);
				const user = {testEmail, detail, update}
				axios.put(`http://${process.env.REACT_APP_DOMAIN!}/user/updateUserDetailsByEmail/` + loggedInUser.email, user)
				.then(response => console.log(response.data)).catch((err) => {console.log(err)});
				loggedInUser.phone = update;
				localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
				if(exists) {
					exists.hidden = true;
				}
			} else {
				v.colorInvalidInput(phone);
				if(exists) {
					exists.hidden = false;
				}
			}
		}
	}

	// a call to update the user's LeetcodeUsername
	const changeLeetcodeUsername = () => {
        var newUsername = document.getElementById('leetcodeusernameInput');
		let exists = document.getElementById('validLeetcodeUsername');
		// test for valid input
		if ((newUsername as HTMLInputElement).value.length >= 3)
		{

			v.colorValidInput(newUsername);
			const leetcodeUser = {
                leetcodeUsername: (newUsername as HTMLInputElement).value
            }
			// call to update user detail
            axios.put(`http://${process.env.REACT_APP_DOMAIN!}/user/updateLeetcodeUserByEmail/` + loggedInUser.email, leetcodeUser)
            .then(response => console.log(response.data)).catch((err) => {console.log(err)});
			loggedInUser.leetcodeUsername = (newUsername as HTMLInputElement).value;
			localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
			// call to hide errors on successful update
			if(exists) {
				exists.hidden = true;
			}
		} else {
			// call to display errors on invalid input
			v.colorInvalidInput(newUsername);
			if(exists) {
				exists.hidden = false;
			}
		}
    }

	// a call to update the user's CodeforcesUsername
    const changeCodeforcesUsername = () => {
        var newUsername = document.getElementById('codeforcesusernameInput');
		let exists = document.getElementById('validCodeforcesUsername');
		// test for valid input
		if ((newUsername as HTMLInputElement).value.length >= 3 && (newUsername as HTMLInputElement).value.length <= 24)
		{
			v.colorValidInput(newUsername);
            const codeforcesUser = {
                codeforcesUsername: (newUsername as HTMLInputElement).value
            }
			// call to update user detail
            axios.put(`http://${process.env.REACT_APP_DOMAIN!}/user/updateCodeforcesUserByEmail/` + loggedInUser.email, codeforcesUser)
            .then(response => console.log(response.data)).catch((err) => {console.log(err)});
			loggedInUser.codeforcesUsername = (newUsername as HTMLInputElement).value;
			localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
			// call to hide displayed errors on successful input
			if(exists) {
				exists.hidden = true;
			}
        } else {
			// call to display errors on invalid input
			v.colorInvalidInput(newUsername);
			if(exists) {
				exists.hidden = false;
			}
		}
        
    }

	// a call to update the user's UhuntUserId
    const changeUhuntUserId = () => {
        var newUsername = document.getElementById('uhuntidInput');
		let exists = document.getElementById('validUhuntUsername');
		const rulesUhuntUser = /^[0-9]+$/i;
		// test for valid input
		if (rulesUhuntUser.test((newUsername as HTMLInputElement).value) === true)
		{
            var id = parseInt((newUsername as HTMLInputElement).value, 10);
			v.colorValidInput(newUsername);
            const uhuntUser = {
                uhuntId: id
            }
			// call to update user detail
            axios.put(`http://${process.env.REACT_APP_DOMAIN!}/user/updateUhuntUserByEmail/` + loggedInUser.email, uhuntUser)
            .then(response => console.log(response.data)).catch((err) => {console.log(err)});
			loggedInUser.uhuntId = id;
			localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
			// call to hide displayed errors
			if(exists) {
				exists.hidden = true;
			}
        } else {
			// call to display errors on invalid input
			v.colorInvalidInput(newUsername);
			if(exists) {
				exists.hidden = false;
			}
		}
    }

	return (
		<div>
			<div className="container text-center">
				<div id='firstRow' className="row userInfoRows">
    				<div className="col">
						<input className='form-control editTxtInput'
							type='text' id='firstNameInput' name='firstNameInput' 
							placeholder="Enter new first name" />
							<small id="validFirstName" data-testid="firstNameErrorMessage" hidden>Invalid input</small>
					</div>
				</div>
				<div className='row'>
					<div className='col'>
						<button className="btn btn-light form-control" onClick={changeFirstName} >Change First Name</button>
					</div>
				</div>
                <br></br>
				<div className='row'>
					<div className='col'>
						<input className='form-control editTxtInput'
							type='text' id='lastNameInput' name='lastNameInput' 
							placeholder="Enter new last name" />
							<small id="validLastName" data-testid="lastNameErrorMessage" hidden>Invalid input</small>
					</div>
				</div>
				<div className='row'>
					<div className='col'>
						<button className="btn btn-light form-control" onClick={changeLastName} >Change Last Name</button>
					</div>
				</div>
                <br></br>
				<div className='row'>
					<div className='col'>
						<input className='form-control editTxtInput'
							type='tel' id='cellnum' name='cellnum' 
							placeholder="515-123-4567" />
							<small id="validPhone" hidden>Invalid input</small>
					</div>
				</div>
				<div className='row'>
					<div className='col'>
						<button className="btn btn-light form-control" onClick={changePhoneNumber} >Change Phone Number</button>
					</div>
				</div>
                <br></br>
				<div className='row'>
					<div className='col'>
						<input className='form-control editTxtInput'
							type='text' id='emailInput' name='emailInput' 
							placeholder="email@example.com" />
							<small id="validEmail" data-testid="emailErrorMessage" hidden>Invalid input</small>
							<small id="emailExists" hidden>Email already in use</small>
					</div>
				</div>
				<div className='row'>
					<div className='col'>
						<button className="btn btn-light form-control" onClick={changeEmail} >Change Email</button>
					</div>
				</div>
				<br></br>
				<div className='row'>
					<div className='col'>
						<input className='form-control editTxtInput'
							type='text' id='leetcodeusernameInput' name='leetcodeusernameInput' 
							placeholder="Enter new Leetcode username" />
							<small id="validLeetcodeUsername" data-testid="leetcodeUsernameErrorMessage" hidden>Invalid input</small>
					</div>
				</div>
				<div className='row'>
					<div className='col'>
						<button className="btn btn-light form-control" onClick={changeLeetcodeUsername} >Change Leetcode Username</button>
					</div>
				</div>
				<br></br>
				<div className='row'>
					<div className='col'>
						<input className='form-control editTxtInput'
							type='text' id='codeforcesusernameInput' name='codeforcesusernameInput' 
							placeholder="Enter new Codeforces username" />
							<small id="validCodeforcesUsername" data-testid="codeforcesUsernameErrorMessage" hidden>Invalid input</small>
					</div>
				</div>
				<div className='row'>
					<div className='col'>
						<button className="btn btn-light form-control" onClick={changeCodeforcesUsername} >Change Codeforces Username</button>
					</div>
				</div>
				<br></br>
				<div className='row'>
					<div className='col'>
						<input className='form-control editTxtInput'
							type='text' id='uhuntidInput' name='uhuntidInput' 
							placeholder="Enter new Uhunt user Id" />
							<small id="validUhuntUsername" data-testid="uhuntUsernameErrorMessage" hidden>Invalid input</small>
					</div>
				</div>
				<div className='row'>
					<div className='col'>
						<button className="btn btn-light form-control" onClick={changeUhuntUserId} >Change Uhunt ID</button>
					</div>
				</div>
                <br></br>
				<div className='row'>
					<div className='col'>
						<input className='form-control editTxtInput'
							type='password' id='currentPasswordInput' name='currentPasswordInput' 
							placeholder="Enter current password" />
							<small id="validCurrentPassword" hidden>Incorrect password</small>
					</div>
				</div>
				<div className='row'>
					<div className='col'>
						<input className='form-control editTxtInput'
							type='password' id='passwordInput' name='passwordInput' 
							placeholder="Enter new password" />
							<small id="samePassword" hidden>Unequal passwords</small>
							<small id="validPassword1" hidden>Invalid input</small>
					</div>
				</div>
				<div className='row'>
					<div className='col'>
						<input className='form-control editTxtInput'
							type='password' id='confirmPasswordInput' name='confirmPasswordInput' 
							placeholder="Confirm new password" />
							<small id="validPassword2" hidden>Invalid input</small>
					</div>
				</div>
				<div className='row'>
					<div className='col'>
						<button className="btn btn-light form-control" onClick={changePassword} >Change Password</button>
					</div>
				</div>
                <br></br>
                <div className='row'>
					<div className='col'>
						<button id='backToUserInfoBtn' className="btn btn-light form-control" onClick={() => {navigate('/userinfo');}} >Back to User Information</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EditUserInfoPage;
