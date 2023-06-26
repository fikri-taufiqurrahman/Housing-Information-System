import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import NavbarComponent from "../../../components/admin/Navbar";

const EditStatus = () => {
  const [air, setAir] = useState("");
  const [payment, setPayment] = useState([]);
  const [user, setUser] = useState([]);

  const navigate = useNavigate();
  const { paymentId } = useParams();
  const { tahun, bulan } = useParams();

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

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/pembayaran/${paymentId}`, {
        pemakaianAir: air,
      });
      navigate("/admin/pembayaran");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavbarComponent></NavbarComponent>
      <div style={{ width: "30%", margin: " 7% auto" }}>
        <h4>Update Water Usage</h4>
        <hr />
        <p>FIN: {user.nik}</p>
        <p>Name: {user.name}</p>
        <p>House Number: {user.no_rumah}</p>
        <p>PaymentID: {payment.pembayaranId}</p>
        <p>Water Category: {payment.id}</p>

        <hr />
        <Form onSubmit={updateUser}>
          <Form.Group className="mb-3">
            <Form.Label>
              Input Water Usage (M<sup>3</sup> )
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Water Usage"
              className="input"
              value={air}
              onChange={(e) => setAir(e.target.value)}
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

export default EditStatus;
