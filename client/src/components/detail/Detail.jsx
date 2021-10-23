import React from "react";
import { useSelector } from "react-redux";
import Nav from '../nav/Nav'
import './Detail.css';

export default function Detail() {
    
    const { name, image, genres, description, releaseDate, rating, plataform } = useSelector(state => state.gameDetail);
    
    return(

        <>

            <Nav />

            <div className='contDetail'>

                <div className='subContDetail' >

                    <h1>{name}</h1>

                    <img className='imgDetail' src={image} alt='imagen de muestra' />

                    <div className='textDetail' >

                        <h3 className='h3Detail' >Fecha de Lanzamiento: {releaseDate}</h3>

                        <h3 className='h3Detail' >Genero: {genres}</h3>

                        <h3 className='h3Detail' >Clasificacion: {rating}</h3>

                        <h3 className='h3Detail' >Plataformas: {plataform}</h3>

                        <p id='pDetail' dangerouslySetInnerHTML= {{__html: description}} ></p>

                    </div>

                </div>

            </div>

        </>

    )
    
}

