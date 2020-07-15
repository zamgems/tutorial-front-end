import React, {useState, useEffect} from 'react';
import TutorialDataService from "../../services/tutorialService";
import { useSelector } from "react-redux";
// import { connect } from "react-redux"
import { useDispatch } from "react-redux";

function Tutorials(props) {
	const [tutorials, setTutorials] = useState([]);

	const dispatch = useDispatch();

	const data = useSelector((state) => state);

	console.log("Tutorials component above ", data);
	useEffect(() => {
		TutorialDataService.getAll()
      		.then(response => {
        console.log("[tutorials after get all service] ",response.data);

    	dispatch({ type: "GET_TUTORIALS", payload: response.data });
        setTutorials(data.tutorials);

      })
      .catch(e => {
        console.log(e);
      });
		}, []);	

	function handleDelete(id) {
    TutorialDataService.delete(id)
      .then(response => {
      	// const newTutorialsArr = tutorials.filter((tutorial) => tutorial._id !== id )
      	// setTutorials([...newTutorialsArr])
        dispatch({ type: "DELETE_TUTORIAL", tutorialId: id });
        console.log("[ delete service ]",response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  function handleEdit(id) {
  	props.editTutorial(id)
  }

	return(
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
						<td>{tutorial.title + tutorial._id}</td>
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
	)
}

// const mapStateToProps = state => {
// 	return {
// 		tutorials
// 	}
// }

export default Tutorials
// export default connect()(Tutorials);