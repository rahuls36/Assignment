import React,{Component} from "react"
import ReactDOM from 'react-dom';
import axios from 'axios'
import {Container,Row,Col,Button, Navbar, Form,Alert} from 'react-bootstrap'
import {Link, BrowserRouter as Router,Redirect} from 'react-router-dom'



class AddProject extends Component{
    constructor(props){
        super(props)
        this.state ={
            image : null,
            added: false
        }
    }

    handleImageChange = (e) =>{
        this.setState({
            image : e.target.files[0]
        })
    }

    handleOnSubmit = (e) =>{
        e.preventDefault()
        let form_data = new FormData()
        form_data.append("name", ReactDOM.findDOMNode(this.refs.name).value)
        form_data.append("description", ReactDOM.findDOMNode(this.refs.description).value)
        form_data.append("duration", ReactDOM.findDOMNode(this.refs.duration).value)
        if (this.state.image) {
            form_data.append("avatar", this.state.image, this.state.image.name)
        }
        axios.post(`/api/projects/`,form_data,{headers : {"Content-Type" : "multipart/form-data", 'Accept': 'application/json'}}).then(response => {
            {this.setState({
                added : true
            })}
        })
    }

    render(){
        return(
            <Container>
                <Navbar bg="light">
                    <Navbar.Brand href="projects">Task Management</Navbar.Brand>
                </Navbar>
                <Form>
                    <Form.Group controlId = "formName" >
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter the Name of the Project" ref = "name"/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="description" placeholder="Enter the Description" ref ="description"/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="description" placeholder="Enter the duration in Days" ref ="duration"/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="file" onChange={this.handleImageChange} ref ="image"/>
                    </Form.Group>

                    <br></br>
                        <Button variant="primary" type="submit" onClick = {e => (this.handleOnSubmit(e))}>Submit</Button>

            </Form>
                <br></br>
                <br></br>
                {this.state.added  ? <Redirect push to={`/projects`} />: null }
            </Container>
                )

    }
}

export default AddProject
