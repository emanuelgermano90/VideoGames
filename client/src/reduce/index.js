import { GET_GAMES, GET_GAME_ID, GET_ALL_GENRES, GET_GAMES_NAME, POST_GAMES, FILTER_GENRES, SORT_BY, ORDER_ASC_DES } from '../actions'

const initialState = {

    videogames: [],
    backupGames: [],
    gameDetail: [],
    allGenres: [],
    orderAlfa: true,

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

        case GET_GAMES_NAME:

            return {

                ...state,
                videogames: action.payload

            }

        case POST_GAMES:

            return {

                ...state,

            }

        case FILTER_GENRES:

            const allVideogames = state.backupGames;

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

        case SORT_BY:

            if(action.payload === 'alfa') {

                const gameAlfa = state.videogames.sort((a,b) => {

                        if(a.name < b.name) return -1
                            else if(a.name > b.name) return 1
                                else return 0

                    });
                
                return {

                    ...state,
                    videogames: gameAlfa,
                    orderAlfa: true,
    
                }

            } else {

                const gameAlfa = state.videogames.sort((a,b) => {

                        return a.rating - b.rating;

                    });
                
                return {

                    ...state,
                    videogames: gameAlfa,
                    orderAlfa: false,
    
                }

            }

        case ORDER_ASC_DES:

            if(state.orderAlfa){

                let orderAscDes = action.payload === 'asc' ? state.videogames.sort((a,b) => {

                        if(a.name < b.name) return -1
                            else if(a.name > b.name) return 1
                                else return 0

                    }) : state.videogames.sort((a,b) => {

                        if(a.name < b.name) return 1
                            else if(a.name > b.name) return -1
                                else return 0

                    })

                return {

                    ...state,
                    videogames: orderAscDes

                }

            } else {

                let orderAscDes = action.payload === 'asc' ? state.videogames.sort((a,b) => {

                        if(a.rating < b.rating) return -1
                            else if(a.rating > b.rating) return 1
                                else return 0

                    }) : state.videogames.sort((a,b) => {

                        if(a.rating < b.rating) return 1
                            else if(a.rating > b.rating) return -1
                                else return 0

                    })

                return {

                    ...state,
                    videogames: orderAscDes

                }

            }

        default:

            return state;
    }

}

export default rootReducer;