import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";

function Sidebar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <style type="text/css">{`
      .accordion {
        --bs-accordion-bg: #8e97a0;
     
      }
      .accordion-button {
        background-color: rgb(33, 36, 41);
        color: white;
      }
      .accordion-button:not(.collapsed) {
        color: white;
        background-color: #4c535c;
        box-shadow: black
    }

      
      `}</style>
      <Button
        style={{ marginLeft: "20px", width: "70px" }}
        variant="dark"
        onClick={handleShow}
      >
        <img
          src="https://i.ibb.co/mRzmDtw/SIP.png"
          style={{ width: "100%" }}
          alt=""
        />
      </Button>

      <Offcanvas
        style={{ backgroundColor: "#212429", color: "white" }}
        show={show}
        onHide={handleClose}
        backdrop="static"
      >
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title>Sistem Informasi Perum</Offcanvas.Title>
        </Offcanvas.Header>
        <img
          src="https://i.ibb.co/mRzmDtw/SIP.png"
          alt=""
          style={{ width: "250px", margin: "0px auto" }}
        />
        <Offcanvas.Body>
          <div className="s" style={{ backgroundColor: "#0000" }}>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Kelola Data Penduduk</Accordion.Header>
                <Accordion.Body>
                  <Link to={"/admin/list-penduduk/add"}>
                    <Button style={{ width: 330 }}>Registrasi Penduduk</Button>
                  </Link>
                  <div className="mb-2"></div>
                  <Link to={"/admin/list-penduduk"}>
                    <Button style={{ width: 330 }}>Data Penduduk</Button>
                  </Link>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Kelola Keuangan</Accordion.Header>
                <Accordion.Body>
                  <Link to={"/admin/pembayaran"}>
                    <Button style={{ width: 330 }}>Kelola Iuran Warga</Button>
                  </Link>
                  <div className="mb-2"></div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Kelola Pengumuman</Accordion.Header>
                <Accordion.Body>
                  <Link to={"/admin/berita/add"}>
                    <Button style={{ width: 330 }}>Tambah Pengumuman</Button>
                  </Link>
                  <div className="mb-2"></div>
                  <Link to={"/admin/berita"}>
                    <Button style={{ width: 330 }}>Lihat Pengumuman</Button>
                  </Link>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header>Kelola Akun</Accordion.Header>
                <Accordion.Body>
                  <Link to={"/users"}>
                    <Button style={{ width: 330 }}>Login Sebagai User</Button>
                  </Link>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Sidebar;
