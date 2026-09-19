// tests/logic.test.js
// Uses Node's built-in test runner — no installation needed.

const test = require("node:test");
const assert = require("node:assert");
const logic = require("../logic.js");

test("addTask adds a new task", () => {
  const result = logic.addTask([], "Buy milk", "");
  assert.strictEqual(result.length, 1);
  assert.strictEqual(result[0].text, "Buy milk");
  assert.strictEqual(result[0].done, false);
});

test("addTask ignores empty text", () => {
  const result = logic.addTask([], "   ", "");
  assert.strictEqual(result.length, 0);
});

test("addTask stores the due date", () => {
  const result = logic.addTask([], "Submit report", "2026-09-25");
  assert.strictEqual(result[0].dueDate, "2026-09-25");
});

test("toggleTask flips done and keeps the due date", () => {
  let tasks = logic.addTask([], "Walk dog", "2026-09-20");
  const id = tasks[0].id;
  tasks = logic.toggleTask(tasks, id);
  assert.strictEqual(tasks[0].done, true);
  assert.strictEqual(tasks[0].dueDate, "2026-09-20");
});

test("deleteTask removes the right task", () => {
  let tasks = logic.addTask([], "Task A", "");
  tasks = logic.addTask(tasks, "Task B", "");
  const idToDelete = tasks[0].id;
  tasks = logic.deleteTask(tasks, idToDelete);
  assert.strictEqual(tasks.length, 1);
  assert.strictEqual(tasks[0].text, "Task B");
});

test("clearCompleted keeps only unfinished tasks", () => {
  let tasks = logic.addTask([], "Done task", "");
  tasks = logic.addTask(tasks, "Not done task", "");
  tasks = logic.toggleTask(tasks, tasks[0].id);
  tasks = logic.clearCompleted(tasks);
  assert.strictEqual(tasks.length, 1);
  assert.strictEqual(tasks[0].text, "Not done task");
});

test("countRemaining counts only unfinished tasks", () => {
  let tasks = logic.addTask([], "A", "");
  tasks = logic.addTask(tasks, "B", "");
  tasks = logic.addTask(tasks, "C", "");
  tasks = logic.toggleTask(tasks, tasks[0].id);
  assert.strictEqual(logic.countRemaining(tasks), 2);
});