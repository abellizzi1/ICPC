import { useNavigate } from 'react-router-dom';
import {useForm, SubmitHandler} from 'react-hook-form';
import axios from 'axios'
import { SetTitle } from './lib/useRedux';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from './lib/context/Context';

function UserInfoPage() {
	let navigate = useNavigate();

	SetTitle("User Information");

	// State that contains the name of the team that the logged in user is in.
	const [teamName, setTeamName]  = useState("");

	const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")!);

	useEffect(() => {
		const init = async () => {
			// Get the teamID of the team that the logged in user is in. 
			// Then, get the information of the team by the teamID.
            await axios.get(`http://${process.env.REACT_APP_DOMAIN!}/userToTeam/getUserToTeamByUserId/` + loggedInUser.id)
            	.then(async response => {
					if (response.data.length > 0)
					{
						const teamId = response.data[0].teamId;
						await axios.get(`http://${process.env.REACT_APP_DOMAIN!}/team/getTeamById/` + teamId)
							.then(async response => {
								const team = response.data;
								setTeamName(team.name);
							});
					}
				});
        }
        init();
	}, []);

	return (
		<div>
			<div className="container text-center">
				<div id='firstRow' className="row userInfoRows">
    				<div className="col text-start">
						<p>Name:</p>
					</div>
					<div className='col'>
						<p>{loggedInUser.firstName + " " + loggedInUser.lastName}</p>
					</div>
				</div>
				<div className="row">
    				<div className="col text-start">
						<p>Email:</p>
					</div>
					<div className='col'>
						<p>{loggedInUser.email}</p>
					</div>
				</div>
				<div className="row">
    				<div className="col text-start">
						<p>Team:</p>
					</div>
					<div className='col'>
						<p>{teamName}</p>
					</div>
				</div>
				<div className='row RowBottomMargin'>
					<div className='col'>
						<button className="btn btn-light form-control" onClick={() => {navigate('/myteam');}} >My Team</button>
					</div>
				</div>
				<div className='row RowBottomMargin'>
					<div className='col'>
						<button className="btn btn-light form-control" 
						onClick={() => {navigate('/user-stats/' + loggedInUser.id);}} >My Statistics</button>
					</div>
				</div>
				<div className='row RowBottomMargin'>
					<div className='col'>
						<button className="btn btn-light form-control" onClick={() => {navigate('/userinfo/edit');}} >Edit Information</button>
					</div>
				</div>
				<br></br>
				<br></br>
			</div>
		</div>
	);
}

export default UserInfoPage;
