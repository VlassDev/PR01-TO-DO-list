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
    <div className="container">
      <div className="title-container">
        <h1>Your To Do</h1>
        <div className="delete-tasks">
          {tasks.length !== 0 ? (
            <span
              onClick={handleClearTasks}
              className="material-symbols-outlined"
            >
              delete
            </span>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="input-task-container">
        <input
          className="input-task"
          type="text"
          placeholder="Agrega nueva tarea"
          value={task}
          onChange={handleImputChange}
        />
        <button className="btn-add" onClick={handleAddTask}>
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>

      <div className="count-tasks">
        {tasks.length === 0
          ? "-- No hay tareas --"
          : `Hay ${
              tasks.length === 1 ? "1 tarea" : `${tasks.length} tareas totales`
            }`}
      </div>

      <ul>
        {tasks.map((tarea) => (
          <li className="task-card" key={tarea.id}>
            <div className="container-todo">
              <div className="container-check">
                <span
                  onClick={() => handleCompleteTask(tarea.id)}
                  className="check"
                >
                  {tarea.completed === false ? (
                    <span class="material-symbols-outlined">
                      check_box_outline_blank
                    </span>
                  ) : (
                    <span class="material-symbols-outlined filled">
                      check_box
                    </span>
                  )}
                </span>
                <span
                  className="task"
                  style={{
                    textDecoration: tarea.completed ? "line-through" : "none",
                    color: tarea.completed ? "#888" : "#fff",
                  }}
                >
                  {tarea.text}
                </span>
              </div>

              <div className="delete">
                <span
                  onClick={() => handleDeleteTask(tarea.id)}
                  class="material-symbols-outlined"
                >
                  close
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
