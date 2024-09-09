document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-button');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => {
            createTodoElement(todo.text, todo.completed);
        });
    }

    function saveTodos() {
        const todos = Array.from(todoList.children).map(li => ({
            text: li.querySelector('span').textContent,
            completed: li.classList.contains('completed')
        }));
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function createTodoElement(text, completed = false) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${text}</span>
            <button class="delete-button">Delete</button>
        `;
        if (completed) {
            li.classList.add('completed');
        }

        li.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTodos();
        });

        const deleteButton = li.querySelector('.delete-button');
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation();
            li.remove();
            saveTodos();
        });

        todoList.appendChild(li);
    }

    // Add new todo
    function addTodo() {
        const task = todoInput.value.trim();
        if (task === '') return;

        createTodoElement(task);
        saveTodos();
        todoInput.value = '';
    }

    addButton.addEventListener('click', addTodo);

    todoInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTodo();
        }
    });

    // Load todos on page load
    loadTodos();
});
