import axios from 'axios';

export const GET_GAMES = 'GET_GAMES';

export function getListVideogames(){

    return async function(dispatch){

        return await axios(`http://localhost:3001/videogames`)
                        .then(respuesta => dispatch({

                            type: GET_GAMES,
                            payload: respuesta.data

                        }));

    }

}