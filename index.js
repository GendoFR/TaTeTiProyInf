/*creamos las variables constantes de X y de O para los turnos*/
const x = "X";
const o = "O";
let estaJuego = "1" /*Variable para el turno del jugador*/
const modal = document.querySelector("dialog") /*Le asignamos a la variable modal todo documento que tenga la calificación dialog*/
const texModal = modal.querySelector("h2")


/*creamos los cuadrados*/
const cuadrados = document.querySelectorAll(".cuadrado");
const tabla = Array.from(cuadrados).map(cuadrado => cuadrado.innerText)

cuadrados.forEach((cuadrado,i)=> { /*Recorremos todo los cuadrados y les añadimos un evento al clickear*/
    cuadrado.addEventListener("click", ()=>{
        if(estaJuego === "P") return; /* Si el juego esta pausado no podes clickear pa*/
        if(cuadrado.textContent !== "") return; /* Si el contenido del cuadrado es diferente a vacio, osea, hay algo, no podes hacer nada sobre ese cuadrado*/
        cuadrado.innerText= estaJuego === "1" ? x : o; /*Verificamos el estado del Juego a través de la variable estaJuego, luego llenamos el cuadrado con x o O respectivamente*/ 
        const ganador = CheckGanador()
        if(typeof ganador === "object") { /*Osea que no es falso o no es la palabra empate*/
            GanarJugador(ganador);
            return
            }
        if(ganador === "empate"){
            terminarJuego("Empate")
        }
        estaJuego = estaJuego === "1" ? "2" : "1" /* Cambia el "Turno" del juego, para variar entre O y X*/
    })

})

function CheckGanador(){
    const tabla = Array.from(cuadrados).map(cuadrado => cuadrado.innerText) 
    /*Creamos un array desde los valores de cuadrados, ya que tecnicamente "cuadrados" en sí no es un array, si no algo parecido. Luego usamos un map, que funciona similar al forEach, con un return. Luego llenamos la tabla con los resultados de map, que devuelve los contenidos de cada cuadrado */
    /*Esto lo hacemos porque trabajar con los objetos HTML no es muy eficiente, es mejor trabajar con objetos simples de entender como arrays.*/
    /* Reviso las Horizontales*/
    for (let i = 0; i <= 9; i += 3) {
        if( tabla[i] &&
            tabla[i] === tabla[i+1] && 
            tabla[i] === tabla[i+2]){
                return [i, i+1, i+2];

        } /*Reviso que todas las posiciones de la grilla horizontales (i, i+1, e i+2) son iguales, para ver si hay una raya*/
    }
    /* Reviso las verticales*/
    for(let i = 0; i <= 9; i++){
        if( tabla[i] &&
            tabla[i] === tabla[i+3] &&
            tabla[i] === tabla[i+6]){
                return [i, i+3, i+6];
            }
    } /*Reviso la posiciónde i + 3 , ya que no importa la posición en la grilla que estemos (Izquierda, derecha, o medio), si le sumo 3, la posición va a estar DIRECTAMENTE abajo de la primera, permitiendo una lectura "vertical"*/
    /* Reviso las diagonales*/
    if( tabla[0] &&
        tabla[0] === tabla[4] &&
        tabla[0] === tabla[8]){
            return [0, 4, 8];
        }
    if( tabla[2] &&
        tabla[2] === tabla[4] &&
        tabla[2] === tabla[6]){
            return [2, 4, 6];
        }

    if(tabla.includes("")) return false; /*Medio raro, pero acá lo que se hace es que si nuestro array de tabla incluye un string que es "" (Osea vacio), la funcion termina. Esto lo que hace es permitir saber si aún hay posiciones a jugar en el tablero, osea, el juego todavia no termino.*/
    return "empate";
}

function GanarJugador(posWin){
    posWin.forEach(posicion => { /*Para cada una de estas posiciones ganadoras, el codigo selecciona los cuadrados en los q se ganó, y les activa la clase "Ganador"*/
        cuadrados[posicion].classList.toggle("ganador", true);
    })
    terminarJuego("Ganó el Jugador " + estaJuego);
    estaJuego = "P"
    /*Toda esta función se encarga de hacer que un jugador gane. En el forEach, lo que hacemos es revisar la posición de los "cuadrados" ganadores y "activarles" la clase ganador, que los pinta de verde.*/
}

function terminarJuego(texto){
    texModal.innerText =texto;
    modal.showModal();
}

modal.querySelector("button").addEventListener("click",() =>{
    cuadrados.forEach(cuadrado => {
        cuadrado.textContent = "";
        cuadrado.classList.toggle("ganador", false) /*Reinicia la clase de todos los cuadrados*/
        modal.close();
        estaJuego = "1"
    })
})