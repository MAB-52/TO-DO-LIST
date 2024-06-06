const todoInput = document.getElementById("todoInput");
const addTodo = document.getElementById("addTodo");
const btnText = addTodo.innerText;
const records = document.getElementById("records");
let todoArr = [];
let edit_id = null;

let objStr = localStorage.getItem('todo');
if(objStr != null){
    todoArr = JSON.parse(objStr);
}

// ADD TODO's
addTodo.onclick = () => {
    let todo = todoInput.value.trim();
    if(todo === '') // Alert if TODO's are empty
        {
            alert("TO-DO LIST CAN'T BE EMPTY");
            return
        }

    if(edit_id != null){
        todoArr.splice(edit_id, 1, {'todo' : todo});
        edit_id = null;
    }
    else{
        todoArr.push({'todo' : todo});
    }
    saveTodo(todoArr);
    todoInput.value = '';
    addTodo.innerText = btnText;
}

// SAVE TODO's
const saveTodo = (todoArr) => {
    let str = JSON.stringify(todoArr);
    localStorage.setItem('todo' , str);  
    displayTodo();
}

// DISPLAY TODO's
const displayTodo = () => {
    let statement = '';
    todoArr.forEach((todo, i) => {
        if (todo.todo.trim() !== '') { // Filter out blank todos
            statement +=
                `<tr>
                <th class="fs-5" scope="row">${i + 1}</th>
                <td class="fs-5">${todo.todo}</td>
                <td class="fs-5">
                    <i onclick='editTodo(${i})' class='btn btn-primary fas fa-edit mx-2' style='font-size:20px'></i>
                    <i onclick='deleteTodo(${i})' class="fa fa-trash-o btn btn-danger" style="font-size:20px"></i>
                </td>
              </tr>`;
        }
    })

    records.innerHTML = statement;
}

// EDIT TODO's
const editTodo = (id) => {
    edit_id = id;
    todoInput.value = todoArr[id].todo;
    addTodo.innerText = "SAVE CHANGES";
}

// DELETE TODO's
const deleteTodo = (id) => {
    todoArr.splice(id,1);
    saveTodo(todoArr);
}

