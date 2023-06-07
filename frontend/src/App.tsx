import { Routes, Route } from 'react-router-dom';

import ModHeader from './components/ModHeader';

import LandingPage from './LandingPage';
import Registration from './RegistrationPage';
import UserInfoPage from './UserInfoPage';
import EditUserInfo from './EditUserInfoPage';
import Dashboard from './DashboardPage';
import ViewProblemPage from './ViewProblemPage';
import MyTeamPage from './MyTeamPage';
import UserStatsPage from './UserStatsPage';
import ProblemsPage from './ProblemsPage';
import GraduatedArchive from './GraduatedArchivePage';
import ManageProblemsPage from './ManageProblemsPage';
import ManageTeamsPage from './ManageTeamsPage';
import ManageUsersPage from './ManageUsersPage';
import CreateTeamPage from './CreateTeamPage';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import './styles/App.css';
import './styles/UserInfo.css';

/**
 * Indirection layer, page table of the web app
 * 
 * @returns html components to be rendered
 */
function App() {
	return (
		<div className="App">
			<ModHeader/>
			<Routes>
				<Route path='/' element={<LandingPage/>}/>
				<Route path='/registration' element={<Registration/>}/>
				<Route path='/userinfo' element={<UserInfoPage/>}/>
				<Route path='/userinfo/edit' element={<EditUserInfo/>}/>
				<Route path='/dashboard' element={<Dashboard/>}/>
				<Route path='/myteam' element={<MyTeamPage/>}/>
				<Route path='/user-stats/:id' element={<UserStatsPage/>}/>
				<Route path='/problems' element={<ProblemsPage/>}/>
				<Route path='/problems/view/:id' element={<ViewProblemPage/>}/>
                <Route path='/manage-problems' element={<ManageProblemsPage/>}/>
				<Route path='/graduated' element={<GraduatedArchive/>}/>
				<Route path='/manage-teams' element={<ManageTeamsPage/>}/>
				<Route path='/manage-users' element={<ManageUsersPage/>}/>
                <Route path='/create-team' element={<CreateTeamPage/>}/>
			</Routes>
		</div>
	);
}

export default App;
