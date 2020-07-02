import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Tutorials from './Tutorials'
import TutorialForm from './TutorialForm'

function App() {
  return (
    <div className="App">
      <div>
        <Router>
          <li>
            <Link to={"/tutorials"}>
              Tutorials
            </Link>
          </li>
          <li>
            <a href="/New" >
              Add
            </a>
          </li>
          <Switch>
            <Route exact path={["/", "/tutorials"]} component={Tutorials} />
            <Route exact path="/new" component={TutorialForm} />
            <Route path="/tutorials/:id/edit" component={TutorialForm} />
            {//             <Route path="/tutorials/:id" component={Tutorial} />
          }
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
