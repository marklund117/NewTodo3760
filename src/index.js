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
    isInEditMode: false // New property that keeps track of whether this item is currently being edited.
}

// a function to display the whole array
function displayArray(){
    // this will be for each -> append child stuff
    let theList = document.getElementsByClassName("todoList")[0]
    // assign the list an empty value so we don't duplicate
    theList.innerHTML = ''
    // now repopulate with the current up-to-date contents of the array
    todoArray.forEach((item, index) => {
        let newTodo = document.createElement('li')
        let textSpan = document.createElement('span')
        let individualButton = document.createElement('button')
        let editButton = document.createElement('button')
          if (item.isComplete) {
              individualButton.innerHTML = 'Completed!'
          } else {
              individualButton.innerHTML = 'Click to Complete.'
          }
        editButton.innerHTML = 'Edit'
        editButton.className = 'editButton'
        individualButton.className = 'indButton'
        // Check whether the item is being edited:
        if (item.isInEditMode) {
            textSpan.innerHTML = `<input type="text" value="${item.itemText}" />`;
            editButton.innerHTML = 'Save';
        } else {
            textSpan.innerHTML = item.itemText;
            editButton.innerHTML = 'Edit';
        }
        individualButton.dataset.num = index;
        // textSpan.innerHTML = item.itemText
        newTodo.appendChild(editButton) // edit on the left
        newTodo.appendChild(textSpan)
        newTodo.appendChild(individualButton)
        // now append the whole thing
        theList.appendChild(newTodo)
      })
      updateRemaining()
      addListeners()
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
    updateRemaining()
}

// attach this functionality to the actual + button
document.getElementById("addItemButton").addEventListener("click", addNewItem)

// how do we listen for clicks on an unknown number of generated buttons?

function markAsComplete(index){
    todoArray[Number(index)].isComplete = true;
     displayArray()
     updateRemaining()
}

document.querySelector('.todoList').addEventListener('click', (event) => {
    let targetElement = event.target
  
    // Verify if clicked element is a button with class name 'indButton'
    if(targetElement.className === 'indButton') {
        markAsComplete(targetElement.dataset.num)
     }
  })

// clear done functionality
function clearDone() {
let filteredTodos = todoArray.filter((item) => item.isComplete === false)
todoArray = filteredTodos
displayArray()
}

document.getElementById("cleardone").addEventListener("click", clearDone)

// update the number of remaining incomplete todos on the footer
function updateRemaining() {
    let remainder = document.getElementById("remaining")
    let filteredTodos = todoArray.filter((item) => item.isComplete === false)
    let numIncomplete = filteredTodos.length
    remainder.innerHTML = `You have ${numIncomplete} pending tasks`
}

// make the edit button work
function editItem(index){
    // change the item text into a field that can be modified for this li only
    // switch the edit button text to 'save'
    let listItem = document.querySelectorAll('.todoList li')[Number(index)];
    let spanElement = listItem.querySelector('span');
    let editButton = listItem.querySelector('.editButton');

    let currentText = spanElement.innerHTML;

    // Create input field with existing item-text as value:
    var inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = currentText;

        // Replace span with this new input field:
        listItem.replaceChild(inputField, spanElement);

        /*Since you've replaced 'span' with an actual '<input>', instead of nesting it inside,* you can directly grab its value while saving edits.
         */

     todoArray[Number(index)].isInEditMode = true;
     editButton.innerHTML = 'Save';
}

function saveItem(index){
   // restore the item text to it's normal non editable state, but updated to reflect any changes
   // switch the button text back to 'edit'
   let listItem  =
      document.querySelectorAll('.todoList li')[Number(index)];

   /* Instead of grabbing from <input> nested within <span>,
      *now we're grabbing from an actual <input>.*/
      const newItemText  =
            listItem.querySelector(`input`).value;

      if (newItemText) {
         todoArray[Number(index)].itemText = newItemText;
         todoArray[Number(index)].isInEditMode = false;

        displayArray();
        addListeners();
      }
}

// Adding event listeners:
function addListeners() {
    Array.from(document.getElementsByClassName('editButton')).forEach((button, index) => {
        button.removeEventListener("click", saveItem); // Remove any lingering Save listeners.
        button.addEventListener('click', editItem.bind(null, index));
    });
  
    Array.from(document.getElementsByClassName('indButton')).forEach((button, index) => {
        button.addEventListener('click', markAsComplete.bind(null,index));
    });
  }
  
