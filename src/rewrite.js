// due to clutter i'm rewriting the JS code

// First: Instructor-required code
fetch('/.netlify/functions/get_data')
    .then(res => res.json())
    .then(data => console.log(data))

// Next, define an object prototype for a todoItem
const todoItem = {
    isComplete: false, // false bool to start
    todoText: '', // empty string
    editMode: false // only TRUE if the item is currently editable
}

// we need access to the list elemet that all items go in
let theList = document.getElementsByClassName("todoList")[0]

// Now we need a function to build a non-editable todoItem (DOM elements)
function buildTodo(item, index){
    // li containing: edit button, span, completion button
    // the buttons need index data
}

// And we need a variation for a currently-editable todoItem
function buildEditableTodo(item, index){
    // li containing: done button, text input field (remove the completion button?)
    // the button(s) need index data
}

// function to display the entire array
function displayArray(){
    // clean up the inner HTML first
    theList.innerHTML = ''
    // now repopulate
    todoArray.forEach((item, index) => {
        // check what mode the item is in
        if (item.editMode) {
            // if it's in edit mode render as editable
            let newTodo = buildEditableTodo(item, index)
        } else {
            // if not in edit mode, build normally
            let newTodo = buildTodo(item, index)
        }
        // now append (only 1 of the two options per cycle)
        theList.appendChild(newTodo)
    })
}

// function to add a new item
function addTodo(){
    // get the input field text
    let givenText = document.getElementById("inputBox").value
    let freshTodo = Object.create(todoItem)
    // isComplete should initialize itself to false without us specifying that right?
    freshObj.todoText = givenText
    // put it on the end of the array
    todoArray.push(freshObj)
    // refresh display
    displayArray()
}

// make the new item button work
document.getElementById("addItemButton").addEventListener("click", addNewItem)