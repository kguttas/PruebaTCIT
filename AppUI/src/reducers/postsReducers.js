import { 
    POST_FIND_ALL
} from '../actions/types';

const initialState = {
    
}

export default function (state = initialState, action) {
    switch (action.type) {
       
        case POST_FIND_ALL:
            return {
                ...state,
                posts: action.payload,
            }
        
        default:
            return state;
    }
}