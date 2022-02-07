// [x] Kast to terninger
// [x] Legg sammen summene og sjekk summen
// [x] Hvis summen er 7 eller 11, vinner du 
// [x] Hvis summen er 2, 3 eller 12, taper du 
// [ ] Hvis summen er andre tall, lagrer du summen som point og kaster på nytt
// [ ] Hvis summen er point, vinner du

const roundsList = document.getElementById('rounds-list')
const rollBtn = document.getElementById('roll-dice')
const infoBox = document.getElementById('info')
const lostLabel = document.querySelector('.lost')
const wonLabel = document.querySelector('.won')
const wonPercLabel = document.querySelector('.won-perc')
const pointLabel = document.querySelector('.point')
const pointWonLabel = document.querySelector('.point-won')
const pointWonPercLabel = document.querySelector('.point-won-perc')
const snakeEyesLabel = document.querySelector('.snake-eyes')

const ranInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const getPerc = (numA, numB) => { return Math.floor((numA / numB) * 100) }

let d1, d2, diceSum, result

let dicePoint = 0,
    round = 0,
    won = 0, 
    lost = 0,
    point = 0,
    pointWon = 0,
    snakeEyes = 0

const startGame = () => {
  diceSum = rollDice()
  switch (diceSum) {
    case 7: case 11:
      won++
      wonLabel.textContent = won
      roundsList.appendChild(newRow(round, d1, d2, diceSum, 'Du vant'))
      wonPerc = getPerc(won, round)
      wonPercLabel.textContent = wonPerc
      break;
    case 2: case 3: case 12:
      lost++
      lostLabel.textContent = lost
      roundsList.appendChild(newRow(round, d1, d2, diceSum, 'Du tapte'))
      break;
    default:
      point++
      pointLabel.textContent = point
      dicePoint = diceSum
      roundsList.appendChild(newRow(round, d1, d2, diceSum, 'Point satt'))
      rollPoint()
  }
}

let newRow = (round, d1, d2, worksum, result) => {
  let row = document.createElement('div')
  row.classList.add('row')
  row.innerHTML = `
    <div class="round">#${round}</div>
    <div class="dice">${d1}</div>
    <div class="dice">${d2}</div>
    <div class="sum">${worksum}</div>
    <div class="result">${result}</div>
  `
  return row
}

const rollDice = () => {
  round++
	d1 = Math.floor(1 + Math.random() * 6)
	d2 = Math.floor(1 + Math.random() * 6)
	diceSum = d1 + d2
  if (diceSum == 2) {
    snakeEyes++
    snakeEyesLabel.textContent = snakeEyes
  }
	return d1, d2, diceSum
}

const rollPoint = () => {
  d1 = Math.floor(1 + Math.random() * 6)
	d2 = Math.floor(1 + Math.random() * 6)
  diceSum = d1 + d2
  if (diceSum == dicePoint) {
    won++
    wonLabel.textContent = won
    pointWon++
    pointWonLabel.textContent = pointWon
    roundsList.appendChild(newRow(round, d1, d2, diceSum, 'Vant point'))
  } else if (diceSum == 7) {
    lost++
    lostLabel.textContent = lost
    roundsList.appendChild(newRow(round, d1, d2, diceSum, 'Tapte point'))
  } else {
    rollPoint()
  }
  pointWonPerc = getPerc(pointWon, point)
  pointWonPercLabel.textContent = pointWonPerc
}

document.querySelector('.roll').addEventListener('click', () => {
  startGame()
})

document.querySelector('.simulate').addEventListener('click', () => {
  for (let i = 0; i < 10000; i++) {
    startGame()
  }
})