import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Col, Row, } from 'reactstrap';

import GridPosts from '../../components/Posts/GridPosts'

class Home extends Component {

   
    render() {
        return (
           
        <div className="animated fadeIn">
            
            <Row>
                <Col sm="12" md="12">
                    <GridPosts />
                </Col>

            </Row>
            
            
        </div> 
        );
    }
}

export default Home;
