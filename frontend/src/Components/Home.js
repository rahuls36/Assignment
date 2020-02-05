import React, {Component} from "react";
import axios from 'axios';
import { Container} from 'react-bootstrap'
import { withRouter } from 'react-router-dom';

import Body from './Body'

class Home extends  Component {
    constructor(props){
        super(props)
        this.state = {
            users : []
        }
        this.componentDidMount = this.componentDidMount.bind(this)
    }


    componentDidMount() {
        axios.get(`api/projects/`).then(response => {
            this.setState({users: response.data})
        })
    }

    render() {
        return(
            <Container>
                <Body users = {this.state.users} functionToCall={ this.componentDidMount}/>
            </Container>

        )
    }
}

export default withRouter(Home);