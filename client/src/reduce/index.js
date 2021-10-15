// import { GET_GAMES } from '../actions'

const initialState = {

    videogames: []

}

const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'GET_GAMES':
            
            return {

                ...state,
                videogames: action.payload

            }
    
        default:
            break;
    }

}

export default rootReducer;