const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Genres, Videogame } = require('../db.js');

const getVideogame = async (req, res, next) => { 

    const { name } = req.query;

    if(name) {

        await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`)
        .then(async game => {

            let resGameDb = await Videogame.findAll({
        
                where: {
                    name: name
                },
    
                include:{
    
                    model: Genres,
                    attributes: ['name'],
                    through: {
    
                        attributes: [],
    
                    },
    
                }
        
            }) 
            
            let gameFind = resGameDb[0];
            
            let genresOb = gameFind?.genres.map(genres => genres.name);
            
            let gameDbOb = {  
                    
                    name: gameFind?.name,
                    description: gameFind?.description,
                    releaseDate: gameFind?.released,
                    rating: gameFind?.rating,
                    plataform: gameFind?.platforms,
                    genres: genresOb,

                }


            let listGame = [];

            if(game.data.results.length === 0 && gameDbOb.name === undefined) return res.status(404).send({data: 'video game not found'}); // si el length es 0 es porque no existe ese nombre

            
            let gameName = [];

            if(gameDbOb.name != undefined) {  //gameDbOb.name === undefined boolean

                gameName.push(gameDbOb)

                for (let i = 0; i < 14; i++) {

                    const element = game.data.results[i];
                    
                    listGame.push(element);
                    
                }

            } else {

                for (let i = 0; i < 15; i++) {

                    const element = game.data.results[i];
                    
                    listGame.push(element);
                    
                }

            }

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

        let resGameDb = await Videogame.findAll({
        
                include:{
    
                    model: Genres,
                    attributes: ['name'],
                    through: {
    
                        attributes: [],
    
                    },
    
                }
        
            }) 

        let gameFind = resGameDb[0];

        let genresOb = gameFind.genres.map(genres => genres.name);

        allGames.push({  
                    
                    name: gameFind.name,
                    description: gameFind.description,
                    releaseDate: gameFind.released,
                    rating: gameFind.rating,
                    plataform: gameFind.platforms,
                    genres: genresOb,

                })
        
        return res.status(200).send(allGames);

    }

    

};

const getVideogameId = async (req, res, next) => {
    
    const { idVideogame } = req.params;
    
    if(!isNaN(idVideogame)){

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

    } else {

        let resGameDb = await Videogame.findAll({
        
                where: {
                    id: idVideogame
                },
    
                include:{
    
                    model: Genres,
                    attributes: ['name'],
                    through: {
    
                        attributes: [],
    
                    },
    
                }
        
            }) 

        let gameFind = resGameDb[0];

        let genresOb = gameFind.genres.map(genres => genres.name);

        return res.status(200).send({  
                    
                    name: gameFind.name,
                    description: gameFind.description,
                    releaseDate: gameFind.released,
                    rating: gameFind.rating,
                    plataform: gameFind.platforms,
                    genres: genresOb,

                });

    }
    
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
                        
                        return res.status(200).json(listGenDb);

                });

            })
            .catch(err => {

                return res.sendStatus(400);

            })

};

const postVideogame = async (req, res, next) => {
    
    const { name, description, releaseDate, rating, platforms, genres } = req.body
    
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