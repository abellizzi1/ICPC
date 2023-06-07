import axios from 'axios';
import { CompletedProblem } from '../../lib/DbTypes';
import { useState, useEffect } from 'react';
import { getCodeforcesInfo, getLeetcodeInfo, getUhuntInfo } from './UserStatsData';

/**
 * A function that is equivalent to a thread sleep in Java.
 * @param msec 
 * Number of milliseconds to sleep
 * @returns 
 * Returns a promise after the set amount of time has elapsed.
 */
async function sleep(msec:number) {
    return new Promise(resolve => setTimeout(resolve, msec));
}

/**
 * Gets the data for the team rank table. Based on completed problems, and codeforces, leetcode, uhunt rankings.
 * Rank by default is based on: Leetcode Ranking + Uhunt rank - Codeforces current rating - (number of completed problems * 1000).
 * (Sorted in ascending order -> person with the lowest points is in first place)
 * We plan on implementing a sorting feature to individually sort by Leetcode, Uhunt, Codeforces, or Completed problems.
 * The user must have all 3 websites linked to be considered in the team rank table.
 * @param usersAndPoints 
 * Contains all users in the organization and their points which are calculated in the getOrgRank function. 
 * Only the team members within this parameter are used in this function.
 * @param userId 
 * The userId of the user which we are retrieving statistics for.
 * @returns 
 * Returns a JSON object containing the data necessary for the team ranking table.
 */
async function getTeamRankList(usersAndPoints: {id: number, leetcodeRanking: number, uhuntRanking: number, codeforcesCurrentRating: number, numCompletedProblems: number, points: number}[], 
								userId: number) {
	// array of JSON objects to return later
	var ret : {
		userId: number,
		name: string, 
		leetcodeRank: number,
		uhuntRank: number,
		codeforcesCurrentRating: number,
		numCompletedProblems: number,
		teamRank: number,
		points: number
	}[] = [];

	// Get the id of the team that the user is in, then get all users in that team
	// Then set the fields in ret after the necessary data is retrieved
	await axios.get(`http://${process.env.REACT_APP_DOMAIN!}/userToTeam/getUserToTeamByUserId/` + userId)
		.then(async response => {
			if (response.data.length > 0)
			{
				const userTeam = response.data[0];
				await axios.get(`http://${process.env.REACT_APP_DOMAIN!}/user/getAllUsersByTeamId/` + userTeam.teamId)
					.then(async response => {
						const usersInTeam = response.data;
	
						for (let i = 0; i < usersInTeam.length; i++)
						{
							for (let j = 0; j < usersAndPoints.length; j++)
							{
								if (usersInTeam[i].id === usersAndPoints[j].id)
								{
									var toAdd = {
										userId: usersInTeam[i].id,
										name: usersInTeam[i].firstName + " " + usersInTeam[i].lastName, 
										leetcodeRank: usersAndPoints[j].leetcodeRanking,
										uhuntRank: usersAndPoints[j].uhuntRanking,
										codeforcesCurrentRating: usersAndPoints[j].codeforcesCurrentRating,
										numCompletedProblems: usersAndPoints[j].numCompletedProblems,
										teamRank: 0,
										points: usersAndPoints[j].points
									};
									ret.push(toAdd);
								}
							}
						}
					});
			}
		});

	// sort in ascending order by points
	ret.sort(function(a, b) {
		return a.points - b.points; 
	});
	
	// set the teamRank variable within the ret JSON object based on the order in which the ret array is sorted
	for (let i = 0; i < ret.length; i++) {
		ret[i].teamRank = i+1;
	}

	return ret;
}


/**
 * Gets the data for the organization rank. Based on completed problems, and codeforces, leetcode, uhunt rankings.
 * Rank by default is based on: Leetcode Ranking + Uhunt rank - Codeforces current rating - (number of completed problems * 1000).
 * (Sorted in ascending order -> person with the lowest points is in first place)
 * Only users who have all 3 coding websites linked are considered.
 * The logged in user can only view their own organization ranking.
 * @returns 
 * Returns the organization rank of the user, number of total users in the organization, and the array of 
 * JSON objects usersAndPoints which contains all users in the organization and their points (based on the equation above).
 */
