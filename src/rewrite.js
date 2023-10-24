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

// data structure on our end for the objects
let todoArray = []

// we need access to the list element that all items go in
let theList = document.getElementsByClassName("todoList")[0]

// Now we need a function to build a non-editable todoItem (DOM elements)
function buildTodo(item, index){
    // li containing: edit button, span, completion button
    let freshLi = document.createElement('li')
    let editButton = document.createElement('button')
    let textSpan = document.createElement('span')
    let doneButton = document.createElement('button')
    // innertext time
    editButton.innerText = 'Edit'
    textSpan.innerText = item.todoText
    // check if done or not and change completion button accordingly
    if (item.isComplete) {
        doneButton.innerText = 'Completed'
    } else {
        doneButton.innerText = 'Mark as Complete'
    }
    // the buttons need index data (is it okay to use the same index for both?)
    editButton.dataset.num = index
    doneButton.dataset.num = index
    // and they need styling...
    editButton.className = 'editButton'
    doneButton.className = 'indButton'
    // assemble the thing
    freshLi.appendChild(editButton)
    freshLi.appendChild(textSpan)
    freshLi.appendChild(doneButton)
    return freshLi
}

// And we need a variation for a currently-editable todoItem
function buildEditableTodo(item, index){
    // li containing: done button, text input field, complete button
    let freshLi = document.createElement('li')
    let editButton = document.createElement('button')
    // create an input field
    let textField = document.createElement('input')
    textField.type = 'text'
    textField.value = item.todoText
    // dome button
    let doneButton = document.createElement('button')
    // innertext time - the edit button should say 'save'
    editButton.innerText = 'Save'
    // check if done or not and change completion button accordingly
    if (item.isComplete) {
        doneButton.innerText = 'Completed'
    } else {
        doneButton.innerText = 'Mark as Complete'
    }
    // the buttons need index data (is it okay to use the same index for both?)
    editButton.dataset.num = index
    doneButton.dataset.num = index
    // and they need styling...
    editButton.className = 'editButton'
    doneButton.className = 'indButton'
    // assemble the thing
    freshLi.appendChild(editButton)
    freshLi.appendChild(textField)
    freshLi.appendChild(doneButton)
    return freshLi
}

// function to display the entire array
function displayArray(){
    // clean up the inner HTML first
    theList.innerHTML = ''
    // now repopulate
    todoArray.forEach((item, index) => {
        let newTodo // function scope
        // check what mode the item is in
        if (item.editMode) {
            // if it's in edit mode render as editable
            newTodo = buildEditableTodo(item, index)
        } else {
            // if not in edit mode, build normally
            newTodo = buildTodo(item, index)
        }
        // now append (only 1 of the two options per cycle)
        theList.appendChild(newTodo)
    })
    updateRemaining()
}

// function to add a new item
function addTodo(){
    // get the input field text
    let givenText = document.getElementById("inputBox").value
    let freshTodo = Object.create(todoItem)
    // isComplete should initialize itself to false without us specifying that right?
    freshTodo.todoText = givenText
    // put it on the end of the array
    todoArray.push(freshTodo)
    // refresh display
    displayArray()
    console.log('addTodo has executed')
    // and clear out the input field
    let inputField = document.getElementById("inputBox")
    inputField.value = ''
}

// make the new item button work
document.getElementById("addItemButton").addEventListener("click", addTodo)

// completion marking function - takes an index
function markAsComplete(index){
    todoArray[Number(index)].isComplete = true;
     displayArray()
}

// event listeners for completion buttons
document.querySelector('.todoList').addEventListener('click', (event) => {
    let targetElement = event.target
  
    // Verify if clicked element is a button with class name 'indButton'
    if(targetElement.className === 'indButton') {
        markAsComplete(targetElement.dataset.num)
     }
})

// edit mode ON function - takes an index
function enableEdit(index){
    todoArray[Number(index)].editMode = true;
    displayArray()
}

// edit mode OFF (save) function - takes an index
function saveEdit(index){ 
    // I need a way to access the text in the input field
    // then assign the property todoText of the corresponding object to that value
    let currentLi = theList.children[index]
    let currentField = currentLi.children[1] // second, due to our structure
    todoArray[Number(index)].todoText = currentField.value
    todoArray[Number(index)].editMode = false;
    displayArray()
}

// event listeners for edit buttons
document.querySelector('.todoList').addEventListener('click', (event) => {
    let targetElement = event.target
  
    // Verify if clicked element is a button with class name 'indButton'
    if(targetElement.className === 'editButton') {
    // now how can we get correct edit/save behavior here?
    let index = targetElement.dataset.num
    if (todoArray[index].editMode) {
        saveEdit(index)
    } else {
        enableEdit(index)
    }
    }
})


// clear done functionality
function clearDone(){
    let filteredTodos = todoArray.filter((item) => item.isComplete === false)
    todoArray = filteredTodos
    displayArray()
}

// event listener for the clear done button
document.getElementById("cleardone").addEventListener("click", clearDone)

// function to update the number of remaining incomplete todos on the footer
function updateRemaining() {
    let remainder = document.getElementById("remaining")
    let filteredTodos = todoArray.filter((item) => item.isComplete === false)
    let numIncomplete = filteredTodos.length
    remainder.innerHTML = `You have ${numIncomplete} pending tasks`
}