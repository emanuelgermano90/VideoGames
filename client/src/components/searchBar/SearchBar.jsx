import React from "react";
import './SearchBar.css';

export default function SearchBar() {

    return(

        <div>

            <form>

                <input className='label' type='text' placeholder='Video Juego...' />
                <input className='button' type='submit' value='Buscar' />

            </form>

        </div>

    )

}