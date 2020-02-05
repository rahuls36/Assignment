import React, {Component} from "react";
import { Button,Navbar} from 'react-bootstrap'

class Header extends  Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    handleAddProject= (e) =>{
        e.preventDefault()
        this.props.history.push(`/projects/add_new_project`)
    }
    render(){
        return(
            <div>
                {this.state.clicked_on_add ? (
                        <Redirect push to={`/projects/${this.state.user.id}/add_new_task`} state={this.state.user} />
                    ):
            <Navbar bg="light">
                    <Navbar.Brand href="projects">Task Management</Navbar.Brand>
                    <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                <Button variant="primary" onClick = { e => {this.handleAddProject(e)}}>Add Project</Button>
                            </Navbar.Text>
                        </Navbar.Collapse>
                </Navbar>
        )
    }
}

export default Header