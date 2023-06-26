import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import NavbarComponent from "../../../components/admin/Navbar";
import { Link } from "react-router-dom";

const WaterInstallationList = () => {
  const [installations, setInstallations] = useState([]);

  useEffect(() => {
    fetchInstallations();
  }, []);

  const fetchInstallations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users-data");
      setInstallations(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavbarComponent></NavbarComponent>
      <div style={{ margin: "10% auto", width: "90%" }}>
        <h2>Water Installation</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Owner Name</th>
              <th>Phone Number</th>
              <th>Role</th>
              <th>House Number</th>
              <th>Category Water User</th>
              <th>Kind Water User</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {installations.map((installation, index) => (
              <tr key={installation.id}>
                <td>{index + 1}</td>
                <td>{installation.name}</td>
                <td>{installation.telepon}</td>
                <td>{installation.role}</td>
                <td>{installation.no_rumah}</td>
                <td>{installation.water.kelompokPelanggan}</td>
                <td>{installation.water.jenisKelompokPelanggan}</td>
                <td>{installation.statusPemasanganAir}</td>
                <td>
                  <Link to={`install/${installation.id}`}>
                    <Button>Install Water</Button>
                  </Link>
                  <Link to={`status/${installation.id}`}>
                    <Button variant="success">Update Status</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>{" "}
    </div>
  );
};

export default WaterInstallationList;
