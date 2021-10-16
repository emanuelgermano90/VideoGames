import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getListVideogames } from '../../actions';
import { Link } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import Card from "../card/Card";
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

    useEffect(() => {

        dispatch(getListVideogames());

    },[dispatch]);

    const handleClick = e =>{

        e.preventDefault();

        dispatch(getListVideogames());

    }

    return(

        <div className='homeVG'>

            <h1>Video Juegos</h1>

            <SearchBar />

            <div>

                <select>

                    <option>Generos</option>
                    <option>Video Juegos Existente</option>
                    <option>Video Juegos Agregados</option>

                </select>

                <select>

                    <option>Ascendente</option>
                    <option>Descendente</option>

                </select>

                <select>

                    <option>Alfabeticamente</option>
                    <option>Rating</option>

                </select>

                <button onClick={e => handleClick(e)} >Actualizar Lista</button>

            </div>

            <div className='listadoVG'>

                {

                    allVideoGames?.map( e => {

                        return (

                            <div>

                                <Link to={`/home/${e.id}`}>
                                    
                                    <Card img={e.image} name={e.name} genres={e.genres} key={e.id} />

                                </Link>

                            </div>

                        )

                    })

                }

            </div>

        </div>

    )

}