import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { getVideogame } from '../../actions';
import './SearchBar.css';

export default function SearchBar() {

    const dispatch = useDispatch();
    const [txtSearch, setTxtSearch] = useState('');

    const mayusStringP = (string) => {

        let nomMin = string.toLowerCase()

        let mayus = nomMin.charAt(0).toUpperCase();

        let residuoString = nomMin.slice(1);
        
        return `${mayus}${residuoString}`

    }

    const handleSearch = (e) => {

        setTxtSearch(mayusStringP(e.target.value));

    }

    const handleSubmit = (e) => {

        e.preventDefault();

        dispatch(getVideogame(txtSearch));

        document.getElementById("labelId").value = "";

    }

    return(

        <div>

            <input id='labelId' className='label' type='text' onChange={e => handleSearch(e)} placeholder='Video Game...' />

            <input className='button' type='submit' onClick={e => handleSubmit(e)} value='Search' /> 

        </div>

    )

}