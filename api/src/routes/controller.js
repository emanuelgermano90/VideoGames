const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;

const getVideogame = (req, res, next) => { 

    const { name } = req.query;

    if(name) {

        axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`)
        .then(game => {

            let listGame = [];

            console.log(game.data.results.length);

            if(game.data.results.length === 0) res.status(404).send({data: 'video game not found'}); // si el length es 0 es porque no existe ese nombre

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

const getVideogameId = (req, res, next) => {

    const { idVideogame } = req.params;

    axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
        .then(games => {

            let results = games.data.results;

            let resFil = results.filter(ele => ele.id == idVideogame);

            let genresOb = resFil[0].genres.map(genres => genres.name);

            let platOb = resFil[0].platforms.map(plat => plat.platform.name);

            res.status(200).send({  
                
                id: resFil[0].id,
                name: resFil[0].name,
                genres: genresOb,
                image: resFil[0].background_image,
                releaseDate: resFil[0].released,
                rating: resFil[0].rating,
                plataform: platOb,

            });

        })
        .catch(err => res.status(401).send({data: err}))

};

const getGenres = (req, res, next) => {};

const postVideogame = (req, res, next) => {};

module.exports = {

    getVideogame,
    getVideogameId,
    getGenres,
    postVideogame

}