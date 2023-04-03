import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import NavbarComponent from "../../../components/admin/Navbar";

const EditStatus = () => {
  const [air, setAir] = useState("");
  const [keamanan, setKeamanan] = useState("");
  const [kebersihan, setKebersihan] = useState("");
  const [hargaAir, setHargaAir] = useState("");
  const [status, setStatus] = useState("berhasil");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getUserById();
    getHarga();
  }, []);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/pembayaran/${id}`, {
        air,
        keamanan,
        kebersihan,
        status,
      });
      navigate("/admin/pembayaran");
    } catch (error) {
      console.log(error);
    }
  };

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:5000/pembayaran/${id}`);
    setAir(response.data.air);
  };
  const getHarga = async () => {
    const response = await axios.get(`http://localhost:5000/update-pembayaran`);
    setHargaAir(response.data.hargaAir);
    setKeamanan(response.data.hargaKeamanan);
    setKebersihan(response.data.hargaKebersihan);
  };

  return (
    <div>
      <NavbarComponent></NavbarComponent>
      <div style={{ width: "30%", margin: " 7% auto" }}>
        <Form onSubmit={updateUser}>
          <Form.Group className="mb-3">
            <Form.Label>
              Input Pemakaian Air (M<sup>3</sup> )
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              className="input"
              value={air}
              onChange={(e) => setAir(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" hidden>
            <Form.Label>keamanan (Rupiah) </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter price"
              className="input"
              value={keamanan}
              onChange={(e) => setKeamanan(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" hidden>
            <Form.Label>kebersihan (Rupiah)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter price"
              className="input"
              value={kebersihan}
              onChange={(e) => setKebersihan(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="berhasil">berhasil</option>
              <option value="menunggu konfirmasi">manunggu konfirmasi</option>
              <option value="belum dibayar">belum dibayar</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditStatus;
