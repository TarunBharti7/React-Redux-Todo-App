import { createSlice } from '@reduxjs/toolkit';

// Load tasks from local storage if available
const savedTasks = JSON.parse(localStorage.getItem('tasks'));

const initialState = {
  tasks: savedTasks || [], // Use savedTasks if available, otherwise initialize as empty array
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      localStorage.setItem('tasks', JSON.stringify(state.tasks)); // Save tasks to local storage
    },
    editTask: (state, action) => {
      const { id, updatedTask } = action.payload;
      const index = state.tasks.findIndex(task => task.id === id);
      if (index !== -1) {
        state.tasks[index] = updatedTask;
        localStorage.setItem('tasks', JSON.stringify(state.tasks)); // Save tasks to local storage
      }
    },
    deleteTask: (state, action) => {
      const id = action.payload;
      state.tasks = state.tasks.filter(task => task.id !== id);
      localStorage.setItem('tasks', JSON.stringify(state.tasks)); // Save tasks to local storage
    },
  },
});

export const { addTask, editTask, deleteTask } = todoSlice.actions;

export default todoSlice.reducer;
