import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";

const WaterDataTable = () => {
  const [waterData, setWaterData] = useState([]);

  useEffect(() => {
    fetchWaterData();
  }, []);

  const fetchWaterData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/WaterData");
      setWaterData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Kelompok Pelanggan</th>
            <th>Jenis Kelompok Pelanggan</th>
            <th>
              Tarif 0-3 M<sup>3</sup>
            </th>
            <th>
              Tarif 3-10 M<sup>3</sup>
            </th>
            <th>
              Tarif 10-20 M<sup>3</sup>
            </th>
            <th>
              Tarif Diatas 20 M<sup>3</sup>
            </th>
          </tr>
        </thead>
        <tbody>
          {waterData.map((data) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.kelompokPelanggan}</td>
              <td>{data.jenisKelompokPelanggan}</td>
              <td>{data.Tarif0to3}</td>
              <td>{data.Tarif3to10}</td>
              <td>{data.Tarif10to20}</td>
              <td>{data.TarifAbove20}</td>
              <td>
                <Button style={{ marginRight: "2px" }}>Edit</Button>
                <Button>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button style={{ marginLeft: "40%", width: "10%" }}>Add Data</Button>
    </div>
  );
};
export default WaterDataTable;
