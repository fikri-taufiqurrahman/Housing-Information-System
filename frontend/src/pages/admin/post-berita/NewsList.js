import React, { useState, useEffect } from "react";
import axios from "axios";
import NavbarComponent from "../../../components/admin/Navbar";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const NewsList = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    getNews();
  }, []);

  const getNews = async () => {
    const response = await axios.get("http://localhost:5000/news");
    setNews(response.data);
  };

  const deleteProduct = async (beritaId) => {
    try {
      await axios.delete(`http://localhost:5000/news/${beritaId}`);
      getNews();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavbarComponent></NavbarComponent>
      <div style={{ marginTop: "15%" }}>
        <div className="container ">
          {news.map((berita) => (
            <Card
              style={{ width: "30rem", margin: "20px auto", paddingTop: "3%" }}
            >
              <div
                style={{
                  width: "20rem",
                  height: "20rem",
                  margin: "5% auto",

                  borderRadius: "10%",
                }}
              >
                <Card.Img
                  variant="top"
                  src={berita.url}
                  style={{
                    width: "20rem",
                    height: "20rem",
                    objectFit: "cover",
                  }}
                />
              </div>

              <Card.Body>
                <Card.Title style={{ textAlign: "center" }}>
                  {berita.description}
                </Card.Title>
                <hr />
                <Card.Text>
                  <p>Last Update: {berita.updatedAt}</p>
                </Card.Text>
                <hr />

                <Link
                  to={`/admin/berita/edit/${berita.id}`}
                  className="card-footer-item"
                >
                  <Button variant="primary">Edit</Button>
                </Link>
                <Button
                  variant="danger"
                  style={{ float: "right" }}
                  onClick={() => deleteProduct(berita.id)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsList;
