import "../../App.css";
import io from "socket.io-client";
import { Card, Button, Form } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Chat from "./Chat";
import NavbarComponent from "../../../components/users/Navbar";

const socket = io.connect("http://localhost:5000");

function RoomChatUser() {
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [name, setName] = useState("Asep Bambang");
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setRoom(decoded.name);
      setUsername(decoded.name);
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
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const joinRoom = async () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      <NavbarComponent></NavbarComponent>
      {!showChat ? (
        <div className="joinChatContainer">
          <Form onSubmit={joinRoom}>
            <Card style={{ width: "18rem", margin: "7% auto" }}>
              <div
                style={{
                  width: "10rem",
                  margin: "10px auto",
                }}
              >
                <Card.Img
                  variant="top"
                  src="../img/logo.png"
                  style={{ borderRadius: "50%" }}
                />
              </div>

              <Card.Body>
                <Card.Title>Chat Room</Card.Title>
                <hr />
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="username"
                    className="input"
                    value={username}
                    onChange={(event) => {
                      setUsername(event.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Chat To:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="username"
                    className="input"
                    disabled
                    value={name}
                    onChange={(event) => {
                      setRoom(event.target.value);
                    }}
                  />
                </Form.Group>
                <hr />
                <Button type="submit" variant="primary">
                  Start To Chat
                </Button>
              </Card.Body>
            </Card>
          </Form>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default RoomChatUser;
