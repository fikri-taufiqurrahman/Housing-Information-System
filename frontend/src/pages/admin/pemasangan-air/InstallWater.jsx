import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

import { useParams, useNavigate } from "react-router-dom";
import NavbarComponent from "../../../components/admin/Navbar";

const InstallWater = () => {
  const [user, setUser] = useState([]);
  const [water, setWater] = useState([]);
  const [waterInstallation, setWaterInstallation] = useState([]);
  const [price, setPrice] = useState([]);
  const [category, setCategory] = useState("");
  const [diameter, setDiameter] = useState("");

  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getUserById();
  }, []);
  useEffect(() => {
    getKelompokAir();
    getInstallationCategory();
  }, [category]);
  useEffect(() => {
    getHargaInstallation();
  }, [diameter]);

  const getUserById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getKelompokAir = async () => {
    try {
      const response = await axios.get("http://localhost:5000/getWaterData");
      setWater(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getInstallationCategory = async () => {
    const kelompokPelanggan = category.split("-");
    try {
      const response = await axios.get(
        `http://localhost:5000/getWaterInstallationData/${kelompokPelanggan[0]}`
      );
      setWaterInstallation(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getHargaInstallation = async () => {
    const kelompokPelanggan = category.split("-");
    const id = diameter.split("-");
    try {
      const response = await axios.get(
        `http://localhost:5000/getWaterInstallationDataPrice/${kelompokPelanggan[0]}/${id[1]}`
      );
      setPrice(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const waterInstallationId = diameter.split("-");
    try {
      await axios.patch(
        `http://localhost:5000/updateWaterInstallation/${userId}/${waterInstallationId[1]}`,
        {
          category: category,
        }
      );
      navigate("/admin/pemasangan-air");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavbarComponent></NavbarComponent>
      <div style={{ margin: "10% auto", width: "90%" }}>
        <h2>Install Water</h2>
        <p>Name: {user.name}</p>
        <p>Role: {user.role}</p>
        <p>house Number: {user.no_rumah}</p>
        <p>Telephone: {user.telepon}</p>
        <Form onSubmit={handleSubmit}>
          <hr />
          <Form.Group controlId="category">
            <Form.Label>Category Water User</Form.Label>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">-- Choose Category --</option>
              {water.map((item) => (
                <option
                  value={`${item.kelompokPelanggan}-${item.jenisKelompokPelanggan}`}
                  key={item.id}
                >
                  {`${item.kelompokPelanggan}-${item.jenisKelompokPelanggan}`}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="diameter">
            <Form.Label>Diameter of Water</Form.Label>
            <Form.Select
              value={diameter}
              onChange={(e) => setDiameter(e.target.value)}
            >
              <option value="">-- Choose Category --</option>
              {waterInstallation.map((item) => (
                <option value={`${item.diameterAir}-${item.id}`} key={item.id}>
                  {`${item.diameterAir}`}
                </option>
              ))}
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
      /
    </div>
  );
};

export default InstallWater;
