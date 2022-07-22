// Redux
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { postsFindAll, postDelete, postCleanState } from '../../actions/postActions';

import { 
    Button,
    Modal, 
    ModalBody, 
    ModalFooter,
    ModalHeader, 
} from 'reactstrap';

// Syncfusion
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-react-popups';

let spinnerInstance = null;

let flagSpinner = false;

const GridPosts = () => {

    const dispatch = useDispatch();

    const [searchName, setSearchName] = useState("");
    
    const { posts, deletedPost } = useSelector(state => ({
        posts: state.postsReducers,
        deletedPost: state.postsReducers.deletePost
    }));

    if (deletedPost) {
        dispatch(postCleanState());
        
        dispatch(postsFindAll({ "name": "" }));
        
        console.log(deletedPost)
    }
    
    useEffect(() => {

        createSpinner({
            target: spinnerInstance,
            label: "Procesando...",
            cssClass: "e-spin-overlay"
        });

        dispatch(postsFindAll({ "name": "" }));

        console.log("useEffect");

    }, []);
    
    if (flagSpinner === true && posts != null) {
        flagSpinner = false;
        hideSpinner(spinnerInstance);
    }
    
    
    const [search, setSearch] = useState('') 

    const filterButton = () => {
        setSearch(searchName);
    };

    const [idPost, setIdPost] = useState(null);
    
    const deletePost = (id) => {
        setIdPost(id);
        toggleModal();
    }

    const [bOpenModal, setOpenModal ] = useState(false);

    const toggleModal = () => {
        setOpenModal(!bOpenModal);
    }

    const okDeletePost = (bDelete) => {
        if (bDelete) {
            if (idPost != null) {
                showSpinner();
                dispatch(postDelete(idPost));
                setIdPost(null);
            }
        }

        toggleModal();
    }

    return(
        <div >
            <Modal isOpen={bOpenModal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Notificación</ModalHeader>
                <ModalBody>
                    <p>Desea eliminar el registro de Post?</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => okDeletePost(true)}>Sí</Button>{' '}
                    <Button color="secondary" onClick={() => okDeletePost(false)}>Cancelar</Button>{' '}
                </ModalFooter>
            </Modal> 

            <div className="row mb-3">

                <div className="col-md-6 mb-3 mb-md-0">
                    <Link to={`/AddPost`} className="btn btn-primary" replace>
                        <i className="fa-solid fa-comment me-3"></i>
                        <span className="ml-3">Nuevo Post</span>
                    </Link>
                </div>
                <div className="input-group col">
                    <input type="text" className="form-control" placeholder="Buscar..." onChange={event => setSearchName(event.target.value)} />
               
                    <div className="input-group-append">
                        <button className="btn btn-danger"  type="button" onClick={filterButton}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>
                
                </div>
            </div>
            <div className="row">

                <div className="col-12">
                <table className="table table-striped align-middle table-bordered">
                <thead className="table-light">
                    <tr>
                        
                        <th>Nombre Post</th>
                        <th>Decripción</th>
                        <th style={{ "width": "10%" }}>Acción</th>
                    </tr>
                </thead>
                <tbody>
                            {posts != null && posts.posts != null && posts.posts
                                .filter(post => searchName === '' || (post.name != null && post.name.toLocaleLowerCase().includes(searchName.toLocaleLowerCase())))
                                .map((item, index) => {
                        return(
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>
                                    <div className="d-flex justify-content-center">
                                        <button className="btn btn-outline-danger " type="button" onClick={() => deletePost(item.id)}>
                                            <i className="fa-solid fa-trash-can"></i>
                                        </button>
                                    </div>
                                    
                                </td>
                        </tr>
                            
                        )

                    })}

                </tbody>

            </table>
                </div>

            </div>
            
        </div>
    )
}

export default GridPosts;