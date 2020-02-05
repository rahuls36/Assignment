import React, {Component} from 'react';
import Home from './Components/Home'
import { BrowserRouter as Router, Switch,Route} from 'react-router-dom'
import ProjectDetails from "./Components/ProjectDetails";
import AddTask from "./Components/AddTask";
import TaskDetails from "./Components/TaskDetails";
import AddProject from "./Components/AddProject";
import Body from "./Components/Body";

class App extends  Component {

    render() {
        return(
            <Router>
                <Route path="/" exact component={Home}>
                <Home/>
                </Route>
            <Route path="/projects/:id" exact component={ProjectDetails}/>
            <Route path="/projects/:id/add_new_task" exact component={AddTask}/>
            <Route path="/projects/:id/task/:task_id" exact component={TaskDetails}/>
            <Route path="/projects/create/add_new_project/" exact component={AddProject}/>
            <Route path="/projects/" exact component={Body}/>
            </Router>
        )
    }
}

export default App;
