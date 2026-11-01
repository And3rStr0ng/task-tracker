// Estructura de datos: arreglo de objetos con descripción y estado[cite: 1, 2]
let tasks = [
  { id: 1, description: "nueva tarea creada y agreagada a la lista", completed: false },
  { id: 2, description: "Click en en el checkbox para marcar como completada", completed: false },
  { id: 3, description: "Click en en icono de basura para borrar la tarea", completed: false },
  { id: 4, description: "Las tareas completadas aparecen con tachado", completed: true },
  { id: 5, description: "Desmarcar una tarea la vuelve a poner como pendiente", completed: true }
];

// Elementos del DOM
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// Función para ordenar: las tareas completadas se trasladan al final de la lista[cite: 1, 2]
function getSortedTasks() {
  const pending = tasks.filter(t => !t.completed);
  const completed = tasks.filter(t => t.completed);
  return [...pending, ...completed];
}

// Función renderTasks para eliminar todas las tareas del DOM y re-renderizarlas[cite: 1, 2]
function renderTasks() {
  taskList.innerHTML = "";

  const sortedTasks = getSortedTasks();

  sortedTasks.forEach(task => {
    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? "completed" : ""}`;

    li.innerHTML = `
      <div class="task-item-content">
        <input 
          type="checkbox" 
          class="checkbox" 
          ${task.completed ? "checked" : ""} 
          onchange="toggleTask(${task.id})"
        >
        <span class="task-text">${task.description}</span>
      </div>
      <button class="delete-btn" onclick="deleteTask(${task.id})">🗑</button>
    `;

    taskList.appendChild(li);
  });
}

// Agregar nueva tarea[cite: 1, 2]
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  
  if (text !== "") {
    const newTask = {
      id: Date.now(),
      description: text,
      completed: false
    };
    tasks.push(newTask);
    taskInput.value = "";
    renderTasks();
  }
});

// Marcar como completa (o desmarcar para devolver a pendientes)[cite: 1, 2]
function toggleTask(id) {
  tasks = tasks.map(task => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });
  renderTasks();
}

// Eliminar tarea de la lista[cite: 1, 2]
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

// Renderizado inicial al cargar la página
renderTasks();