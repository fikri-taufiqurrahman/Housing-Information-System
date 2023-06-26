import React, { useState } from "react";
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
  const today = new Date();
  const defaultMonth = today.getMonth(); // Menggunakan getMonth()+1 karena bulan dimulai dari 0
  const defaultYear = today.getFullYear();
  const [bulan, setBulan] = useState(defaultMonth);
  const [tahun, setTahun] = useState(defaultYear);
  const [users, setUser] = useState([]);

  const opsiBulan = Array.from({ length: 12 }, (_, index) =>
    new Date(0, index).toLocaleDateString("id-ID", { month: "long" })
  );

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
          <Navbar.Brand href="/admin">Housing Information System</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/admin/list-penduduk">Resident Data</Nav.Link>
              <Nav.Link href={`/admin/pembayaran/${tahun}/${opsiBulan[bulan]}`}>
                Payment
              </Nav.Link>
              <Nav.Link href={`/admin/pemasangan-air`}>
                Water Installation
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/admin/roomchat">Chat</Nav.Link>
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
