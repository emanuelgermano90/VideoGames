import { GET_GAMES, GET_GAME_ID, GET_ALL_GENRES, FILTER_GENRES, SORT_BY_RATING } from '../actions'

const initialState = {

    videogames: [],
    backupGames: [],
    gameDetail: [],
    allGenres: [],

}

const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_GAMES:

            return {

                ...state,
                videogames: action.payload,
                backupGames: action.payload

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

        case FILTER_GENRES:

            const allVideogames = state.backupGames

            if(action.payload === 'existente'){

                return {

                    ...state,
                    videogames: allVideogames.filter(e => !isNaN(e.id))

                }

            } else if(action.payload === 'agregados') {

                return {

                    ...state,
                    videogames: allVideogames.filter(e => isNaN(e.id))

                }

            } else {

                const statusFilter = action.payload === 'all' ? allVideogames : allVideogames.filter(e => e.genres.indexOf(action.payload) >= 0)

                return {

                    ...state,
                    videogames: statusFilter

                }

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