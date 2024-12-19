# I) Instrucciones para clonar el repositorio

Ejecutamos el siguiente codigo en orden

```powershell
$ git clone https://github.com/humbertojacobm/reactjs-battleship.git
$ cd reactjs-battleship
$ npm install
$ npm run start
```

**Al intentar correr el repositorio, en caso la compilación muestre un error de finalización de linea con CRLF**.

Ejecuta el siguiente codigo:

```powershell
npx eslint --fix src/
```

# II) ¿De qué se trata la aplicación?

Es una aplicación que simula el combate de batalla de barcos contra la misma aplicación.
La aplicación distribuye los barcos de diferentes tamaños en una matriz y permite que el usuario dispare hacia un bloque de la matriz con un click. La computadora revela si allí habia o no un barco.
Se termina el juego al culminar el numero de intentos o destruir todos los barcos.

---

## II.1) Setting

Esta la pagina donde inicia todo. Aqui debemos elegir el nivel del juego (facil, intermedio o dificil).

![setting](/readme-assets/setting.png)

---

## II.2) Game

Una vez elegido el nivel del juego, la aplicación nos lleva a esta pagina donde ya procemos a jugar.

![game](/readme-assets/game.png)

---

## II.3) Records

Es la pagina donde tenemos el registro de los juegos realizados hasta el momento. Si es verdad no tenemos base de datos, pero tenemos manejo de estados :).

![game](/readme-assets/records.png)

---

## II.4) Demostración

