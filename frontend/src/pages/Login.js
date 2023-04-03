import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import Carousel from "react-bootstrap/Carousel";
import FooterComponent from "../components/admin/FooterComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [danger, setDanger] = useState(false);
  const navigate = useNavigate();
  const Auth = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/login", {
        email: email,
        password: password,
      });
      if (email === "asepbambang@gmail.com") {
        navigate("/admin");
      } else {
        navigate("/users");
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
                  <h2>Pusat Informasi Perumahan</h2>
                  <p>Dapatkan informasi perumahan secara mudah dan cepat</p>
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
                  <h2>Dapatkan pelayanan yang maksimal</h2>
                  <p>Memudahkan anda berkomunikasi dengan pihak pengurus RT</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="./img/slide-tiga.jpg"
                  alt="Third slide"
                />
                <Carousel.Caption>
                  <h2>Pembayaran yang mudah</h2>
                  <p>
                    Membayar tagihan air, keamanan, dan kebersihan secara cepat
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
          <div style={{ width: "40%", float: "right" }}>
            <Form onSubmit={Auth}>
              <img
                src="./img/logo.png"
                alt=""
                style={{ width: "400px", margin: "0 10%" }}
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
