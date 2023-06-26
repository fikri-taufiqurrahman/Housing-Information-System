import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

import { useParams, useNavigate } from "react-router-dom";
import NavbarComponent from "../../../components/admin/Navbar";

const UpdateStatus = () => {
  const [user, setUser] = useState([]);
  const [price, setPrice] = useState([]);
  const [waterInstallationId, setWaterInstallationId] = useState([]);
  const [category, setCategory] = useState("");

  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getUserById();
  }, []);

  useEffect(() => {
    if (waterInstallationId) {
      getHargaInstallation();
    }
  }, [waterInstallationId]);

  const getUserById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${userId}`);
      setUser(response.data);
      setWaterInstallationId(response.data.waterInstallationId);
      console.log(user.id);
    } catch (error) {
      console.log(error);
    }
  };

  const getHargaInstallation = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/getWaterInstallationDataPrice/null/${waterInstallationId}`
      );
      setPrice(response.data);
      console.log(waterInstallationId);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.patch(
        `http://localhost:5000/updateStatusWaterInstallation/${userId}`,
        { status: category }
      );
      navigate("/admin/pemakaian-air");
    } catch (error) {
      navigate("/admin/pemakaian-air");

      console.log(error);
    }
  };

  return (
    <div>
      <NavbarComponent></NavbarComponent>
      <div style={{ margin: "10% auto", width: "90%" }}>
        <h2>Update Status</h2>
        <p>Name: {user.name}</p>
        <p>Role: {user.role}</p>
        <p>house Number: {user.no_rumah}</p>
        <p>Telephone: {user.telepon}</p>
        <Form onSubmit={handleSubmit}>
          <hr />
          <Form.Group controlId="category">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="In Process">In Process</option>
              <option value="Connected">Connected</option>
              <option value="Filed">Filed</option>
            </Form.Select>
          </Form.Group>

          <hr />
          <p>Price For Connection: Rp{price.biayaSambungan},-</p>
          <p>Price For Administration: Rp{price.biayaAdministrasi},-</p>
          <p>Price For Guarantee: Rp{price.UangJaminan},-</p>
          <hr />
          <p>Total Price: Rp{price.total},-</p>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default UpdateStatus;
