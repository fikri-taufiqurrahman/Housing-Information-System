import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import NavbarComponent from "../../../components/admin/Navbar";

const PaymentList = () => {
  const [users, setUser] = useState([]);
  const [hargaAir, setHargaAir] = useState("");
  const [keamanan, setKeamanan] = useState("");
  const [kebersihan, setKebersihan] = useState("");

  useEffect(() => {
    getUsers();
    getPriceById();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/pembayaran");
    setUser(response.data);
  };
  const getPriceById = async () => {
    const response = await axios.get("http://localhost:5000/update-pembayaran");
    setHargaAir(response.data.hargaAir);
    setKeamanan(response.data.hargaKeamanan);
    setKebersihan(response.data.hargaKebersihan);
  };

  return (
    <div>
      <NavbarComponent></NavbarComponent>
      <Link to="updateharga">
        <Button variant="primary">Edit Harga</Button>
      </Link>
      <div style={{ margin: "7% auto", width: "90%" }}>
        <h2>Kelola Keuangan</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>No Rumah</th>
              <th>Air</th>
              <th>Keamanan</th>
              <th>Kebersihan</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.no_rumah}</td>
                <td>Rp{parseInt(user.air) * parseInt(hargaAir)},-</td>
                <td>Rp{keamanan},-</td>
                <td>Rp{kebersihan},-</td>
                <td>
                  Rp
                  {parseInt(user.air) * parseInt(hargaAir) +
                    parseInt(keamanan) +
                    parseInt(kebersihan)}
                  ,-
                </td>
                <td>{user.status}</td>
                <td>
                  <Link to={`edit/${user.id}`}>
                    <Button variant="success">Edit</Button>
                  </Link>

                  <Link
                    to={`/admin/buktipembayaran/${user.id}`}
                    style={{ marginLeft: "5px" }}
                  >
                    <Button variant="primary">Bukti Pembayaran</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Link to={"updateharga"}>
          <Button>Update Harga Pemakaian Air, Keamanan dan Kebersihan</Button>
        </Link>
        ;
      </div>
    </div>
  );
};

export default PaymentList;
