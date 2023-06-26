import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import NavbarComponent from "../../../components/admin/Navbar";

const FinancialReport = () => {
  const [financialData, setFinancialData] = useState([]);

  useEffect(() => {
    getFinancialReport();
  }, []);

  const getFinancialReport = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/getFinancialReport"
      );
      setFinancialData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <NavbarComponent></NavbarComponent>
      <div style={{ margin: "10% auto", width: "90%" }}>
        <h2>Financial Report</h2>
        <h4>saldo Awal</h4>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Tanggal</th>
              <th>Saldo</th>
              <th>Pemasukan</th>
              <th>Pengeluaran</th>
              <th>Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {financialData.map((data, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{data.tanggal}</td>
                <td>{data.saldo}</td>
                <td>{data.pemasukan}</td>
                <td>{data.pengeluaran}</td>
                <td>{data.keterangan}</td>
              </tr>
            ))}
          </tbody>

          <h4>saldo Akhir:</h4>
        </Table>
      </div>
    </div>
  );
};

export default FinancialReport;
