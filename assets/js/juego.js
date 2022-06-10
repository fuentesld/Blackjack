
// ******************************************
// * variables globales
// ******************************************

let deck = []
const tipos = ['C', 'D', 'H', 'S']
const especiales = ['A', 'J', 'Q', 'K']

let puntosJugador = 0,
    puntosComputadora = 0

// ******************************************
// *Referencias HTML
// ******************************************
btnPedirCarta = document.querySelector('#btnPedirCarta')
btnNuevo = document.querySelector('#btnNuevo')
btnDetener = document.querySelector('#btnDetener')
puntosHTML = document.querySelectorAll('small')
divCartasJugador = document.querySelector('#jugador-cartas')
divCartasComputadora = document.querySelector('#computadora-cartas')

// ******************************************
// * Funciones
// ******************************************

const crearDeck = () => {
  deck = []
  for( i = 2; i <= 10; i++ ) {
    for (let tipo of tipos) {
      deck.push( i + tipo)
    }
  }

  for ( let tipo of tipos ){
    for ( let especial of especiales ){
      deck.push( especial + tipo )
    }
  }
  deck = _.shuffle(deck)
  return deck
}

// ******************************************

const pedirCarta =  ()=> {

  if (deck.length === 0) {
    throw 'No hay cartas en el deck'
  }
  
  return deck.pop()
}

const valorCarta = (carta)=> {
  
  const valorCarta = carta.substr(0, carta.length - 1)
  return !isNaN(valorCarta) ? parseInt(valorCarta) : // La carta es un número
          valorCarta === 'A' ? 11 : 10 // La Carta es un mono
} 

// ******************************************

const turnoComputadora = (puntosMinimos) => {
  btnNuevo.disabled = true

  do {
    const carta = pedirCarta()
    puntosComputadora = puntosComputadora + valorCarta(carta)
    puntosHTML[1].innerText = puntosComputadora

    const imgCarta = document.createElement('img')
    imgCarta.src = `assets/cartas/${carta}.png`
    imgCarta.classList.add('carta')
    divCartasComputadora.append(imgCarta)
    
  } while ((puntosComputadora < puntosMinimos) && puntosMinimos <= 21)
  
  btnNuevo.disabled = false
  btnDetener.disabled = true
  
  setTimeout(()=>{
    if ((puntosComputadora === puntosMinimos)) {
      alert(`Nadie Gana 🥲`)
    } else if ((puntosMinimos === 21) || (puntosComputadora > puntosMinimos)) {
      alert(`Felicidades!! ganaste 😃`)
    } else {
      alert(`Lo siento Perdiste ☠️`)
    }
    

  }, 60)

}

// ******************************
// * INICIO
// ******************************

btnNuevo.disabled = false
btnDetener.disabled = true
btnPedirCarta.disabled = true

btnNuevo.addEventListener('click', ()=>{
  puntosJugador = 0
  puntosHTML[0].innerText = puntosJugador
  btnPedirCarta.disabled = false
  deck = crearDeck()

  puntosHTML[0].innerText = 0
  puntosHTML[1].innerText = 0
  const cartas = document.querySelectorAll('.carta')
  cartas.forEach(carta => {
    carta.remove()
  })

  btnNuevo.disabled = true
  btnPedirCarta.disabled = false
  btnDetener.disabled = false
  
})

btnPedirCarta.addEventListener('click', () => {
  btnNuevo.disabled = true
  const carta = pedirCarta()
  puntosJugador = puntosJugador + valorCarta(carta)
  puntosHTML[0].innerText = puntosJugador

  // desplegamos Carta
  const imgCarta = document.createElement('img')
  imgCarta.src = `assets/cartas/${carta}.png`
  imgCarta.classList.add('carta')
  divCartasJugador.append(imgCarta)

  // console.log(`${carta} ${puntosJugador} assets/cartas/${carta}.png`);

  if (puntosJugador > 21) {
    // console.warn(`Lo siento mucho, ya persite`);
    turnoComputadora(puntosJugador)
    btnPedirCarta.disabled = true
  }
  
})

btnDetener.addEventListener('click', ()=>{
  btnPedirCarta.disabled = true
  btnNuevo.disabled = true
  turnoComputadora(puntosJugador)

})


