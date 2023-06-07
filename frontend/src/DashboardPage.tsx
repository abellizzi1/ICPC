import { Button, Card, CardGroup, Table } from "react-bootstrap";
import { SetTitle } from "./lib/useRedux";
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Gets 20 of the most recently completed problems.
 * @param loggedInUserId 
 * the id of the logged in user
 * @returns 
 * Returns 20 of the most recently completed problems.
 */
async function getRecentlyCompleted(loggedInUserId : number) {
	var recentlyCompleted : {problemId: number, problemName: string, categoryName: string, timestamp: string}[] = [];

	// Get the data for the categoriesAndProblems
	await axios.get(`http://${process.env.REACT_APP_DOMAIN!}/problem/getProblemsAndCategoriesByUserId/` + loggedInUserId)
		.then(response => { 
			const categoriesAndProblems = response.data;

			// loop through categoriesAndProblems to find which have been completed and push to recentlyCompleted
			for (let i = 0; i < categoriesAndProblems.length; i++)
			{
				for (let j = 0; j < categoriesAndProblems[i].problems.length; j++)
				{
					var currProblem = categoriesAndProblems[i].problems[j];
					if (currProblem.completedTimestamp != "")
					{
						recentlyCompleted.push({
							problemId: currProblem.problemId,
							problemName: currProblem.problemName,
							categoryName: categoriesAndProblems[i].categoryName,
							timestamp: currProblem.completedTimestamp
						});
					}
				}
			}
		});

	/*
		Year: timestamp substring (0, 4)
		Month: timestamp substring (5, 7)
		Day: timestamp substring (8, 10)
	*/

	// sort the array before returning it (insertion sort)
	let i, key, j; 
    for (i = 1; i < recentlyCompleted.length; i++)
    { 
        key = recentlyCompleted[i]; 
		let keyYear = Number(key.timestamp.substring(0, 4));
		let keyMonth = Number(key.timestamp.substring(5, 7));
		let keyDay = Number(key.timestamp.substring(8, 10));

        j = i - 1; 
   
        /* Move elements of recentlyCompleted[0..i-1], that are 
        less than key, to one position ahead 
        of their current position to sort by most recent*/
		while (j >= 0 && (Number(recentlyCompleted[j].timestamp.substring(0, 4)) < keyYear || Number(recentlyCompleted[j].timestamp.substring(5, 7)) < keyMonth 
		|| (Number(recentlyCompleted[j].timestamp.substring(5, 7)) === keyMonth && Number(recentlyCompleted[j].timestamp.substring(8, 10)) < keyDay)))
        { 
            recentlyCompleted[j + 1] = recentlyCompleted[j]; 
            j = j - 1; 
        } 
        recentlyCompleted[j + 1] = key; 
    } 
	
	return recentlyCompleted.slice(0, 20);
}

/**
 * Returns 20 problems in the organization that the logged in user has not completed.
 * @param loggedInUserId 
 * the id of the logged in user
 * @returns 
 * Returns 20 problems in the organization that the logged in user has not completed.
 */
async function getRecentlyAssigned(loggedInUserId : number) {
	var recentlyAssigned : {problemId: number, problemName: string, categoryName: string, difficulty: string}[] = [];

	// Get the data for the categoriesAndProblems
	await axios.get(`http://${process.env.REACT_APP_DOMAIN!}/problem/getProblemsAndCategoriesByUserId/` + loggedInUserId)
		.then(response => { 
			const categoriesAndProblems = response.data;
			
			// loop through categoriesAndProblems to find which have not been completed and push to recentlyAssigned
			for (let i = 0; i < categoriesAndProblems.length; i++)
			{
				for (let j = 0; j < categoriesAndProblems[i].problems.length; j++)
				{
					var currProblem = categoriesAndProblems[i].problems[j];
					if (currProblem.completedTimestamp === "")
					{
						recentlyAssigned.push({
							problemId: currProblem.problemId,
							problemName: currProblem.problemName,
							categoryName: categoriesAndProblems[i].categoryName,
							difficulty: currProblem.difficulty
						});
					}
				}
			}
		});

	return recentlyAssigned.slice(0, 20);
}

