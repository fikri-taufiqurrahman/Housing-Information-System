import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import NavbarComponent from "../../../components/admin/Navbar";

const EditPrice = () => {
  const [hargaAir, setHargaAir] = useState("");
  const [hargaKeamanan, setHargaKeamanan] = useState("");
  const [hargaKebersihan, setHargaKebersihan] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getPriceById();
  }, []);

  const getPriceById = async () => {
    const response = await axios.get("http://localhost:5000/update-pembayaran");
    setHargaAir(response.data.hargaAir);
    setHargaKeamanan(response.data.hargaKeamanan);
    setHargaKebersihan(response.data.hargaKebersihan);
  };

  const updateHarga = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/updateharga-pembayaran/${id}`, {
        hargaAir,
        hargaKeamanan,
        hargaKebersihan,
      });
      navigate("/admin/pembayaran");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavbarComponent></NavbarComponent>
      <div style={{ marginTop: "10%", width: "30%", marginLeft: "35%" }}>
        <Form onSubmit={updateHarga}>
          <Form.Group className="mb-3">
            <h2>Update Price</h2>
            <Form.Label>
              Water Price Input (M<sup>3</sup> )
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              className="input"
              value={hargaAir}
              onChange={(e) => setHargaAir(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Security Price Input</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              className="input"
              value={hargaKeamanan}
              onChange={(e) => setHargaKeamanan(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Cleanliness Price Input</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              className="input"
              value={hargaKebersihan}
              onChange={(e) => setHargaKebersihan(e.target.value)}
            />
          </Form.Group>
          <Button variant="success" type="submit">
            Edit Harga
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditPrice;
