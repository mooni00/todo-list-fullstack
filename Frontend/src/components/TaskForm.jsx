/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";

function TaskForm({ addTask, categories }) {
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    if (categories.length > 0 && !categoryId) {
      setCategoryId(categories[0].id);
    }
  }, [categories, categoryId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim() || !categoryId) return;
    addTask(description, categoryId);
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Nouvelle tâche"
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      
      <select 
        value={categoryId} 
        onChange={(e) => setCategoryId(e.target.value)}
        required
      >
        <option value="">Choisir une catégorie</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <button type="submit" className="btn green">
        Ajouter la tâche
      </button>
    </form>
  );
}

export default TaskForm;