const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Genres, Videogame } = require('../db.js');

const getVideogame = async (req, res, next) => { 

    const { name } = req.query;

    if(name) {

        await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`)
        .then(game => {

            let listGame = [];

            if(game.data.results.length === 0) return res.status(404).send({data: 'video game not found'}); // si el length es 0 es porque no existe ese nombre

            for (let i = 0; i < 15; i++) {

                const element = game.data.results[i];

                listGame.push(element);
                
            }

            let gameName = [];

            listGame.forEach(e => {

                let genresOb = e.genres.map(genres => genres.name);

                gameName.push({
                            
                            id: e.id,
                            name: e.name,
                            image: e.background_image,
                            genres: genresOb,
                            rating: e.rating,
                        });

            })
            
            return res.status(200).send(gameName);

        })
        .catch(err => res.status(401).send({data: err}))

    } else {
        // obtener imagen nombre generos
        
        let allGames = [];

        for (let i = 1; i <= 5; i++) {

            await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)
                .then(obj => {

                    let results = obj.data.results;

                    results.forEach(ele => {

                        let genresOb = ele.genres.map(genres => genres.name);
                        
                        allGames.push({
                    
                            id: ele.id,
                            name: ele.name,
                            image: ele.background_image,
                            genres: genresOb,
                            rating: ele.rating,
                        })
                    
                    })

                })
                .catch(err => res.status(401).send({data: err}))
            
        }

        let gameDb = await Videogame.findAll({

            include:{

                model: Genres,
                attributes: ['name'],
                through: {

                    attributes: [],

                },

            }

        });
        
        return res.status(200).send(allGames.concat(gameDb));

    }

    

};

const getVideogameId = async (req, res, next) => {
    // obtener imagen nombre generos descripcion fecha de lanzamiento rating plataformas
    const { idVideogame } = req.params;
    
    await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`)
        .then(games => {
            
            let results = games.data;
            
            let genresOb = results.genres.map(genres => genres.name);
            
            let platOb = results.platforms.map(plat => plat.platform.name);

            return res.status(200).send({  
                
                name: results.name,
                genres: genresOb,
                image: results.background_image,
                description: results.description,
                releaseDate: results.released,
                rating: results.rating,
                plataform: platOb,

            })

        })
        .catch(err => res.status(401).send({data: err}))

};

const getGenres = async (req, res, next) => {

   await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
            .then((gen) => {

                gen.data.results.forEach(async (g) => {
                        
                        let genderDb = await Genres.findOrCreate({  // -----------> agrego los generos a la base de datos

                            where: { name: g.name }
        
                        });

                        genderDb = await Genres.findAll({  // -----------> traigo los generos de la base de datos

                            attributes: ['name']
            
                        });

                        let listGenDb = genderDb.map(g => g.name);
                        
                        res.status(200).json(listGenDb);

                });

            })
            .catch(err => {

                res.sendStatus(400);

            })

};

const postVideogame = async (req, res, next) => {
    // nombre- descripcion- fecha de lanzamiento- rating- varios generos- varias plataformas
    const { name, description, releaseDate, rating, platforms, genres } = req.body;
    console.log({ name, description, releaseDate, rating, platforms, genres })
    if(!name || !description || !releaseDate || !rating || !platforms || !genres) return res.status(401).send({error: 'there are empty fields'})

    let platformsStr = platforms.toString()

    try {

        let newVideogame = await Videogame.create({

            name,
            description,
            releaseDate,
            rating,
            platforms: platformsStr

        });

        let genderDb = await Genres.findAll({

            where: { name: genres }

        });

        newVideogame.addGenres(genderDb);
        
    } catch (err) {

        return res.status(400).send(err)
        
    }

    return res.status(200).send({

        name,
        description,
        releaseDate,
        rating,
        platforms

    });

};

module.exports = {

    getVideogame,
    getVideogameId,
    getGenres,
    postVideogame

}