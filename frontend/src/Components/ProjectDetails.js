import React,{Component} from "react"
import axios from 'axios'
import {Container, Figure,Tabs,Tab,Row,Col,Button,ListGroup, Dropdown, Navbar, Modal,Form} from 'react-bootstrap'
import {Link, BrowserRouter as Router,Redirect} from 'react-router-dom'
import ReactDOM from 'react-dom';

class ProjectDetails extends Component{

   ButtonStyle = {
         margin : '40px'
    }
    NameStyle = {
       margin : '100px'
    }

    constructor(props){
        super(props)
        this.state ={
            user : [],
            clicked_on_add : false,
            name_edit: false,
            description_edit: false,
            image_edit: false,
            image: null
        }
        this.handleOnClickAddNewTask = this.handleOnClickAddNewTask.bind(this)
    }
    axios_call = () =>{
        axios.get(`/api/projects/${this.props.match.params.id}`).then(response => {
            var new_user = response.data
            new_user.tasks = response.data.tasks
            this.setState({user: new_user})
        })
    }
    componentDidMount() {
        /*
        axios.get(`api/projects/${this.props.match.params.name}`).then(response => {
            this.setState({user: response.data})
        })
        this.setState({user: this.props.location.state.user})*/
        this.axios_call()

    }

    handleOnClickAddNewTask = (e) => {
        e.preventDefault()
        this.setState({clicked_on_add: true})
    }

    handleOnClickDelete = (e,task_id) => {
        e.preventDefault()
        axios.delete(`/api/projects/${this.state.user.id}/task/${task_id}`).then(response => {
            this.componentDidMount()
        })
    }

    goToroute = (e, task_id) =>{
        e.preventDefault()
        this.props.history.push(`${this.state.user.id}/task/${task_id}`)
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
    imageEdit = (e) =>{
       e.preventDefault()
        this.setState({
            image_edit: true
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
        formData.append('description', this.state.user.description)
        formData.append('duration',this.state.user.duration)
        axios.put(`/api/projects/${this.state.user.id}`,formData,{headers : {"Content-Type" : "multipart/form-data", 'Accept': 'application/json'}}).then(response => {
            this.axios_call()
        })
        this.setState({
            name_edit : false
        })

    }

    handleSaveDescription = (e) =>{
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', this.state.user.name)
        formData.append('description', ReactDOM.findDOMNode(this.refs.description).value)
        formData.append('duration',this.state.user.duration)
        axios.put(`/api/projects/${this.state.user.id}`,formData,{headers : {"Content-Type" : "multipart/form-data", 'Accept': 'application/json'}}).then(response => {
            this.axios_call()
        })
        this.setState({
            description_edit : false
        })

    }
    handleImageChange = (e) => {
       this.setState({
            image : e.target.files[0]
        })
    }

    handleSaveImage = (e) => {
       e.preventDefault()
        const formData = new FormData()
        formData.append('name', this.state.user.name)
        formData.append('description', this.state.user.description)
        formData.append('duration',this.state.user.duration)
        formData.append("avatar", this.state.image, this.state.image.name)
        axios.put(`/api/projects/${this.state.user.id}`,formData,{headers : {"Content-Type" : "multipart/form-data", 'Accept': 'application/json'}}).then(response => {
            this.axios_call()
        })
        this.setState({
            image_edit : false
        })
    }

    render(){
        return(
            <div>
                {this.state.clicked_on_add ? (
                        <Redirect push to={`/projects/${this.state.user.id}/add_new_task`} state={this.state.user} />
                    ):
                    <div>
                <Navbar bg="light">
                    <Navbar.Brand href="/">Task Management</Navbar.Brand>
                    <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                <Button variant="primary" onClick = {e => this.handleOnClickAddNewTask(e)}>Add Task</Button>
                            </Navbar.Text>
                        </Navbar.Collapse>
                </Navbar>
                    <Row>
                        <Col xs={3} md={2}>
                        <Figure><Figure.Image
                            width={171}
                            height={180}
                            src ={this.state.user.avatar} roundedCircle/>
                        </Figure>
                        </Col>
                        <Col>
                        <Tabs defaultActiveKey ="Name" id="uncontrolled-tab-example">
                            <Tab eventKey="Name" title="Name">
                                    <p>{this.state.user.name}</p>
                                    <Button className = "float-right" variant="light" onClick = {e => this.editOptionName(e)}>
                                        Edit Name
                                    </Button>
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
                            </Tab>
                            <Tab eventKey="Description" title="Description">
                                    <p>{this.state.user.description}</p>
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
                                                    <Form.Group >
                                                        <Form.Control type="file" placeholder="Enter Description"  ref ="description"/>
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
                            </Tab>
                            <Tab eventKey="Tasks" title="Tasks">

                                    <ListGroup>
                                        {this.state.user.tasks ? this.state.user.tasks.map((task, index) => (
                                            <ListGroup.Item>
                                                <h3>
                                                    {task.name}
                                                </h3>
                                                <Container>
                                                    <Row>
                                                        <Col>{task.description}</Col>
                                                        <Col>
                                                            <Dropdown className="float-right">
                                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                                Actions
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item onClick = {e => (this.goToroute(e,index+1 ))}>Edit</Dropdown.Item>
                                                                <Dropdown.Item onClick = {e => (this.handleOnClickDelete(e,task.id))}> Delete</Dropdown.Item>
                                                        </Dropdown.Menu>
                                            </Dropdown>
                                        </Col>
                                    </Row>
                                </Container>
                                            </ListGroup.Item>)): null

                                    }
                                    </ListGroup>
                            </Tab>
                        </Tabs>
                        </Col>
                    </Row>
                    <Row>
                        <Button variant = "light" style = {this.ButtonStyle} onClick={this.imageEdit}> Edit Image</Button>
                            {this.state.image_edit ?
                                <Modal show = {this.state.image_edit} onHide={this.handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Edit Image</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            <Form.Group >
                                                <Form.Control type="file" onChange={this.handleImageChange} ref ="description"/>
                                            </Form.Group>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={e => this.handleCloseButton(e)}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={e => this.handleSaveImage(e)}>
                                            Save Changes
                                        </Button>
                                    </Modal.Footer>
                                </Modal>: null}
                    </Row>

            </div>}
            </div>

        )
    }
}

export default ProjectDetails