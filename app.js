// app.js — connects logic.js to the actual page (buttons, input, list)

let tasks = [];
let currentFilter = "all"; // "all" | "active" | "completed"

const taskInput = document.getElementById("taskInput");
const dueDateInput = document.getElementById("dueDateInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("counter");
const clearBtn = document.getElementById("clearBtn");
const filterButtons = document.querySelectorAll(".filter-btn");

// --- localStorage: save and load ---

function saveTasks() {
  localStorage.setItem("myTasks", JSON.stringify(tasks));
}

function loadTasks() {
  const saved = localStorage.getItem("myTasks");
  if (saved) {
    tasks = JSON.parse(saved);
  }
}

// --- filtering ---

function getVisibleTasks() {
  if (currentFilter === "active") {
    return tasks.filter(function (t) { return t.done === false; });
  }
  if (currentFilter === "completed") {
    return tasks.filter(function (t) { return t.done === true; });
  }
  return tasks; // "all"
}

// --- drawing the page ---

function render() {
  taskList.innerHTML = "";

  const visible = getVisibleTasks();

  visible.forEach(function (task) {
    const li = document.createElement("li");
    if (task.done) {
      li.className = "done";
    }

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text;

    span.addEventListener("click", function () {
      tasks = toggleTask(tasks, task.id);
      saveTasks();
      render();
    });

    li.appendChild(span);

    if (task.dueDate) {
      const due = document.createElement("span");
      due.className = "due-date";
      due.textContent = "Due: " + task.dueDate;
      li.appendChild(due);
    }

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", function () {
      tasks = deleteTask(tasks, task.id);
      saveTasks();
      render();
    });
    li.appendChild(delBtn);

    taskList.appendChild(li);
  });

  counter.textContent = countRemaining(tasks) + " tasks remaining";
}

// --- adding a task ---

addBtn.addEventListener("click", function () {
  tasks = addTask(tasks, taskInput.value, dueDateInput.value);
  taskInput.value = "";
  dueDateInput.value = "";
  saveTasks();
  render();
});

// --- clear completed ---

clearBtn.addEventListener("click", function () {
  tasks = clearCompleted(tasks);
  saveTasks();
  render();
});

// --- filter tabs ---

filterButtons.forEach(function (btn) {
  btn.addEventListener("click", function () {
    filterButtons.forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    render();
  });
});

// --- start up ---

loadTasks();
render();