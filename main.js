let tryGridBox = document.querySelector(".tryGrid");
let resultGridBox = document.querySelector(".resultGrid");
let symbolGridBox = document.querySelector(".symbolGrid");
let symbols = [
    "img/herc.png",
    "img/karo.png",
    "img/pik.png",
    "img/tref.png",
    "img/sova.png",
    "img/zvezda.png",
]
let maxTry = 6
let combination = []
let myTry = []
let tryRow = []
let checkRow = []
let currentResult = []
let tryNumber = 0
startGame();


function startGame() {
    renderBoard()
    renderSymbols()
    combination = [
        randomNumber(),
        randomNumber(),
        randomNumber(),
        randomNumber(),
    ]
    console.log(combination)
}


function renderFinalResult() {
    let textSquare = `<div class="row">`;
    for (let i = 0; i < combination.length; i++) {
        textSquare += `<div class="box"><img src="${symbols[combination[i]]}" ></div>`
    }
    textSquare += `</div>`
    tryGridBox.innerHTML += textSquare

}

function checkTry() {
    let correct = []
    let exist = []
    let copyCombination = [].concat(combination)
    let copyMyTry = [].concat(myTry)

    myTry.forEach((el, index) => {
        if (el === combination[index]) {
            correct.push("correct")
            copyCombination[index] = null
            copyMyTry[index] = null
        }
    })

    copyMyTry.forEach((el) => {
        let index = copyCombination.indexOf(el)
        if (index !== -1 && el !== null) {
            exist.push("exist")
            copyCombination.splice(index, 1)
        }
    })

    if (correct.length === 4 || maxTry === tryNumber + 1) {
        for (let i = 0; i < symbols.length; i++) {
            symbolGridBox.children[i].removeEventListener("click", setMyTry)
        }
        renderFinalResult()
    }
    currentResult = correct.concat(exist)
}

function setMyTry() {
    if (myTry.length < 4) {
        let symbolIndex = parseInt(this.getAttribute("data-symbolIndex"));
        myTry.push(symbolIndex)
        renderTry()
    }

    if (myTry.length === 4) {
        checkTry()
        renderResultCurrentTry()
        tryNumber++
        myTry = []
        currentResult = []
    }


}


/****** RENDERS ******/
function renderBoard() {
    let textSquare = "";
    let textCircle = "";

    for (let i = 0; i < maxTry; i++) {
        textSquare += `
            <div class="row">
                <div class="box"></div>
                <div class="box"></div>
                <div class="box"></div>
                <div class="box"></div>
            </div>`
        textCircle += `
            <div class="row">
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
            </div>`
    }
    tryGridBox.innerHTML = textSquare
    resultGridBox.innerHTML = textCircle

    tryRow = tryGridBox.querySelectorAll(".row")
    checkRow = resultGridBox.querySelectorAll(".row")

}


function renderSymbols() {
    symbols.forEach((symbol, index) => {
        let box = document.createElement("div");
        let img = document.createElement("img");
        box.className = "box";
        box.setAttribute("data-symbolIndex", index)
        img.src = symbol;
        // box.onclick = setMyTry
        box.addEventListener("click", setMyTry)
        box.appendChild(img)
        symbolGridBox.appendChild(box)
    })
}

function renderTry() {
    myTry.forEach((symbolIndex, index) => {
        tryRow[tryNumber].children[index].innerHTML = `<img src="${symbols[symbolIndex]}" >`
    })
}

function renderResultCurrentTry() {
    currentResult.forEach((result, index) => {
        checkRow[tryNumber].children[index].classList.add(result)
    })
}

/****** HELPERS ******/
function randomNumber() {
    return Math.floor(Math.random() * symbols.length)
}

