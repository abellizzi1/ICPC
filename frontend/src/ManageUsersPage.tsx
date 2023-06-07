import { useNavigate } from 'react-router-dom';
import {useForm, SubmitHandler} from 'react-hook-form';
import axios from 'axios'
import { useState, useEffect } from 'react';
import Collapsible from 'react-collapsible';
import { SetTitle } from './lib/useRedux';
import { Button, Card, Offcanvas, Tab, Table, Tabs } from "react-bootstrap";
import { UserWithoutPassword} from './lib/DbTypes'

/**
 * Returns all of the users' info in the organization, they could be active or inactive.
 * @param loggedInUserId 
 * id of the logged in user
 * @returns 
 * Returns all users' info in the organization.
 */
async function getAllUsersInfo (loggedInUserId: number) {
    var allUsersInfo : UserWithoutPassword[] = [];

    // get the organizationID that the loggedInUser belongs to
    await axios.get(`http://${process.env.REACT_APP_DOMAIN!}/userToOrganization/getUserToOrgMappingsByUserId/` + loggedInUserId)
        .then(async response => {
            const orgId = response.data[0].organizationId;
            // get all active users in the organization
            await axios.get(`http://${process.env.REACT_APP_DOMAIN!}/user/getAllUsersByOrgId/` + orgId)
                .then(async response => {
                    allUsersInfo = response.data;
                });
        });
    
    // sort in ascending order by user id
	allUsersInfo.sort(function(a, b) {
		return a.id - b.id; 
	});

    return allUsersInfo;
}

/**
 * Gets the info of all active users in the organization.
 * @param loggedInUserId 
 * the id of the logged in user
 * @returns 
 * Returns all of the active users' info. This information is stored in the allActiveUsersInfo state and mapped out in the main table.
 */
async function getAllActiveUsersInfo(loggedInUserId: number) {
    var allUsersInfo : UserWithoutPassword[] = [];

    // get the organizationID that the loggedInUser belongs to
    await axios.get(`http://${process.env.REACT_APP_DOMAIN!}/userToOrganization/getUserToOrgMappingsByUserId/` + loggedInUserId)
        .then(async response => {
            const orgId = response.data[0].organizationId;
            // get all active users in the organization
            await axios.get(`http://${process.env.REACT_APP_DOMAIN!}/user/getAllActiveUsersByOrgId/` + orgId)
                .then(async response => {
                    // since some arrays are empty, it needs to be iterated through to find the users
                    const allActiveUsers = response.data;
                    for (let i = 0; i < allActiveUsers.length; i++)
                    {
                        if (allActiveUsers[i].length > 0)
                        {
                            allUsersInfo.push(allActiveUsers[i][0]);
                        }
                    }
                });
        });
    
    // sort in ascending order by user id
	allUsersInfo.sort(function(a, b) {
		return a.id - b.id; 
	});

    return allUsersInfo;
}

/**
 * Update role function that is called when the "Add Role" or "Remove Role" buttons are clicked in the View/Edit screen.
 * @param user 
 * the user we are updating the roles for
 * @param isAddRole 
 * isAddRole=true when we are adding a role, isAddRole=false when we are removing a role
 */
async function updateRole(user : UserWithoutPassword, isAddRole : boolean) {
    var selectElement;
    var updatedUser = user;
    if (isAddRole) {
        selectElement = document.querySelector('#addRoleSelect')!;
        const value = (selectElement as HTMLInputElement).value;
        if (value === "Admin") { updatedUser.isAdmin = 1 }
        else if (value === "HeadCoach") { updatedUser.isHeadCoach = 1 }
        else if (value === "AssistantCoach") { updatedUser.isAssistantCoach = 1 }
        else if (value === "Mentor") { updatedUser.isMentor = 1 }
        else if (value === "Student") { updatedUser.isStudent = 1 }
    }
    else {
        selectElement = document.querySelector('#removeRoleSelect')!;
        const value = (selectElement as HTMLInputElement).value;
        if (value === "Admin") { updatedUser.isAdmin = 0 }
        else if (value === "HeadCoach") { updatedUser.isHeadCoach = 0 }
        else if (value === "AssistantCoach") { updatedUser.isAssistantCoach = 0 }
        else if (value === "Mentor") { updatedUser.isMentor = 0 }
        else if (value === "Student") { updatedUser.isStudent = 0 }
    }

    await axios.put(`http://${process.env.REACT_APP_DOMAIN!}/user/updateUserInfo`, updatedUser);
}

/**
 * Function to remove a user from the graduated archive.
 * @param user 
 * user to remove
 */
