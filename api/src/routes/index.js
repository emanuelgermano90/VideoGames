const { Router } = require('express');
const { getVideogame, getVideogameName, getVideogameId, getGenres, postVideogame } = require('./controller.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');




const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// router.get('/', (req, res, next) => { res.status(200).send({data: 'hola'}) })

// router.get('/videogames', getVideogame);

router.get('/videogames?name', (req, res) => {

    res.status(200).send({data: 'recibido'})

});

// router.get('/videogame/{idVideogame}', getVideogameId);

// router.get('/genres', getGenres);

// router.post('/videogame', postVideogame);


module.exports = router;
