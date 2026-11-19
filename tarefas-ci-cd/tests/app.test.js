const test = require("node:test");
const assert = require("node:assert/strict");
const { createTask, countPending } = require("../app.js");

test("cria uma tarefa removendo espaços extras", () => {
  assert.deepEqual(createTask("  Estudar CI/CD  ", 10), {
    id: 10, title: "Estudar CI/CD", completed: false
  });
});

test("não cria tarefa vazia", () => {
  assert.equal(createTask("   "), null);
});

test("conta somente tarefas pendentes", () => {
  const tasks = [
    { id: 1, title: "A", completed: false },
    { id: 2, title: "B", completed: true },
    { id: 3, title: "C", completed: false }
  ];
  assert.equal(countPending(tasks), 2);
});
