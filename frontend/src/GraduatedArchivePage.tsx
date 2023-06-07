import axios from 'axios'
import { SetTitle } from './lib/useRedux';
import { useState, useEffect } from 'react';

/**
 * Gets all graduated students in the organization.
 * @param loggedInUserId 
 * the id of the logged in user
 * @returns 
 * Returns a JSON array of all the graduated students in the organization.
 */
async function getGraduatedStudents(loggedInUserId: number) {
    // JSON array to return later
    var ret : {userId: number, firstName: string, lastName: string, major: string, yearGraduated: number}[] = [];

    await axios.get(`http://${process.env.REACT_APP_DOMAIN!}/graduated/getGraduatedInOrganizationByUserId/` + loggedInUserId)
        .then(async response => {
            ret = response.data;
        });
    
    // sort by year graduated (descending)
    ret.sort(function(a, b) {
        return b.yearGraduated - a.yearGraduated
    });

    return ret;
}

function GraduatedArchivePage() {
	SetTitle("Graduated Students");

	const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")!);

    // State that contains all the graduated students that are mapped out in the HTML
    const [allGraduated, setAllGraduated] = useState<{userId: number, firstName: string, lastName: string, major: string, yearGraduated: number}[]>([]);

    useEffect(() => {
        const init = async () => {
            var temp = await getGraduatedStudents(loggedInUser.id);
            setAllGraduated(temp);
        }
        init();
	}, []);

	return (
		<div>
			<div className="container text-center">
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <table className="table table-dark table-bordered table-hover">
                    <thead>
                        <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Major</th>
                        <th scope="col">Year Graduated</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allGraduated.map(grad => {
                            return (
                                <tr>
                                    <td>{grad.firstName + " " + grad.lastName}</td>
                                    <td>{grad.major}</td>
                                    <td>{grad.yearGraduated}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <br></br>
			</div>
		</div>
	);
}

export default GraduatedArchivePage;
