import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import NavbarComponent from "../../../components/admin/Navbar";

const EditUser = () => {
  const [nik, setNik] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [gender, setGender] = useState("Male");
  const [telepon, setTelepon] = useState("");
  const [no_rumah, setNoRumah] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getUserById();
  }, []);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, {
        nik,
        role,
        name,
        email,
        password,
        confPassword,
        gender,
        telepon,
        no_rumah,
      });
      navigate("/admin/list-penduduk");
    } catch (error) {
      console.log(error);
    }
  };

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:5000/users/${id}`);
    setNik(response.data.nik);
    setRole(response.data.role);
    setName(response.data.name);
    setEmail(response.data.email);
    setTelepon(response.data.telepon);
    setNoRumah(response.data.no_rumah);
  };

  return (
    <div>
      <NavbarComponent></NavbarComponent>
      <div style={{ width: "30%", margin: "7% auto" }}>
        <Form onSubmit={updateUser}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Family Identification Number</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter NIK"
              className="input"
              value={nik}
              onChange={(e) => setNik(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Role"
              className="input"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter E-Mail"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              className="input"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Gender</Form.Label>
            <Form.Select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>telepon</Form.Label>
            <Form.Control
              type="text"
              className="input"
              value={telepon}
              onChange={(e) => setTelepon(e.target.value)}
              placeholder="Telepon"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>House Number</Form.Label>
            <Form.Control
              type="text"
              className="input"
              value={no_rumah}
              onChange={(e) => setNoRumah(e.target.value)}
              placeholder="Nomor Rumah"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditUser;