async function getOrgRank(userId: number) {
	// array of JSON objects to be returned later
	var usersAndPoints : {
		id: number,
		leetcodeRanking: number, 
		uhuntRanking: number,
		codeforcesCurrentRating: number, 
		numCompletedProblems: number,
		points: number
	}[] = [];

	// Get all the users, their usernames for the 3 websites, and the number of problems they've completed.
	await axios.get(`http://${process.env.REACT_APP_DOMAIN!}/userStatsPage/getUserStatsPageLogical/` + userId)
		.then(async response => {
			const usersAndCompletedProblems = response.data;

			for (let i = 0; i < usersAndCompletedProblems.length; i++)
			{
				if (usersAndCompletedProblems[i].codeforcesUsername !== "" && usersAndCompletedProblems[i].leetcodeUsername !== "" 
					&& usersAndCompletedProblems[i].uhuntId !== -1)
					{
						// sleep for 2.5 seconds since codeforces API only allows calls every 2 seconds
						await sleep(2500);

						// get rankings from the 3 websites
						var codeforcesInfo = await getCodeforcesInfo(usersAndCompletedProblems[i].codeforcesUsername);
						var	leetcodeInfo = await getLeetcodeInfo(usersAndCompletedProblems[i].leetcodeUsername);
						var	uhuntInfo = await getUhuntInfo(usersAndCompletedProblems[i].uhuntId);

						console.log("leet rank: " + leetcodeInfo.ranking + " . uhunt rank: " + uhuntInfo.rank + " . cf rank: " + codeforcesInfo.currentRating);
						var points = leetcodeInfo.ranking + uhuntInfo.rank - codeforcesInfo.currentRating - (usersAndCompletedProblems[i].numCompletedProblems * 1000);
	
						var toAdd = {
							id: usersAndCompletedProblems[i].userId,
							leetcodeRanking: leetcodeInfo.ranking, 
							uhuntRanking: uhuntInfo.rank,
							codeforcesCurrentRating: codeforcesInfo.currentRating, 
							numCompletedProblems: usersAndCompletedProblems[i].numCompletedProblems,
							points: points
						};
						usersAndPoints.push(toAdd);
					}
			}
		});

	// sort in ascending order by points
	usersAndPoints.sort(function(a, b) {
		return a.points - b.points; 
	});

	// set the user's organization rank based on the order in which the usersAndPoints array is sorted
	var rank = 0;
	for (let i = 0; i < usersAndPoints.length; i++)
	{
		if (usersAndPoints[i].id === userId) 
		{
			rank = i+1;
			break;
		}
	}

	if (rank === 0) 
	{
		// user does not have a rank since they don't have all usernames inputted
		return {
			rank:0,
			totalUsers:0,
			usersAndPoints: usersAndPoints
		};
	}
	else
	{
		return {
			rank:rank,
			totalUsers:usersAndPoints.length,
			usersAndPoints: usersAndPoints
		};
	}
}

