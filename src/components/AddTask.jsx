import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/todoSlice';

const AddTask = () => {
    const dispatch = useDispatch();
    const [taskTitle, setTaskTitle] = useState('');

    const handleAddTask = () => {
        if (taskTitle.trim() !== '') { // Check if task title is not empty
            const newTask = {
              id: Date.now() + Math.random(),
              title: taskTitle,
            };
            dispatch(addTask(newTask));
            setTaskTitle(''); // Clear input field after adding task
        }
    };

  return (
    <>
      <div className="flex justify-center pt-7 gap-7">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-info w-full max-w-xs"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)} // Update taskTitle state with input value
        />
        <button onClick={handleAddTask} className="btn btn-primary rounded-3xl">
          Add Task
        </button>
      </div>
    </>
  );
};

export default AddTask;
