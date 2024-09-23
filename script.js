document.getElementById('addButton').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    
    if (taskInput.value) {
        const li = document.createElement('li');
        li.textContent = taskInput.value;
        li.appendChild(createRemoveButton());
        taskList.appendChild(li);
        taskInput.value = '';
    }
}

function createRemoveButton() {
    const button = document.createElement('button');
    button.textContent = 'Remover';
    button.addEventListener('click', (event) => {
        event.target.parentElement.remove();
    });
    return button;
}
