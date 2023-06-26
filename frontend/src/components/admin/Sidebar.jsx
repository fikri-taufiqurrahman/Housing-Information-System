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
          <Offcanvas.Title>Housing Information System</Offcanvas.Title>
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
                <Accordion.Header>Manage Resident Data</Accordion.Header>
                <Accordion.Body>
                  <Link to={"/admin/list-penduduk/add"}>
                    <Button style={{ width: 330 }}>
                      Resident Registration
                    </Button>
                  </Link>
                </Accordion.Body>
              </Accordion.Item>
              {/* <Accordion.Item eventKey="1">
                <Accordion.Header>Manage Finance</Accordion.Header>
                <Accordion.Body>
                  <Link to={"/admin/laporan-keuangan"}>
                    <Button style={{ width: 330 }}>Manage Finance</Button>
                  </Link>
                  <div className="mb-2"></div>
                </Accordion.Body>
              </Accordion.Item> */}
              <Accordion.Item eventKey="3">
                <Accordion.Header>Manage News</Accordion.Header>
                <Accordion.Body>
                  <Link to={"/admin/berita/add"}>
                    <Button style={{ width: 330 }}>Add News</Button>
                  </Link>
                  <div className="mb-2"></div>
                  <Link to={"/admin/berita"}>
                    <Button style={{ width: 330 }}>See News</Button>
                  </Link>
                </Accordion.Body>
              </Accordion.Item>
              {/* <Accordion.Item eventKey="4">
                <Accordion.Header>
                  Manage (Friday Clean) Frilean
                </Accordion.Header>
                <Accordion.Body>
                  <Link to={"/admin/list-penduduk/add"}>
                    <Button style={{ width: 330 }}>Frilean Data</Button>
                  </Link>
                </Accordion.Body>
              </Accordion.Item> */}
              <Accordion.Item eventKey="5">
                <Accordion.Header>Manage an Account</Accordion.Header>
                <Accordion.Body>
                  <Link to={"/users"}>
                    <Button style={{ width: 330 }}>Login As User</Button>
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
