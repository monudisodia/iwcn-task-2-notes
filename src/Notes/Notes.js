import React, { useState,useEffect } from "react";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import "./Notes.css"

function Notes() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    useEffect(() => {
        fetchTodos();
    }, []);

    async function fetchTodos() {
        const response = await axios.get('/api/todos');
        setTodos(response.data);
    }

    const handleAddTodo = () => {

        if (!title || !description) {
            alert("Please enter details!")
            return;
        }

        const newTodo = {
            id: Date.now(),
            title:title,
            description:description,
            date: new Date().toISOString(),
        };

        // const response = axios.post('/api/todos', { title,description});
        // setTodos([...todos, response.data]);

        setTodos([...todos, newTodo]);
        setTitle("");
        setDescription("");
    };

    const handleRemoveTodo = (id) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);

    //     axios.delete(`/api/todos/${id}`);
    // setTodos(todos.filter(todo => todo.id !== id));
        setTodos(updatedTodos);
    };


    return (
        <div className="main_container">

            <div className="input_container">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button onClick={handleAddTodo}>Add</button>
            </div>

            <div className="data_container">
                {todos.map((todo) => (
                    <div className='data_card_container'>
                        <div className="title_desc">
                            <div className='title'>
                                <h4>{todo.title}</h4>
                            </div>
                            <div className='description'>{todo.description}
                            </div>

                        </div>


                        <div className='date_control'> <p>{todo.date}</p> <DeleteIcon onClick={() => handleRemoveTodo(todo.id)} /></div>
                    </div>
                ))
                }
            </div>

        </div>
    );
}

export default Notes;
