import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SetTitle } from './lib/useRedux';
import { useState, useEffect } from 'react';
import UserStatsGraph from './components/UserStats/UserStatsGraph';
import UserStatsData from './components/UserStats/UserStatsData';
import UserStatsRanking from './components/UserStats/UserStatsRanking';

/**
 * Checks if the logged in user is in the same organization as the user that they are viewing
 * @param userId 
 * id of the user that they are viewing
 * @returns 
 * Returns 1 if they're in the same organization, else 0.
 */
async function checkIfSameOrganization(userId: number)
{
	var check = 0;
	const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")!);
	await axios.get(`http://${process.env.REACT_APP_DOMAIN!}/userToOrganization/getUserToOrgMappingsByUserId/` + loggedInUser.id)
		.then(async response => {
			const loggedInUserOrgId = response.data[0].organizationId;
			await axios.get(`http://${process.env.REACT_APP_DOMAIN!}/userToOrganization/getUserToOrgMappingsByUserId/` + userId)
				.then(response => {
					const viewingUserOrgId = response.data[0].organizationId;
					if (loggedInUserOrgId === viewingUserOrgId) { check = 1 }
				});
		});

	return check;
}

/**
 * Checks if the user is on the same team as the user that is viewing their statistics.
 * @param userId 
 * @returns 
 */
async function checkIfSameTeam(userId: number)
{
		//First check if the user is viewing their own stats.
		//OR the logged in user is an admin, head coach, or assistant coach
		const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")!);
		var check = 0;
		var isSameOrg = await checkIfSameOrganization(userId);
		if (userId === loggedInUser.id || (isSameOrg === 1 && (loggedInUser.isAdmin === 1 || loggedInUser.isHeadCoach === 1 || loggedInUser.isAssistantCoach === 1)))
		{
			check = 1;
		}

		// if not, check if the users are on the same team
		await axios.get(`http://${process.env.REACT_APP_DOMAIN!}/userToTeam/getUserToTeamByUserId/` + userId)
            .then(async response => {
				if (response.data.length > 0)
				{
					const userTeamId = response.data[0].teamId;
					await axios.get(`http://${process.env.REACT_APP_DOMAIN!}/userToTeam/getUserToTeamByUserId/` + loggedInUser.id)
					.then(async response => {
						const loggedInUserTeamId = response.data[0].teamId;
						if (userTeamId === loggedInUserTeamId)
						{
							check = 1;
						}
					});
				}
			});

		return check;
}

function UserStatsPage() {
	let navigate = useNavigate();
	SetTitle("User Statistics");

	// State that determines if a blank page will be returned or if the user's statistics will be shown.
	const [isSameTeam, setIsSameTeam] = useState(false);
	// True if the user that's being viewed is in the same organization as the logged in user, else false.
	const [isSameOrganization, setIsSameOrganization] = useState(false);

	// 0 = Show past month (default), 1 = Show past year
	const [isPastMonthOrYear, setIsPastMonthOrYear] = useState(0);

	const currUrl = window.location.href.split("/");
	// get the userId of the user we are viewing
	const userId = currUrl[currUrl.length-1];

	useEffect(() => {
		const init = async () => {
			// first check if we are viewing a user that is on the same team as the logged in user
            var tempCheckSameTeam = await checkIfSameTeam(Number(userId));
			setIsSameTeam(tempCheckSameTeam === 1);
			// check if the logged in user is in the same organization as the user that they are viewing
			var tempCheckSameOrg = await checkIfSameOrganization(Number(userId));
			setIsSameOrganization(tempCheckSameOrg === 1);
        }
		init();
	}, []);

	if (isSameTeam)
	{
		return (
			<div>
				<div className="container text-center">
					<UserStatsRanking userId={Number(userId)} isSameOrganization={isSameOrganization} />
					<br></br>
					<p>**Note: It may take a while to load Team and Organization ranks because Codeforces API can only be requested once per two seconds.</p>
					<br></br>
					<h1>Completed Problems Graphs</h1>
					<br></br>
					<div className="btn-group btn-group-lg" role="group">
						<button type="button" className="btn btn-secondary" onClick={() => {setIsPastMonthOrYear(0)}}>Past Month</button>
						<button type="button" className="btn btn-secondary" onClick={() => {setIsPastMonthOrYear(1)}}>Past Year</button>
					</div>
					<br></br>
					<UserStatsGraph userId={Number(userId)} isPastMonthOrYear={isPastMonthOrYear} />
					<UserStatsData userId={Number(userId)} />
					<br></br>
					<div className='row'>
						<div className='col'>
							<button id='backToUserInfoBtn' className="btn btn-light form-control" onClick={() => {navigate('/userinfo');}} >Back to Account Info</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
	else 
	{
		return (
			<div>
				<div className="container text-center">
					<h2>This user is either not in your team or not in your organization, so you cannot view their statistics.</h2>
					<br></br>
					<div className='row'>
						<div className='col'>
							<button id='backToUserInfoBtn' className="btn btn-light form-control" onClick={() => {navigate('/myteam');}} >Back to My Team</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default UserStatsPage;
