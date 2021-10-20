import React from "react";
import {Link} from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage(){

    return(

        <div>

            <h1 className='h1Landing' >Bienvenidos</h1>

            <Link to='/home'>

                <button className='butLanding'>Ingresar</button>

            </Link>

        </div>

    )

}