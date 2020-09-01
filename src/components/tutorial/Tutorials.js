import React, {useState, useEffect} from 'react';
import TutorialDataService from "../../services/tutorialService";
import { useDispatch, useSelector } from "react-redux";

function Tutorials(props) {
	const [loading, setLoading] = useState(true); 
	const dispatch = useDispatch();
	const state = useSelector((state) => state);

	useEffect(() => {
		TutorialDataService.getAll()
      		.then(response => {
        console.log("[tutorials after get all service] ",response.data);
    	dispatch({ type: "GET_TUTORIALS", payload: response.data });
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
      });
		}, []);	

	function handleDelete(id) {
	    TutorialDataService.delete(id)
	      .then(response => {
	        dispatch({ type: "DELETE_TUTORIAL", tutorialId: id });
	        console.log("[ delete service ]",response.data);
	      })
	      .catch(e => {
	        console.log(e);
	      });
	}

  	function handleEdit(id) {
  		dispatch({ type: "GET_TUTORIAL", tutorialId: id });
  		props.editTutorial(id);
  	}

  const tutorials = state.tutorials;

	return(
		<div>
		<span className='loading-text' >{ loading ? "Loading, please wait" : "" }</span>
		<table>
			<thead>
				<tr>
					<th>
						Name
					</th>
					<th>
						Description
					</th>
					<th>
						Actions
					</th>
				</tr>
			</thead>
			<tbody>
			{tutorials.map((tutorial) => (
					
					<tr key={tutorial._id}>
						<td>{tutorial.title}</td>
						<td>{tutorial.description}</td>
						<td>
							<button onClick={() => {handleEdit(tutorial._id)}}>Edit</button>

            </td>
            <td>
							<button onClick={() => {handleDelete(tutorial._id)}}>Delete</button>
            </td>
					</tr>
				))}
			</tbody>
		</table>
		</div>
	)
}

export default Tutorials
