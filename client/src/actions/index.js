import axios from 'axios';

export const GET_GAMES = 'GET_GAMES';
export const GET_GAME_ID = 'GET_GAME_ID';
export const GET_ALL_GENRES = 'GET_ALL_GENRES';
export const GET_GAMES_NAME = 'GET_GAMES_NAME';
export const POST_GAMES = 'POST_GAMES';
export const FILTER_GENRES = 'FILTER_GENRES';
export const SORT_BY = 'SORT_BY';
export const ORDER_ASC_DES = 'ORDER_ASC_DES';

export function getListVideogames(){

    return async function(dispatch){

        return await axios(`http://localhost:3001/videogames`)
                        .then(respuesta => dispatch({

                            type: GET_GAMES,
                            payload: respuesta.data

                        }));

    }

}

export function getGamesId(id) {

    return async function (dispatch) {

        return await axios(`http://localhost:3001/videogame/${id}`)
                        .then(game => dispatch({

                            type: GET_GAME_ID,
                            payload: game.data

                        }))
        
    }
    
}

export function getGamesGenres() {

    return async function (dispatch) {

        return await axios(`http://localhost:3001/genres`)
                        .then(genres => dispatch({

                            type: GET_ALL_GENRES,
                            payload: genres.data

                        }))
    }
    
}

export function getVideogame(name) {

    return async function(dispatch) {

        return await axios(`http://localhost:3001/videogames?name=${name}`)
                        .then(game => dispatch({

                            type: GET_GAMES_NAME,
                            payload: game.data

                        }))

    }

}

export function postGames(payload) {

    return async function(dispatch) {

        return await axios.post(`http://localhost:3001/videogame`,payload)

    }

}

export function filterGenres(payload){
    
    return {

        type: FILTER_GENRES,
        payload

    }

}

export function getSortRating(payload) {

    return {

        type: SORT_BY,
        payload

    }
    
}

export function getOrder(payload) {

    return {

        type: ORDER_ASC_DES,
        payload

    }

}