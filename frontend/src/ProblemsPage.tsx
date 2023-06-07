import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.css';
import {useForm, SubmitHandler} from 'react-hook-form';
import axios from 'axios'
import { useState, useEffect } from 'react';
import Collapsible from 'react-collapsible';
import { SetTitle } from './lib/useRedux';
import { Problem } from './lib/DbTypes';

function ProblemsPage() {
	let navigate = useNavigate();

	SetTitle("Problems");

    // State that is used to map out the categories and problems in the HTML
    const [categoriesAndProblems, setCategoriesAndProblems] = useState<{
        categoryId: number, 
        categoryName: string,
        problems: {problemId: number, problemName: string, difficulty: string, isCompleted: number, completedTimestamp: string}[]
    }[]>([]);

    var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")!);

    useEffect(() => {
        const init = async () => {
            // Get the data for the categoriesAndProblems
            await axios.get(`http://${process.env.REACT_APP_DOMAIN!}/problem/getProblemsAndCategoriesByUserId/` + loggedInUser.id)
                .then(response => { setCategoriesAndProblems(response.data) });
        }
        init();
	}, []);
    
	return (
		<div>
			<div className="text-center">
                <br></br>
                <br></br>
                <br></br>
                <div>
                    {categoriesAndProblems.map(categoryAndProblem => {
                        return (
                            <Collapsible 
                            trigger={categoryAndProblem.categoryName}
                            open={false}
                            triggerClassName='triggerClosed'
                            triggerOpenedClassName='triggerOpened'
                            className='collapsibleClosed'
                            openedClassName='collapsibleOpened'>
                                <div className='problemsContainer'>
                                    {categoryAndProblem.problems.map(problem => {
                                        return (
                                            <div className='row problemRow'>
                                                <div className='col'>
                                                    <p className={problem.isCompleted === 1 ? "textCompleted" : "textNotCompleted"}>{problem.isCompleted === 1 ? "Completed" : "Not Completed"}</p>
                                                </div>
                                                <div className='col'>
                                                    <p className='name-field'>{problem.problemName}</p>
                                                </div>
                                                <div className='col'>
                                                    <p className='name-field'>{problem.difficulty}</p>
                                                </div>
                                                <div className='col'>
                                                    <button className="btn btn-light tm-button" onClick={() => {navigate('/problems/view/' + problem.problemId)}} >View</button>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    
                                </div>
                            </Collapsible>
                        )
                    })}
                </div>
                <br></br>
			</div>
		</div>
	);
}

export default ProblemsPage;
