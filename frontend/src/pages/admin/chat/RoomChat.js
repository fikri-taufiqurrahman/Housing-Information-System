import "../../App.css";
import io from "socket.io-client";
import { Card, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import Chat from "./Chat";
import NavbarComponent from "../../../components/admin/Navbar";

const socket = io.connect("http://localhost:5000");

function RoomChat() {
  const [username, setUsername] = useState("Asep Bambang");
  const [room, setRoom] = useState("Fikri Taufiqurrahman");
  const [showChat, setShowChat] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/pembayaran");
    setUsers(response.data);
  };

  const joinRoom = () => {
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
                <Form.Group className="mb-3">
                  <Form.Label>Chat To: </Form.Label>
                  <Form.Select
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                  >
                    {users.map((user) => (
                      <option value={user.name}>{user.name}</option>
                    ))}
                  </Form.Select>
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

export default RoomChat;
