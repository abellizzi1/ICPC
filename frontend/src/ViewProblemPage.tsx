import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ImageUpload from './components/ImageUpload';
import YoutubeEmbed from './components/YoutubeEmbed';
import { SetTitle } from './lib/useRedux';

/**
 * A method that gets the selected problem's details.
 * @param problemId 
 * id of the problem selected
 * @returns 
 * Returns a JSON object that contains the problem id, name, link, vidoe tutorial url, and difficulty.
 */
async function getProblemDetails(problemId:string) {
	// the variable to be later returned
	var ret = { id:"", name:"", linkUrl:"", videoUrlEmbed:"", difficulty:"" };

	// get the problem info and the difficulty
	await axios.get(`http://${process.env.REACT_APP_DOMAIN!}/problem/getProblemById/` + problemId)
	.then(async response => {
		const prob = response.data
		await axios.get(`http://${process.env.REACT_APP_DOMAIN!}/difficulty/getDifficultyById/` + prob.difficultyId)
		.then(response => {
			const diff = response.data;

			var videoUrl = prob.videoUrl;
			if (videoUrl !== null) {
				//get the embedUrl from prob.videoUrl : starts after 'v=' and ends at '&'. Example: 3OamzN90kPg
				// some url's may be https://www.youtube.com/watch?v=3OamzN90kPg&ab_channel=NeetCode
				// but it could also be https://www.youtube.com/watch?v=3OamzN90kPg
				// or https://youtu.be/3OamzN90kPg
				const splitAtEquals = prob.videoUrl.split("=");
				
				if (splitAtEquals.length === 1) // in this format: https://youtu.be/3OamzN90kPg
				{
					const splitAtSlash = prob.videoUrl.split("/");
					videoUrl = splitAtSlash[splitAtSlash.length-1];
				}
				else
				{
					const splitAtAnd = splitAtEquals[1].split("&");
					videoUrl = splitAtAnd[0];
				}
			}
			ret = {
				id:prob.id+"",
				name:prob.name,
				linkUrl:prob.linkUrl,
				videoUrlEmbed:videoUrl,
				difficulty:diff.name
			};
		});
	});

	return ret;
}

function ViewProblemPage() {
	let navigate = useNavigate();

	SetTitle("View Problem");

	// state to display or set the screenshot that is submitted for the problem
	const [img, setImg]  = useState();

	// state to store the information for the selected problem
	const [problem, setProblem] = useState<{
		id:string,
        name:string,
		linkUrl:string,
		videoUrlEmbed:string,
		difficulty:string
    }>({ id:"", name:"", linkUrl:"", videoUrlEmbed:"", difficulty:"" });

	useEffect(() => {
		const currUrl = window.location.href.split("/");
		const probId = currUrl[currUrl.length-1];
		
		const init = async () => {
            var temp = await getProblemDetails(probId);
			setProblem(temp);
        }
        init();

		// get the submitted image for this problem and display it (if there is one)
		var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")!);
		axios.get(`http://${process.env.REACT_APP_DOMAIN!}/api/image/${loggedInUser.id}/` + probId)
		.then((response) => {
			setImg(response.data.img);
		});
	}, []);

	return (
		<div>
			<div className="container text-center">
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<div className='row'>
					<div className='col'>
						<a href={problem.linkUrl} className="link-info">Go to the problem</a>
					</div>
				</div>
				<br></br>
				<div className='row'>
					<div className='col'>
						<h2>Problem Name</h2>
					</div>
				</div>
				<div className='row'>
					<div className='col'>
						<h5>{problem.name}</h5>
					</div>
				</div>
				<br></br>
				<div className='row'>
					<div className='col'>
						<h2>Difficulty</h2>
					</div>
				</div>
				<div className='row'>
					<div className='col'>
						<h5>{problem.difficulty}</h5>
					</div>
				</div>
				<br></br>
				<div className='row'>
					<div className='col'>
						<h2>Video</h2>
					</div>
				</div>
				<div className='row'>
					<div className='col'>
						<YoutubeEmbed embedId={problem.videoUrlEmbed} />
					</div>
				</div>
				<br></br>
				<div className='submitHeader row'>
					<div className='col'>
						<h2>Submit Screenshot</h2>
					</div>
				</div>
				<div className='upload-form'>
						<ImageUpload problemId={problem.id}/>
				</div>
				<div className='row'>
					<div className='col'>
						{img ? <img className='submission-img' src={`data:image/png;base64,${img}`}/>: ''}
					</div>
				</div>
				<div className='row'>
					<div className='col'>
						<button className="btn btn-light backToProblems" onClick={() => {navigate('/problems');}} >Back to Problems</button>
					</div>
				</div>
            </div>
		</div>  
	);
}

export default ViewProblemPage;
