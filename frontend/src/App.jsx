import React, { useState, useEffect } from "react";
import axios from "axios";
import Login from "./Login";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(""); // Track the role of the user
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    task_title: "",
    task_description: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      fetchStudents(); // Only fetch students if the user is logged in
    }
  }, [isLoggedIn]);

  // Fetch all students
  const fetchStudents = async () => {
    const response = await axios.get("http://localhost:5000/students");
    setStudents(response.data);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEdit) {
      await axios.put(`http://localhost:5000/students/${currentId}`, formData);
      setIsEdit(false);
    } else {
      await axios.post("http://localhost:5000/students", formData);
    }

    fetchStudents();
    setFormData({ task_title: "", task_description: "" });
  };

  // Handle edit
  const handleEdit = (student) => {
    setFormData(student);
    setIsEdit(true);
    setCurrentId(student.id);
  };

  // Handle delete
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/students/${id}`);
    fetchStudents();
  };

  // Handle login success
  const handleLogin = (userRole) => {
    setRole(userRole);
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />; // Pass handleLogin as a prop
  }

  return (
    <div className="container">
      <h1>Task Management</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Title"
          value={formData.task_title}
          onChange={(e) =>
            setFormData({ ...formData, task_title: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Task Description"
          value={formData.task_description}
          onChange={(e) =>
            setFormData({ ...formData, task_description: e.target.value })
          }
          required
        />
        <button type="submit">
          {isEdit ? "Update Student" : "Add Student"}
        </button>
      </form>

      <h2>Student List</h2>
      <table>
        <thead>
          <tr>
            <th>Task Title</th>
            <th>Task Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.task_title}</td>
              <td>{student.task_description}</td>
              <td>
                <button onClick={() => handleEdit(student)}>Edit</button>
                <button onClick={() => handleDelete(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
