import { ConvertFormatDateToBrowser } from '../../utiles'
import { FormikProvider, useFormik } from 'formik'

import { 
    Alert, 
    Button,
    Card,
    Label,
    FormFeedback, 
    FormGroup, 
    CardHeader,
    CardBody,
    Col,
    Input,
    Modal, 
    ModalBody, 
    ModalFooter,
    ModalHeader, 
    Row,
    Jumbotron  
} from 'reactstrap';

import { validate as validateRut, format as formatRut } from 'rut.js';

// Redux
import { useSelector, useDispatch } from 'react-redux';

import { useEffect } from 'react'

import { postsFindAll } from '../../actions/postActions';

// Syncfusion
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-react-popups';

let spinnerInstance = null;

const loading = () => {

    createSpinner({
        target: spinnerInstance,
        label: "Cargando...",
        cssClass: "e-spin-overlay"
    });

    showSpinner(spinnerInstance);

   

    return(
        <div className="container d-flex justify-content-center" style={{ height: "100vh" }}>
            <div className="my-auto">
                
                <div ref={spinner => {
                        spinnerInstance = spinner;
                    }} id="spinner"></div>
            </div>
        </div>
    )
}

let flagSpinner = false;

const GridPosts = () => {
    
    const { posts } = useSelector(state => ({
        posts: state.postsReducers
    }));

    console.log(posts)

    useEffect(() => {

        createSpinner({
            target: spinnerInstance,
            label: "Procesando...",
            cssClass: "e-spin-overlay"
        });

        dispatch(postsFindAll({ "name": "" }));

    }, []);
    
    if (flagSpinner === true && posts != null) {
        flagSpinner = false;
        hideSpinner(spinnerInstance);
    }
    
    const dispatch = useDispatch();

    return(
        <div>
            <table className="table table-striped align-middle table-bordered">
                <thead className="table-light">
                    <tr>
                        
                        <th>Name Post</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {posts != null && posts.posts != null && posts.posts.map((item, index) => {
                        return(
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>
                                    <a href={`${item.id}`} className="btn btn-outline-danger me-3" role="button">
                                        Delete 
                                    </a>
                                    <a href={`${item.id}`} className="btn btn-outline-success" role="button">
                                        View Details
                                    </a>
                                </td>
                        </tr>
                            
                        )

                    })}

                </tbody>

            </table>
        </div>
    )
}

export default GridPosts;