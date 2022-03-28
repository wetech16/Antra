// CONST
const domSeletors = {
    'todolistHeader': '.todolist__header',
    'todolistContent': '.todolist__content',
    'inputBarSubmit': '.input-bar__submit',
    'inputBarInput': '.input-bar__input'
}


// Data
const title = "My To Do List";
const submitText = "Add";
let todos = []
// let todos = [{
//     "userId": 1,
//     "id": 1,
//     "title": "Hit the gym",
//     "completed": false
// }, {
//     "userId": 1,
//     "id": 2,
//     "title": "sdfasf aut autem",
//     "completed": true
// }, {
//     "userId": 1,
//     "id": 3,
//     "title": "sdfsafsadf aut autem",
//     "completed": true
// }, {
//     "userId": 1,
//     "id": 4,
//     "title": "dfdsfsafasfs aut autem",
//     "completed": false
// }]


// let obj = {
//     name: 'patrick'
// };
// // mutable
// obj.name = 'sam';

// // imutable
// obj = {
//     name: 'sam'
// }


function addNewTodo(newTodo) {
    todos = [...todos, {
        ...newTodo,
    }]
}

function deletTodo(id) {
    console.log(todos, id)
    todos = todos.filter(todo => todo.id !== id);
}

function toggleCompleteTodo(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return {
                ...todo,
                completed: !todo.completed
            }
        }
        return todo;
    });
}

function generateHeaderContent(title, submitText) {
    return `<h1 class="todolist__header__title">${title}</h1>
    <div class="input-bar">
        <input class="input-bar__input"/>
        <button class="input-bar__submit">${submitText}</button>
    </div>`
}


function generateTodoItem(todo) {
    return `<li id="todo-${todo.id}" class="todolist__content__row ${todo.completed ? 'checked' : ''}">
    <span class="todolist__content__item">${todo.title}</span>
    <button  class="todolist__content__action" >X</button>
</li>`
}

function generateTodoList(todos) {
    return todos.map(todo => generateTodoItem(todo)).join('')
}


function renderHeader(title, submitText) {
    const ele = document.querySelector(domSeletors.todolistHeader)
    const tmp = generateHeaderContent(title, submitText)
    render(ele, tmp)
}

function renderTodoList(todos) {
    const tmp = generateTodoList(todos);
    const ele = document.querySelector(domSeletors.todolistContent);
    render(ele, tmp)
}

function render(element, template) {
    element.innerHTML = template;
}

function setUpEvent() {
    document.querySelector(domSeletors.inputBarSubmit).addEventListener('click', (e) => {
        const inputEle = document.querySelector(domSeletors.inputBarInput);
        const newTitle = inputEle.value;
        inputEle.value = ''
        const newTodo = {
            title: newTitle,
            completed: false,
            userId: 1
        }

        addTodo(newTodo).then(data => {
            addNewTodo(data);
            renderTodoList(todos);
        })
    })

    document.querySelector(domSeletors.todolistContent).addEventListener('click', (e) => {
        if (isDeleteButton(e.target)) {
            const id = getTodoIdFromParent(e.target);
            deleteTodo(id).then(_ => {
                console.log("delete")
                deletTodo(id);
                renderTodoList(todos);
            })
        } else if (isContentRowOrItem(e.target)) {
            let id = getTodoIdFromElement(e.target) ? getTodoIdFromElement(e.target) : getTodoIdFromParent(e.target)
            toggleCompleteTodo(id)
            renderTodoList(todos);
        }
    })
}


function getTodoIdFromElement(element) {
    if (element?.id?.startsWith('todo')) {
        return +(element.id.substring(5))
    }
    console.warn('element Does not has an id')
    return null;
}

function getTodoIdFromParent(childElement) {
    return getTodoIdFromElement(childElement.parentElement);
}

function isDeleteButton(element) {
    return element.classList.contains('todolist__content__action')
}

function isContentRowOrItem(element) {
    return element.classList.contains('todolist__content__row')
        || element.classList.contains('todolist__content__item')
}


/// APIS

function getTodos() {
    return fetch('https://jsonplaceholder.typicode.com/todos')
        .then((response) => response.json())
}

function deleteTodo(id) {
    return fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',
    });
}

function addTodo(newTodo) {
    return fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        body: JSON.stringify(newTodo),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
}


// init
renderHeader(title, submitText);
getTodos().then(todosData => {
    todos = todosData;
    renderTodoList(todos);
})

// init Event
setUpEvent()

