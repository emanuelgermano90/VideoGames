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
		platforms: [],	
		genres: [],

	});
	
	useEffect(() => {

		dispatch(getGamesGenres());

	}, [dispatch]);

	const mayusStringP = (string) => {

		let nomMin = string.toLowerCase()

		let mayus = nomMin.charAt(0).toUpperCase();

		let residuoString = nomMin.slice(1);
		
		return `${mayus}${residuoString}`

	}

	const compDate = (date) => {

		let hoy = new Date();

		let res1 = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();

		if(date > res1) {

			alert('La fecha debe ser menor o igual que el dia de hoy');

			document.getElementById('releaseDate').value = res1;

		}

	}

	const handleChange = (e) => {

		if(e.target.name === 'releaseDate') compDate(e.target.value)

		if(e.target.name === 'name') {

			setInput({

				...input,

				name : mayusStringP(e.target.value)

			});

		} else {

			setInput({

				...input,

				[e.target.name] : e.target.value.toLowerCase()

			});

		}

	}
	
	const handleSelect = (e) => {

		if(e.target.name === 'genres') {

			if(input.genres.length === 0) {

				setInput({

					...input,

					genres: [...input.genres, e.target.value]

				});

			} else {

				if(input.genres.indexOf(e.target.value) < 0) {

					setInput({

						...input,

						genres: [...input.genres, e.target.value]

					});

				}

			}

		} else {

			if(input.platforms.length === 0) {

				setInput({

					...input,

					platforms: [...input.platforms, e.target.value]

				});

			} else {

				if(input.platforms.indexOf(e.target.value) < 0) {

					setInput({

						...input,

						platforms: [...input.platforms, e.target.value]

					});

				}

			}

		}

	}
	
	const handleSubmitCreate = (e) => {

		e.preventDefault();

		dispatch(postGames(input));
		
		alert('Video Games Creado')

		setInput({

			name: '',
			description: '',
			releaseDate: '',
			rating: 0,
			platforms: [],
			genres: [],

		});

		document.getElementsByTagName("input")[0].value = "";
		document.getElementsByTagName("textarea")[0].value = "";
		document.getElementById('rating').value = '';
		document.getElementById('releaseDate').value = '';

	}

	const handleElim = (e, state) => {
		
		if(state === 'genres'){

			setInput({

				...input,

				genres: input.genres.filter((el,i) => el !== e)

			})

		} else {

			setInput({

				...input,

				platforms: input.platforms.filter((el,i) => el !== e)

			})

		}
		
	}

	const controlRating = (e) => {

		if(e.target.value > 5 || e.target.value < 0) {

			alert('El valor de Rating es de entre 0 y 5')

			e.target.value = ''

		}

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
						<input id='releaseDate' name='releaseDate' type='date' onChange={e => handleChange(e)} />

					</div>

					<div className='inputRat' >
						
						<label>Rating:</label>
						<input id='rating' name='rating' type='number' onChange={e => {

							handleChange(e);

							controlRating(e)

						}} />

					</div>

					<div className='listSelect' >{input.genres.map(e => {

						return(

							<div className='cardSelect'>
								
								<li className='curz' onClick={ev => handleElim(e, 'genres')} >x</li>{e} 

							</div>

							)

					})}</div>

					<div className='contentOption'>

						<div className='cont'>
							
							<label>Genres</label>
						
							<select className='select' onChange={e => handleSelect(e)} name='genres' >

								{
									
				                    allGenres?.map( e => {
				                        return (

			                            	<option className='option' value={e} >{e}</option>

				                        )

				                    })

				                }

			                </select>

						</div>

		                <div className='cont'>

		                	<label>Plataforms</label>
		                	
		                	<select className='select' onChange={e => handleSelect(e)} name='plataforms' >

								<option className='option' value='PC' >PC</option>

								<option className='option' value='Mac' >Mac</option>

								<option className='option' value='Linux' >Linux</option>

								<option className='option' value='PlayStation' >PlayStation</option>

								<option className='option' value='Xbox' >Xbox</option>

								<option className='option' value='Nintendo' >Nintendo</option>

								<option className='option' value='Android' >Android</option>

								<option className='option' value='iOS' >iOS</option>

			                </select>

		                </div>

					</div>

					<ul><li className='listSelect' >{input.platforms.map(e => {

						return(

							<div className='cardSelect'>
								
								<li className='curz' onClick={ev => handleElim(e, 'platforms')} >x</li>{e} 

							</div>

							)

					})}</li></ul>

	                <input className='submit' name='submit' type='submit' value='Create Video Games' />

				</form>

			</div>

		</div>

	)

}