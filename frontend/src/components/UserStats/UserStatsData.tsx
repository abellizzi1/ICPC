import axios from 'axios';
import { useState, useEffect } from 'react';

/**
 * A function to get the logged in user's codeforces data.
 * @param username 
 * The logged in user's codeforces username.
 * @returns 
 * Returns a JSON object including the following Codeforces user data:
 * - Contributions
 * - Average rating
 * - Sum of all ratings
 * - Average rank
 */
export async function getCodeforcesInfo(username: string) 
{
	var ret: {
		contributions: number,
		avgRating: number,
		currentRating: number,
		avgRank: number
	} = {contributions: 0, avgRating: 0, currentRating: 0, avgRank: 0};

	await axios.get("https://codeforces.com/api/user.info?handles=" + username)
		.then(async response => {
			const cUser = response.data.result[0];
			var contributions = cUser.contribution;
			var currentRating = cUser.rating;

			await axios.get("https://codeforces.com/api/user.rating?handle=" + username)
				.then(async response => {
					const ratingArr = response.data.result;
					var sumRating = 0;
					var sumRank = 0;
					for (var i = 0; i < ratingArr.length; i++)
					{
						sumRating += ratingArr[i].newRating;
						sumRank += ratingArr[i].rank;
					}
					var avgRating = Math.round((sumRating / ratingArr.length)*100) / 100;
					var avgRank = Math.round((sumRank / ratingArr.length)*100) / 100;

					ret = {
						contributions: contributions,
						avgRating: avgRating,
						currentRating: currentRating,
						avgRank: avgRank
					}
				}).catch(err => console.log(err));
		}).catch(err => console.log(err));
		

	return ret;
}

/**
 * A function to get the logged in user's leetcode data.
 * @param username 
 * The logged in user's leetcode username.
 * @returns 
 * Returns a JSON object including the following Leetcode user data:
 * - Acceptance rate
 * - Number of easy, medium, and hard problems solved
 * - Ranking
 * - Contribution points
 */
export async function getLeetcodeInfo(username: string)
{
	var ret: {
		acceptanceRate: number,
		easySolved: number,
		mediumSolved: number,
		hardSolved: number,
		ranking: number,
		contributionPoints: number
	} = {acceptanceRate: 0, easySolved: 0, mediumSolved: 0, hardSolved: 0, ranking: 0, contributionPoints: 0};

	//await axios.get("https://leetcode-stats-api.herokuapp.com/" + username) **Old endpoint, do not use**
	await axios.get(`http://${process.env.REACT_APP_DOMAIN!}/user/getLeetcodeData/` + username)
		.then(async response => {
			const lUser = response.data.data.matchedUser;
			var totalAcceptCount = lUser.submitStats.acSubmissionNum[0].submissions;
			var totalSubmissionCount = lUser.submitStats.totalSubmissionNum[0].submissions;

			ret = {
				acceptanceRate: (Math.round((totalAcceptCount/totalSubmissionCount)*100)/100),
				easySolved: lUser.submitStats.acSubmissionNum[1].count,
				mediumSolved: lUser.submitStats.acSubmissionNum[2].count,
				hardSolved: lUser.submitStats.acSubmissionNum[3].count,
				ranking: lUser.profile.ranking,
				contributionPoints: lUser.contributions.points
			}
		}).catch(err => console.log(err));

	return ret;
}

/**
 * A function to get the logged in user's Uhunt data.
 * @param id 
 * The logged in user's Uhunt id.
 * @returns 
 * Returns a JSON object including the following Uhunt user data:
 * - Username
 * - Rank
 * - Number of submissions
 * - Accepted problems
 */
export async function getUhuntInfo(id: number)
{
	// JSON object to return
	var ret: {
		username: string,
		rank: number,
		numSubmissions: number,
		acceptedProblems: number
	} = {username: "", rank: 0, numSubmissions: 0, acceptedProblems: 0};

	await axios.get("https://uhunt.onlinejudge.org/api/ranklist/" + id + "/0/0")
		.then(async response => {
			const uUser = response.data[0];
			ret = {
				username: uUser.username,
				rank: uUser.rank,
				numSubmissions: uUser.nos,
				acceptedProblems: uUser.ac
			}
		}).catch(err => console.log(err));

	return ret;
}

