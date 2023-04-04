import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const EditNews = () => {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getNewsById();
  }, []);

  const getNewsById = async () => {
    const response = await axios.get(`http://localhost:5000/news/${id}`);
    setDescription(response.data.name);
    setFile(response.data.image);
    setPreview(response.data.url);
  };

  const loadImage = (e) => {
    const image = e.target.files[0];
    if (image !== "undefined") {
      setFile(image);
      setPreview(URL.createObjectURL(image));
    }
  };

  const updateNews = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);
    try {
      await axios.patch(`http://localhost:5000/news/${id}`, formData, {
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
    <div>
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
          <Form onSubmit={updateNews}>
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
    </div>
    // <div className="columns is-centerd mt-5">
    //   <div className="column is-half">
    //     <form onSubmit={updateNews}>
    //       <div className="field">
    //         <label className="label">News Name</label>
    //         <div className="control">
    //           <input
    //             type="text"
    //             className="input"
    //             value={description}
    //             onChange={(e) => setDescription(e.target.value)}
    //             placeholder="News Name"
    //           />
    //         </div>
    //       </div>

    //       <div className="field">
    //         <label className="label">Image</label>
    //         <div className="control">
    //           <div className="File">
    //             <label className="file-label">
    //               <input
    //                 type="file"
    //                 className="file-input"
    //                 onChange={loadImage}
    //               />
    //               <span className="file-cta">
    //                 <span className="file-label">Choose a file...</span>
    //               </span>
    //             </label>
    //           </div>
    //         </div>
    //       </div>

    //       {preview ? (
    //         <figure className="image is-128x128">
    //           <img src={preview} alt="Preview Image" />
    //         </figure>
    //       ) : (
    //         ""
    //       )}
    //       <div className="field">
    //         <div className="control">
    //           <button type="submit" className="button is-success">
    //             update
    //           </button>
    //         </div>
    //       </div>
    //     </form>
    //   </div>
    // </div>
  );
};

export default EditNews;
