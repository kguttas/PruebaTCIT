const initialState = {
    sidebarShow: true,
  }
  
export default function (state = initialState, { type, ...rest }) {
    
    switch (type) {
        case 'set':
            
            return {
                ...state,
                ...rest
            }
      default:
        return state
    }
}
  