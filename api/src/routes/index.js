const { Router } = require('express');
const { getVideogame, getVideogameId, getGenres, postVideogame } = require('./controller.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');




const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames', getVideogame);

router.get('/videogame/:idVideogame', getVideogameId);

router.get('/genres', getGenres);

router.post('/videogame', postVideogame);


module.exports = router;