const UserStatsRanking = ({ userId, isSameOrganization } : { userId: number, isSameOrganization: boolean }) => {

    // States that contain the data for the user's organization rank. Only displayed if the user is viewing themself.
	const [orgRank, setOrgRank] = useState(0);
	const [totalUsersInOrg, setTotalUsersInOrg] = useState(0);

    // Current selection for SortBy
	const [sortBy, setSortBy] = useState("All");

    // Prevents re-renders. Loaded=1, Not loaded=0
	const [isLoaded, setIsLoaded] = useState(0);

	// An array of JSON objects that is used for the team rank table.
	const [teamRankList, setTeamRankList] = useState<{
		userId:number,
        name:string, 
		leetcodeRank:number,
		uhuntRank:number,
		codeforcesCurrentRating:number,
		numCompletedProblems:number,
		teamRank:number,
		points:number
    }[]>([]);

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")!);
	
    useEffect(() => {
		const init = async () => {
			// get the user's organization rank and the total number of users in the organization
			var tempOrgRank = await getOrgRank(Number(userId));
			setOrgRank(tempOrgRank.rank);
			setTotalUsersInOrg(tempOrgRank.totalUsers);

			// get the data necessary for the team ranking table
			var tempTeamRank = await getTeamRankList(tempOrgRank.usersAndPoints, Number(userId));
			setTeamRankList(tempTeamRank);

            setIsLoaded(1);
        }
		if (isLoaded === 0) { init() }
	}, [sortBy]);

    const teamSortByOnChange = (type: string) => {
		const value = type;
		var temp = teamRankList;
		if (value === "All")
		{
			// sort by points which is a combination of all 4 (ascending)
			temp.sort(function(a, b) {
				return a.points - b.points; 
			});
		}
		else if (value === "Leetcode")
		{
			// sort by leetcode ranking (ascending)
			temp.sort(function(a, b) {
				return a.leetcodeRank - b.leetcodeRank; 
			});
		}
		else if (value === "Uhunt") 
		{
			// sort by uhunt ranking (ascending)
			temp.sort(function(a, b) {
				return a.uhuntRank - b.uhuntRank; 
			});
		}
		else if (value === "Codeforces")
		{
			// sort by codeforces rating (descending)
			temp.sort(function(a, b) {
				return b.codeforcesCurrentRating - a.codeforcesCurrentRating; 
			});
		}
		else if (value === "CompletedProblems")
		{
			// sort by number of completed problems (descending)
			temp.sort(function(a, b) {
				return b.numCompletedProblems - a.numCompletedProblems; 
			});
		}
		setTeamRankList(temp);
		setSortBy(value);
	}

	/**
	 * Displays the organization rank if the user is viewing themself, or 
	 * if the logged in user is a head coach or an admin that is in the same organization.
	 * @param viewingUserId 
	 * the id of the user that is being viewed
	 * @param orgRank 
	 * the user's rank in the organization
	 * @param totalUsersInOrg 
	 * total users in the organization
	 * @returns 
	 * Returns the user's organization rank if the conditions are true, else it returns nothing
	 */
	const showOrgRank = (viewingUserId: number, orgRank: number, totalUsersInOrg: number) => {
		if (loggedInUser.id === viewingUserId || (isSameOrganization && (loggedInUser.isAdmin === 1 || loggedInUser.isHeadCoach === 1 || loggedInUser.isAssistantCoach === 1))) {
			return (
				<>
				<br></br>
				<div className="row">
					<div className="col">
						<h1>Organization Rank: {orgRank}/{totalUsersInOrg}</h1>
					</div>
				</div>
				<br></br>
				</>
			)
		}
		else {
			return (
				<>
				<br></br>
				<br></br>
				</>
			)
		}
	}

      return (
        <>
        {showOrgRank(Number(userId), orgRank, totalUsersInOrg)}
        <div className="row">
            <div className="col">
                <h1>Team Ranking</h1>
            </div>
        </div>
        <br></br>
        <select onChange={(e) => teamSortByOnChange(e.target.value)} className="form-select teamSortBy">
            <option value="Sort By" disabled selected>Sort By</option>
            <option value="All">All</option>
            <option value="Leetcode">Leetcode Rank</option>
            <option value="Uhunt">Uhunt Rank</option>
            <option value="Codeforces">CF Current Rating</option>
            <option value="CompletedProblems"># Completed Problems</option>
        </select>
        <br></br>
        <table className="table table-dark table-bordered table-hover">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Leetcode Rank</th>
                <th scope="col">Uhunt Rank</th>
                <th scope="col">CF Current Rating</th>
                <th scope="col"># Completed Problems</th>
                </tr>
            </thead>
            <tbody>
                {teamRankList.map(member => {
                    return (
                        <tr>
                            <th scope="row">{member.teamRank}</th>
                            <td>{member.name}</td>
                            <td>{member.leetcodeRank}</td>
                            <td>{member.uhuntRank}</td>
                            <td>{member.codeforcesCurrentRating}</td>
                            <td>{member.numCompletedProblems}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </>
      );
}
 
export default UserStatsRanking;