Puede apreciar el video de demostración en este link
[YouTube] (https://youtu.be/x3PVCVqz0GY “Youtube”)

Aqui dejamos el video en gif
![video](/readme-assets/demo-ships-01.gif)

## II.5) Applicación

<h2>
Puedes probar la aplicación en vivo en esta pagina [application](https://humbertojacobm.github.io/reactjs-battleship/).
</h2>

---

# III) ¿Que esructura de proyectos estamos proponiendo?

![structure](/readme-assets/project-structure.png)

Podemos apreciar que usaremos una estructura donde separamos los elementos container y los elementos components (smart vs dummy).

## III.1) Container

Es un tipo donde estamos guardando la logica principal del feature, manejamos estados, manejamos efectos (si estamos usando estados de reactjs :), manejamos acceso al contexto principal.
Tenemos logica importante como la generación de los barcos de batalla en la matriz. También se tienen las rutinas principales como los disparos a los barcos y la finalización del juego.

## III.2) Components

Es un tipo de elementos donde tratamos de solo mostrar la información, la logica que se encuetra alli solo es para que la información sea apreciada por el usuario. Podemos tener algun estado pero no debe tener una logica compleja.

---

# IV) ¿Como mostraremos la matriz donde los barcos se ocultarán?

Si bien es cierto se podria usar flexbox para simular que tenemos una grilla, en este caso vemos que es mas conveniente utilizar **CSS grid** para tener la grilla real y poderla escalar a un diseño mas complejo de ser necesario. Ya veremos mas adelante que nuestro set de controles react se basarán en React Bootstrap layout pero pueden convivir sin ningun problema.

```CSS
.ocean-container {
  display: grid;
  grid-template: repeat(10, 1fr) / repeat(10, 1fr);
}
```

---

# V) ¿Como tener un proyecto que fomente una estructura estandarizada, codigo limpio, mismo estilo de codigo en todo el equipo y que pueda seguir escalando en componentes y complejidad?

Para resolver la pregunta principal, pasaremos a responder diferentes problemas planteados.

## V.1) ¿Como hacemos para que el equipo siga las mejores practices de javascript y el estilo de codigo sea estandar y no dependa del criterio del developer?

Para asegurar que las mejores practicas se den, recomendamos usar una herramienta que nos invite y señale cuando rompemos alguna sugerencia de las mejores practicas de javascript. Podemos usar **ESLINT** para tal caso.
Pero a su vez, queremos que el estilo de codigo sea agradable para el developer y que este sea normalizado para todo el equipo, para eso **PRETTIER** puede ayudarnos tambien.

Entonces para resolver ambos casos recomendamos seguir una guia que nos permite configurar eslint y prettier en nuestro ambiente de desarrollo. Esta es la guia que seguiremos.
[eslint-prettier](https://medium.com/how-to-react/config-eslint-and-prettier-in-visual-studio-code-for-react-js-development-97bb2236b31a).

## V.2) ¿Como resolvemos la necesidad de seguir un estilo de colores, tamaños y clases para toda los controles de la aplicación?

Para asegurar que esto se de, tenemos que usar react components ya creados para alerts, tables, navs, forms y más. De las opciones que hay en el mercado podriamos usar **Material-UI** o **React Bootstrap**.

Para nuestro caso usaremos [React Bootstrap](https://react-bootstrap.github.io/) para aprovechar la ventaja de usar las clases mas populares de bootstrap y su manejo de grids.

En nuestro proyecto usaremos los elemenos react de **Row, Column, Alert, Table, Button y Form**.

## V.3) ¿Como resolvemos la generación de rutas en la aplicación de tal forma que permite escalar en la verificación de permisos y seguir siendo un SPA?

Podemos apoyarnos en la libreria de react router [React Router](https://reactrouter.com/).
Esta librería con sus elementos Link y Route nos permite crear links y rutas que funcionan en un **SPA** y que permite escalar para agregar logica de verificación de permisos.

## V.4) ¿Como aseguramos que los componentes react se usen de la forma correcta sin omitir propiedades importantes que se deben usar en cada elemento?

La dependencia de PropTypes [PropTypes](https://es.reactjs.org/docs/typechecking-with-proptypes.html) nos permite definir que propiedades son obligatorias como que de que tipo son, y para que se puedan respetar.

## V.5) Despues de cada disparo necesitamos notificar al usuario el resultado de sus disparo sin necesidad de frenar la interación con la aplicación

Para este caso ya tenemos los controles Alert de React Bootstrap, pero una forma de escalar estas notificaciones, es que estas se encuentren disponibles fuera
del componente game para asi poder usar el mismo componente notificación en otros futuros componentes.

Para poder empujar una nueva notificación al sistema se podria implementar un contexto, pero vemos que es interesante poder usar observables para esto tambien,
dejando libre el contexto para otras variables que vamos a usar mas adelante.

Para lograr usar observables en react podemos usar la libreria **Rxjs**.

---

# VI.5) La aplicación necesita mostrar el resultado de cada juego en otra ruta. ¿Cómo pasamos esta información entre componentes?

Existen varias opciones. Como los componentes **Record** y **Game** estan en ramas separadas, estas no pueden pasar los valores por propiedades.
Tampoco seria aconsejable pasar todos los valores como parametros de las rutas, pues son muchos valores y nuestra aplicación por ser demo no
cuenta con base datos.

Una posible alternativa seria manejar estados. Una buena opción tradicional seria usar Redux, pero ya en la version actual de Reactjs ya contamos con estados de reactjs, y podemos crear nuestro propio centro de la verdad con la combinación de algunos componentes: **useReducer, createContext y useContext**.

Con estos elementos de react podemos crear un contexto que permitirá acceder a su estado por medio del useContext y modificar este estado por medio de las acciones generadas en useReducer.

Revisar el archivo **GlobalReducer.js** que tenemos como ejemplo.

```Javascript
const GlobalContext = createContext({});

const GlobalContextProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadGames = (games) => {
    dispatch({ payload: games, type: "LOAD_DATA_GAMES" });
  };

  return (
    <GlobalContext.Provider
      value={{
        loadGames,
        globalState: state,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
```

---

# VII) Conclusiones

1. Reactjs es una poderosa libreria que nos facilita el poder crear aplicaciones que puedan escalar en componentes, dependencias y logica. Si bien es cierto no es un framework, nos da la libertad de poder crear nuestra estructura de proyecto que mas se adapte a las necesidades del equipo de desarrollo.

2. Es importante elegir correctamente con que set de controles empezará la aplicación, pues los sets de controles estan amarrados a estilos de codigo y traen sugerencias para elegir los templates. Por ejemplo si deseamos usar Material-UI (**estiliza los componentes por medio de objetos javascript como makeStyle**) como set de controles, debemos de dar preferencia a los templates de proyecto que usen este set de controles para asi facilitar el uso al equipo de desarrollo.

3. La estructura de archivos es importante pues asi podemos separar los elementos complejos de los que no deben serlo. Es una forma de romper tambien la complejidad de componentes que crecen de sobremanera haciendo dificil la labor de mantenimiento, como lo es actualmente en aplicacione legadas.

4. Para asegurar la mantenibilidad del codigo en el tiempo, es importante que el equipo implemente las mejores practicas y estilo de codigo en javascript que se tienen, pero para asegurar esto es conveniente hacer que la aplicación utilice una herramiento de linteo donde podamos elegir las reglas que respetaremos y una guia de estilo de codigo como prettier para asegurar que el codigo sea legible en toda la aplicación sin depender necesariamente del developer.

5. En aplicaciones con gran cantidad de componentes donde la interación entre estos es importante y la informacion que se transfiere entre ellos es constante, se sugiere contemplar el uso de manejo de estados, el uso combinado de createContext, useReducer y useContext, nos ayuda a crear nuestro propio centro de la verdad en incluso crear otros centros de la verdad mas enfocados a algun feature en especial para dividir la complejidad y lograr la responsabilidad unica por componente.

# VIII) Puntos de mejora

1. La aplicación solo es una demostración para mostrar el uso de las librerías mas populares en reactjs. Pero sientete libre de sugerirme como mejorarla incluso te animo a mandarme tu Pull Request.

2. Esta pendiente el incluir un tema que sea compatible con React-Bootstrap.

3. Seria buena idea tener una pagina de login donde el usuario pueda poner algunos datos como su nombre, edad y otros mas.

4. Tenemos un defecto con la finalización de linea que esta usando CRLF lo cual puede romper la compilación de eslint pero que por el momento lo estamos fixeando con el flag --fix.

Muchas gracias por revisar esta demo.
