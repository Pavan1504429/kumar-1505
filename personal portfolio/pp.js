let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentInput = '';

function addToDisplay(value) {
    if (currentInput === 'Error') currentInput = '';
    currentInput += value;
    document.getElementById('calcDisplay').value = currentInput;
}

function calculate() {
    try {
        const operators = {
            '+': (a, b) => a + b,
            '-': (a, b) => a - b,
            '×': (a, b) => a * b,
            '÷': (a, b) => b !== 0 ? a / b : 'Error'
        };
        let numbers = currentInput.split(/([\+\-\×\÷])/).filter(n => n.trim() !== '');
        let result = parseFloat(numbers[0]);
        for (let i = 1; i < numbers.length; i += 2) {
            const operator = numbers[i];
            const nextNumber = parseFloat(numbers[i + 1]);
            if (operators[operator] && !isNaN(nextNumber)) {
                result = operators[operator](result, nextNumber);
            }
        }
        currentInput = isNaN(result) || !isFinite(result) ? 'Error' : result.toString();
        document.getElementById('calcDisplay').value = currentInput;
    } catch (e) {
        currentInput = 'Error';
        document.getElementById('calcDisplay').value = currentInput;
    }
}

function clearDisplay() {
    currentInput = '';
    document.getElementById('calcDisplay').value = '';
}

function eraseLast() {
    if (currentInput !== 'Error') {
        currentInput = currentInput.slice(0, -1);
        document.getElementById('calcDisplay').value = currentInput || '';
    }
}

function addTask() {
    const todoInput = document.getElementById('todoInput');
    if (todoInput && todoInput.value.trim()) {
        todos.push({ text: todoInput.value.trim(), completed: false });
        todoInput.value = '';
        renderTodos();
    }
}

function renderTodos() {
    const todoItems = document.getElementById('todoItems');
    if (todoItems) {
        todoItems.innerHTML = '';
        todos.forEach((todo, index) => {
            const div = document.createElement('div');
            div.className = 'todo-item' + (todo.completed ? ' completed' : '');
            div.innerHTML = `
                <span onclick="toggleComplete(${index})">${todo.text}</span>
                <button onclick="markDone(${index})">Done</button>
                <button onclick="removeTask(${index})">Remove</button>
            `;
            todoItems.appendChild(div);
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}

function toggleComplete(index) {
    if (todos[index]) {
        todos[index].completed = !todos[index].completed;
        renderTodos();
    }
}

function markDone(index) {
    if (todos[index]) {
        todos[index].completed = !todos[index].completed; 
        renderTodos();
    }
}

function removeTask(index) {
    if (todos[index]) {
        todos.splice(index, 1);
        renderTodos();
    }
}

function sendMessage() {
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;

    if (name && email && subject && message) {
        alert(`Message sent successfully!\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`);
        document.getElementById('contactName').value = '';
        document.getElementById('contactEmail').value = '';
        document.getElementById('contactSubject').value = '';
        document.getElementById('contactMessage').value = '';
    } else {
        alert('Please fill in all fields!');
    }
}


document.querySelectorAll('.calculator button').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        if (value === '=') calculate();
        else if (value === 'C') clearDisplay();
        else if (value === 'Erase') eraseLast();
        else if (['+', '-', '×', '÷'].includes(value)) addToDisplay(` ${value} `);
        else addToDisplay(value);
    });
});


document.querySelector('.contact-form button').addEventListener('click', sendMessage);
document.querySelector('.todo-list button').addEventListener('click', addTask);


renderTodos();