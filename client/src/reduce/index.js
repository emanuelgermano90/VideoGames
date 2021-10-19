import { GET_GAMES, GET_GAME_ID, GET_ALL_GENRES, SORT_BY_RATING } from '../actions'

const initialState = {

    videogames: [],
    gameDetail: [],
    allGenres: [],

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

        case GET_ALL_GENRES:
        
            return {

                ...state,
                allGenres: action.payload

            }

        case SORT_BY_RATING:

            if(action.payload === 'alfa') {

                const gameAlfa = state.videogames.sort();

                return {

                    ...state,
                    videogames: gameAlfa
    
                }

            } else console.log('algo')
    
        default:
            return state;
    }

}

export default rootReducer;