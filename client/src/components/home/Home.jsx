import React from "react";
import SearchBar from "../searchBar/SearchBar";
// imput de busqueda para videojuegos por nombre
// area para el listado de videojuegos (imagen, nombre, generos)
// boton/opciones filtre por genero o videojuego existente o 
//                                  que lo pueda agregar
// boton/opciones ordenar ascendente o descendente (afabeticamente o rating)
// paginado de lista de 15 videojuegos por pagina
export default function Home() {

    return(

        <div>

            <h1>Home!!</h1>

            <SearchBar />

        </div>

    )

}