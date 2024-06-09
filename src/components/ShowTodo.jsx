import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editTask, deleteTask } from '../redux/todoSlice';

const ShowTodo = () => {
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.todo.tasks);
    const [update, setUpdate] = useState("");

    useEffect(() => {
        // Load tasks from local storage when the component mounts
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (savedTasks) {
            dispatch({ type: 'todo/setTasks', payload: savedTasks });
        }
    }, [dispatch]);

    const handleEditTask = (id) => {
        console.log(update);
        const updatedTask = {
            id: id,
            title: update,
        };
        dispatch(editTask({ id: id, updatedTask }));
    };

    const handleDeleteTask = (id) => {
        dispatch(deleteTask(id));
    };

    return (
        <>
            <div className='flex justify-around pt-10 flex-wrap gap-20'>
                {tasks.map(task => (
                    <div key={task.id} className="card w-80 bg-neutral text-neutral-content">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{task.title}</h2>
                            <div className="card-actions justify-end">
                                {/* update task modal */}
                                <button className="btn btn-success" onClick={() => document.getElementById('my_modal_1').showModal()}>Update</button>
                                <dialog id="my_modal_1" className="modal">
                                    <div className="modal-box">
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            className="input input-bordered input-info w-full max-w-xs"
                                            value={update}
                                            onChange={(e) => setUpdate(e.target.value)} // Update taskTitle state with input value
                                        />
                                        <div className="modal-action">
                                            <form method="dialog">
                                                {/* if there is a button in form, it will close the modal */}
                                                <button className="btn btn-success" onClick={() => handleEditTask(task.id)}>Update</button>
                                            </form>
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

export default ShowTodo