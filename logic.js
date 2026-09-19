let lastId = 0;
function makeId() {
  lastId = Math.max(Date.now(), lastId + 1);
  return lastId;
}

function addTask(tasks, text, dueDate) {
  const clean = text.trim();
  if (clean === "") {
    return tasks; // don't add empty tasks
  }
  const newTask = {
    id: makeId(),
    text: clean,
    done: false,
    dueDate: dueDate || ""
  };
  return [...tasks, newTask];
}

function toggleTask(tasks, id) {
  return tasks.map(function (task) {
    if (task.id === id) {
      return { ...task, done: !task.done };
    }
    return task;
  });
}

function deleteTask(tasks, id) {
  return tasks.filter(function (task) {
    return task.id !== id;
  });
}

function clearCompleted(tasks) {
  return tasks.filter(function (task) {
    return task.done === false;
  });
}

function countRemaining(tasks) {
  return tasks.filter(function (task) {
    return task.done === false;
  }).length;
}

// This block lets Node.js (used for testing) see these functions.
// The browser ignores it completely.
if (typeof module !== "undefined") {
  module.exports = { addTask, toggleTask, deleteTask, clearCompleted, countRemaining };
}