import { ConvertFormatDateToBrowser } from '../../utiles'
import { FormikProvider, useFormik } from 'formik'

import { 
    Button,
    Card,
    Label,
    FormFeedback, 
    FormGroup, 
    CardHeader,
    CardBody,
    Col,
    Input, 
    Row,
} from 'reactstrap';

// Redux
import { useSelector, useDispatch } from 'react-redux';

import { useEffect } from 'react'

import { useNavigate} from 'react-router-dom';

import { postCreate } from '../../actions/postActions';

// Syncfusion
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-react-popups';

//////////////////////////////

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

const validate = (values) => {
    const errors = {}

    if (!values.name) {
        errors.name = 'Es requerido';
    }
  
    if(!values.description) {
        errors.description = 'Es requerido';
    }

    return errors
}

let flagSpinner = false;

const FormPost = () => { 

    const navigate = useNavigate();

    const { posts } = useSelector(state => ({
        posts: state.postsReducers
    }));

    useEffect(() => {

        createSpinner({
            target: spinnerInstance,
            label: "Procesando...",
            cssClass: "e-spin-overlay"
        });

    }, []);
    
    if (flagSpinner === true && posts != null) {
        flagSpinner = false;
        hideSpinner(spinnerInstance);
    }
    
    const dispatch = useDispatch();
    
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        validate,
        onSubmit: values => {
            
            flagSpinner = true;

            showSpinner(spinnerInstance);

            dispatch(postCreate(values)).then((data) => navigate('/'));

            
        }
    });

    return (
          
        <div className="animated fadeIn">

            <div ref={spinner => {
                        spinnerInstance = spinner;
                    }} id="spinner"></div>
            
                <Row className="justify-content-center">
                    <Col xs="12" md="10">
                       
                        <Card>
                            <CardHeader>
                                <strong>Crear Nuevo Post</strong>
                                <small>&ensp;por favor, complete el formulario...</small>
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12">
                                    <form onSubmit={formik.handleSubmit}>
                                        
                                        <Row>
                                            <Col xs="12">
                                                <FormGroup>
                                                    <Label htmlFor="name">Nombre del Post<i className="text-danger">★</i></Label>
                                                    <Input type="name" {...formik.getFieldProps('name')}
                                                        placeholder="Ingrese el nombre del post..."
                                                        invalid={(formik.touched.name && formik.errors.name) ? true : false}></Input>
                                                    <FormFeedback className="help-block">{ formik.errors.name}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col xs="12">
                                                <FormGroup>
                                                    <Label htmlFor="description">Descripción<i className="text-danger">★</i></Label>
                                                    <Input type="text" {...formik.getFieldProps('description')}
                                                        placeholder="Ingrese la descripción del post..."
                                                        invalid={(formik.touched.description && formik.errors.description) ? true : false}></Input>
                                                    <FormFeedback className="help-block">{ formik.errors.description}</FormFeedback>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col xs="12">
                                                <Button block color="success" type="submit">Crear Nuevo Post</Button>
                                            </Col>
                                        </Row>
                                        </form>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            
            
                
        </div>  
          
    );
}

export default FormPost;