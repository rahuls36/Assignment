import React,{Component} from "react"
import axios from 'axios'
import {Container, Form,Tabs,Tab,Row,Col,Button,Modal, Navbar} from 'react-bootstrap'
import {Link, BrowserRouter as Router,Redirect} from 'react-router-dom'
import ReactDOM from "react-dom";

class TaskDetails extends Component{
    constructor(props){
        super(props)
        this.state = {
           task: [],
            name_edit : false,
            description_edit : false

        }
    }
    axios_call = () => {
        axios.get(`/api/projects/${this.props.match.params.id}/task/${this.props.match.params.task_id}`).then(response => {
            this.setState({task: response.data})
        })
    }
    componentDidMount() {
        this.axios_call()

    }

    editOptionName = (e) =>{
        e.preventDefault()
        this.setState({
            name_edit : true
        })
    }

    editOptionDescription = (e) =>{
        e.preventDefault()
        this.setState({
            description_edit : true
        })
    }

    handleClose = () =>{
        this.setState({
          name_edit : false,
            description_edit : false,
            image_edit: false
        })
    }

    handleCloseButton = (e) =>{
        e.preventDefault()
        this.setState({
          name_edit : false,
            description_edit: false,
            image_edit: false
        })
    }

    handleSavename = (e) =>{
        e.preventDefault()
        const formData = new FormData()

        formData.append('name', ReactDOM.findDOMNode(this.refs.name).value)
        formData.append('description', this.state.task.description)
        formData.append('start_date',this.state.task.start_date)
        formData.append('end_date',this.state.task.end_date)
        formData.append('project',this.state.task.project)
        axios.put(`/api/projects/${this.props.location.state.user}/task/${this.state.task.id}`,formData,{headers : {"Content-Type" : "multipart/form-data", 'Accept': 'application/json'}}).then(response => {
            this.axios_call()
        })
        this.setState({
            name_edit : false
        })

    }

    handleSaveDescription = (e) =>{
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', this.state.task.name)
        formData.append('description', ReactDOM.findDOMNode(this.refs.description).value)
        formData.append('start_date',this.state.task.start_date)
        formData.append('end_date',this.state.task.end_date)
        formData.append('project',this.state.task.project)
        axios.put(`/api/projects/${this.props.location.state.user}/task/${this.state.task.id}`,formData,{headers : {"Content-Type" : "multipart/form-data", 'Accept': 'application/json'}}).then(response => {
            this.axios_call()
        })
        this.setState({
            description_edit : false
        })

    }

    render(){
        return(
            <div>
            <Navbar bg="light">
                    <Navbar.Brand href="/projects">Task Management</Navbar.Brand>
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
                                    <Button className = "float-right" variant="light" onClick = {e => this.editOptionName(e)}>Edit Name</Button>
                                    {this.state.name_edit ?
                                        <Modal show = {this.state.name_edit} onHide={this.handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Edit Name</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                               <Form>
                                                    <Form.Group controlId="formBasicEmail">
                                                        <Form.Label>Enter the New Project Name</Form.Label>
                                                        <Form.Control type="name" placeholder="Enter name"  ref ="name"/>
                                                    </Form.Group>
                                               </Form>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={e => this.handleCloseButton(e)}>
                                                    Close
                                                </Button>
                                                <Button variant="primary" onClick={e => this.handleSavename(e)}>
                                                    Save Changes
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                        : null}
                                </div>
                            </Tab>
                            <Tab eventKey="Description" title="Description">
                                <div className="container">
                                    <p>{this.state.task.description}</p>
                                    <Button className = "float-right" variant="light" onClick = {e => this.editOptionDescription(e)}>
                                        Edit Description
                                    </Button>
                                    {this.state.description_edit ?
                                        <Modal show = {this.state.description_edit} onHide={this.handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Edit Image</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                               <Form>
                                                   <Form.Group controlId="formBasicEmail">
                                                        <Form.Label>Enter the Description</Form.Label>
                                                        <Form.Control type="name" placeholder="Enter Description"  ref ="description"/>
                                                    </Form.Group>
                                               </Form>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={e => this.handleCloseButton(e)}>
                                                    Close
                                                </Button>
                                                <Button variant="primary" onClick={e => this.handleSaveDescription(e)}>
                                                    Save Changes
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>: null}
                                </div>
                            </Tab>
                </Tabs>
            </Container>
            </div>
        )
        }

}

export default TaskDetails