import React from "react";
import { Link } from "react-router-dom";
import './Nav.css'

export default function Nav() {

	return(

		<div className='navContent'>
			
			<ul>
				
				<Link to='/home' ><li>Home</li></Link>

				<Link to='/createVideoGame' ><li>Create Video Games</li></Link>

			</ul>

		</div>

	)

}