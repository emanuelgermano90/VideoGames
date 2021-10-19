import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getListVideogames, getGamesId, getGamesGenres, getSortRating } from '../../actions';
import { Link } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import Card from "../card/Card";
import Paginado from "../pagination/Pagination";
import './Home.css';
// imput de busqueda para videojuegos por nombre
// area para el listado de videojuegos (imagen, nombre, generos)
// boton/opciones filtre por genero o videojuego existente o 
//                                  agregado por nosotros
// boton/opciones ordenar ascendente o descendente (afabeticamente y rating)
// paginado de lista de 15 videojuegos por pagina
export default function Home() {

    const dispatch = useDispatch();
    const allVideoGames = useSelector(state => state.videogames);
    const [currentPage, setCurrentPage] = useState(1);
    const [videogameForPage, setVideogameForPage] = useState(15);
    const lastVideogameIndex = currentPage * videogameForPage;
    const firstVideogameIndex = lastVideogameIndex - videogameForPage;
    const currentVideogame = allVideoGames.slice(firstVideogameIndex, lastVideogameIndex);
    const allGenres = useSelector(state => state.allGenres);

    // console.log(gameDetail);
    
    const pagination = (pageNum) => {

        setCurrentPage(pageNum)

    }

    useEffect(() => {

        dispatch(getListVideogames());

    },[dispatch]);

    const handleClick = e =>{

        e.preventDefault();

        dispatch(getListVideogames());

    }

    useEffect(() => {

        dispatch(getGamesGenres())

    },[dispatch])

    const handleSort = (e) => {

        dispatch(getSortRating(e.target.value))

    }

    return(

        <div className='homeVG'>

            <h1>Video Juegos</h1>

            <SearchBar />

            <div>

                <select>

                    <option>Ascendente</option>
                    <option>Descendente</option>

                </select>

                <select>

                    {

                        allGenres.forEach(e => {

                            <option>{e}</option>
                            
                        })

                    }
                    <option>Video Juegos Existente</option>
                    <option>Video Juegos Agregados</option>

                </select>

                <select onChange={e => handleSort(e)} >

                    <option value='alfa' >Alfabeticamente</option>
                    <option value='rating' >Rating</option>

                </select>

                <button onClick={e => handleClick(e)} >Actualizar Lista</button>

            </div>
            
            <div>
                
                <Paginado videogameForPage={videogameForPage} allVideoGames={allVideoGames.length} pagination={pagination} />

            </div>

            <div className='listadoVG'>

                {

                    currentVideogame?.map( e => {

                        return (

                            <div>
                                {/* onClick={() => dispatch(getGamesId(e.id))} */}
                                <Link to={`/home/${e.id}`} onClick={() => dispatch(getGamesId(e.id))} >
                                    
                                    <Card img={e.image} name={e.name} genres={e.genres.join(' ')} key={e.id} />

                                </Link>

                            </div>

                        )

                    })

                }

            </div>

        </div>

    )

}