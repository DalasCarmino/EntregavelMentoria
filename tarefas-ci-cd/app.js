// Funções separadas para facilitar os testes automatizados.
function createTask(text, id = Date.now()) {
  const title = String(text).trim();
  if (!title) return null;
  return { id, title, completed: false };
}

function countPending(tasks) {
  return tasks.filter(task => !task.completed).length;
}

if (typeof module !== "undefined") {
  module.exports = { createTask, countPending };
}

if (typeof document !== "undefined") {
  const form = document.querySelector("#task-form");
  const input = document.querySelector("#task-input");
  const list = document.querySelector("#task-list");
  const count = document.querySelector("#task-count");
  const empty = document.querySelector("#empty-state");
  const clear = document.querySelector("#clear-completed");
  let tasks = JSON.parse(localStorage.getItem("taskflow-tasks") || "[]");

  function save() {
    localStorage.setItem("taskflow-tasks", JSON.stringify(tasks));
  }

  function render() {
    list.replaceChildren();
    tasks.forEach(task => {
      const item = document.createElement("li");
      item.className = `task${task.completed ? " done" : ""}`;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.setAttribute("aria-label", `Concluir ${task.title}`);
      checkbox.addEventListener("change", () => {
        tasks = tasks.map(current => current.id === task.id
          ? { ...current, completed: checkbox.checked } : current);
        save();
        render();
      });

      const title = document.createElement("span");
      title.textContent = task.title;

      const remove = document.createElement("button");
      remove.className = "delete-button";
      remove.type = "button";
      remove.textContent = "×";
      remove.setAttribute("aria-label", `Excluir ${task.title}`);
      remove.addEventListener("click", () => {
        tasks = tasks.filter(current => current.id !== task.id);
        save();
        render();
      });

      item.append(checkbox, title, remove);
      list.append(item);
    });

    const pending = countPending(tasks);
    count.textContent = `${pending} ${pending === 1 ? "tarefa pendente" : "tarefas pendentes"}`;
    empty.hidden = tasks.length > 0;
    clear.hidden = !tasks.some(task => task.completed);
  }

  form.addEventListener("submit", event => {
    event.preventDefault();
    const task = createTask(input.value);
    if (!task) return;
    tasks.push(task);
    input.value = "";
    save();
    render();
    input.focus();
  });

  clear.addEventListener("click", () => {
    tasks = tasks.filter(task => !task.completed);
    save();
    render();
  });

  render();
}
