import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Card } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import NavbarComponent from "../../../components/users/Navbar";
const PayDues = () => {
  const [status, setStatus] = useState("menunggu konfirmasi");
  const [name, setName] = useState("");
  const [hargaAir, setHargaAir] = useState("");
  const [air, setAir] = useState("");
  const [keamanan, setKeamanan] = useState("");
  const [kebersihan, setKebersihan] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [id, setId] = useState("");
  const [file, setFile] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    refreshToken();
    getPriceById();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.name);
      setId(decoded.userId);
      setAir(decoded.air);
      setStatus(decoded.status);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  };
  const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:5000/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setName(decoded.name);
        setId(decoded.userId);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getPriceById = async () => {
    const response = await axios.get("http://localhost:5000/update-pembayaran");
    setHargaAir(response.data.hargaAir);
    setKeamanan(response.data.hargaKeamanan);
    setKebersihan(response.data.hargaKebersihan);
  };

  const loadImage = (e) => {
    const image = e.target.files[0];
    if (image !== "undefined") {
      setFile(image);
    }
  };
  const saveProduct = async (e) => {
    setPrice(totalHarga);
    e.preventDefault();
    const formData = new FormData();
    formData.append("status", status);
    formData.append("price", price);
    formData.append("file", file);
    try {
      await axios.patch(
        `http://localhost:5000/buktipembayaran/${id}`,
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      navigate("/users/bayar");
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
      <div style={{ marginTop: "10%" }}>
        <Card style={{ width: "19rem", float: "left", marginLeft: "100px" }}>
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

              <p>
                Nama: <b>{name}</b>
              </p>
              <p>
                Total Iuran:
                <b> Rp{totalHarga},-</b>
              </p>
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
                  setStatus("menunggu konfirmasi");
                }}
              >
                Payment Confirmation
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div style={{ width: "50%", marginRight: "20%", float: "right" }}>
          <h3>Details </h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Water </th>
                <th>Security</th>
                <th>Cleanliness</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr key={id}>
                <td>{name}</td>
                <td>Rp{air * hargaAir},</td>
                <td>Rp{keamanan},-</td>
                <td>Rp{kebersihan},-</td>
                <td>
                  Rp
                  {totalHarga}
                  ,-
                </td>
                <td>{status}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default PayDues;
