document.addEventListener('DOMContentLoaded', () => {
  const gridDisplay = document.querySelector('.grid-container')
  const scoreDisplay = document.getElementById('score')
  const newGameButton = document.getElementById('new-game')
  const width = 4
  let squares = []
  let score = 0

  // Create the board
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      let square = document.createElement('div')
      square.classList.add('grid')
      square.setAttribute('data-value', 0)
      square.innerHTML = 0
      gridDisplay.appendChild(square)
      squares.push(square)
    }
    generate()
    generate()
  }

  // Generate a number randomly
  function generate() {
    let randomNumber = Math.floor(Math.random() * squares.length)
    if (squares[randomNumber].innerHTML == 0) {
      squares[randomNumber].innerHTML = 2
      squares[randomNumber].setAttribute('data-value', 2)
      checkForGameOver()
    } else generate()
  }

  // Swipe right
  function moveRight() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML
        let totalTwo = squares[i + 1].innerHTML
        let totalThree = squares[i + 2].innerHTML
        let totalFour = squares[i + 3].innerHTML
        let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

        let filteredRow = row.filter(num => num)
        let missing = 4 - filteredRow.length
        let zeros = Array(missing).fill(0)
        let newRow = zeros.concat(filteredRow)

        squares[i].innerHTML = newRow[0]
        squares[i + 1].innerHTML = newRow[1]
        squares[i + 2].innerHTML = newRow[2]
        squares[i + 3].innerHTML = newRow[3]

        squares[i].setAttribute('data-value', newRow[0])
        squares[i + 1].setAttribute('data-value', newRow[1])
        squares[i + 2].setAttribute('data-value', newRow[2])
        squares[i + 3].setAttribute('data-value', newRow[3])
      }
    }
  }

  // Swipe left
  function moveLeft() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML
        let totalTwo = squares[i + 1].innerHTML
        let totalThree = squares[i + 2].innerHTML
        let totalFour = squares[i + 3].innerHTML
        let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

        let filteredRow = row.filter(num => num)
        let missing = 4 - filteredRow.length
        let zeros = Array(missing).fill(0)
        let newRow = filteredRow.concat(zeros)

        squares[i].innerHTML = newRow[0]
        squares[i + 1].innerHTML = newRow[1]
        squares[i + 2].innerHTML = newRow[2]
        squares[i + 3].innerHTML = newRow[3]

        squares[i].setAttribute('data-value', newRow[0])
        squares[i + 1].setAttribute('data-value', newRow[1])
        squares[i + 2].setAttribute('data-value', newRow[2])
        squares[i + 3].setAttribute('data-value', newRow[3])
      }
    }
  }

  // Swipe down
  function moveDown() {
    for (let i = 0; i < 4; i++) {
      let totalOne = squares[i].innerHTML
      let totalTwo = squares[i + width].innerHTML
      let totalThree = squares[i + (width * 2)].innerHTML
      let totalFour = squares[i + (width * 3)].innerHTML
      let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

      let filteredColumn = column.filter(num => num)
      let missing = 4 - filteredColumn.length
      let zeros = Array(missing).fill(0)
      let newColumn = zeros.concat(filteredColumn)

      squares[i].innerHTML = newColumn[0]
      squares[i + width].innerHTML = newColumn[1]
      squares[i + (width * 2)].innerHTML = newColumn[2]
      squares[i + (width * 3)].innerHTML = newColumn[3]

      squares[i].setAttribute('data-value', newColumn[0])
      squares[i + width].setAttribute('data-value', newColumn[1])
      squares[i + (width * 2)].setAttribute('data-value', newColumn[2])
      squares[i + (width * 3)].setAttribute('data-value', newColumn[3])
    }
  }

  // Swipe up
  function moveUp() {
    for (let i = 0; i < 4; i++) {
      let totalOne = squares[i].innerHTML
      let totalTwo = squares[i + width].innerHTML
      let totalThree = squares[i + (width * 2)].innerHTML
      let totalFour = squares[i + (width * 3)].innerHTML
      let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

      let filteredColumn = column.filter(num => num)
      let missing = 4 - filteredColumn.length
      let zeros = Array(missing).fill(0)
      let newColumn = filteredColumn.concat(zeros)

      squares[i].innerHTML = newColumn[0]
      squares[i + width].innerHTML = newColumn[1]
      squares[i + (width * 2)].innerHTML = newColumn[2]
      squares[i + (width * 3)].innerHTML = newColumn[3]

      squares[i].setAttribute('data-value', newColumn[0])
      squares[i + width].setAttribute('data-value', newColumn[1])
      squares[i + (width * 2)].setAttribute('data-value', newColumn[2])
      squares[i + (width * 3)].setAttribute('data-value', newColumn[3])
    }
  }

  // Combine row
  function combineRow() {
    for (let i = 0; i < 15; i++) {
      if (squares[i].innerHTML === squares[i + 1].innerHTML) {
        let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML)
        squares[i].innerHTML = combinedTotal
        squares[i + 1].innerHTML = 0
        squares[i].setAttribute('data-value', combinedTotal)
        squares[i + 1].setAttribute('data-value', 0)
        score += combinedTotal
        scoreDisplay.innerHTML = score
      }
    }
    checkForWin()
  }

  // Combine column
  function combineColumn() {
    for (let i = 0; i < 12; i++) {
      if (squares[i].innerHTML === squares[i + width].innerHTML) {
        let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML)
        squares[i].innerHTML = combinedTotal
        squares[i + width].innerHTML = 0
        squares[i].setAttribute('data-value', combinedTotal)
        squares[i + width].setAttribute('data-value', 0)
        score += combinedTotal
        scoreDisplay.innerHTML = score
      }
    }
    checkForWin()
  }

  // Assign keycodes
  function control(e) {
    if (e.keyCode === 39) {
      keyRight()
    } else if (e.keyCode === 37) {
      keyLeft()
    } else if (e.keyCode === 38) {
      keyUp()
    } else if (e.keyCode === 40) {
      keyDown()
    }
  }
  document.addEventListener('keyup', control)

  function keyRight() {
    moveRight()
    combineRow()
    moveRight()
    generate()
  }

  function keyLeft() {
    moveLeft()
    combineRow()
    moveLeft()
    generate()
  }

  function keyDown() {
    moveDown()
    combineColumn()
    moveDown()
    generate()
  }

  function keyUp() {
    moveUp()
    combineColumn()
    moveUp()
    generate()
  }

  // Check for the number 2048 in the squares to win
  function checkForWin() {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 2048) {
        alert('You WIN!')
        document.removeEventListener('keyup', control)
      }
    }
  }

  // Check if there are no zeros on the board to lose
  function checkForGameOver() {
    let zeros = 0
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) {
        zeros++
      }
    }
    if (zeros === 0) {
      alert('You LOSE!')
      document.removeEventListener('keyup', control)
    }
  }

  // Initialize the game
  function initializeGame() {
    gridDisplay.innerHTML = ''
    squares = []
    score = 0
    scoreDisplay.innerHTML = score
    createBoard()
  }

  newGameButton.addEventListener('click', initializeGame)

  createBoard()
})