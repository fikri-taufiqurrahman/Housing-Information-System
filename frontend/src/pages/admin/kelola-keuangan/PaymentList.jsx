import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Table, Button, Form } from "react-bootstrap";
import NavbarComponent from "../../../components/admin/Navbar";

const PaymentList = () => {
  const navigate = useNavigate();
  const { year, month } = useParams();
  const date = new Date(`${month} 1, ${year}`);

  const defaultMonth = date.getMonth();
  const defaultYear = date.getFullYear();
  const [bulan, setBulan] = useState(defaultMonth);
  const [tahun, setTahun] = useState(defaultYear);
  const [users, setUser] = useState([]);

  useEffect(() => {
    getUsers();
  }, [bulan, tahun]);

  const getUsers = async () => {
    const response = await axios.get(
      `http://localhost:5000/pembayaran/${tahun}/${opsiBulan[bulan]}`
    );
    setUser(response.data);
  };

  const monthOptions = Array.from({ length: 12 }, (_, index) =>
    new Date(0, index).toLocaleDateString("en-US", { month: "long" })
  );

  const opsiBulan = Array.from({ length: 12 }, (_, index) =>
    new Date(0, index).toLocaleDateString("id-ID", { month: "long" })
  );

  const handlePrevMonth = () => {
    if (bulan === 0) {
      setBulan(11);
      setTahun(tahun - 1);
    } else {
      setBulan(bulan - 1);
    }
  };

  const handleNextMonth = () => {
    if (bulan === 11) {
      setBulan(0);
      setTahun(tahun + 1);
    } else {
      setBulan(bulan + 1);
    }
  };
  return (
    <div>
      <NavbarComponent></NavbarComponent>
      <Link to="updateharga">
        <Button variant="primary">Edit Price</Button>
      </Link>
      <div style={{ margin: "7% auto", width: "90%" }}>
        <h2>Manage Finance</h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <Button onClick={handlePrevMonth}>&lt;</Button>
          <h5
            style={{ margin: "20px 50px" }}
          >{`  ${monthOptions[bulan]}/${tahun}   `}</h5>
          <Button onClick={handleNextMonth}>&gt;</Button>
        </div>
        <Table striped bordered hover>
          <thead style={{ textAlign: "center" }}>
            <tr>
              <th rowSpan={2} style={{ verticalAlign: "middle" }}>
                No
              </th>
              <th rowSpan={2} style={{ verticalAlign: "middle" }}>
                Name
              </th>
              <th rowSpan={2} style={{ verticalAlign: "middle" }}>
                House Number
              </th>
              <th rowSpan={2} style={{ verticalAlign: "middle" }}>
                PaymentID
              </th>
              <th rowSpan={2} style={{ verticalAlign: "middle" }}>
                Water Usage
              </th>
              <th rowSpan={2} style={{ verticalAlign: "middle" }}>
                Water Category
              </th>
              <th colspan="3">Bill</th>
              <th rowSpan={2} style={{ verticalAlign: "middle" }}>
                VAT
              </th>
              <th rowSpan={2} style={{ verticalAlign: "middle" }}>
                Dues
              </th>
              <th rowSpan={2} style={{ verticalAlign: "middle" }}>
                Penalty
              </th>
              <th rowSpan={2} style={{ verticalAlign: "middle" }}>
                Total Bill
              </th>
              <th rowSpan={2} style={{ verticalAlign: "middle" }}>
                Status
              </th>
              <th rowSpan={2} style={{ verticalAlign: "middle" }}>
                Actions
              </th>
            </tr>
            <tr>
              <td>
                <b> Water</b>
              </td>
              <td>
                <b> Security</b>
              </td>
              <td>
                <b> Cleanliness</b>
              </td>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td style={{ textAlign: "center" }}>{index + 1}</td>
                <td>{user.user.name}</td>
                <td style={{ textAlign: "center" }}>{user.user.no_rumah}</td>
                <td>{user.pembayaranId}</td>
                <td>{user.pemakaianAir}</td>
                <td>{user.user.water.jenisKelompokPelanggan}</td>
                <td>Rp{user.air},-</td>
                <td>Rp{user.keamanan},-</td>
                <td>Rp{user.kebersihan},-</td>
                <td>{user.price.ppn}%</td>
                <td>Rp{user.price.iuran},-</td>
                <td>Rp{user.denda + user.dendaKebersihan},-</td>
                <td>Rp{user.total},-</td>
                <td>{user.status}</td>
                <td>
                  <Link to={`edit/${user.id}`}>
                    <Button variant="success">Edit Water Usage</Button>
                  </Link>
                  <Link
                    to={`/admin/buktipembayaran/${user.id}`}
                    style={{ marginLeft: "5px" }}
                  >
                    <Button variant="primary">Proof of Payment</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Link to={"updateharga"}>
          <Button>Update Price Security and Cleanliness, Update VAT</Button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentList;
