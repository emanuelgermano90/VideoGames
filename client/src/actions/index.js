import axios from 'axios';

export const GET_GAMES = 'GET_GAMES';
export const GET_GAME_ID = 'GET_GAME_ID';

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

        return await axios(`http://localhost:3001/videogames/${id}`)
                        .then(game => dispatch({

                            type: GET_GAME_ID,
                            payload: game.data

                        }))
        
    }
    
}