import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { SetTitle } from './lib/useRedux';
import { useState, useEffect, useContext } from 'react';

const MyTeamPage = () => {

    // Call to update the page's title
    SetTitle("My Team");

    // Call to route between pages
    let navigate = useNavigate();

    // Storage for holding logged in user's credentials
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")!);

    // State that contains the user's team's name
    const [myTeamName, setTeamName] = useState("");

    // State that contains the teamID
    const [teamId, setTeamId] = useState(-1);

    // State that contains the selected team-to-join's id
    const [selectedJoinTeamId, updateJoinableTeamId] = useState(-1);

    // State that contains the user's organization id
    const [orgId, setOrgId] = useState(-1);

    // State that contains the user's team members
    const [teamMembers, setTeamMembers] = useState([]);

    // State that contains teams available to join
    const [availableTeams, setAvailableTeams] = useState([]);

    // Call to get the user's Organization Id
    useEffect(() => {
        const getOrg = async () => {
            await axios.get(`http://${process.env.REACT_APP_DOMAIN!}/userToOrganization/getUserToOrgMappingsByUserId/` + loggedInUser.id)
            .then(response => { 
                setOrgId(response.data[0].organizationId);
            });
        }

        getOrg().catch(console.error);
    }, [loggedInUser.id])

    // Call to get the team that the user is part of
    useEffect(() => {
        const getTeamId = async() => {
            await axios.get(`http://${process.env.REACT_APP_DOMAIN!}/userToTeam/getUserToTeamByUserId/` + loggedInUser.id)
            .then(async response => {
                if(response.data.length !== 0) {
                    setTeamId(response.data[0].teamId);
                }
            });
        }
        
        getTeamId().catch(console.error);
    }, [loggedInUser.id])

    // Call to get the user's team's name
    useEffect(() => {
        const getTeamByTeamId = async() => {
            await axios.get(`http://${process.env.REACT_APP_DOMAIN!}/team/getTeamById/` + teamId)
            .then(async response => {
                setTeamName(response.data.name);
            });
        }
        
        if(teamId !== -1) {
           getTeamByTeamId().catch(console.error); 
        }
    }, [teamId])

    // Call to get all the user's team's members
    useEffect(() => {
        const getTeamUsersByTeamId = async() => {
            await axios.get(`http://${process.env.REACT_APP_DOMAIN!}/user/getAllUsersByTeamId/` + teamId)
            .then(async response => {
                setTeamMembers(response.data);
            });
        }
        
        if(teamId !== -1) {
            getTeamUsersByTeamId().catch(console.error);
        }
    }, [teamId])

    // Call to get all the joinable teams
    useEffect(() => {
        const getAvailableTeamsByOrgId = async() => {
            await axios.get(`http://${process.env.REACT_APP_DOMAIN!}/team/getAllAvailableTeamsByOrgId/` + orgId)
            .then(async response => {
                setAvailableTeams(response.data);
            });
        }

        if(teamId === -1 && orgId !== -1) {
            getAvailableTeamsByOrgId().catch(console.error);
        }
    }, [orgId, teamId])

    // Call to link the logged in user to a team
    const joinTeam = async(teamId: Number) => {
        await axios.post(`http://${process.env.REACT_APP_DOMAIN!}/userToTeam/` + loggedInUser.id + "/" + teamId)
        .then(response => {
            setTeamId(response.data.teamId);
        });
    }

    // Call to leave the logged in user's team
    const leaveTeam = async(teamId: Number) => {
        if(teamId !== -1) {
            await axios.delete(`http://${process.env.REACT_APP_DOMAIN!}/userToTeam/` + loggedInUser.id + '/' + teamId)
                .then(response => {
                    setTeamId(-1);
                });
        }
    }
    

    return (
        <div>
            {teamId !== -1 ? <div>{<DisplayTeamNameAndLeaveButton teamName={myTeamName}  teamId={teamId} leaveFunction={leaveTeam}/>}</div> : <h1>Not on a team</h1>}
            {teamId !== -1 ? 
            <div>
                {teamMembers.length > 0 && teamMembers.map((aTeamMember: any) => {
                    return (
                        <DisplayTeamMemberDetails firstName={aTeamMember.firstName} lastName={aTeamMember.lastName} userId={aTeamMember.id} navigate={navigate} />
                    )
                })}
            </div> :
            <> 
            <select className='name-field' onChange={(event) => {updateJoinableTeamId(Number(event.target.value))}}>
                <option value={-1}>Select a team</option>
                {availableTeams.map((aTeam: any) => {
                    return (
                        <option value={aTeam.id} key={aTeam.id}>{aTeam.name}</option>
                    )
                })}
            </select>
            <button className='name-field' onClick={() => {joinTeam(selectedJoinTeamId)}}>
                Join Team
            </button></>}
        </div>
    )
}

// Component for displaying user's team's details
const DisplayTeamMemberDetails = ({firstName, lastName, userId, navigate}: 
    {firstName: string, lastName: string, userId: Number, navigate: any}) => {
    return (
        <div className='tmContainer'>
            <div className='row'>
                <div className='col'>
                    <p className='name-field bolded'>{firstName + " " + lastName}</p>
                </div>
                <div className='col'>
                <button className="btn btn-light tm-button" onClick={() => {navigate("/user-stats/" + userId)}} >Statistics</button>
            </div>
            </div>
        </div>
    )
}

// Component for displaying the user's team's name and the 'leave team' button
const DisplayTeamNameAndLeaveButton = ({teamName, teamId, leaveFunction}: {teamName: string, teamId: Number, leaveFunction: any}) => {
    return (
        <div className='tmContainer'>
            <div className='row'>
                <div className='col'>
                    <h1 className='name-field bolded'>{"Team Name: " + teamName}</h1>
                </div>
                <div className='col'>
                    <button className="btn btn-light tm-button" onClick={() => {leaveFunction(teamId)}}>
                        Leave Team
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MyTeamPage