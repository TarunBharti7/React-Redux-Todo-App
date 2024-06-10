import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editTask, deleteTask, setTasks } from '../redux/todoSlice';

const ShowTodo = () => {
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.todo.tasks);
    const [update, setUpdate] = useState("");
    const [currentTaskId, setCurrentTaskId] = useState(null);

    useEffect(() => {
        // Load tasks from local storage when the component mounts
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (savedTasks) {
            dispatch(setTasks(savedTasks));
        }
    }, [dispatch]);

    const handleEditTask = (id) => {
        const updatedTask = {
            id: id,
            title: update,
        };
        dispatch(editTask({ id: id, updatedTask }));
        setUpdate("");
        setCurrentTaskId(null);
    };

    const handleDeleteTask = (id) => {
        dispatch(deleteTask(id));
    };

    const openModal = (id, currentTitle) => {
        setCurrentTaskId(id);
        setUpdate(currentTitle);
        document.getElementById(`modal_${id}`).showModal();
    };

    const closeModal = (id) => {
        setCurrentTaskId(null);
        setUpdate("");
        document.getElementById(`modal_${id}`).close();
    };

    return (
        <>
            <div className='flex lg:justify-around justify-center pt-10 flex-wrap lg:gap-20 gap-10 pl-8 lg:pl-0'>
                {tasks.map(task => (
                    <div key={task.id} className="card w-80 bg-neutral text-neutral-content">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{task.title}</h2>
                            <div className="card-actions justify-end">
                                <button className="btn btn-success" onClick={() => openModal(task.id, task.title)}>Update</button>
                                <dialog id={`modal_${task.id}`} className="modal">
                                    <div className="modal-box">
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            className="input input-bordered input-info w-full max-w-xs"
                                            value={update}
                                            onChange={(e) => setUpdate(e.target.value)} // Update taskTitle state with input value
                                        />
                                        <div className="modal-action">
                                            <button className="btn btn-success" onClick={() => handleEditTask(task.id)}>Update</button>
                                            <button className="btn btn-error" onClick={() => closeModal(task.id)}>Cancel</button>
                                        </div>
                                    </div>
                                </dialog>
                                <button className="btn btn-error" onClick={() => handleDeleteTask(task.id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ShowTodo;
