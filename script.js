let inputBox = document.getElementById("inputBox");
let Addbtn = document.getElementById("addBtn");
let TodoList = document.getElementById("todolist");

let editTodo = null;

// Function to add to do
const addTodo = () => {
  const inputText = inputBox.value.trim();
  if (inputText.length <= 0) {
    alert("You must write somthing in your to do");
    // we use it sothat noting empty show in your list
    return false;
  }

  //It will add edited value
  if (Addbtn.value === "Edit") {
    // to edit localStorage data
    editlocaltodo(editTodo.target.previousElementSibling.innerHTML);
    editTodo.target.previousElementSibling.innerHTML = inputText;
    Addbtn.value = "Add";
    inputBox.value = "";
  } else {
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);

    // Now we will create Edit Button
    const editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";

    // To style edit button add class
    editBtn.classList.add("btn", "editbtn");
    li.appendChild(editBtn);

    // Now we will create Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Delete";
    // To style delete button we use class in js
    deleteBtn.classList.add("btn", "deletebtn");
    li.appendChild(deleteBtn);

    TodoList.appendChild(li);
    // after append inputbox value will be empty
    inputBox.value = "";

    saveLocalTodos(inputText);
  }
};

// Function to update: (Edit/Delete) to do
const updateTodo = (e) => {
  // console.log(e.target.parentElement);
  // to delete element
  if (e.target.innerHTML === "Delete") {
    TodoList.removeChild(e.target.parentElement);
    //call to delete function to delete local data
    deletelocaldata(e.target.parentElement);
  }
  // to edit element
  if (e.target.innerHTML === "Edit") {
    inputBox.value = e.target.previousElementSibling.innerHTML;
    inputBox.focus();
    Addbtn.value = "Edit";
    editTodo = e;
  }
};

// const saveLocalTodos = (todo) => {
//   let todos = [];
//   todos.push(todo);
//   console.log(todos);
// };

// Function to Save local todo to storage
const saveLocalTodos = (todo) => {
  let todos;

  // Check if there are any existing todos in localStorage
  if (localStorage.getItem("todos") === null) {
    // If no todos found in localStorage, initialize an empty array
    todos = [];
  } else {
    // If todos are found, parse the JSON string from localStorage into an array
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  // Add the new todo to the todos array
  todos.push(todo);

  // Save the updated todos array back to localStorage as a JSON string
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Function to get local todo
const getLocalTodos = () => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach((todo) => {
      const li = document.createElement("li");
      const p = document.createElement("p");
      p.innerHTML = todo;
      li.appendChild(p);

      // Now we will create Edit Button
      const editBtn = document.createElement("button");
      editBtn.innerHTML = "Edit";

      // To style edit button add class
      editBtn.classList.add("btn", "editbtn");
      li.appendChild(editBtn);

      // Now we will create Delete Button
      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = "Delete";
      // To style delete button we use class in js
      deleteBtn.classList.add("btn", "deletebtn");
      li.appendChild(deleteBtn);

      TodoList.appendChild(li);
    });
  }
};

// to delete localStorage all data
const deletelocaldata = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  let todoText = todo.children[0].innerHTML;
  let todoindex = todos.indexOf(todoText);
  // Array functions: slice/splice
  todos.splice(todoindex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  // console.log(todoindex);
};

//Function to edit local data
const editlocaltodo = (todo) => {
  let todos = JSON.parse(localStorage.getItem("todos"));
  let todoindex = todos.indexOf(todo);
  todos[todoindex] = inputBox.value;
  localStorage.setItem("todos", JSON.stringify(todos));
};

// If my page load then getLocalTodos will execute to show save data
document.addEventListener("DOMContentLoaded", getLocalTodos);

//track to list
TodoList.addEventListener("click", updateTodo);

// to add click in btn
Addbtn.addEventListener("click", addTodo);

// Link the Enter key to add the todo item
inputBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTodo();
  }
});
