import axios from 'axios';

export const GET_GAMES = 'GET_GAMES';
export const GET_GAME_ID = 'GET_GAME_ID';
export const GET_ALL_GENRES = 'GET_ALL_GENRES';
export const SORT_BY_RATING = 'SORT_BY_RATING';

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

export function getSortRating(payload) {

    return {

        type: SORT_BY_RATING,
        payload

    }
    
}