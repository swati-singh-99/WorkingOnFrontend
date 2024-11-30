import { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";

function Details() {
    const [users, setUsers] = useState([]);
    const [newUserTitle, setNewUserTitle] = useState(""); 
    const currentDate = new Date().toISOString();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const result = await axios.get('https://jsonplaceholder.typicode.com/todos');
                setUsers(result.data.slice(0, 10));  
            } catch (error) {
                console.log(error);  
            }
        };
        fetchUsers();
    }, []);

    const handleDelete = (id) => {
        setUsers(users.filter((user) => user.id !== id));  
    };

    const handleUpdate = (id) => {
        const updatedUsers = users.map(user => 
            user.id === id ? { ...user, completed: !user.completed } : user
        );
        setUsers(updatedUsers);
    };

    const handleAddUser = () => {
        if (newUserTitle.trim() === "") return; 
        
        const newUser = {
            id: users.length + 1,
            title: newUserTitle,
            completed: false, 
        };
        setUsers([...users, newUser]); 
        setNewUserTitle(""); 
    };

    return (
        <>
            <div className="add-user">
                <input 
                    type="text" 
                    value={newUserTitle} 
                    onChange={(e) => setNewUserTitle(e.target.value)} 
                    placeholder="Enter user title" 
                />
                <button onClick={handleAddUser}>Add User</button>
            </div>
            <table id="userTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Completed</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.title}</td>
                            <td>{user.completed.toString()}</td> 
                            <td>{currentDate}</td>
                            <td>
                                <button onClick={() => handleDelete(user.id)}>Delete</button>
                                <button onClick={() => handleUpdate(user.id)}>Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Details;
