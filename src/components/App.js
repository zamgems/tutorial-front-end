import React, {useState} from 'react';
import '../styles/App.css';

import Tutorials from './tutorial/Tutorials'
import TutorialForm from './tutorial/TutorialForm'

function App() {
  const [tutorialId, setTutorialId] = useState("");

  const handleEditTutorial = (id) => {
    setTutorialId(id);
  }

  return (
    <div className="app">
      <Tutorials editTutorial={handleEditTutorial}/>
      <TutorialForm tutorialId={tutorialId}/>
    </div>
  );
}

export default App;
