const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;

const getVideogame = (req, res, next) => { 

    const { name } = req.query;

    if(name) {

        axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`)
        .then(game => {

            let listGame = [];

            for (let i = 0; i < 15; i++) {

                const element = game.data.results[i];

                listGame.push(element)
                
            }

            res.status(200).send(listGame);

        })
        .catch(err => res.status(401).send({data: err}))

    } else {

        axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
        .then(obj => {

            let results = obj.data.results;

            let resFil = results.map(ele => {

                let genresOb = ele.genres.map(genres => genres.name);

                let platOb = ele.platforms.map(plat => plat.platform.name);

                //falta encontrar la descripcion
                
                return {  
                
                        id: ele.id,
                        name: ele.name,
                        genres: genresOb,
                        image: ele.background_image,
                        releaseDate: ele.released,
                        rating: ele.rating,
                        plataform: platOb,
        
                    }

            })

            res.status(200).send(resFil)

        })
        .catch(err => res.status(401).send({data: err}))

    }

    

};

const getVideogameId = (req, res, next) => {};

const getGenres = (req, res, next) => {};

const postVideogame = (req, res, next) => {};

module.exports = {

    getVideogame,
    getVideogameId,
    getGenres,
    postVideogame

}