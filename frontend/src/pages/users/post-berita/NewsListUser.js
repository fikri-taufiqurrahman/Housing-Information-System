import React, { useState, useEffect } from "react";
import axios from "axios";
import NavbarComponent from "../../../components/users/Navbar";
import { Card } from "react-bootstrap";

const NewsListUser = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    getNews();
  }, []);

  const getNews = async () => {
    const response = await axios.get("http://localhost:5000/news");
    setNews(response.data);
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
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsListUser;
