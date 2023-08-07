const pendingTasksList = document.getElementById('pendingTasksList');
const completedTasksList = document.getElementById('completedTasksList');

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    const task = createTaskObject(taskText);
    addTaskToPendingList(task);
    taskInput.value = '';
  }
}

function createTaskObject(taskText) {
  const task = {
    text: taskText,
    createdDate: new Date().toLocaleString(),
    completed: false,
    completedDate: null,
  };
  return task;
}

function addTaskToPendingList(task) {
  const taskItem = document.createElement('li');
  taskItem.innerText = task.text;
  taskItem.dataset.createdDate = task.createdDate;
  taskItem.classList.add('task-item', 'adding');

  const completeButton = document.createElement('button');
  completeButton.innerText = 'Complete';
  completeButton.classList.add('complete-btn');
  completeButton.onclick = () => completeTask(task, taskItem);

  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete';
  deleteButton.classList.add('delete-btn');
  deleteButton.onclick = () => deleteTask(task, taskItem);

  taskItem.appendChild(completeButton);
  taskItem.appendChild(deleteButton);

  pendingTasksList.appendChild(taskItem);
}

function completeTask(task, taskItem) {
  task.completed = true;
  task.completedDate = new Date().toLocaleString();

  // Animate completion of task
  taskItem.classList.add('completing');
  setTimeout(() => {
    pendingTasksList.removeChild(taskItem);
    addTaskToCompletedList(task);
  }, 500);
}

function addTaskToCompletedList(task) {
  const taskItem = document.createElement('li');
  taskItem.innerText = `${task.text} (Completed on ${task.completedDate})`;
  taskItem.classList.add('task-item', 'adding');

  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete';
  deleteButton.classList.add('delete-btn');
  deleteButton.onclick = () => deleteTask(task, taskItem);

  taskItem.appendChild(deleteButton);
  completedTasksList.appendChild(taskItem);
}

function deleteTask(task, taskItem) {
  // Animate deletion of task
  taskItem.classList.add('deleting');
  setTimeout(() => {
    if (taskItem.parentElement === pendingTasksList) {
      pendingTasksList.removeChild(taskItem);
    } else if (taskItem.parentElement === completedTasksList) {
      completedTasksList.removeChild(taskItem);
    }
  }, 500);
}

// Attach event listener to the "Add" button
const addButton = document.getElementById('addButton');
addButton.onclick = addTask;
