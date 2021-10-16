import React from "react";
import {Link} from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage(){

    return(

        <div className='landingVG'>

            <h1>Bienvenido al Home</h1>

            <Link to='/home'>

                <button>Ingresar al Home</button>

            </Link>

        </div>

    )

}