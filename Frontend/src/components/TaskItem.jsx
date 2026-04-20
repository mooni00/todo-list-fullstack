/* eslint-disable react/prop-types */
import React from "react";

function TaskItem({ task, deleteTask, toggleTask }) {
  
  const displayCategory = typeof task.category === 'object' 
    ? task.category.name 
    : task.category;

  return (
    <div className="task-item">
      <input
        type="checkbox"
        
        checked={task.is_completed} 
        
        onChange={() => toggleTask(task)} 
      />
      <span
        style={{
          textDecoration: task.is_completed ? "line-through" : "none",
          color: task.is_completed ? "#777" : "#000",
          marginLeft: "10px",
          marginRight: "10px"
        }}
      >
        
        {task.description} 
        <small style={{ fontStyle: "italic", color: "#555" }}>
          {" "}— ({displayCategory})
        </small>
      </span>
      <button className="btn red" onClick={() => deleteTask(task.id)}>
        Supprimer
      </button>
    </div>
  );
}

export default TaskItem;