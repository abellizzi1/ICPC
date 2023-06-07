import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { CompletedProblem } from '../../lib/DbTypes';
import { useState, useEffect } from 'react';

// A type for the JSON object that the graphs retrieve data from.
type GraphCompletedProblem = {
	month:number,
	day:number,
	year:number,
	monthAndDay:string, 
	monthAndYear:string,
	CompletedProblemsToDate:number
}

/**
 * Gets the data necessary for the graphs.
 * @param pastYear 
 * if pastYear===1 -> get the data for the past year 
 * if pastYear===0 -> get data for the past month
 * @param type 
 * if type==="user" -> get the completed problems only for the user
 * if type==="team" -> get the completed problems for the whole team
 * if type==="organization" -> get the completed problems for the whole organization
 * @param userId 
 * The userId for user that we are viewing.
 * @returns 
 * Returns an array of JSON objects that the graphs will retrieve data from.
 */
async function getCompletedProblemsGraph(pastYear: number, type: string, userId: number) {
	// array of JSON objects that is modified then returned later
	var ret : GraphCompletedProblem[] = [];

	// array of JSON objects to store all the completed problems by user, team, or organization
	var allCompletedProblems : CompletedProblem[] = [];

	if (type === "user") {
		await axios.get(`http://${process.env.REACT_APP_DOMAIN!}/completedProblems/getCompletedProblemsByUserId/` + userId)
			.then(async response => {
				allCompletedProblems = response.data;
			});
	}
	else if (type === "team") {
		await axios.get(`http://${process.env.REACT_APP_DOMAIN!}/userToTeam/getUserToTeamByUserId/` + userId)
			.then(async response => {
				if (response.data.length > 0)
				{
					const userTeam = response.data[0];
					await axios.get(`http://${process.env.REACT_APP_DOMAIN!}/completedProblems/getCompletedProblemsByTeamId/` + userTeam.teamId)
						.then(async response => {
							allCompletedProblems = response.data;
						});
				}
			})
	}
	else if (type === "organization") {
		await axios.get(`http://${process.env.REACT_APP_DOMAIN!}/userToOrganization/getUserToOrgMappingsByUserId/` + userId)
            .then(async response => {
				const userOrg = response.data[0];
				await axios.get(`http://${process.env.REACT_APP_DOMAIN!}/completedProblems/getCompletedProblemsByOrgId/` + userOrg.organizationId)
            		.then(async response => {
						allCompletedProblems = response.data
					});
			});
	}

	// get today's date
	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();

	for (let i = 0; i < allCompletedProblems.length; i++)
	{
		// get allCompletedProblem[i]'s date from the timestamp
		var iTimestampSplit = allCompletedProblems[i].timestamp.split('-');
		var iYear = Number(iTimestampSplit[0]);
		var iMonth = Number(iTimestampSplit[1]);
		var iDay = Number(iTimestampSplit[2].substring(0, 3));

		// If pastYear===0: check to see if allCompletedProblems[i] has been completed in the last month
		// If pastYear===1: check to see if allCompletedProblems[i] has been completed in the last year
		if ((pastYear === 0 
			&& (iYear === year || (year - iYear === 1 && month === 1 && iMonth === 12))
			&& (month === iMonth || (month - iMonth <= 1 || (month === 1 && iMonth === 12) && day - iDay <= 0)))
	      || pastYear === 1 && (year === iYear || (year - iYear <= 1 && iMonth - month >= 1)))
		{
			var numCompletedProblemsToDate = 0;

			// find the number of completed problems up until this iDate
			for (let j = 0; j < allCompletedProblems.length; j++)
			{
				// get allCompletedProblems[j]'s date from the timestamp
				var jTimestampSplit = allCompletedProblems[j].timestamp.split('-');
				var jYear = Number(jTimestampSplit[0]);
				var jMonth = Number(jTimestampSplit[1]);
				var jDay = Number(jTimestampSplit[2].substring(0, 3));

				// check if the jDate is before the iDate
				if (jYear < iYear || (jYear === iYear && (jMonth < iMonth || (jMonth === iMonth && jDay <= iDay))))
				{
					numCompletedProblemsToDate++;
				}
			}
			let iYearString = iYear+"";

			var toAdd = {
				month: iMonth,
				day: iDay,
				year: iYear,
				monthAndDay: iMonth + "/" + iDay, 
				monthAndYear: iMonth + "/" + iYearString.substring(2, iYearString.length),
				CompletedProblemsToDate: numCompletedProblemsToDate
			}
			ret.push(toAdd);
		}
	}

	// If pastYear===0: use filter to find duplicate dates and remove them
	// If pastYear===1: get only the max CompletedProblemsToDate for each month and remove duplicate months
	var retDuplicatesRemoved : GraphCompletedProblem[] = [];
	if (pastYear === 0)
	{
		for (let i = 0; i < ret.length; i++)
		{
			var findDup = retDuplicatesRemoved.filter(prob => prob.monthAndDay === ret[i].monthAndDay);
			if (findDup.length === 0)
			{
				// if retDuplicatesRemoved doesn't already contain ret[i], add ret[i]
				retDuplicatesRemoved.push(ret[i]);
			}
		}
	}
	else if (pastYear === 1)
	{
		// iterate through all 12 months to find the max for each month
		// then add the month, which contains the number of completed problems by the end of that month
		for (let i = 1; i <= 12; i++)
		{
			var iterateMonth = ret.filter(prob => prob.month === i);
			if (iterateMonth.length > 0)
			{
				var maxCompleted = iterateMonth[0];
				for (let j = 0; j < iterateMonth.length; j++)
				{
					if (iterateMonth[j].CompletedProblemsToDate > maxCompleted.CompletedProblemsToDate)
					{
						maxCompleted = iterateMonth[j];
					}
				}
				retDuplicatesRemoved.push(maxCompleted);
			}
		}
	}

	// sort the array before returning it (insertion sort)
	let i, key, j; 
    for (i = 1; i < retDuplicatesRemoved.length; i++)
    { 
        key = retDuplicatesRemoved[i]; 
        j = i - 1; 
   
        /* Move elements of retDuplicatesRemoved[0..i-1], that are 
        greater than key, to one position ahead 
        of their current position */
		while (j >= 0 && (retDuplicatesRemoved[j].year > key.year || retDuplicatesRemoved[j].month > key.month || (retDuplicatesRemoved[j].month === key.month && retDuplicatesRemoved[j].day > key.day)))
        { 
            retDuplicatesRemoved[j + 1] = retDuplicatesRemoved[j]; 
            j = j - 1; 
        } 
        retDuplicatesRemoved[j + 1] = key; 
    } 
	
	return retDuplicatesRemoved;
}