function DashboardPage() {
	SetTitle("Dashboard");

	let navigate = useNavigate();
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")!);

	// State that contains 20 of the most recently completed problems
	const [recentlyCompleted, setRecentlyCompleted] = useState<{problemId: number, problemName: string, categoryName: string, timestamp: string}[]>([]);

	// State that contains 20 problems in the organization that the user has not yet completed
	const [recentlyAssigned, setRecentlyAssigned] = useState<{problemId: number, problemName: string, categoryName: string, difficulty: string}[]>([]);

    useEffect(() => {
        const init = async () => {
            var tempRecentlyCompleted = await getRecentlyCompleted(loggedInUser.id);
			setRecentlyCompleted(tempRecentlyCompleted);
			
			var tempRecentlyAssigned = await getRecentlyAssigned(loggedInUser.id);
			setRecentlyAssigned(tempRecentlyAssigned);
        }
        init();
	}, []);

	return (
		<div>
			<Card id='dash-cards' bg='light' text='dark'>
				<Card.Header>Sites:</Card.Header>
				<Card.Body>
					<CardGroup>
						<Card>
							<Card.Body>
								<Card.Title>Neetcode</Card.Title>
							</Card.Body>
							<Card.Footer>
								<a href="https://neetcode.io/" target="_blank" rel="noopener noreferrer">
									<Button id='card-button' variant='dark'>Goto</Button>
								</a>
							</Card.Footer>
						</Card>
						<Card>
							<Card.Body>
								<Card.Title>Codeforces</Card.Title>
							</Card.Body>
							<Card.Footer>
								<a href="https://codeforces.com/" target="_blank" rel="noopener noreferrer">
									<Button id='card-button' variant='dark'>Goto</Button>
								</a>
							</Card.Footer>
						</Card>
						<Card>
							<Card.Body>
								<Card.Title>Uhunt</Card.Title>
							</Card.Body>
							<Card.Footer>
								<a href="https://uhunt.onlinejudge.org/" target="_blank" rel="noopener noreferrer">
									<Button id='card-button' variant='dark'>Goto</Button>
								</a>
							</Card.Footer>
						</Card>
						<Card>
							<Card.Body>
								<Card.Title>Leetcode</Card.Title>
							</Card.Body>
								<Card.Footer>
								<a href="https://leetcode.com/" target="_blank" rel="noopener noreferrer">
									<Button id='card-button' variant='dark'>Goto</Button>
								</a>
							</Card.Footer>
						</Card>
					</CardGroup>
				</Card.Body>
			</Card>

			<Card id='dash-cards' bg='light' text='dark'>
				<Card.Header id="recentlyAssignedHeader" className="sticky-top">Recently Assigned:</Card.Header>
				<Card.Body>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Problem</th>
								<th>Category</th>
								<th>Difficulty</th>
								<th>Link</th>
							</tr>
						</thead>
						<tbody>
							{recentlyAssigned.map(problem => {
								return (
									<tr>
										<td>{problem.problemName}</td>
										<td>{problem.categoryName}</td>
										<td>{problem.difficulty}</td>
										<td><button className="btn btn-dark form-control" onClick={() => {navigate('/problems/view/' + problem.problemId)}} >Go to problem</button></td>
									</tr>
								)
							})}
						</tbody>
					</Table>
				</Card.Body>
			</Card>

			<Card id='dash-cards' bg='light' text='dark'>
				<Card.Header id="recentlyCompletedHeader" className="sticky-top">Recently Completed:</Card.Header>
				<Card.Body>
					<Table striped bordered hover>
						<thead>
							<tr>
								<th>Problem</th>
								<th>Category</th>
								<th>Date Completed</th>
								<th>Link</th>
							</tr>
						</thead>
						<tbody>
							{recentlyCompleted.map(problem => {
								return (
									<tr>
										<td>{problem.problemName}</td>
										<td>{problem.categoryName}</td>
										<td>{problem.timestamp.substring(0, 10)}</td>
										<td><button className="btn btn-dark form-control" onClick={() => {navigate('/problems/view/' + problem.problemId)}} >Go to problem</button></td>
									</tr>
								)
							})}
						</tbody>
					</Table>
				</Card.Body>
			</Card>
		</div>
	);
}

export default DashboardPage;