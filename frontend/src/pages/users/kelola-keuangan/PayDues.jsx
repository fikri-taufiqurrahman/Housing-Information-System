import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Card } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams, Link } from "react-router-dom";
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
  const [paymentById, setPaymentById] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    refreshToken();
    getPriceById();
  }, [id]);

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
    const response = await axios.get(
      `http://localhost:5000/getPaymentById/${id}`
    );
    setPaymentById(response.data);
  };

  return (
    <div>
      <NavbarComponent></NavbarComponent>
      <div style={{ marginTop: "10%" }}>
        {/* <Card style={{ width: "19rem", float: "left", marginLeft: "100px" }}>
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
          </div> */}

        {/* <Card.Body>
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
        </Card> */}
        <div
          style={{
            width: "95%",
            marginRight: "2%",
            float: "right",
          }}
        >
          <h3>Details </h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th rowSpan={2} style={{ verticalAlign: "middle" }}>
                  No
                </th>
                <th rowSpan={2} style={{ verticalAlign: "middle" }}>
                  Name
                </th>
                <th rowSpan={2} style={{ verticalAlign: "middle" }}>
                  House Number
                </th>
                <th rowSpan={2} style={{ verticalAlign: "middle" }}>
                  PaymentID
                </th>
                <th rowSpan={2} style={{ verticalAlign: "middle" }}>
                  Water Usage
                </th>
                <th rowSpan={2} style={{ verticalAlign: "middle" }}>
                  Water Category
                </th>
                <th colspan="3">Bill</th>
                <th rowSpan={2} style={{ verticalAlign: "middle" }}>
                  VAT
                </th>
                <th rowSpan={2} style={{ verticalAlign: "middle" }}>
                  Dues
                </th>
                <th rowSpan={2} style={{ verticalAlign: "middle" }}>
                  Penalty
                </th>
                <th rowSpan={2} style={{ verticalAlign: "middle" }}>
                  Total Bill
                </th>
                <th rowSpan={2} style={{ verticalAlign: "middle" }}>
                  Status
                </th>
                <th rowSpan={2} style={{ verticalAlign: "middle" }}>
                  Actions
                </th>
              </tr>
              <tr>
                <td>
                  <b> Water</b>
                </td>
                <td>
                  <b> Security</b>
                </td>
                <td>
                  <b> Cleanliness</b>
                </td>
              </tr>
            </thead>
            <tbody>
              {paymentById.map((payment, index) => (
                <tr>
                  <td style={{ textAlign: "center" }}>{index + 1}</td>
                  <td>{payment.user.name}</td>
                  <td style={{ textAlign: "center" }}>
                    {payment.user.no_rumah}
                  </td>
                  <td>{payment.pembayaranId}</td>
                  <td>{payment.pemakaianAir}</td>
                  <td>{payment.user.water.jenisKelompokPelanggan}</td>
                  <td>Rp{payment.air},-</td>
                  <td>Rp{payment.keamanan},-</td>
                  <td>Rp{payment.kebersihan},-</td>
                  <td>{payment.price.ppn}%</td>
                  <td>Rp{payment.price.iuran},-</td>
                  <td>Rp{payment.denda + payment.dendaKebersihan},-</td>
                  <td>Rp{payment.total},-</td>
                  <td>{payment.status}</td>
                  <td>
                    <Link to={`${payment.id}`}>
                      <Button>Pay It Now</Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default PayDues;
