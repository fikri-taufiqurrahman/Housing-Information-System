import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams, Link } from "react-router-dom";
import NavbarComponent from "../../../components/users/Navbar";

function PayItNow() {
  const [status, setStatus] = useState("menunggu konfirmasi");
  const [hargaAir, setHargaAir] = useState("");
  const [air, setAir] = useState("");
  const [keamanan, setKeamanan] = useState("");
  const [kebersihan, setKebersihan] = useState("");
  const [user, setUser] = useState("");
  const [file, setFile] = useState("");
  const [payment, setPayment] = useState([]);
  const { tahun, bulan, paymentId } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    getPayment();
  }, []);

  const getPayment = async () => {
    const response = await axios.get(
      `http://localhost:5000/pembayaran/${tahun}/${bulan}/${paymentId} `
    );
    setPayment(response.data);
    setUser(response.data.user);
    setAir(response.data.pemakaianAir);
  };

  const loadImage = (e) => {
    const image = e.target.files[0];
    if (image !== "undefined") {
      setFile(image);
    }
  };
  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("status", status);
    formData.append("file", file);
    try {
      await axios.patch(
        `http://localhost:5000/buktipembayaran/${paymentId}`,
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      navigate(`http://localhost:3000/users/bayar/${tahun}/${bulan}`);
    } catch (error) {
      console.log(error);
    }
  };
  const totalHarga =
    parseInt(air) * parseInt(hargaAir) +
    parseInt(keamanan) +
    parseInt(kebersihan);
  return (
    <div>
      <NavbarComponent></NavbarComponent>
      <div style={{ margin: "7% auto", width: "90%" }}>
        <Card style={{ width: "19rem", float: "left", marginLeft: "40%" }}>
          <div
            style={{
              width: "10rem",
              margin: "10px auto",
            }}
          >
            <Card.Img
              variant="top"
              src="http://localhost:5000/images/bsi.png"
            />
          </div>

          <Card.Body>
            <Card.Title style={{ textAlign: "center" }}>
              Bank Syariah Indonesia
            </Card.Title>
            <hr />
            <Card.Text>
              <b>(451) 72002349 A.N Asep Bambang</b>
              <hr />

              <p>Name: {user.name}</p>
              <p>PaymentID: {payment.pembayaranId}</p>
              <p>Water: Rp{payment.air},-</p>
              <p>Security: Rp{payment.keamanan},-</p>
              <p>Cleanliness: Rp{payment.kebersihan},-</p>
              <p>Dues: Rp50000,-</p>
              <p>VAT: 10%</p>
              <p>Total: Rp{payment.pembayaranId},-</p>
            </Card.Text>

            <Form onSubmit={saveProduct}>
              <Form.Group className="mb-3">
                <Form.Label>Upload Proof of Payment:</Form.Label>
                <Form.Control
                  type="file"
                  className="file-input"
                  onChange={loadImage}
                />
              </Form.Group>
              <hr />
              <Form.Group className="mb-3" controlId="formBasicPassword" hidden>
                <Form.Label>Status</Form.Label>
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                style={{ marginLeft: "10%" }}
                onClick={() => {
                  setStatus("Waiting For Confirmation");
                }}
              >
                Payment Confirmation
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default PayItNow;
