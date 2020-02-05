import React,{Component} from "react"
import axios from 'axios'
import {Container, Figure,Tabs,Tab,Row,Col,Button,ListGroup, Dropdown, Navbar} from 'react-bootstrap'
import {Link, BrowserRouter as Router,Redirect} from 'react-router-dom'

class TaskDetails extends Component{
    constructor(props){
        super(props)
        this.state = {
           task: []
        }
    }
    componentDidMount() {

        axios.get(`/api/projects/${this.props.match.params.id}/task/${this.props.match.params.task_id}`).then(response => {
            this.setState({task: response.data})
        })

    }

    render(){
        return(
            <div>
            <Navbar bg="light">
                    <Navbar.Brand href="projects">Task Management</Navbar.Brand>
                    <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                <Button variant="primary" onClick = {e => this.handleOnClickAddNewTask(e)}>Add Task</Button>
                            </Navbar.Text>
                        </Navbar.Collapse>
                </Navbar>
            <Container>
                <Tabs defaultActiveKey ="Name" id="uncontrolled-tab-example">
                            <Tab eventKey="Name" title="Name">
                                <div className="container">
                                    <p>{this.state.task.name}</p>
                                    <Button className = "float-right">Edit Name</Button>
                                </div>
                            </Tab>
                            <Tab eventKey="Description" title="Description">
                                <div className="container">
                                    <p>{this.state.task.description}</p>
                                    <Button className = "float-right">Edit Description</Button>
                                </div>
                            </Tab>
                </Tabs>
            </Container>
            </div>
        )
        }

}

export default TaskDetails