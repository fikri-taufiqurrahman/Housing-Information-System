import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import NavbarComponent from "../../../components/admin/Navbar";
import { Card, Button, Form } from "react-bootstrap";

const ProofOfPayment = () => {
  const [name, setName] = useState("");
  const [air, setAir] = useState("");
  const [pemakaianAir, setPemakaianAir] = useState("");
  const [iuran, setIuran] = useState("");
  const [keamanan, setKeamanan] = useState("");
  const [kebersihan, setKebersihan] = useState("");
  const [status, setStatus] = useState("berhasil");
  const [total, setTotal] = useState("");
  const [url, setUrl] = useState("");

  const navigate = useNavigate();
  const { paymentId } = useParams();

  useEffect(() => {
    getPaymentById();
  }, []);

  const getPaymentById = async () => {
    const response = await axios.get(
      `http://localhost:5000/pembayaran/null/null/${paymentId}`
    );
    setName(response.data.user.name);
    setAir(response.data.air);
    setKeamanan(response.data.keamanan);
    setKebersihan(response.data.kebersihan);
    setIuran(50000);
    setTotal(response.data.total);
    setUrl(response.data.url);
  };
  const handleKonfirmasiPembayaran = async (e) => {
    e.preventDefault();
    setStatus("berhasil");

    try {
      await axios.patch(`http://localhost:5000/statusPembayaran/${paymentId}`, {
        status: status,
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
                <p>VAT</p>
                <p>Dues</p>
                <p>Total</p>
              </Card.Text>
            </div>
            <div style={{ float: "right", width: "65%" }}>
              <p>: {name}</p>
              <p>: Rp{air},-</p>
              <p>: Rp{keamanan},-</p>
              <p>: Rp{kebersihan},-</p>
              <p>: 10%</p>
              <p>: Rp{iuran},-</p>
              <p>: Rp{total},-</p>
            </div>
            <hr />

            <div style={{ marginTop: "45%" }}>
              <hr />
              <div style={{ marginLeft: "5%" }}>
                <Form onSubmit={handleKonfirmasiPembayaran}>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="Waiting For Confirmation">
                        Waiting For Confirmation
                      </option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Not Yet Paid">Not Yet Paid</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Button variant="primary" type="submit">
                      Update Status
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
