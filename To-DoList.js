document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const showAllBtn = document.getElementById('showAllBtn');
    const showActiveBtn = document.getElementById('showActiveBtn');
    const showCompletedBtn = document.getElementById('showCompletedBtn');

    let tasks = [];

    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const task = {
                text: taskText,
                completed: false
            };
            tasks.push(task);
            taskInput.value = '';
            renderTasks();
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit')) {
            const li = e.target.parentElement.parentElement;
            const index = li.dataset.index;
            const newText = prompt('Edit your task', tasks[index].text);
            if (newText) {
                tasks[index].text = newText;
                renderTasks();
            }
        }

        if (e.target.classList.contains('delete')) {
            const li = e.target.parentElement.parentElement;
            const index = li.dataset.index;
            tasks.splice(index, 1);
            renderTasks();
        }

        if (e.target.classList.contains('complete')) {
            const li = e.target.parentElement.parentElement;
            const index = li.dataset.index;
            tasks[index].completed = !tasks[index].completed;
            renderTasks();
        }
    });

    showAllBtn.addEventListener('click', () => renderTasks());
    showActiveBtn.addEventListener('click', () => renderTasks(false));
    showCompletedBtn.addEventListener('click', () => renderTasks(true));

    function renderTasks(filter = null) {
        taskList.innerHTML = '';

        tasks.forEach((task, index) => {
            if (filter === null || filter === task.completed) {
                const li = document.createElement('li');
                li.dataset.index = index;
                li.className = task.completed ? 'completed' : '';
                li.innerHTML = `
                    <span>${task.text}</span>
                    <div class="task-buttons">
                        <button class="edit">Edit</button>
                        <button class="delete">Delete</button>
                        <button class="complete">${task.completed ? 'Undo' : 'Complete'}</button>
                    </div>
                `;
                taskList.appendChild(li);
            }
        });
    }
});