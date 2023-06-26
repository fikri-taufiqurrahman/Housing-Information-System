import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import Carousel from "react-bootstrap/Carousel";
import FooterComponent from "../components/admin/FooterComponent";
import axios from "axios";
import { json, useNavigate } from "react-router-dom";

const Login = () => {
  const today = new Date();
  const defaultMonth = today.getMonth(); // Menggunakan getMonth()+1 karena bulan dimulai dari 0
  const defaultYear = today.getFullYear();
  const [bulan, setBulan] = useState(defaultMonth);
  const [tahun, setTahun] = useState(defaultYear);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [danger, setDanger] = useState(false);
  const navigate = useNavigate();

  const opsiBulan = Array.from({ length: 12 }, (_, index) =>
    new Date(0, index).toLocaleDateString("id-ID", { month: "long" })
  );
  const Auth = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: email,
        password: password,
      });
      if (response.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate(`/users/bayar/${tahun}/${opsiBulan[bulan]}`);
      }
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div style={{ width: "80rem", margin: "10% auto" }}>
      <Card>
        <Card.Body>
          <div style={{ width: "55%", float: "left" }}>
            <Carousel>
              <Carousel.Item interval={2000}>
                <img
                  className="d-block w-100"
                  src="./img/slide-satu.jpg"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h2>Housing Information System</h2>
                  <p>Get housing information easily and quickly</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={1000}>
                <img
                  className="d-block w-100"
                  src="
                  ./img/slide-dua.jpg"
                  alt="Second slide"
                />
                <Carousel.Caption>
                  <h2>Get maximum services</h2>
                  <p>
                    Make it easy for you to communicate with the Household
                    management
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="./img/slide-tiga.jpg"
                  alt="Third slide"
                />
                <Carousel.Caption>
                  <h2>Easy payments</h2>
                  <p>Pay for water, security, and cleanliness bills quickly</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
          <div style={{ width: "40%", float: "right" }}>
            <Form onSubmit={Auth}>
              <img
                src="./img/logo.png"
                alt=""
                style={{ width: "200px", margin: "0 30%" }}
              />
              <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter email"
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>
              <Form.Group className="mb-4" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Form.Group>
              <Alert show={danger} variant="danger">
                {msg}
              </Alert>
              <Button
                variant="primary"
                type="submit"
                onClick={() => setDanger(true)}
              >
                Submit
              </Button>
            </Form>
          </div>
        </Card.Body>
      </Card>
      <FooterComponent />
    </div>
  );
};

export default Login;
