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
	const data = useSelector((state) => state);

	useEffect(() => {
		if (!!props.tutorialId) {
			dispatch({ type: "GET_TUTORIAL", tutorialId: props.tutorialId });

			const currentTutorial = data.currentTutorial
      setTutorial({...currentTutorial});
      setEditMode(true);
			// TutorialDataService.get(props.tutorialId)
			// 	.then(response => {
			// 		setTutorial({
			// 			id: response.data._id,
			// 			title: response.data.title,
			// 			description: response.data.description,
			// 		});
			// 		setEditMode(true);
			// 	})
		}
	}, [props.tutorialId]);

	function onChangeField(e) {
		setTutorial({
			...tutorial,
			[e.target.name]: e.target.value})
	}

	function handleSubmit() {
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
				})
				.catch(e => {
					console.log(e);
				})

			dispatch({ type: "ADD_TUTORIAL", data: tutorialData });
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