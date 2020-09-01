import React, {useState, useEffect} from 'react';
import TutorialDataService from "../../services/tutorialService";
import { useDispatch, useSelector } from "react-redux";

function TutorialForm(props) {
	const [editMode, setEditMode] = useState(false);
	const [tutorial, setTutorial] = useState({
    	_id: "",
    	title: "",
    	description: ""
  });

	const dispatch = useDispatch();
	const state = useSelector((state) => state);

	useEffect(() => {
		if (!!props.tutorialId) {
      		setTutorial({...state.currentTutorial});
      		setEditMode(true);
		}
	}, [props.tutorialId]);

	function onChangeField(e) {
		setTutorial({
			...tutorial,
			[e.target.name]: e.target.value})
	}

	function clearForm() {
		setTutorial({
			_id: "",
			title: "",
			description: ""}
		)
	}

	function handleSubmit(e) {
		const tutorialData = {title: tutorial.title, description: tutorial.description}

		if(tutorial._id){
			TutorialDataService.update(tutorial._id, tutorialData).then(response => {
					console.log("[update form]" ,response.data);
				}).catch(e => {
					console.log(e);
				})
			dispatch({ type: "UPDATE_TUTORIAL", tutorialId: tutorial._id, data: tutorialData });
		}
		else {
			TutorialDataService.create(tutorialData)
				.then(response => {
					;
					console.log("[create form]" ,response.data);
					dispatch({ type: "ADD_TUTORIAL", data: response.data });
				})
				.catch(e => {
					console.log(e);
				})
		}
		clearForm();
		e.preventDefault();
		setEditMode(false);
	}

	return(
		<div className='tutorial-form'>
			<center><h3>{editMode ? "Update Tutorial" : "Add Tutorial"}</h3></center>
			<form onSubmit={handleSubmit} >
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