import React, { Component } from 'react'
import { Col, Row, } from 'reactstrap';

import FormPost from '../../components/Posts/FormPost'

class AddPost extends Component {

   
    render() {
        return (
           
        <div className="animated fadeIn">
            
            <Row>
                <Col sm="12" md="12">
                    <FormPost />
                </Col>

            </Row>
            
            
        </div> 
        );
    }
}

export default AddPost;
