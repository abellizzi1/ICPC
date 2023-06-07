import { useNavigate } from 'react-router-dom';
import { SetTitle } from './lib/useRedux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NewTeam } from './lib/useForm';
import axios from 'axios';

function CreateTeamPage() {
	let navigate = useNavigate();
	SetTitle("Create New Team");

	async function postNewTeam (userID: number, team: any) {
		await axios.post(`http://${process.env.REACT_APP_DOMAIN!}/team/postTeam/` + userID, team).then(
			async response => {
				console.log(response.data);
				navigate('/dashboard');
			}
		)
	}
	
	const { register, handleSubmit } = useForm<NewTeam>();
	const onSubmit: SubmitHandler<NewTeam> = data => {
		const team = {
			name: data.name
		}
		const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")!);
		postNewTeam(loggedInUser.id, team);
	}
	
	return (
		<div>
			<p className='NewTeamHeader'>
				This page is for the creation of new teams. Teams are not automatically joined and are linked to an organization.
				User is taken to the dashboard upon new team submission.
			</p>
			<form className="NewTeamForm" onSubmit={handleSubmit(onSubmit)}>
			<input type="text" placeholder="new team name" {...register("name", {required: true, max: 120, min: 1})} />
			<input type="submit" />
			</form>
		</div>
	);
}

export default CreateTeamPage;
