fetch('/.netlify/functions/get_data')
    .then(res => res.json())
    .then(data => console.log(data))

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
let todoArray = [] // should this be a const instead?

// create the object prototype for a todoItem
const todoItem = {
    isComplete: false,
    itemText: '',
    itemNum: 0
}

// a function to display the whole array
function displayArray(){
    // this will be for each -> append child stuff
    // why is the [0] needed if there's only one element with that class name anyway?
    let theList = document.getElementsByClassName("todoList")[0]
    // assign the list an empty value so we don't duplicate
    theList.innerHTML = ''
    // now repopulate with the current up-to-date contents of the array
    todoArray.forEach((item) => {
    let newTodo = document.createElement('li')
    let textSpan = document.createElement('span')
    let individualButton = document.createElement('button')
    individualButton.innerHTML = 'Click to Complete'
    individualButton.className = 'indButton'
    // we need each item's button to have a unique id for event listening
    individualButton.id = `button${item.itemNum}`
    textSpan.innerHTML = item.itemText
    newTodo.appendChild(textSpan)
    newTodo.appendChild(individualButton)
    theList.appendChild(newTodo)
})

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
    theNewObj.itemNum = (todoArray.length)
    // add it to the start of the array
    todoArray.push(theNewObj)
    // now display the whole thing
    displayArray()
    // console log troubleshooting stuff
    console.log('addNewItem function has executed')
    console.log(`the givenText variable has a value of ${givenText}`)
    console.log(todoArray)
    // we should clear the input field
    let inputField = document.getElementById("inputBox")
    inputField.value = ''
}

// attach this functionality to the actual + button
document.getElementById("addItemButton").addEventListener("click", addNewItem)

// how do we listen for clicks on an unknown number of generated buttons?

// something to do with templates again, like generating the IDs for each

// but each one needs a distinct function - changing the state of a unique object