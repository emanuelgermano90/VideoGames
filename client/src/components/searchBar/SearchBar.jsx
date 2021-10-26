import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getVideogame } from '../../actions';
import './SearchBar.css';

export default function SearchBar() {

    const dispatch = useDispatch();
    const [txtSearch, setTxtSearch] = useState('');

    const handleSearch = (e) => {

        setTxtSearch(e.target.value.toLowerCase());

    }

    const handleSubmit = (e) => {

        e.preventDefault();

        dispatch(getVideogame(txtSearch));

        document.getElementById("labelId").value = "";

    }

    return(

        <div>

            <input id='labelId' className='label' type='text' onChange={e => handleSearch(e)} placeholder='Video Juego...' />

            <input className='button' type='submit' onClick={e => handleSubmit(e)} value='Buscar' /> 

        </div>

    )

}