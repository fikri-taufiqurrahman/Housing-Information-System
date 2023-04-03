import React from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
const NavbarComponent = () => {
  const navigate = useNavigate();
  const Logout = async () => {
    try {
      await axios.delete("http://localhost:5000/logout");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        style={{
          position: "fixed",
          zIndex: "1000",
          width: "100%",
          top: "0",
        }}
      >
        <Sidebar></Sidebar>

        <Container>
          <Navbar.Brand href="/users">SI Perum</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href=""></Nav.Link>
              <Nav.Link href=""></Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/users/roomchat">Chat</Nav.Link>
              <Button variant="dark" onClick={Logout}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
