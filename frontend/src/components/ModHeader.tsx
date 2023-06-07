import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import { useState } from 'react';
import { useAppSelector } from '../lib/redux/store';
import { UserContext } from "../lib/context/Context";
import { UserTypes } from "../lib/context/Context";
import { useNavigate } from 'react-router-dom';

/**
 * Header and side-nav component used throughout the site
 * 
 * @returns html react element
 */
function ModHeader() {
	let navigate = useNavigate();
	const headerTitle = useAppSelector(state => state.pages.title);

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const context = useContext(UserContext);

	var loggedInUser = null;
	if (localStorage.getItem("loggedInUser") === null || localStorage.getItem("loggedInUser") === "") {
		localStorage.setItem("loggedInUser", "");
		loggedInUser = "";
	}
	else {
		loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")!);
	}
	console.log(loggedInUser);

	return (
		<div className='modheader'>
		<Navbar fixed="top" bg="light" expand={true} aria-controls="navigation">
			<Button hidden={loggedInUser === ""} className='sidebar-button' variant='outline-light' onClick={handleShow} active>
				<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
				<path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
				</svg>
			</Button>
			<Container>
			<Nav>
			<Navbar.Brand onClick={() => { if(localStorage.getItem("loggedInUser") !== "") { navigate('/dashboard')}}}>
				<span role="button">
					<img
					src={`${process.env.PUBLIC_URL}/iowa-state-cyclones.png`}
					width="75"
					height="50"
					className="d-inline-block align-top"
					alt="isu logo"
				/>
				</span>
				
			</Navbar.Brand>
			<Navbar.Text>
				{headerTitle}
			</Navbar.Text>
			
			</Nav>
			<Nav>
				{/* <NavDropdown 
					title={
						<span>
						<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" className="bi bi-bell-fill" viewBox="0 0 16 16">
						<path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
						</svg>
						</span>
					}
                    hidden={loggedInUser === ""}
					id='collasible-nav-dropdown' className='Caret-hide' align="end">
					<NavDropdown.Item>Notifications</NavDropdown.Item>
				</NavDropdown> */}
				<NavDropdown 
					title={
						<span>
						<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" className="bi bi-gear-fill settings-gear" viewBox="0 0 16 16">
						<path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
						</svg>
						</span>
					}
                    hidden={loggedInUser === ""}
					id='collasible-nav-dropdown' className='Caret-hide' align="end">
					<NavDropdown.Item onClick={() => {navigate(''); 
					localStorage.setItem("loggedInUser", "");
					loggedInUser = "";}}>Logout</NavDropdown.Item>
					{/* <NavDropdown.Divider/>
    				<NavDropdown.Item>Info</NavDropdown.Item>
					<NavDropdown.Divider/>
    				<NavDropdown.Item>Settings</NavDropdown.Item> */}
				</NavDropdown>
				
			</Nav>
			</Container>
		</Navbar>

		{/* <Container fluid> */}
		<Navbar.Offcanvas className='sidebar-menu' show={show} onHide={handleClose} backdrop={false}>
			<Offcanvas.Header closeButton>
				<Offcanvas.Title className='sidebar-header'>
					Navigation
				</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>
				<Navbar>
					<Container id="sidebar-nav-cont" fluid>
					{/* <Stack gap={4}> */}
					<NavDropdown 
						title={
							<><svg xmlns="http://www.w3.org/2000/svg" id="dropdown-icon" width="20" height="20" className="bi bi-person-fill" viewBox="0 0 16 16">
							<path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
							</svg>    User</>
						} hidden={false}>
						<NavDropdown.Item onClick={() => {navigate('/userinfo')}} hidden={false}>Account Info</NavDropdown.Item>
						<NavDropdown.Divider/>
						<NavDropdown.Item onClick={() => {navigate('/graduated')}} hidden={false}>Graduated Users</NavDropdown.Item>
					</NavDropdown>
					<NavDropdown 
						title={
							<><svg xmlns="http://www.w3.org/2000/svg" id="dropdown-icon" width="20" height="20" className="bi bi-people-fill" viewBox="0 0 16 16">
							<path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
						  </svg>    Team</>
						} hidden={false}>
						<NavDropdown.Item onClick={() => {navigate('/myteam')}} hidden={false}>View Members</NavDropdown.Item>
                        <NavDropdown.Divider/>
                        <NavDropdown.Item onClick={() => {navigate('/create-team')}} hidden={false}>Create Team</NavDropdown.Item>
					</NavDropdown>
					<NavDropdown 
						title={
							<><svg xmlns="http://www.w3.org/2000/svg" id="dropdown-icon" width="20" height="20" className="bi bi-card-checklist" viewBox="0 0 16 16">
							<path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
							<path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0zM7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
							</svg>    Coding</>
						} hidden={false}>
						<NavDropdown.Item onClick={() => {navigate('/problems')}} hidden={false}>Problems</NavDropdown.Item>
					</NavDropdown>
					<NavDropdown 
						title={
							<><svg xmlns="http://www.w3.org/2000/svg" id="dropdown-icon" width="20" height="20" className="bi bi-cone-striped" viewBox="0 0 16 16">
							<path d="m9.97 4.88.953 3.811C10.159 8.878 9.14 9 8 9c-1.14 0-2.158-.122-2.923-.309L6.03 4.88C6.635 4.957 7.3 5 8 5s1.365-.043 1.97-.12zm-.245-.978L8.97.88C8.718-.13 7.282-.13 7.03.88L6.275 3.9C6.8 3.965 7.382 4 8 4c.618 0 1.2-.036 1.725-.098zm4.396 8.613a.5.5 0 0 1 .037.96l-6 2a.5.5 0 0 1-.316 0l-6-2a.5.5 0 0 1 .037-.96l2.391-.598.565-2.257c.862.212 1.964.339 3.165.339s2.303-.127 3.165-.339l.565 2.257 2.391.598z"/>
						  	</svg>    Admin</>
						} hidden={loggedInUser.isAdmin !== 1}>
						<NavDropdown.Item onClick={() => {navigate('/manage-users')}} hidden={false}>Manage Users</NavDropdown.Item>
						<NavDropdown.Divider/>
						<NavDropdown.Item onClick={() => {navigate('/manage-teams')}} hidden={false}>Manage Teams</NavDropdown.Item>
						<NavDropdown.Divider/>
						<NavDropdown.Item onClick={() => {navigate('/manage-problems')}} hidden={false}>Manage Problems</NavDropdown.Item>
					</NavDropdown>
					{/* </Stack> */}
					</Container>
				</Navbar>
			</Offcanvas.Body>
		</Navbar.Offcanvas>
		{/* </Container> */}
		</div>
	);
}

export default ModHeader;
