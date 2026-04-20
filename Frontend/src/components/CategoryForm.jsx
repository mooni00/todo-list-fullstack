/* eslint-disable react/prop-types */
import React, { useState } from "react";

function CategoryForm({ addCategory }) {
  const [newCat, setNewCat] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addCategory(newCat.trim());
    setNewCat("");
  };

  return (
    <form onSubmit={handleSubmit} className="category-form">
      <input
        type="text"
        placeholder="Nouvelle catégorie"
        value={newCat}
        onChange={(e) => setNewCat(e.target.value)}
      />
      <button type="submit" className="btn green">
        Ajouter catégorie
      </button>
    </form>
  );
}

export default CategoryForm;

