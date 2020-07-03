import React, {useState, useEffect} from 'react';
import TutorialDataService from "../../services/tutorialService";

function TutorialForm(props) {
	const [tutorial, setTutorial] = useState({
		id: "",
		title: "",
		description: ""
	});

	const [editMode, setEditMode] = useState(false);

	useEffect(() => {
		if (props.match.params.id) {
			TutorialDataService.get(props.match.params.id)
				.then(response => {
					setTutorial({
						id: response.data._id,
						title: response.data.title,
						description: response.data.description,
					});
					setEditMode(true);
				})
		}
	}, []);

	function onChangeField(e) {
		setTutorial({
			...tutorial,
			[e.target.name]: e.target.value})
	}

	function handleSubmit() {
		const data = tutorial;

		if(data.id){
			TutorialDataService.update(data.id, data)
				.then(response => {
					const { title, description } = response.data;
					setTutorial({
						title,
						description
					})
					console.log(response.data);
				})
				.catch(e => {
					console.log(e);
				})
		}
		else {
			TutorialDataService.create(data)
				.then(response => {
					const { title, description } = response.data;
					setTutorial({
						title,
						description
					})
					console.log(response.data);
				})
				.catch(e => {
					console.log(e);
				})
		}
	}

	return(
		<div>
			<form onSubmit={handleSubmit}>
				<label> Title: 
					<input
	              type="text"
	              required
	              value={tutorial.title}
	              onChange={onChangeField}
	              name="title"
	            />
	      </label>
	      <label> Description: 
				<input
	              type="text"
	              required
	              value={tutorial.description}
	              onChange={onChangeField}
	              name="description"
	            />
	      </label>
	      <input type="submit" value={editMode ? "Update" : "Add"}/>
			</form>
		</div>
	)
}

export default TutorialForm; 