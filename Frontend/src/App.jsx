import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/main.css";
import CategoryForm from "./components/CategoryForm";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {

  const [categories, setCategories] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("Toutes");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  //  URL DE L'API DE DJANGO
  const API_URL = "http://127.0.0.1:8000/api";


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [resCats, resTasks] = await Promise.all([
          axios.get(`${API_URL}/categories/`),
          axios.get(`${API_URL}/tasks/`)
        ]);
        setCategories(resCats.data);
        setTasks(resTasks.data);
        setError(null);
      } catch (err) {
        console.error("Erreur au chargement :", err);
        setError("Impossible de se connecter au serveur Django.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);


  // Ajouter une nouvelle catégorie
  const addCategory = (newCatName) => {
    axios.post(`${API_URL}/categories/`, { name: newCatName })
      .then(res => {
        setCategories([...categories, res.data]);
      })
      .catch(err => {
        console.error("Erreur catégorie :", err.response?.data);
        alert("Erreur : " + JSON.stringify(err.response?.data));
      });
  };

  // Ajouter une nouvelle tâche
  const addTask = (description, categoryId) => {
    axios.post(`${API_URL}/tasks/`, {
      description: description,
      category: categoryId, // On envoie l'ID à Django
    })
    .then(res => {
      setTasks([...tasks, res.data]);
    })
    .catch(err => {
      console.error("Erreur tâche :", err.response?.data);
    });
  };

  // Supprimer une tâche
  const deleteTask = (id) => {
    axios.delete(`${API_URL}/tasks/${id}/`)
      .then(() => {
        setTasks(tasks.filter(t => t.id !== id));
      })
      .catch(err => console.error(err));
  };

  // Modifier le statut d'une tâche (terminée ou non)
  const toggleTask = (task) => {
    axios.patch(`${API_URL}/tasks/${task.id}/`, {
      is_completed: !task.is_completed,
    })
    .then(res => {
      setTasks(tasks.map(t => t.id === task.id ? res.data : t));
    })
    .catch(err => console.error(err));
  };


  // On compare l'ID de la catégorie  avec la valeur du select
  const filteredTasks = filter === "Toutes"
    ? tasks
    : tasks.filter((task) => String(task.category) === String(filter));


  return (
    <div className="app-container">
      <h1>Ma To-Do List par Catégories</h1>

      
      {error && <div className="error-banner">{error}</div>}

      <CategoryForm addCategory={addCategory} />

      <div className="filter-section">
        <select
          className="filter-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)} 
        >
          <option value="Toutes">Toutes les catégories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.name} 
            </option>
          ))}
        </select>
      </div>

      <TaskForm addTask={addTask} categories={categories} />

      {isLoading ? (
        <p>Chargement des tâches...</p>
      ) : (
        <TaskList
          tasks={filteredTasks}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
        />
      )}
    </div>
  );
}

export default App;