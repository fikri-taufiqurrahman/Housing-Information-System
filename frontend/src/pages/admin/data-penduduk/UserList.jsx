import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarComponent from "../../../components/admin/Navbar";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
function UserList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users-data");
    setUsers(response.data);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      getUsers();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <NavbarComponent></NavbarComponent>
      <div style={{ margin: "10% auto", width: "90%" }}>
        <h2>Data Penduduk</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>FIN</th>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Telephone</th>
              <th>House Number</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.nik}</td>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.telepon}</td>
                <td>{user.no_rumah}</td>

                <td>
                  <Link to={`edit/${user.id}`}>
                    <Button variant="success">Edit</Button>
                  </Link>
                  <Button variant="danger" onClick={() => deleteUser(user.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default UserList;
