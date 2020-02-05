import React,{Component} from "react"
import ReactDOM from 'react-dom';
import axios from 'axios'
import {Container,Row,Col,Button, Navbar, Form,Alert} from 'react-bootstrap'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class AddTask extends Component{
    constructor(props){
        super(props)
        this.state ={
            startDate: new Date(),
            endDate: new Date(),

        }
        this.handleStartChange = this.handleStartChange.bind(this)
        this.handleEndChange = this.handleEndChange.bind(this)
    }

    handleStartChange = (date) =>{
        this.setState({
            startDate: date
        })
    }

    handleEndChange = (date) =>{
        this.setState({
            endDate: date
        })
    }

    handleOnSubmit = (e) =>{
        e.preventDefault()
        let data = {
            "name": ReactDOM.findDOMNode(this.refs.name).value,
            "description": ReactDOM.findDOMNode(this.refs.description).value,
            "start_date": new Date(this.state.startDate).toISOString(),
            "end_date": new Date(this.state.endDate).toISOString(),
            "project": this.props.match.params.id
        }

        axios.post(`/api/projects/${this.props.match.params.id}/task/`,data,{"Content-Type": "application/json; charset=utf-8"}).then(response => {
            if(response.status === 201){
                this.setState({response_Text : "Created_Task_Successfully"})
            }
            else{
                this.setState({response_Text : "Bad Request"})
            }
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
                    <Form.Control type="name" placeholder="Enter the Name of the Task" ref = "name"/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="description" placeholder="Enter the Description" ref ="description"/>
                    </Form.Group>


                    <Row>
                        <Form.Group controlId="formStartDate">
                        <Col>
                            <Form.Label>Start Date</Form.Label>
                            <div>
                            <DatePicker selected = {this.state.startDate}
                            onChange = {this.handleStartChange}/>
                            </div>
                        </Col>
                        </Form.Group>
                        <Form.Group>
                        <Col>
                            <Form.Label>End Date</Form.Label>
                            <div>
                            <DatePicker selected = {this.state.endDate}
                            onChange = {this.handleEndChange}/>
                            </div>
                            </Col>
                        </Form.Group>
                    </Row>

                    <br></br>
                        <Button variant="primary" type="submit" onClick = {e => (this.handleOnSubmit(e))}>Submit</Button>

            </Form>
                <br></br>
                <br></br>
                {this.state.response_Text === "Created_Task_Successfully" ? <Alert variant ="primary"> Successful</Alert>: null }
            </Container>
                )
    }
}

export default AddTask