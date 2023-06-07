import { useNavigate } from 'react-router-dom';
import {useForm, SubmitHandler} from 'react-hook-form';
import axios from 'axios'
import { useState, useEffect } from 'react';
import Collapsible from 'react-collapsible';
import { SetTitle } from './lib/useRedux';
import { Button, Card, Offcanvas, Tab, Table, Tabs } from "react-bootstrap";
import {Team, UserWithoutPassword} from './lib/DbTypes'

/**
 * Gets the info and members of all teams in the organization.
 * @param loggedInUserId 
 * the id of the logged in user
 * @returns 
 * Returns an array of objects containing the info and members of all teams in the organization.
 */
async function getAllTeamsInfo(loggedInUserId: number) {
    var allTeamsInfo : {id:number, teamName:string, teamMembers: UserWithoutPassword[]}[] = [];

    // first, get all teams in the logged in user's organization
    await axios.get(`http://${process.env.REACT_APP_DOMAIN!}/team/getAllTeamsByUserId/` + loggedInUserId)
        .then(async response => {
            const allTeamsInOrg = response.data;
            var allTeamIdsInOrg : string[] = [];
            for (let i = 0; i < allTeamsInOrg.length; i++)
            {
                allTeamIdsInOrg.push(allTeamsInOrg[i].id + "");
            }
            // get all the users for each team given allTeamIdsInOrg
            await axios.get(`http://${process.env.REACT_APP_DOMAIN!}/user/getAllUsersByMultipleTeamIds`, {
                params: {
                    teamIds: allTeamIdsInOrg
                }
            }).then(async response => {
                    const teamsAndUsers = response.data;
                    // get all team names and push the objects to allTeamsInfo
                    for (let i = 0; i < teamsAndUsers.length; i++)
                    {
                        // array that stores the member list for each team
                        var memberArr : UserWithoutPassword[] = [];
                        for (let j = 0; j < teamsAndUsers[i].users.length; j++)
                        {
                            memberArr.push(teamsAndUsers[i].users[j]);
                        }
                        var findSameTeamId = allTeamsInOrg.filter((team : Team) => team.id === teamsAndUsers[i].teamId);
                        allTeamsInfo.push({
                            id: teamsAndUsers[i].teamId,
                            teamName: findSameTeamId[0].name,
                            teamMembers: memberArr
                        })
                    }
                });
        });

    // sort in ascending order by id
	allTeamsInfo.sort(function(a, b) {
		return a.id - b.id; 
	});

    return allTeamsInfo;
}

/**
 * Gets all users that are not on a team (to pop up in the Add Member dropdown)
 * @param loggedInUserId 
 * the id of the logged in user
 * @returns 
 * Returns all users that are not on a team
 */
async function getAllUsersNotOnTeam(loggedInUserId: number) {
    var usersToReturn : UserWithoutPassword[] = [];

    await axios.get(`http://${process.env.REACT_APP_DOMAIN!}/userToOrganization/getUserToOrgMappingsByUserId/` + loggedInUserId)
        .then(async response => {
            const orgId = response.data[0].organizationId;
            await axios.get(`http://${process.env.REACT_APP_DOMAIN!}/user/getAllUsersNotOnTeamByOrgId/` + orgId)
                .then(async response => {
                    usersToReturn = response.data;
                });
        });

    return usersToReturn;
}

/**
 * Remove a member from the team
 * @param teamId 
 * the id of the team
 * @param member 
 * the member to be removed
 */
async function removeMember(teamId: number, member: UserWithoutPassword) {
    await axios.delete(`http://${process.env.REACT_APP_DOMAIN!}/userToTeam/` + member.id + '/' + teamId);
}

/**
 * Add the member that is selected in the dropdown to the selected team
 * @param teamId 
 * the id of the selected team
 */
async function addMember(teamId: number) {
    // get userID from select dropdown id='addUserSelect'
    var selectElement = document.querySelector('#addUserSelect')!;
    await axios.post(`http://${process.env.REACT_APP_DOMAIN!}/userToTeam/` + (selectElement as HTMLInputElement).value + '/' + teamId);
}