async function removeFromGraduatedArchive(user: UserWithoutPassword) {
    //remove from graduated archive and set isActive = 1
    var updatedUser = user;
    updatedUser.isActive = 1;
    axios.put(`http://${process.env.REACT_APP_DOMAIN!}/user/updateUserInfo`, updatedUser);
    
    axios.delete(`http://${process.env.REACT_APP_DOMAIN!}/graduated/delete/` + user.id);
}

/**
 * Function to add a user to the graduated archive.
 * @param user 
 * user to add
 */
async function addToGraduatedArchive(user: UserWithoutPassword) {
    // regex to validate inputs for major and year graduated
    const regexMajor = /[A-Za-z]+/i; 
    const regexYearGraduated = /[0-9]+/i; 
    var major = document.querySelector('#majorInput')!;
    var yearGraduated = document.querySelector('#yearGraduatedInput')!;
    
    if (regexMajor.test((major as HTMLInputElement).value) === false)
    {
        alert("Invalid input for major.");
    }
    else if (regexYearGraduated.test((yearGraduated as HTMLInputElement).value) === false)
    {
        alert("Invalid input for year graduated.");
    }
    else
    {
        // add to graduated archive and set isActive = 0
        var updatedUser = user;
        updatedUser.isActive = 0;
        axios.put(`http://${process.env.REACT_APP_DOMAIN!}/user/updateUserInfo`, updatedUser);

        const graduated = {
            major: (major as HTMLInputElement).value,
            yearGraduated: Number((yearGraduated as HTMLInputElement).value)
        }
        axios.post(`http://${process.env.REACT_APP_DOMAIN!}/graduated/post/` + user.id, graduated);
    }
}

