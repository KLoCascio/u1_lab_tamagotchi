// -- CONSTANTS -- //
const INIT_STATE = {
    boredom: 0,
    hunger: 0,
    sleepiness: 0,
}

// -- STATE VARIABLES -- // 
let boredom = ""
let hunger = ""
let sleepiness = ""

let age = ""
let cycles = ""

let timer = ""
let interval = ""

// -- CACHED ELEMENTS -- //
const boredomStatEl = document.querySelector("#boredom-stat")
const hungerStatEl = document.querySelector("#hunger-stat")
const sleepyStatEl = document.querySelector("#sleepiness-stat")

const gameMessageEl = document.querySelector("#tama-message")
const gameBtnEls = document.querySelectorAll("button")

const restartButton = document.querySelector("#restartButton")




// --  EVENT LISTENERS --  //

// DONE
gameBtnEls.forEach((btn) => btn.addEventListener("click", handleBtnClick))

restartButton.addEventListener("click", init)
// Add an event listener for when the [Play] [Eat] [Sleep] buttons is clicked are clicked .
// The handleBtnClick handler will do the following:
    // Determine which button was clicked and cache the btn innerText
    // Calculate a dynamic decrementing value
    // Invoke the updateStat function
    // Render the updated state

// -- FUNCTIONS -- //

// DONE //
function handleBtnClick(e) {
    const convertProp = {
        FEED: "hunger",
        NAP: "sleepiness",
        PLAY: "boredom",
    }
    const btnText = convertProp[e.target.innerText]
    const newValue = -1 * (3 + Math.floor(Math.random() * 3))
    updateStat(btnText, newValue)
    render()
}

// DONE //
function init() {
    resetUI()

    state = {...INIT_STATE}
    age = 0
    cycles = 0
    interval = 1000
    timer = setInterval(runGame, interval)

    render()
}
// setInterval() read: https://www.w3schools.com/jsref/met_win_setinterval.asp
// The last line in init() should then call render(); to render that state to the DOM for the first time.

// DONE //
function render() {
    renderStats()
}

function renderStats() {
    boredomStatEl.textContent = state.boredom
    hungerStatEl.textContent = state.hunger
    sleepyStatEl.textContent = state.sleepiness
}
// Lastly the runGame function will execute the render() to update the browser content and UI.

// DONE
function runGame () {
    // console.log("Game is Running!")
    cycles++

    if (continueGame()) {
        updateStats()
            // Icebox - call checkAge helper function to age up Tama
           // Icebox - add aging cycle to calculate aging up tama as a factor of cycles.
            // Icebox - add a message render state or game engine for parsing the state > UI changes. 
    } else {
        // stat is >= 10 -> end game cycle
        return gameOver()
    }
    render()
}

// DONE
function continueGame () {
    const testGame = Object.values(state).every((stat) => stat < 20)
    return testGame
}

// DONE 
function updateStats() {
    for (key in state) {
        updateStat (key, Math.floor(Math.random() * 3))
    }
}

function updateStat(stat, value) {
    if (state[stat] + value >= 0) {
        state[stat] += value
    } else {
        state [stat] = 0
    }
}
// Each stat for your tamagotchi is referenced in the state variable. Rather than updating all properties using direct assignment. We will abstract the logic into an updateStat helper function. The updateStat helper function accepts two arguments:
    // stat: the key in the state object we want to target
    // value: the number by which we should change our state (can accept positive or negative numbers)
// Because we are using this function for incrementing, as well as decrementing when a user clicks a button, we want to prevent the number from moving below 0.
    // This will prevent a user from 'cheating' by spamming a button click, and will make the game more challenging.

// DONE
function gameOver() {
    // message alert for Game Over
    // alert("Game Over!")
    restartButton.classList.remove("hidden")
    gameMessageEl.classList.remove("hidden")
    // stop the timer
    clearInterval(timer)
    // location.reload()
}
// Above function will be called when any of the state properties stores a number 10 or greater. It is called immediately in the runGame cycle. This MVP version uses an alert to stop the code from executing and then invokes a clearInterval to prevent the runGame function from continuing.The location object is part of the system your browser uses to control which webpage you are navigating to. We can use the .reload() method to refresh the page for the user.
    // This will cause the dom to completey refresh and the init() function will be called again.

// DONE
function resetUI() {
    // gameOver message
    restartButton.classList.add("hidden")
    gameMessageEl.classList.add("hidden")
}
// .classList.add("hidden") adding the class .hidden styling from CSS.

// DONE
init()
