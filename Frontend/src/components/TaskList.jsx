/* eslint-disable react/prop-types */

import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, deleteTask, toggleTask }) {
  if (tasks.length === 0) return <p>Aucune tâche à afficher.</p>;

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
        />
      ))}
    </div>
  );
}

export default TaskList;
