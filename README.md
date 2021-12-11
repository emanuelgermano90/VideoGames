
# Proyecto Individual Video Juegos

<p align="right">
  <img height="200" src="./videogame.png" />
</p>

## Objetivos del Proyecto

- Construir una App utlizando React, Redux, Javascript, HTML5, CSS3, Node y Sequelize.
- Aplicar workflow de GIT.

## Enunciado

La idea general es crear una aplicación en la cual se puedan ver los distintos videojuegos disponibles junto con información relevante de los mismos utilizando la api externa [rawg](https://rawg.io/apidocs) y a partir de ella poder, entre otras cosas:

  - Buscar videjuegos
  - Filtrarlos / Ordenarlos
  - Agregar nuevos videojuegos

### Únicos Endpoints/Flags que he utilizado de la api

  - GET https://api.rawg.io/api/games
  - GET https://api.rawg.io/api/games?search={game}
  - GET https://api.rawg.io/api/genres
  - GET https://api.rawg.io/api/games/{id}

#### Frontend

He desarrollado una aplicación de React/Redux que contenga las siguientes pantallas/rutas.

__Pagina inicial__: construccion de una landing page con:
- [ ] Una imagen de fondo representativa al proyecto
- [ ] Botón para ingresar al home (`Ruta principal`), en la cual tienen efecto con CSS de desplazamiento desde los costados hasta su posicion.

![landing](https://user-images.githubusercontent.com/35405320/145692504-a13d6b35-6996-4210-b96c-d3e562448cdd.jpg)

__Ruta principal__: contiene
- [ ] Input de búsqueda para encontrar videojuegos por nombre
- [ ] Área donde se verá el listado de videojuegos que contienen:
  - Imagen
  - Nombre
  - Géneros
- [ ] Select para filtrar por género y por videojuego existente o agregado por nosotros
- [ ] Select para ordenar tanto ascendentemente como descendentemente los videojuegos por orden alfabético y por rating
- [ ] Paginado para ir buscando y mostrando los siguientes videojuegos, 15 juegos por pagina, mostrando los primeros 15 en la primer pagina.

Las imagenes de las Cards tienen efecto con desplazamiento desde abajo hacia arriba y algunos componentes de filtrados como el menu tienen efecto de desplazamiento desde los costados para agregar el toque dinamico a la pagina.

![homeCards](https://user-images.githubusercontent.com/35405320/145692542-867935af-948e-48d7-9c92-0c08887b5263.jpg)

__IMPORTANTE__: Dentro de la Ruta Principal se muestran tanto los videjuegos traidos desde la API como así también los de la base de datos. Debido a que en la API existen alrededor de 500 mil juegos, por cuestiones de performance he decidido tomar la simplificación de obtener y paginar los primeras 100.

En esta parte del Home muestra una imagen de carga que va cambiando por los personajes principales de distintos videogames.

![homeCargando](https://user-images.githubusercontent.com/35405320/145693902-420e5c04-37f7-45ed-834d-4fab23e1dde7.jpg)

En el searchBar incorpore un buscador el cual toma los datos en el input y los envia a la api de la aplicacion para buscar los videojuegos que coinciden con la palabra a buscar.

![buscador](https://user-images.githubusercontent.com/35405320/145693887-fa40f298-a6fe-4563-8cdf-e84541ebc525.jpg)

En las siguientes imagenes podran ver como he agregado Select para firtrar las busquedas tanto "Ascendente, Descendente, Categorias y Rating". Los mismos son efectuados desde los estados de Redux.

![ascDes](https://user-images.githubusercontent.com/35405320/145693879-b7a75285-310e-4c3b-b651-939e1980dc98.jpg)
![cat](https://user-images.githubusercontent.com/35405320/145693890-87f5c5a5-da6e-4ecd-8f55-3598fc4d21d0.jpg)
![rating](https://user-images.githubusercontent.com/35405320/145693891-4d1145ae-b84e-4fff-b144-90220dd8f974.jpg)

__Ruta de detalle de videojuego__: contiene
- [ ] Los campos mostrados en la ruta principal para cada videojuegos (imagen, nombre, y géneros)
- [ ] Descripción
- [ ] Fecha de lanzamiento
- [ ] Rating
- [ ] Plataformas

Los datos utilizados son consultando a la api creada que la misma consulta a la api de [rawg](https://rawg.io/) para que todos ellos sean renderizados. En esta seccion tambien agrege los efectos (desplazamientos con CSS) para mejorar el gusto de la persona que disfruta de la pagina

![detalle](https://user-images.githubusercontent.com/35405320/145692628-01bf61b0-0cd1-4997-bcfd-ab997263ad32.jpg)

__Ruta de creación de videojuegos__: contiene
- [ ] Un formulario __controlado__ con los siguientes campos
  - Nombre
  - Descripción
  - Fecha de lanzamiento
  - Rating
- [ ] Posibilidad de seleccionar/agregar varios géneros
- [ ] Posibilidad de seleccionar/agregar varias plataformas
- [ ] Botón para crear un nuevo videojuego

![formCreateVideoGame](https://user-images.githubusercontent.com/35405320/145694123-d0bec6c5-b76f-4b3d-b873-079386bf6875.jpg)
![createVideoFecha](https://user-images.githubusercontent.com/35405320/145694127-f635c1d1-2fba-4a19-ae1c-68670e9753b7.jpg)

Tanto los Generos como las Plataformas son un Select que al seleccionar una opcion se van agregando en una al lado de otra para visualizar las opciones elegidas ya que tiene la posibilidad de que se agreguen varios Generos y Plataformas al Video Juego a crear.

![createVideoGeneros](https://user-images.githubusercontent.com/35405320/145694129-eaca6394-eca9-4101-b3cd-ae2533351c3a.jpg)
![createVideoPlataformas](https://user-images.githubusercontent.com/35405320/145694130-8470b3b9-4df2-4413-bed6-c20660377156.jpg)

#### Base de datos

El modelo de la base de datos contiene las siguientes entidades:

- [ ] Videojuego con las siguientes propiedades:
  - ID: * UUID para que tenga ID diferentes a los de la api
  - Nombre 
  - Descripción 
  - Fecha de lanzamiento
  - Rating
  - Plataformas 
- [ ] Genero con las siguientes propiedades:
  - ID
  - Nombre

La relación entre ambas entidades son de muchos a muchos ya que un videojuego puede pertenecer a varios géneros en simultaneo y, a su vez, un género puede contener múltiples videojuegos distintos. Un ejemplo sería el juego `Counter Strike` pertenece a los géneros Shooter y Action al mismo tiempo. Pero a su vez existen otros videojuegos considerados como Shooter o como Action.

#### Backend

He desarrollado un servidor en Node/Express con las siguientes rutas:

- [ ] __GET /videogames__:
  - Obtiene un listado de los videojuegos
  - Devuelve solo los datos necesarios para la ruta principal
- [ ] __GET /videogames?name="..."__:
  - Obtiene un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
  - Si no existe ningún videojuego muestra un mensaje adecuado
- [ ] __GET /videogame/{idVideogame}__:
  - Obtiene el detalle de un videojuego en particular
  - Trae solo los datos pedidos en la ruta de detalle de videojuego
  - Incluye los géneros asociados
- [ ] __GET /genres__:
  - Obtiene todos los tipos de géneros de videojuegos posibles
  - En una primera instancia trae los desde rawg y los guarda en su propia base de datos y luego los utilizo desde allí
- [ ] __POST /videogame__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
  - Crea un videojuego en la base de datos
