import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";
import NavbarComponent from "../../../components/admin/Navbar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function CardUser() {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    refreshToken();
    getUsers();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.name);
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
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  const getUsers = async () => {
    const response = await axiosJWT.get("http://localhost:5000/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUsers(response.data);
  };
  return (
    <div>
      <NavbarComponent></NavbarComponent>
      <div style={{ textAlign: "center", margin: "80px" }}>
        <div>
          <h1>Welcome Mr. {name}</h1>
          <h2>Have a good day</h2>
        </div>
        <Card style={{ width: "18rem", margin: "20px auto" }}>
          <div
            style={{
              width: "10rem",
              margin: "10px auto",
              border: "1px solid grey",
              borderRadius: "50%",
            }}
          >
            <Card.Img
              variant="top"
              src="./img/vektor.png"
              style={{ borderRadius: "50%" }}
            />
          </div>

          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <hr />
            <Card.Text>
              <p>"The real you is what you do at the moment no one saw you."</p>
              <b>Ali bin Abi Thalib</b>
            </Card.Text>
            <hr />
            <Link to={"list-penduduk"}>
              <Button variant="primary">Start To Work</Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default CardUser;
