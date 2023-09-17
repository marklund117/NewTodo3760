import "./styles.css";

fetch('/.netlify/functions/get_data')
    .then(res => res.json())
    .then(data => console.log(data))

// okay time to sit down and try to make something that actually works
// heavy googling and LLM reference use inbound, but I'll try to understand everything

// lets establish what functionalities are needed

// a function that displays the list of todo items (displays the whole page)

// this also needs to show numerically the remaining number of incomplete todos

// a function that adds a new todo to the list

// a way to clear all done todos (button press)

// edit functionality - button per todo

// the TODO object needs a string, a true/false 'complete' value, a number for its position

// mark complete functionality - inside the edit panel

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// create an empty array
let todoArray = []

// create the object prototype for a todoItem
const todoItem = {
    isComplete: false,
    itemText: ''
}

// a function to display the whole array
function displayArray(){
    // this will be for each -> append child stuff
}

// a function to add a new item to the array with the + button
function addNewItem(){
    // get the text from the input field
    let givenText = document.getElementById("inputBox").value
    // new object to push
    let theNewObj = Object.create(todoItem)
    // set values
    theNewObj.isComplete = false
    theNewObj.itemText = givenText
    // add it to the start of the array
    todoArray.unshift(theNewObj)
}

// attach this functionality to the actual + button
document.getElementById("addItemButton").addEventListener("click", addNewItem())