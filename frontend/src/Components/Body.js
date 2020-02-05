import React, {Component} from "react";
import {Container,ListGroup,Dropdown,Row,Col, Navbar, Button} from 'react-bootstrap'
import {Link, BrowserRouter as Router,Redirect} from 'react-router-dom'
import ProjectDetails from './ProjectDetails'
import axios from 'axios'
import { withRouter } from 'react-router-dom';

class Body extends  Component {
    constructor(props) {
        super(props)
        this.state = {
            user: [],
            clicked: false,
        }
        this.handleOnClick = this.handleOnClick.bind(this)
    }


    handleOnClick = (e,user) => {
        e.preventDefault()
        this.setState({user: user, clicked: true})
    }

    handleAddProject = (e) => {
        e.preventDefault()
        this.props.history.push(`/projects/create/add_new_project/`)
    }
    handleDelete = (e,user) =>{
        e.preventDefault()
        axios.delete(`/api/projects/${user.id}`).then(response => {
           this.props.functionToCall()
        })
    }


    render() {
        return(
            <div>
                {this.state.clicked ? (
                        <Redirect push to={`/projects/${this.state.user.id}`} state={this.state.user} />
                    ) :
                    <div>
                         <Navbar bg="light">
                            <Navbar.Brand href="projects">Task Management</Navbar.Brand>
                            <Navbar.Toggle />
                                <Navbar.Collapse className="justify-content-end">
                                    <Navbar.Text>
                                <Button variant="primary" onClick = { e => {this.handleAddProject(e)}}>Add Project</Button>
                                    </Navbar.Text>
                        </Navbar.Collapse>
                        </Navbar>
                        <ListGroup>
                            {this.props.users.map((user) => (
                            <ListGroup.Item>
                                <h3>{user.name}</h3>
                                <Container>
                                    <Row>
                                        <Col>{user.description}</Col>
                                        <Col>
                                            <Dropdown className="float-right">
                                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                    Actions
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item
                                                        onClick={e => this.handleOnClick(e, user)}>Edit</Dropdown.Item>
                                                    <Dropdown.Item onClick={e => this.handleDelete(e, user)}>Delete</Dropdown.Item>

                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Col>
                                    </Row>
                                </Container>


                            </ListGroup.Item>

                        ))}
                    </ListGroup>
                    </div>}

            </div>
        )

        }

}

export default withRouter(Body)
