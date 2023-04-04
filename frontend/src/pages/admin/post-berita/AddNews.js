import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Card, Button } from "react-bootstrap";

const AddNews = () => {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);
    try {
      await axios.post("http://localhost:5000/news", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      navigate("/admin/berita");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card style={{ width: "30rem", margin: "20px auto" }}>
      <div
        style={{
          width: "20rem",
          margin: "10px auto",

          borderRadius: "3%",
        }}
      >
        <Card.Img
          variant="top"
          src={preview}
          style={{ borderRadius: "3%", height: "20rem", objectFit: "cover" }}
        />
      </div>

      <Card.Body>
        <Form onSubmit={saveProduct}>
          <Form.Group className="mb-3">
            <Form.Label>file image:</Form.Label>
            <Form.Control
              type="file"
              className="file-input"
              onChange={loadImage}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              type="text"
              className="input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="News Name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddNews;