const UserStatsData = ({ userId } : { userId: number }) => {
    // Variables to store the user's codeforces data
	const [codeforcesHandle, codeforcesSetHandle]  = useState("Username has not been entered in profile page");
    const [codeforcesContributions, codeforcesSetContributions] = useState(0);
    const [codeforcesAvgRating, codeforcesSetAvgRating] = useState(0.0);
	const [codeforcesCurrentRating, codeforcesSetCurrentRating] = useState(0);
    const [codeforcesAvgRank, codeforcesSetAvgRank] = useState(0.0);

	// Variables to store the user's leetcode data
	const [leetcodeUsername, leetcodeSetUsername]  = useState("Username has not been entered in profile page");
    const [leetcodeAcceptanceRate, leetcodeSetAcceptanceRate] = useState(0.0);
    const [leetcodeEasySolved, leetcodeSetEasySolved] = useState(0);
    const [leetcodeMediumSolved, leetcodeSetMediumSolved] = useState(0);
    const [leetcodeHardSolved, leetcodeSetHardSolved] = useState(0);
    const [leetcodeRanking, leetcodeSetRanking] = useState(0);
    const [leetcodeContributionPoints, leetcodeSetContributionPoints] = useState(0);

	// Variables to store the user's uhunt data
	const [uhuntUserID, uhuntSetUserID]  = useState("User ID has not been entered in profile page");
    const [uhuntUsername, uhuntSetUsername] = useState("");
    const [uhuntAcceptedProblems, uhuntSetAcceptedProblems] = useState(0);
    const [uhuntNumSubmissions, uhuntSetNumSubmissions] = useState(0);
    const [uhuntRank, uhuntSetRank] = useState(0);

    useEffect(() => {
		const init = async () => {
			// get all the codeforces, leetcode, and uhunt data if the usernames are inputted on their profile
			await axios.get(`http://${process.env.REACT_APP_DOMAIN!}/user/getUserById/` + userId)
			.then(async response => {
				const user = response.data;
				
				if (user.codeforcesUsername !== null)
				{
					codeforcesSetHandle(user.codeforcesUsername);
					var codeforcesInfo = await getCodeforcesInfo(user.codeforcesUsername);
					codeforcesSetContributions(codeforcesInfo.contributions);
					codeforcesSetAvgRating(codeforcesInfo.avgRating);
					codeforcesSetCurrentRating(codeforcesInfo.currentRating);
					codeforcesSetAvgRank(codeforcesInfo.avgRank);
				}
				
				if (user.leetcodeUsername !== null)
				{
					leetcodeSetUsername(user.leetcodeUsername);
					var leetcodeInfo = await getLeetcodeInfo(user.leetcodeUsername);
					leetcodeSetAcceptanceRate(leetcodeInfo.acceptanceRate);
					leetcodeSetEasySolved(leetcodeInfo.easySolved);
					leetcodeSetMediumSolved(leetcodeInfo.mediumSolved);
					leetcodeSetHardSolved(leetcodeInfo.hardSolved);
					leetcodeSetRanking(leetcodeInfo.ranking);
					leetcodeSetContributionPoints(leetcodeInfo.contributionPoints);
				}

				if (user.uhuntId !== null)
				{
					uhuntSetUserID(user.uhuntId);
					var uhuntInfo = await getUhuntInfo(user.uhuntId);
					uhuntSetUsername(uhuntInfo.username);
					uhuntSetRank(uhuntInfo.rank);
					uhuntSetNumSubmissions(uhuntInfo.numSubmissions);
					uhuntSetAcceptedProblems(uhuntInfo.acceptedProblems);
				}
			});
        }
        init();
	}, []);


    

    return (
    <>
        <h1>Codeforces Statistics</h1>
        <br></br>
        <table className="table table-dark table-bordered table-hover">
            <tbody>
                <tr>
                    <td className='col-md-6 bolded'>Username</td>
                    <td className='col-md-6'>{codeforcesHandle}</td>
                </tr>
                <tr>
                    <td className='bolded'>Contributions</td>
                    <td>{codeforcesContributions}</td>
                </tr>
				<tr>
                    <td className='bolded'>Current Rating</td>
                    <td>{codeforcesCurrentRating}</td>
                </tr>
                <tr>
                    <td className='bolded'>Average Rating</td>
                    <td>{codeforcesAvgRating}</td>
                </tr>
                <tr>
                    <td className='bolded'>Average Rank</td>
                    <td>{codeforcesAvgRank}</td>
                </tr>
            </tbody>
        </table>
        <br></br>
        <div className="row">
            <div className="col">
                <h1>Leetcode Statistics</h1>
            </div>
        </div>
        <br></br>
        <table className="table table-dark table-bordered table-hover">
            <tbody>
                <tr>
                    <td className='col-md-6 bolded'>Username</td>
                    <td className='col-md-6'>{leetcodeUsername}</td>
                </tr>
                <tr>
                    <td className='bolded'>Ranking</td>
                    <td>{leetcodeRanking}</td>
                </tr>
                <tr>
                    <td className='bolded'>Easy solved</td>
                    <td>{leetcodeEasySolved}</td>
                </tr>
                <tr>
                    <td className='bolded'>Medium solved</td>
                    <td>{leetcodeMediumSolved}</td>
                </tr>
                <tr>
                    <td className='bolded'>Hard solved</td>
                    <td>{leetcodeHardSolved}</td>
                </tr>
                <tr>
                    <td className='bolded'>Acceptance rate</td>
                    <td>{leetcodeAcceptanceRate}</td>
                </tr>
                <tr>
                    <td className='bolded'>Contribution Points</td>
                    <td>{leetcodeContributionPoints}</td>
                </tr>
            </tbody>
        </table>
        <br></br>
        <div className="row">
            <div className="col">
                <h1>Uhunt Statistics</h1>
            </div>
        </div>
        <br></br>
        <table className="table table-dark table-bordered table-hover">
            <tbody>
                <tr>
                    <td className='col-md-6 bolded'>User ID</td>
                    <td className='col-md-6'>{uhuntUserID}</td>
                </tr>
                <tr>
                    <td className='bolded'>Username</td>
                    <td>{uhuntUsername}</td>
                </tr>
                <tr>
                    <td className='bolded'>Rank</td>
                    <td>{uhuntRank}</td>
                </tr>
                <tr>
                    <td className='bolded'>Submissions</td>
                    <td>{uhuntNumSubmissions}</td>
                </tr>
                <tr>
                    <td className='bolded'>Accepted Problems</td>
                    <td>{uhuntAcceptedProblems}</td>
                </tr>
            </tbody>
        </table>
    </>
    );
}
 
export default UserStatsData;