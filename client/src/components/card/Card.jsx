import React from "react";
import './Card.css';
// area para el listado de videojuegos (imagen, nombre, generos)
export default function Card({img, name, genres}) {

    return(

        <div className='cardVG'>

            <img src={img} alt='img Video Games' />

            <h3>{name}</h3>

            <h4>{genres}</h4>

        </div>

    )

}