import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getListVideogames, getGamesId, getGamesGenres, filterGenres, getSortRating, getOrder } from '../../actions';
import { Link } from "react-router-dom";
import Nav from '../nav/Nav';
import SearchBar from "../searchBar/SearchBar";
import Card from "../card/Card";
import Paginado from "../pagination/Pagination";
import sin_img from "../../images/Sin_datos.jpg";
import loading from '../../images/1.gif';
import './Home.css';

export default function Home() {

    const dispatch = useDispatch();
    const allVideoGames = useSelector(state => state.videogames);
    const [order, setOrder] = useState('');
    const [currentPage, setCurrentPage] = useState(1);  // paginado
    const [videogameForPage, setVideogameForPage] = useState(15);   // paginado
    const lastVideogameIndex = currentPage * videogameForPage;  // paginado
    const firstVideogameIndex = lastVideogameIndex - videogameForPage;  // paginado
    const currentVideogame = allVideoGames.slice(firstVideogameIndex, lastVideogameIndex);  // paginado
    const allGenres = useSelector(state => state.allGenres); // traigo los generos

    const pagination = (pageNum) => {

        setCurrentPage(pageNum)

    }

    useEffect(() => { // para montar la lista de juegos y los generos

        dispatch(getListVideogames());
        dispatch(getGamesGenres());

    },[dispatch]);

    const handleClick = e =>{

        e.preventDefault();

        dispatch(getListVideogames());

    }

    const handleFilter = (e) => {

        e.preventDefault();

        dispatch(filterGenres(e.target.value));

    }

    const handleSort = (e) => {

        e.preventDefault();

        dispatch(getSortRating(e.target.value));

        setOrder(`Order ${e.target.value}`);

    }

    const handleOrder = (e) => {

        e.preventDefault();

        dispatch(getOrder(e.target.value));

        setOrder(`Order ${e.target.value}`)

    }

    return(

        <div className='homeVG'>

            <h1>Video Games</h1>

            <Nav />

            <SearchBar />

            <div className='contentSelect'>

                <select className='selectStyle' onChange={e => handleOrder(e)} >

                    <option value='asc' >Ascendente</option>
                    <option value='des' >Descendente</option>

                </select>

                <select className='selectStyle' onChange={e => handleFilter(e)} >
                    <option value='all' >All Genres</option>
                    {

                        allGenres?.map( (e, i) => {
                            return (

                                <option value={e} key={i} >{e}</option>

                            )

                        })

                    }
                    <option value='existente' >Existing Video Game</option>
                    <option value='agregados' >Video Game Added</option>

                </select>

                <select className='selectStyle' onChange={e => handleSort(e)} >

                    <option value='alfa' >Alphabetically</option>
                    <option value='rating' >Rating</option>

                </select>

                <button className='buttomHome' onClick={e => handleClick(e)} >Update List</button>

            </div>
            
            <div>
                
                <Paginado videogameForPage={videogameForPage} allVideoGames={allVideoGames.length} pagination={pagination} key={videogameForPage} />

            </div>

            {

                allVideoGames.length === 0 ? <img className='imgLoading' src={loading} alt='imagen loading' /> :

                <div className='listadoVG'>

                    {

                        currentVideogame?.map( e => {
                            
                            let genDis = [];

                            e.genres.map(e => {

                                if(typeof e === 'object') {

                                    genDis.push(e.name)

                                } else {

                                    genDis.push(e)
                                }

                            })

                            return (

                                <div className='imgContent' key={e.id} >
                                    
                                    <Link to={`/home/${e.id}`} onClick={() => dispatch(getGamesId(e.id))} key={e.id} >
                                        
                                        <Card img={e.image?e.image:sin_img} name={e.name} genres={genDis.join(' ')} key={e.id} />

                                    </Link>

                                </div>

                            )
                            
                        })

                    }

                </div>

            }

            <div>
                
                <Paginado videogameForPage={videogameForPage} allVideoGames={allVideoGames.length} pagination={pagination} key={videogameForPage} />

            </div>

        </div>

    )

}