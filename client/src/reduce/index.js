import { GET_GAMES, GET_GAME_ID } from '../actions'

const initialState = {

    videogames: [],
    gameDetail: []

}

const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_GAMES:
            
            return {

                ...state,
                videogames: action.payload

            }

        case GET_GAME_ID:

        return {

            ...state,
            gameDetail: action.payload

        }
    
        default:
            return state;
    }

}

export default rootReducer;