import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleImputChange = (event) => {
    setTask(event.target.value);
  };

  // 📝 AGREGAR TAREA A LA LISTA
  const handleAddTask = () => {
    // [-] verificar si el task está vacio
    if (task.trim() === "") return;

    // [-] agregar la tarea al array task usando setTasks
    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };
    setTasks([...tasks, newTask]);

    // [-] limpiar el input (setTask(''))
    setTask("");
  };

  // ❌ ELIMINAR TAREA DE LA LISTA
  const handleDeleteTask = (id) => {
    let newTasks = tasks.filter((tarea) => tarea.id !== id);
    setTasks(newTasks);
  };

  // ✅ MARCAR TAREA COMPLETADA
  const handleCompleteTask = (id) => {
    console.log("Tarea completada", id);
    const updatedTasks = tasks.map((tarea) =>
      tarea.id === id ? { ...tarea, completed: !tarea.completed } : tarea
    );
    setTasks(updatedTasks);
  };

  // 🟢 V2
  // Comprobar si hay lista de tareas en localStorage
  useEffect(() => {
    const savedTasksStorage = localStorage.getItem("tasks");
    if (savedTasksStorage) {
      const newTasks = JSON.parse(savedTasksStorage);
      setTasks(newTasks);
    }
  }, []);

  // Guardar tarea en localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Eliminar todas las tareas
  const handleClearTasks = () => {
    setTasks([]);
    localStorage.removeItem("tasks");
  };

  return (
    <div>
      <h1>Mi Lista de Tareas</h1>

      <input
        type="text"
        placeholder="Escriba una tarea"
        value={task}
        onChange={handleImputChange}
      />
      <button onClick={handleAddTask}>Agregar</button>

      <h2>Lista de tareas</h2>
      <button onClick={handleClearTasks}>Eliminar tareas</button>
      <ul>
        {tasks.map((tarea) => (
          <li
            key={tarea.id}
            style={{
              textDecoration: tarea.completed ? "line-through" : "none",
              color: tarea.completed ? "#888" : "#fff",
            }}
          >
            {tarea.text}
            <button onClick={() => handleDeleteTask(tarea.id)}>❌</button>
            <button onClick={() => handleCompleteTask(tarea.id)}>
              {" "}
              {tarea.completed === false ? "✅" : "⏳"}{" "}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
