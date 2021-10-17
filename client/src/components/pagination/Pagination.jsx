import React from 'react';
import './Pagination.css';

export default function Paginado({videogameForPage, allVideoGames, pagination}) {
    
    const pageNum = [];

    for (let i = 0; i <= Math.ceil(allVideoGames/videogameForPage); i++) {

        pageNum.push(i+1);
        
    }
    
    return(

        <div>

            <ul className='pagination'>

                {

                    pageNum?.map(num => (

                        <li className='numPagination' onClick={() => pagination(num)} key={num}>{num}</li>

                    ))

                }

            </ul>

        </div>

    )

}