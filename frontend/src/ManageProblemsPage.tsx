import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Card, Offcanvas, Tab, Table, Tabs } from "react-bootstrap";
import { SetTitle } from "./lib/useRedux";
import { useEffect, useState } from "react";
import axios from "axios";
import { CategoryValues, DifficultyValues, ProblemValues } from './lib/useForm';

/**
 * Checks user is logged in, gets org ID, loads problems by organization
 * 
 * @returns array of problems from db
 */
async function getProblemData(userId: number) {
	var loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")!);
	var problems: any[] = [];

	await axios.get(`http://${process.env.REACT_APP_DOMAIN!}/problem/getProblemsByUserId/` + userId)
	.then(async response => {
		var allProblems = response.data;
		for (var j = 0; j < allProblems.length; j++) {
			problems.push({
				id: allProblems[j].id, 
				pname: allProblems[j].name, 
				linkurl: allProblems[j].linkUrl, 
				vidurl: allProblems[j].videoUrl, 
				difid: allProblems[j].difficultyId, 
				isdef: allProblems[j].isDefault
			})
		}
	})

	return problems;
}

/**
 * Checks user is logged in, gets org ID, loads categories by organization
 * 
 * @returns array of categories from db
 */
async function getCategoryData(userId: number) {
	var categories: any[] = [];

	await axios.get(`http://${process.env.REACT_APP_DOMAIN!}/category/getCategoriesByUserId/` + userId)
    .then(async response => {
        const allCategories = response.data;
        for (var i = 0; i < allCategories.length; i++)
        {
            categories.push({
				id: allCategories[i].id,
				name: allCategories[i].name,
				isdef: allCategories[i].isDefault
			});
        }
	});

	return categories;
}

/**
 * Checks user is logged in, gets org ID, loads difficulties by organization
 * 
 * @returns array of difficulties from db
 */
async function getDifficultyData(userId: number) {
	var difficulties: any[] = [];

	await axios.get(`http://${process.env.REACT_APP_DOMAIN!}/difficulty/getDifficultiesByUserId/` + userId)
    .then(async response => {
        const allDifficulties = response.data;
        for (var i = 0; i < allDifficulties.length; i++)
        {
            difficulties.push({
				id: allDifficulties[i].id,
				name: allDifficulties[i].name,
				isdef: allDifficulties[i].isDefault
			});
        }
	});

	return difficulties;
}

/**
 * Manage/Config problems page, diplays several tables and forms for
 * adding, editing, and removing problems, categories, and difficulties
 * 
 * @returns html react element
 */
