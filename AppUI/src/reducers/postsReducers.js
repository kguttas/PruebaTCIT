import { 
    POST_FIND_ALL, POST_CREATE, POST_DELETE, POST_CLEAN_STATE
} from '../actions/types';

const initialState = {
    
}

export default function (state = initialState, action) {
    switch (action.type) {
        case POST_CLEAN_STATE:
            return initialState;
        case POST_FIND_ALL:
            return {
                ...state,
                posts: action.payload,
            }
        
        case POST_CREATE:
            return {
                ...state,
                newPost: action.payload,
            }
        
        case POST_DELETE:
            return {
                ...state,
                deletePost: action.payload,
            }
        
        default:
            return state;
    }
}