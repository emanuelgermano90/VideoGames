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

                const element = game.data.results[i].name;

                listGame.push(element);
                
            }

            return res.status(200).send(listGame);

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

    try {

        let genDb = await Genres.findAll({

                                attributes: ['name']
                
                            });

        let genDbName = await genDb.map(g => g.name);

        await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
            .then(async (gen) => {

                let listGenres = [];

                gen.data.results.forEach(async (g) => {

                    if(genDbName.indexOf(g.name) < 0) {

                        listGenres.push(g.name);
                        
                        try {

                            let genderDb = await Genres.create({

                                name: g.name,
            
                            });

                            genderDb = await Genres.findAll({

                                attributes: ['name']
                
                            });

                            let listGenDb = await genderDb.map(g => g.name);

                            return res.status(200).send(listGenDb);
                            
                        } catch (err) {

                            return res.status(401).send({error: err});
                            
                        }

                    } else {
                        
                        return res.status(200).send(genDbName);

                    }
                        
                });

            })

    } catch(e) {

        console.log(e)

    }

};

const postVideogame = async (req, res, next) => {
    // nombre- descripcion- fecha de lanzamiento- rating- varios generos- varias plataformas
    const { name, description, releaseDate, rating, platforms, genres } = req.body;
    console.log( name, description, releaseDate, rating, platforms, genres)
    if(!name || !description || !releaseDate || !rating || !platforms || !genres) return res.status(401).send({error: 'there are empty fields'})

    try {

        let newVideogame = await Videogame.create({

            name,
            description,
            releaseDate,
            rating,
            platforms

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