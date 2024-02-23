// Function to save tasks to localStorage
function saveTasks(ulElementId) {
  const ul = document.getElementById(ulElementId);
  const lis = ul.getElementsByTagName("li");
  let tasks = [];

  Array.from(lis).forEach((li) => {
    const taskText = li.querySelector(".task").textContent;
    const checkBox = li.querySelector('input[type="checkbox"]');
    const isCompleted = checkBox.checked;

    tasks.push({ text: taskText, completed: isCompleted });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to add tasks to the DOM
function addToDom(text, isComplete) {
  const li = document.createElement("li");

  // Create checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = isComplete;
  li.appendChild(checkbox);

  checkbox.onchange = function () {
    if (this.checked) {
      this.nextElementSibling.classList.add("task-completed");
    } else {
      this.nextElementSibling.classList.remove("task-completed");
    }
    saveTasks("task-list");
  };

  // Create text span
  const span = document.createElement("span");
  span.className = "task" + (isComplete ? " task-completed" : "");
  span.textContent = text;
  li.appendChild(span);

  // Create delete button
  const button = document.createElement("button");
  button.className = "delete-btn";
  button.innerHTML = "&#10006;";
  li.appendChild(button);

  // Delete task on button click
  button.onclick = function () {
    this.parentNode.remove(); // Remove the task from DOM
    saveTasks("task-list"); // Update localStorage after removal
  };

  document.getElementById("task-list").appendChild(li);
}

// Function to load tasks from localStorage and add them to the DOM
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.forEach((task) => {
    addToDom(task.text, task.completed);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const addTaskButton = document.getElementById("add-task-button");

  addTaskButton.addEventListener("click", function () {
    const taskInput = document.getElementById("input-task");
    const newTask = taskInput.value;

    if (newTask.trim() !== "") {
      addToDom(newTask, false);
      saveTasks("task-list");
      taskInput.value = "";
    }
  });

  loadTasks();
});
