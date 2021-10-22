import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGamesGenres, postGames } from '../../actions';
import Nav from '../nav/Nav';
import './CreateVideoGame.css'

export default function CreateVideoGame() {

	const dispatch = useDispatch();
	const allGenres = useSelector(state => state.allGenres);
	const [input, setInput] = useState({

		name: '',
		description: '',
		releaseDate: '',
		rating: 0,
		plataforms: [],	
		genres: [],

	});
	
	useEffect(() => {

		dispatch(getGamesGenres());

	}, [dispatch]);

	const handleChange = (e) => {

		setInput({

			...input,

			[e.target.name] : e.target.value

		});

	}
	
	const handleCheck = (e) => {

		if(e.target.checked) {

			if(e.target.name === 'genres') {

				setInput({

					...input,

					genres: [...input.genres, e.target.value]

				});

			} else {

				setInput({

					...input,

					plataforms: [...input.plataforms, e.target.value]

				});

			}

		} else {

			let g = e.target.value

			let i = input.genres.indexOf(g);

			setInput({

				...input,

				genres: input.genres.splice(i, 1)

			});
			console.log(input.genres.splice(i, 1))
		}

	}
	console.log(input)
	const handleSubmitCreate = (e) => {

		e.preventDefault();

		dispatch(postGames(input));

		alert('Video Games Creado')

		setInput({

			name: '',
			description: '',
			releaseDate: '',
			rating: 0,
			plataforms: [],
			genres: [],

		});

	}

	return(

		<div className='CreateVideoGameContent' >
			
			<h1>Create Video Game</h1>

			<Nav />

			<div className='contentForm'>
				
				<form onSubmit={e => handleSubmitCreate(e)} >
				
					<div className='inputName'>
						
						<label>Name:</label>
						<input name='name' type='text' onChange={e => handleChange(e)} />

					</div>

					<div className='inputDes' >
						
						<label>Description:</label>
						<textarea name='description' onChange={e => handleChange(e)} />

					</div>

					<div className='inputDate' >
						
						<label>Release Date:</label>
						<input name='releaseDate' type='date' onChange={e => handleChange(e)} />

					</div>

					<div className='inputRat' >
						
						<label>Rating:</label>
						<input name='rating' type='number' onChange={e => handleChange(e)} />

					</div>

					<div className='contentOption'>

						<div className='cont'>
							
							<label>Genres</label>
						
							<select className='select' onChange={e => handleCheck(e)} >

								{
									
				                    allGenres?.map( e => {
				                        return (

			                            	<option className='option' name='genres' value={e} >{e}</option>

				                        )

				                    })

				                }

			                </select>

						</div>

		                <div className='cont'>

		                	<label>Plataforms</label>
		                	
		                	<select className='select' onChange={e => handleCheck(e)} >

								<option className='option' name='plataforms' value='PC' >PC</option>

								<option className='option' name='plataforms' value='Mac' >Mac</option>

								<option className='option' name='plataforms' value='Linux' >Linux</option>

								<option className='option' name='plataforms' value='PlayStation' >PlayStation</option>

								<option className='option' name='plataforms' value='Xbox' >Xbox</option>

								<option className='option' name='plataforms' value='Nintendo' >Nintendo</option>

								<option className='option' name='plataforms' value='Android' >Android</option>

								<option className='option' name='plataforms' value='iOS' >iOS</option>

			                </select>

		                </div>

					</div>

	                <input className='submit' name='submit' type='submit' value='Create Video Games' />

				</form>

			</div>

		</div>

	)

}