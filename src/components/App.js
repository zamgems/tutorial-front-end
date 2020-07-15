import React, {useState} from 'react';
import '../styles/App.css';

import Tutorials from './tutorial/Tutorials'
import TutorialForm from './tutorial/TutorialForm'

function App() {
  // const [showForm, setShowForm] = useState(false);
  const [tutorialId, setTutorialId] = useState("");
  // handleOnClick = () => {

  // }

  const handleEditTutorial = (id) => {
    setTutorialId(id);
  }

  return (
    <div className="app">
      <div>
        {/*<button onClick={handleOnClick}>Add tutorial</button>*/}
        <Tutorials editTutorial={handleEditTutorial}/>
        <TutorialForm tutorialId={tutorialId}/>
      </div>
    </div>
  );
}

export default App;