function ManageTeamsPage() {
	let navigate = useNavigate();

	SetTitle("Manage Teams");
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")!);

    // State that contains all the teams' info and members
    const [allTeamsInfo, setAllTeamsInfo] = useState<{id:number, teamName:string, teamMembers: UserWithoutPassword[]}[]>([]);

    // State that contains all users that are not on a team (pops up in the Add Member dropdown)
    const [allUsersNotOnTeam, setAllUsersNotOnTeam] = useState<UserWithoutPassword[]>([]);

    // State that is true if the logged in user is an Admin, Head coach, or Assistant coach. Else false.
    const [validPermissions, setValidPermissions] = useState(false);

    // State that stores the selected team when you click View/Edit
    const [selectedTeam, setSelectedTeam] = useState<{id:number, teamName:string, teamMembers: UserWithoutPassword[]}>({id:0,teamName:"",teamMembers:[]});

    useEffect(() => {
        const init = async () => {
            setValidPermissions(loggedInUser.isAdmin === 1 || loggedInUser.isHeadCoach === 1 || loggedInUser.isAssistantCoach === 1);

            var tempAllTeamsInfo = await getAllTeamsInfo(loggedInUser.id);
            setAllTeamsInfo(tempAllTeamsInfo);

            var tempAllUsersNotOnTeam = await getAllUsersNotOnTeam(loggedInUser.id);
            setAllUsersNotOnTeam(tempAllUsersNotOnTeam);
        }
        init();
	}, []);

    // When View/Edit is clicked, editTeamVis=true, and when it is exited, editTeamVis=false
    const [editTeamVis, setEditTeamVis] = useState(false);
	const showEditTeamOC = () => {
		setEditTeamVis(true);
	}
    const hideEditTeamOC = () => {
		setEditTeamVis(false);
	}

    /**
     * Method used to list the team members' names in the table.
     * @param members 
     * the members of the team
     * @returns 
     * Returns the members' names in the format: 'FirstName LastName, FirstName LastName, ...'
     */
    const listTeamMembers = (members : UserWithoutPassword[]) => {
        var arr : string[] = [];
        for (let i = 0; i < members.length; i++)
        {
            arr.push(members[i].firstName + " " + members[i].lastName);
        }
        return arr.join(", ");
    }

    if (validPermissions) {
        return (
            <div>
                <Card id='config-cards' bg='light' text='dark'>
                    <Card.Body>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>Team Name</th>
                                    <th>Team Members</th>
                                    <th>View/Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allTeamsInfo.map(team => {
                                    return (
                                        <tr>
                                            <th scope="row">{team.id}</th>
                                            <td>{team.teamName}</td>
                                            <td>{listTeamMembers(team.teamMembers)}</td>
                                            <td><button className="btn btn-dark form-control" onClick={() => {
                                                setSelectedTeam(team); 
                                                showEditTeamOC();
                                                }} >View/Edit</button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>

                <Offcanvas id='EditTeamOC' style={{minHeight:'100vh'}} placement="top" show={editTeamVis} onHide={hideEditTeamOC} backdrop='static'>
                    <Offcanvas.Header id='EditTeamOCHead' closeButton={true}>
                        <Offcanvas.Title>Edit Team</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body id='EditTeamOCBody'>
                        <form id='TeamForm'>
                            <p>Team Id: {selectedTeam.id}</p>
                            <p>{selectedTeam.teamName}</p>
                            <Table striped bordered hover>
                                <tbody>
                                    {selectedTeam.teamMembers.map(member => {
                                        return (
                                            <tr>
                                                <td>{member.firstName + " " + member.lastName}</td>
                                                <td><button className="btn btn-dark form-control" onClick={() => {removeMember(selectedTeam.id, member)}}>Remove</button></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                            <select id='addUserSelect' className="form-select addUserDropdown">
                                <option value="Sort By" disabled selected>Select user to add...</option>
                                {allUsersNotOnTeam.map(user => {
                                    return(
                                        <option value={user.id + ""}>{user.firstName + " " + user.lastName}</option>
                                    )
                                })}
                            </select>
                            <button id="addMemberButton" disabled={selectedTeam.teamMembers.length === 3} className="btn btn-dark form-control addUserBtnManageTeams" onClick={() => {addMember(selectedTeam.id)}}>Add User</button>
                        </form>
                    </Offcanvas.Body>
			    </Offcanvas>
                <br></br>
            </div>
        );
    }
    else {
        return (
            <div>
				<div className="container text-center">
					<h2>You cannot view this page.</h2>
				</div>
			</div>
        );
    }
}

export default ManageTeamsPage;