function ManageProblemsPage() {
	SetTitle("Problems Config");

    var editedID = -1;
    var deletedID = -1;

    // initial values for if no connection can be established
	const initialProbsTable = [
		{id: -1, pname: 'NA', linkurl: '', vidurl: '', difid: -1, isdef: 0},
		{id: -2, pname: 'NA', linkurl: '', vidurl: '', difid: -1, isdef: 1}
	];

	const initialCatsTable = [
		{id: -1, name: 'NA', isdef: 0},
		{id: -2, name: 'NA', isdef: 1}
	];

	const initialDiffsTable = [
		{id: -1, name: 'NA', isdef: 0},
		{id: -2, name: 'NA', isdef: 1}
	];

	const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")!);

    // setup state storage for loaded data
	const [problems, setProblems] = useState(initialProbsTable)
	const [categories, setCategories] = useState(initialCatsTable)
	const [difficulties, setDifficulties] = useState(initialDiffsTable)

	const [selectedProblemId, setSelectedProblemId] = useState(0);
	const [selectedCategoryId, setSelectedCategoryId] = useState(0);
	const [selectedDifficultyId, setSelectedDifficultyId] = useState(0);

    // call asynchronous functions, update page when data recieved
	useEffect(() => {
        const init = async () => {
            var temp1 = await getProblemData(loggedInUser.id);
            setProblems(temp1);
			var temp2 = await getCategoryData(loggedInUser.id);
			setCategories(temp2);
			var temp3 = await getDifficultyData(loggedInUser.id);
			setDifficulties(temp3);
        }
        init();
	}, [problems, categories, difficulties]);

    // helper functions for loading dynamic html elements
	const renderProblems = () => {
		return problems.map(({id, pname, linkurl, vidurl, difid, isdef}) => {
			return <tr key = {id} >
				<td>{id}</td>
				<td>{pname}</td>
				<td><Button href={linkurl} target='_blank' rel="noreferrer noopener" variant="link" style={{padding: 2}}>url</Button></td>
				<td><Button href={vidurl} target='_blank' rel="noreferrer noopener" variant="link" style={{padding: 2}}>url</Button></td>
				<td>{difid}</td>
				<td>{isdef}</td>
				<td style={{textAlign:'center'}}><Button onClick={() => {showEditProbOC(); editedID = id; setSelectedProblemId(id);}} variant="dark" style={{padding: 2}} disabled={isdef === 1}>edit</Button></td>
				<td style={{textAlign:'center'}}><Button onClick={() => {deleteProblem(id); deletedID = id;}} variant="danger" style={{padding: 2}} disabled={isdef === 1}>delete</Button></td>
			</tr>
		})
	};

	const renderCategories = () => {
		return categories.map(({id, name, isdef}) => {
			return <tr key = {id} >
				<td>{id}</td>
				<td>{name}</td>
				<td>{isdef}</td>
				<td style={{textAlign:'center'}}><Button onClick={() => {showEditCatOC(); editedID = id; setSelectedCategoryId(id);}} variant="dark" style={{padding: 2}} disabled={isdef === 1}>edit</Button></td>
				<td style={{textAlign:'center'}}><Button onClick={() => {deleteCategory(id); deletedID = id;}} variant="danger" style={{padding: 2}} disabled={isdef === 1}>delete</Button></td>
			</tr>
		})
	};

	const renderDifficulties = () => {
		return difficulties.map(({id, name, isdef}) => {
			return <tr key = {id} >
				<td>{id}</td>
				<td>{name}</td>
				<td>{isdef}</td>
				<td style={{textAlign:'center'}}><Button onClick={() => {showEditDiffOC(); editedID = id; setSelectedDifficultyId(id);}} variant="dark" style={{padding: 2}} disabled={isdef === 1}>edit</Button></td>
				<td style={{textAlign:'center'}}><Button onClick={() => {deleteDifficulty(id); deletedID = id;}} variant="danger" style={{padding: 2}} disabled={isdef === 1}>delete</Button></td>
			</tr>
		})
	};

	const renderCategoryOptions = () => {
		return categories.map(({id, name}) => {
			return <option value={id}>{name}</option>
		})
	}

	const renderDifficultyOptions = () => {
		return difficulties.map(({id, name}) => {
			return <option value={id}>{name}</option>
		})
	}

	// delete a problem by id
	const deleteProblem = (probId:number) => {
		axios.delete(`http://${process.env.REACT_APP_DOMAIN!}/problem/removeProblem/` + loggedInUser.id + `/` + probId)
			.then(async response => {
					console.log(response.data)
			});
	}

	// delete a category by id
	const deleteCategory = (categoryId: number) => {
		axios.delete(`http://${process.env.REACT_APP_DOMAIN!}/category/removeCategory/` + loggedInUser.id + `/` + categoryId)
		.then(async response => {
				console.log(response.data)
		});
	}

	// delete a difficulty by id
	const deleteDifficulty = (diffId: number) => {
		axios.delete(`http://${process.env.REACT_APP_DOMAIN!}/difficulty/removeOrgToDiffMapping/` + loggedInUser.id + `/` + diffId)
			.then(async response => {
					console.log(response.data)
			});
	}

	// Add new problems OC state
	const {
		register: newProbVals, 
		handleSubmit : setNewProbVals
	} = useForm<ProblemValues>();
	const submitNewProblem: SubmitHandler<ProblemValues> = data => {
		const prob = {
			name: data.probname,
			linkUrl: data.linkurl,
			videoUrl: data.videourl,
			difficultyId: Number(data.difficulty)
		}

		axios.post(`http://${process.env.REACT_APP_DOMAIN!}/problem/postProblem/` + loggedInUser.id + `/` + data.category, prob)
    		.then(async response => {
				
			})
	}
	const [addProbVis, setAddProbVis] = useState(false);
	const showAddProbOC = () => {
		setAddProbVis(true);
	}
	const hideAddProbOC = () => {
		setAddProbVis(false);
	}

	// Edit problems OC state
	const {
		register: editedProbVals, 
		handleSubmit : setEditedProbVals
	} = useForm<ProblemValues>();
	const submitEditedProblem: SubmitHandler<ProblemValues> = data => {
		const prob = {
			id: selectedProblemId,
			name: data.probname,
			linkUrl: data.linkurl,
			videoUrl: data.videourl,
			difficultyId: Number(data.difficulty)
		}

		axios.put(`http://${process.env.REACT_APP_DOMAIN!}/problem/updateProblem`, prob)
    		.then(async response => {
				
			})

		if ((data.category + "") !== 'NACat')
		{
			axios.put(`http://${process.env.REACT_APP_DOMAIN!}/problemToCategory/updateProblemToCategory/` + selectedProblemId + `/` + data.category)
				.then(async response => {
					
				})
		}
	}
	const [editProbVis, setEditProbVis] = useState(false);
	const showEditProbOC = () => {
		setEditProbVis(true);
	}
	const hideEditProbOC = () => {
		setEditProbVis(false);
	}

	// Add categories OC state
	const {
		register: newCatVals, 
		handleSubmit : setNewCatVals
	} = useForm<CategoryValues>();
	const submitNewCategory: SubmitHandler<CategoryValues> = data => {
		// TODO
		const cat = {
			name: data.name
		}
		axios.post(`http://${process.env.REACT_APP_DOMAIN!}/category/postCategory/` + loggedInUser.id, cat)
            .then(response => console.log(response.data));
	}
	const [newCatVis, setNewCatVis] = useState(false);
	const showAddCatOC = () => {
		setNewCatVis(true);
	}
	const hideAddCatOC = () => {
		setNewCatVis(false);
	}

	// Edit categories OC state
	const {
		register: editedCatVals, 
		handleSubmit : setEditedCatVals
	} = useForm<CategoryValues>();
	const submitEditedCategory: SubmitHandler<CategoryValues> = data => {
		const cat = {
			name: data.name
		}

		axios.put(`http://${process.env.REACT_APP_DOMAIN!}/category/updateCategory/` + selectedCategoryId, cat);
	}
	const [editCatVis, setEditCatVis] = useState(false);
	const showEditCatOC = () => {
		setEditCatVis(true);
	}
	const hideEditCatOC = () => {
		setEditCatVis(false);
	}

	// Add difficulty OC state
	const {
		register: newDiffVals, 
		handleSubmit : setNewDiffVals
	} = useForm<DifficultyValues>();
	const submitNewDifficulty: SubmitHandler<DifficultyValues> = data => {
		const diff = {
			name: data.name
		}
		axios.post(`http://${process.env.REACT_APP_DOMAIN!}/difficulty/addNewDifficulty/` + loggedInUser.id, diff)
            .then(response => console.log(response.data));
	}
	const [newDiffVis, setNewDiffVis] = useState(false);
	const showAddDiffOC = () => {
		setNewDiffVis(true);
	}
	const hideAddDiffOC = () => {
		setNewDiffVis(false);
	}

	// Edit difficulty OC state
	const {
		register: editedDiffVals, 
		handleSubmit : setEditedDiffVals
	} = useForm<DifficultyValues>();
	const submitEditedDifficulty: SubmitHandler<DifficultyValues> = data => {
		// TODO
		const diff = {
			name: data.name
		}
		axios.put(`http://${process.env.REACT_APP_DOMAIN!}/difficulty/updateDifficulty/` + selectedDifficultyId, diff)
            .then(response => console.log(response.data));
	}
	const [editDiffVis, setEditDiffVis] = useState(false);
	const showEditDiffOC = () => {
		setEditDiffVis(true);
	}
	const hideEditDiffOC = () => {
		setEditDiffVis(false);
	}

	return (
		<div>
			<Card id='config-cards' bg='light' text='dark'>
				<Card.Body>
					<Tabs
						defaultActiveKey="problems"
						id="config-tabs fill-tab-example"
						fill={true}
					>
						<Tab
							id='config-tab'
							eventKey="info" 
							title="Info"
						>
							<p id='config-tab-info'>
								<br></br>
								Caution! Editing persistent data. Changes will be visible to all users!
							</p>
						</Tab>
						<Tab 
							id='config-tab'
							eventKey="problems" 
							title="Problems"
						>
							<p id='config-tab-info'>
								Only non-default problems may be edited. Contact admin for configuring
								default values.
							</p>
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>id</th>
										<th>name</th>
										<th>link url</th>
										<th>vid url</th>
										<th>dif. id</th>
										<th>isDefault</th>
										<th style={{textAlign:'center'}} colSpan={2}><Button onClick={showAddProbOC} variant="dark" style={{paddingTop: 2, paddingBottom: 2, paddingLeft: 4, paddingRight: 4}} disabled={false}>Add new problem</Button></th>
									</tr>
								</thead>
								<tbody>
									{renderProblems()}
								</tbody>
							</Table>
						</Tab>
						<Tab 
							id='config-tab'
							eventKey="categories" 
							title="Categories"
						>
							<p id='config-tab-info'>
								Only non-default categories may be edited. Contact admin for configuring
								default values. A category may be deleted only if no problems are mapped to
                                it.
							</p>
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>id</th>
										<th>name</th>
										<th>isDefault</th>
										<th style={{textAlign:'center'}} colSpan={2}><Button onClick={showAddCatOC} variant="dark" style={{paddingTop: 2, paddingBottom: 2, paddingLeft: 4, paddingRight: 4}} disabled={false}>Add new category</Button></th>
									</tr>
								</thead>
								<tbody>
									{renderCategories()}
								</tbody>
							</Table>
						</Tab>
						<Tab 
							id='config-tab'
							eventKey="difficulties" 
							title="Difficulties"
						>
							<p id='config-tab-info'>
								Only non-default difficulties may be edited. Contact admin for configuring
								default values. A difficulty may be deleted only if no problems are mapped to
                                it.
							</p>
							<Table striped bordered hover>
								<thead>
									<tr>
										<th>id</th>
										<th>name</th>
										<th>isDefault</th>
										<th style={{textAlign:'center'}} colSpan={2}><Button onClick={showAddDiffOC} variant="dark" style={{paddingTop: 2, paddingBottom: 2, paddingLeft: 4, paddingRight: 4}} disabled={false}>Add new difficulty</Button></th>
									</tr>
								</thead>
								<tbody>
									{renderDifficulties()}
								</tbody>
							</Table>
						</Tab>
					</Tabs>
				</Card.Body>
			</Card>

			<Offcanvas id='AddProblemOC' style={{minHeight:'100vh'}} placement="top" show={addProbVis} onHide={hideAddProbOC} backdrop='static'>
				<Offcanvas.Header id='AddProblemOCHead' closeButton={true}>
					<Offcanvas.Title>Add problem to database</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body id='AddProblemOCBody'>
					<form id='ProblemForm' onSubmit={setNewProbVals(submitNewProblem)}>
						<p>Problem Name</p>
						<input type="text" placeholder="name" {...newProbVals("probname", {required: true, maxLength: 80})} />
						<p>Link URL</p>
						<input type="url" placeholder="website.com" {...newProbVals("linkurl", {required: true})} />
						<p>Video URL</p>
						<input type="url" placeholder="website.com" {...newProbVals("videourl", {required: true})} />
						<p>Category</p>
						<select {...newProbVals("category", { required: true })}>
							{renderCategoryOptions()}
						</select>
						<p>Difficulty</p>
						<select {...newProbVals("difficulty", { required: true })}>
							{renderDifficultyOptions()}
						</select>
						<input id='AddProbOCBtn' type="submit" />
					</form>
				</Offcanvas.Body>
			</Offcanvas>

			<Offcanvas id='EditProblemOC' style={{minHeight:'100vh'}} placement="top" show={editProbVis} onHide={hideEditProbOC} backdrop='static'>
				<Offcanvas.Header id='EditProblemOCHead' closeButton={true}>
					<Offcanvas.Title>Edit problem in database</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body id='EditProblemOCBody'>
                    <p>Leave blank to keep original value</p>
					<form id='ProblemForm' onSubmit={setEditedProbVals(submitEditedProblem)}>
						<p>Problem Name</p>
						<input type="text" placeholder="name" {...editedProbVals("probname")} />
						<p>Link URL</p>
						<input type="url" placeholder="https://www.website.com" {...editedProbVals("linkurl")} />
						<p>Video URL</p>
						<input type="url" placeholder="https://www.website.com" {...editedProbVals("videourl")} />
						<p>Category</p>
						<select {...editedProbVals("category", { required: true })}>
                            <option value='NACat'>No change</option>
							{renderCategoryOptions()}
						</select>
						<p>Difficulty</p>
						<select {...editedProbVals("difficulty", { required: true })}>
							{renderDifficultyOptions()}
						</select>
						<input id='EditProbOCBtn' type="submit" />
					</form>
				</Offcanvas.Body>
			</Offcanvas>

            <Offcanvas id='AddCategoryOC' style={{minHeight:'100vh'}} placement="top" show={newCatVis} onHide={hideAddCatOC} backdrop='static'>
				<Offcanvas.Header id='AddCategoryOCHead' closeButton={true}>
					<Offcanvas.Title>Add category to database</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body id='AddCategoryOCBody'>
					<form id='CategoryForm' onSubmit={setNewCatVals(submitNewCategory)}>
						<p>Category Name</p>
						<input type="text" placeholder="name" {...newCatVals("name", {required: true, maxLength: 80})} />
						<input id='AddCatOCBtn' type="submit" />
					</form>
				</Offcanvas.Body>
			</Offcanvas>

            <Offcanvas id='EditCategoryOC' style={{minHeight:'100vh'}} placement="top" show={editCatVis} onHide={hideEditCatOC} backdrop='static'>
				<Offcanvas.Header id='EditCategoryOCHead' closeButton={true}>
					<Offcanvas.Title>Edit category in database</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body id='EditCategoryOCBody'>
					<form id='CategoryForm' onSubmit={setEditedCatVals(submitEditedCategory)}>
						<p>Category Name</p>
						<input type="text" placeholder="name" {...editedCatVals("name", {required: true, maxLength: 80})} />
						<input id='EditCatOCBtn' type="submit" />
					</form>
				</Offcanvas.Body>
			</Offcanvas>

            <Offcanvas id='AddDifficultyOC' style={{minHeight:'100vh'}} placement="top" show={newDiffVis} onHide={hideAddDiffOC} backdrop='static'>
				<Offcanvas.Header id='AddDifficultyOCHead' closeButton={true}>
					<Offcanvas.Title>Add difficulty to database</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body id='AddDifficultyOCBody'>
					<form id='DifficultyForm' onSubmit={setNewDiffVals(submitNewDifficulty)}>
						<p>Difficulty Name</p>
						<input type="text" placeholder="name" {...newDiffVals("name", {required: true, maxLength: 80})} />
						<input id='AddDiffOCBtn' type="submit" />
					</form>
				</Offcanvas.Body>
			</Offcanvas>

            <Offcanvas id='EditDifficultyOC' style={{minHeight:'100vh'}} placement="top" show={editDiffVis} onHide={hideEditDiffOC} backdrop='static'>
				<Offcanvas.Header id='EditDifficultyOCHead' closeButton={true}>
					<Offcanvas.Title>Edit difficulty in database</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body id='EditDifficultyOCBody'>
					<form id='DifficultyForm' onSubmit={setEditedDiffVals(submitEditedDifficulty)}>
						<p>Difficulty Name</p>
						<input type="text" placeholder="name" {...editedDiffVals("name", {required: true, maxLength: 80})} />
						<input id='EditDiffOCBtn' type="submit" />
					</form>
				</Offcanvas.Body>
			</Offcanvas>
		</div>
	);
}

export default ManageProblemsPage;
