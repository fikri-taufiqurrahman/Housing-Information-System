import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import NavbarComponent from "../../../components/admin/Navbar";
import { Card, Button, Form } from "react-bootstrap";

const ProofOfPayment = () => {
  const [name, setName] = useState("");
  const [air, setAir] = useState("");
  const [hargaAir, setHargaAir] = useState("");
  const [keamanan, setKeamanan] = useState("");
  const [kebersihan, setKebersihan] = useState("");
  const [status, setStatus] = useState("berhasil");
  const [total, setTotal] = useState("");
  const [url, setUrl] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getPaymentById();
    getPrice();
  }, []);

  const getPaymentById = async () => {
    const response = await axios.get(`http://localhost:5000/users/${id}`);
    setName(response.data.name);
    setAir(response.data.air);
    setTotal(response.data.total);
    setUrl(response.data.url);
  };
  const getPrice = async () => {
    const response = await axios.get("http://localhost:5000/update-pembayaran");
    setHargaAir(response.data.hargaAir);
    setKeamanan(response.data.hargaKeamanan);
    setKebersihan(response.data.hargaKebersihan);
  };
  const handleKonfirmasiPembayaran = async (e) => {
    e.preventDefault();
    setStatus("berhasil");

    try {
      await axios.patch(`http://localhost:5000/pembayaran/${id}`, {
        status,
      });
      navigate("/admin/pembayaran");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavbarComponent></NavbarComponent>
      <div style={{ margin: " 7% auto" }}>
        <Card style={{ width: "30rem", margin: "20px auto" }}>
          <div
            style={{
              width: "25rem",
              margin: "5% auto",
            }}
          >
            <Card.Img variant="top" src={url} style={{ borderRadius: "1%" }} />
          </div>

          <Card.Body>
            <Card.Title></Card.Title>
            <hr />
            <div style={{ float: "left", width: "30%", marginLeft: "5%" }}>
              <Card.Text>
                <p>Name</p>
                <p>Water</p>
                <p>Security</p>
                <p>Cleanlines</p>
                <p>Total</p>
              </Card.Text>
            </div>
            <div style={{ float: "right", width: "65%" }}>
              <p>: {name}</p>
              <p>: {air * hargaAir}</p>
              <p>: {keamanan}</p>
              <p>: {kebersihan}</p>
              <p>
                :{" "}
                {parseInt(air) * parseInt(hargaAir) +
                  parseInt(keamanan) +
                  parseInt(kebersihan)}
              </p>
            </div>
            <hr />

            <div style={{ marginTop: "45%" }}>
              <hr />
              <div style={{ marginLeft: "25%" }}>
                <Form onSubmit={handleKonfirmasiPembayaran}>
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicPassword"
                    hidden
                  >
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter price"
                      className="input"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Button variant="primary" type="submit">
                      Payment Confirmation
                    </Button>
                  </Form.Group>
                </Form>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default ProofOfPayment;
