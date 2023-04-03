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
          <div style={{ backgroundColor: "#0000" }}>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="1">
                <Accordion.Header>Pembayaran</Accordion.Header>
                <Accordion.Body>
                  <Link to={"/users/bayar"}>
                    <Button style={{ width: 330 }}>Bayar Iuran</Button>
                  </Link>
                  <div className="mb-2"></div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Pengumuman</Accordion.Header>
                <Accordion.Body>
                  <Link to={"/users/berita"}>
                    <Button style={{ width: 330 }}>Lihat Pengumuman</Button>
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