const UserStatsGraph = ({ userId, isPastMonthOrYear } : { userId: number, isPastMonthOrYear: number }) => {

    // States to store the data used for the graphs to show the completed problems in the last month
	const [userDailyCompletedProblems, setUserDailyCompletedProblems] = useState<GraphCompletedProblem[]>([]);
	const [teamDailyCompletedProblems, setTeamDailyCompletedProblems] = useState<GraphCompletedProblem[]>([]);
	const [orgDailyCompletedProblems, setOrgDailyCompletedProblems] = useState<GraphCompletedProblem[]>([]);

	// States to store the data used for the graphs to show the completed problems in the last year
	const [userMonthlyCompletedProblems, setUserMonthlyCompletedProblems] = useState<GraphCompletedProblem[]>([]);
	const [teamMonthlyCompletedProblems, setTeamMonthlyCompletedProblems] = useState<GraphCompletedProblem[]>([]);
	const [orgMonthlyCompletedProblems, setOrgMonthlyCompletedProblems] = useState<GraphCompletedProblem[]>([]);
    
    useEffect(() => {
		const init = async () => {
			// get graphs for the past month
			var tempUserDailyCompletedProblems = await getCompletedProblemsGraph(0, "user", userId);
			setUserDailyCompletedProblems(tempUserDailyCompletedProblems);
			var tempTeamDailyCompletedProblems = await getCompletedProblemsGraph(0, "team", userId);
			setTeamDailyCompletedProblems(tempTeamDailyCompletedProblems);
			var tempOrgDailyCompletedProblems = await getCompletedProblemsGraph(0, "organization", userId);
			setOrgDailyCompletedProblems(tempOrgDailyCompletedProblems);

			// get graphs for the past year
			var tempUserMonthlyCompletedProblems = await getCompletedProblemsGraph(1, "user", userId);
			setUserMonthlyCompletedProblems(tempUserMonthlyCompletedProblems);
			var tempTeamMonthlyCompletedProblems = await getCompletedProblemsGraph(1, "team", userId);
			setTeamMonthlyCompletedProblems(tempTeamMonthlyCompletedProblems);
			var tempOrgMonthlyCompletedProblems = await getCompletedProblemsGraph(1, "organization", userId);
			setOrgMonthlyCompletedProblems(tempOrgMonthlyCompletedProblems);
        }
		init();
	}, []);

      return (
        <>
        <br></br>
        <h2>User</h2>
        <br></br>
        <ResponsiveContainer width='100%' height={400}>
            <LineChart width={600} height={300} data={isPastMonthOrYear === 0 ? userDailyCompletedProblems : userMonthlyCompletedProblems} margin={{
                top: 5, right: 80, left: 30, bottom: 5,
            }}>
                <Line type="monotone" dataKey="CompletedProblemsToDate" stroke="#8884d8" strokeWidth={3}/>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey={isPastMonthOrYear === 0 ? "monthAndDay" : "monthAndYear"} />
                <YAxis  />
                <Tooltip />
            </LineChart>
        </ResponsiveContainer>
        <br></br>
        <h2>Team</h2>
        <br></br>
        <ResponsiveContainer width='100%' height={400}>
            <LineChart width={600} height={300} data={isPastMonthOrYear === 0 ? teamDailyCompletedProblems : teamMonthlyCompletedProblems} margin={{
                top: 5, right: 80, left: 30, bottom: 5,
            }}>
                <Line type="monotone" dataKey="CompletedProblemsToDate" stroke="#8884d8" strokeWidth={3}/>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey={isPastMonthOrYear === 0 ? "monthAndDay" : "monthAndYear"} />
                <YAxis  />
                <Tooltip />
            </LineChart>
        </ResponsiveContainer>
        <br></br>
        <h2>Organization</h2>
        <br></br>
        <ResponsiveContainer width='100%' height={400}>
            <LineChart width={600} height={300} data={isPastMonthOrYear === 0 ? orgDailyCompletedProblems : orgMonthlyCompletedProblems} margin={{
                top: 5, right: 80, left: 30, bottom: 5,
            }}>
                <Line type="monotone" dataKey="CompletedProblemsToDate" stroke="#8884d8" strokeWidth={3}/>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey={isPastMonthOrYear === 0 ? "monthAndDay" : "monthAndYear"} />
                <YAxis  />
                <Tooltip />
            </LineChart>
        </ResponsiveContainer>
        <br></br>
        </>
      );
}
 
export default UserStatsGraph;