function ManageUsersPage() {
	let navigate = useNavigate();

	SetTitle("Manage Users");
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")!);

    // State that contains the info of all active users in the organization. This is mapped out in the Active Users table.
    const [allActiveUsersInfo, setAllActiveUsersInfo] = useState<UserWithoutPassword[]>([]);

    // State that contains the info of all users in the organization. This is mapped out in the All Users table.
    const [allUsersInfo, setAllUsersInfo] = useState<UserWithoutPassword[]>([]);

    // State that contains the selected user when View/Edit is clicked.
    const [selectedUser, setSelectedUser] = useState<UserWithoutPassword>({id:0,firstName:"",lastName:"",email:"",phone:"",isAdmin:0,isHeadCoach:0,isAssistantCoach:0,isCoach:0,isMentor:0,isStudent:0,isActive:0,codeforcesUsername:"",leetcodeUsername:"",uhuntId:0});

    // State that is true if the logged in user is an Admin, Head coach, or Assistant coach. Else false.
    const [validPermissions, setValidPermissions] = useState(false);

    useEffect(() => {
        const init = async () => {
            setValidPermissions(loggedInUser.isAdmin === 1 || loggedInUser.isHeadCoach === 1 || loggedInUser.isAssistantCoach === 1);

            var tempAllActiveUsersInfo = await getAllActiveUsersInfo(loggedInUser.id);
            setAllActiveUsersInfo(tempAllActiveUsersInfo);

            var tempAllUsersInfo = await getAllUsersInfo(loggedInUser.id);
            setAllUsersInfo(tempAllUsersInfo);
        }
        init();
	}, []);

    // When View/Edit is clicked, editUserVis=true, and when it is exited, editUserVis=false
    const [editUserVis, setEditUserVis] = useState(false);
	const showEditUserOC = () => {
		setEditUserVis(true);
	}
    const hideEditUserOC = () => {
		setEditUserVis(false);
	}

    /**
     * Method that returns all of the user's roles in a string array.
     * @param user 
     * the user that we are getting the roles for
     * @returns 
     * Returns the user's roles in a string array
     */
    const getRoles = (user : UserWithoutPassword) => {
        var roles : string[] = [];
        if (user.isAdmin === 1) { 
            roles.push("Admin");
        }
        if (user.isHeadCoach === 1) { 
            roles.push("Head Coach");
        }
        if (user.isAssistantCoach === 1) { 
            roles.push("Assistant Coach");
        }
        if (user.isMentor === 1) { 
            roles.push("Mentor");
        }
        if (user.isStudent === 1) {
            roles.push("Student");
        }
        return roles;
    }

    /**
     * HTML for the graduated section when a user is selected with View/Edit.
     * @returns 
     * Returns HTML dependent upon whether or not the user is marked as active.
     */
    const graduatedSection = () => {
        if (selectedUser.isActive === 0) // user is marked as graduated.
        {
            return (
                <>
                <p>This user has graduated.</p>
                <button className="btn btn-dark form-control addUserBtnManageTeams" onClick={() => {removeFromGraduatedArchive(selectedUser)}}>Remove from Graduated Archive</button>
                </>
            )
        }
        else // user is not marked as graduated.
        {
            return (
                <>
                <p>This user has not graduated.</p>
                <input className='form-control'
                    type='text' id='majorInput' name='majorInput' 
                    placeholder="Enter the user's major" />
                <input className='form-control manage-users-yeargrad-input'
                    type='text' id='yearGraduatedInput' name='yearGraduatedInput' 
                    placeholder="Enter the year graduated" />
                <button className="btn btn-dark form-control addUserBtnManageTeams" onClick={() => {addToGraduatedArchive(selectedUser)}}>Add to Graduated Archive</button>
                </>
            )
        }
    }

    /**
     * The main table that is displayed on both tabs. Active users are displayed if that tab is 
     * selected, otherwise All Users is displayed.
     * @param isActive 
     * true for Active Users tab, false for All Users tab
     * @returns 
     * Returns HTML dependent upon the value of isActive
     */
    const mainTable = (isActive: boolean) => {
        return (
            <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role(s)</th>
                        <th>View/Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {(isActive ? allActiveUsersInfo : allUsersInfo).map(user => {
                        return (
                            <tr>
                                <th scope="row">{user.id}</th>
                                <td>{user.firstName + " " + user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{getRoles(user).join(", ")}</td>
                                <td><button className="btn btn-dark form-control" onClick={() => {
                                    setSelectedUser(user); 
                                    showEditUserOC();
                                    }} >View/Edit</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            </>
        )
    }

    if (validPermissions) {
        return (
            <div>
                <Card id='config-cards' bg='light' text='dark'>
                    <Card.Body>
                        <Tabs defaultActiveKey="activeUsers"
						id="config-tabs fill-tab-example"
						fill={true}>
                            <Tab id='config-tab' eventKey="activeUsers" title="Active Users">
                                {mainTable(true)}
                            </Tab>
                            <Tab id='config-tab' eventKey="allUsers" title="All Users">
                                {mainTable(false)}
                            </Tab>
                        </Tabs>
                    </Card.Body>
                </Card>

                <Offcanvas id='EditUserOC' style={{minHeight:'100vh'}} placement="top" show={editUserVis} onHide={hideEditUserOC} backdrop='static'>
                    <Offcanvas.Header id='EditUserOCHead' closeButton={true}>
                        <Offcanvas.Title>Edit User</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body id='EditUserOCBody'>
                        <form id='UserForm'>
                            <p>User Id: {selectedUser.id}</p>
                            <p>Name: {selectedUser.firstName + " " + selectedUser.lastName}</p>
                            <p>Email: {selectedUser.email}</p>
                            <p>Phone: {selectedUser.phone}</p>
                            <a href={'/user-stats/' + selectedUser.id}>{selectedUser.firstName + "'s Statistics"}</a>
                            <br></br>
                            <br></br>
                            <p>Role(s): {getRoles(selectedUser).join(", ")}</p>
                            <select id='addRoleSelect' className="form-select addUserDropdown">
                                <option value="Sort By" disabled selected>Select role to add...</option>
                                <option value="Admin" hidden={selectedUser.isAdmin === 1}>Admin</option>
                                <option value="HeadCoach" hidden={selectedUser.isHeadCoach === 1}>Head Coach</option>
                                <option value="AssistantCoach" hidden={selectedUser.isAssistantCoach === 1}>Assistant Coach</option>
                                <option value="Mentor" hidden={selectedUser.isMentor === 1}>Mentor</option>
                                <option value="Student" hidden={selectedUser.isStudent === 1}>Student</option>
                            </select>
                            <button className="btn btn-dark form-control addUserBtnManageTeams" onClick={() => {updateRole(selectedUser, true)}}>Add Role</button>
                            <br></br>
                            <br></br>
                            <select id='removeRoleSelect' className="form-select addUserDropdown">
                                <option value="Sort By" disabled selected>Select role to remove...</option>
                                <option value="Admin" hidden={selectedUser.isAdmin === 0}>Admin</option>
                                <option value="HeadCoach" hidden={selectedUser.isHeadCoach === 0}>Head Coach</option>
                                <option value="AssistantCoach" hidden={selectedUser.isAssistantCoach === 0}>Assistant Coach</option>
                                <option value="Mentor" hidden={selectedUser.isMentor === 0}>Mentor</option>
                                <option value="Student" hidden={selectedUser.isStudent === 0}>Student</option>
                            </select>
                            <button className="btn btn-dark form-control addUserBtnManageTeams" onClick={() => {updateRole(selectedUser, false)}}>Remove Role</button>
                            <br></br>
                            <br></br>
                            {graduatedSection()}
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

export default ManageUsersPage;
