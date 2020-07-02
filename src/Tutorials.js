import React, {useState, useEffect} from 'react';
import TutorialDataService from "./services/tutorialService";
import { Link } from "react-router-dom";

function Tutorials() {
	const [tutorials, setTutorials] = useState([]);

	useEffect(() => {
		TutorialDataService.getAll()
      .then(response => {
        setTutorials(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
		}, []);	

	function handleDelete(id) {
    TutorialDataService.delete(id)
      .then(response => {
      	const newTutorialsArr = tutorials.filter((tutorial) => tutorial._id !== id )
      	setTutorials([...newTutorialsArr])
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
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
						<td>{tutorial.title}</td>
						<td>{tutorial.description}</td>
						<td>
							<Link to={"/tutorials/" + tutorial._id + "/edit"} >
              	Edit
            	</Link>
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

export default Tutorials;