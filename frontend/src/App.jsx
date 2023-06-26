import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./pages/Login";
import Card from "./pages/admin/dashboard/Card";

import UserList from "./pages/admin/data-penduduk/UserList";
import EditUser from "./pages/admin/data-penduduk/EditUser";
import AddUser from "./pages/admin/data-penduduk/AddUser";

import PaymentList from "./pages/admin/kelola-keuangan/PaymentList";
import EditPrice from "./pages/admin/kelola-keuangan/EditPrice";
import EditStatus from "./pages/admin/kelola-keuangan/EditStatus";
import ProofOfPayment from "./pages/admin/kelola-keuangan/ProofOfPayment";

import NewsList from "./pages/admin/post-berita/NewsList";
import AddNews from "./pages/admin/post-berita/AddNews";
import EditNews from "./pages/admin/post-berita/EditNews";

import RoomChat from "./pages/admin/chat/RoomChat";

import RoomChatUser from "./pages/users/chat/RoomChatUser";

import CardUser from "./pages/users/dashboard/CardUser";
import PayDues from "./pages/users/kelola-keuangan/PayDues";
import NewsListUser from "./pages/users/post-berita/NewsListUser";
import WaterDataTable from "./pages/Water";
import FinancialReport from "./pages/admin/laporan-keuangan/FinancialReport";
import WaterInstallationList from "./pages/admin/pemasangan-air/WaterInstallationList";
import InstallWater from "./pages/admin/pemasangan-air/InstallWater";
import UpdateStatus from "./pages/admin/pemasangan-air/UpdateStatus";
import PayItNow from "./pages/users/kelola-keuangan/PayItNow";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Route */}
        <Route path="/" element={<Login />}></Route>
        <Route path="/admin" element={<Card />}></Route>

        <Route path="/admin/list-penduduk" element={<UserList />}></Route>
        <Route path="/admin/list-penduduk/add" element={<AddUser />} />
        <Route path="/admin/list-penduduk/edit/:id" element={<EditUser />} />

        <Route
          path="/admin/pemasangan-air"
          element={<WaterInstallationList />}
        ></Route>

        <Route
          path="/admin/pemasangan-air/install/:userId"
          element={<InstallWater />}
        ></Route>

        <Route
          path="/admin/pemasangan-air/status/:userId"
          element={<UpdateStatus />}
        ></Route>

        <Route
          path="/admin/pembayaran/:year/:month"
          element={<PaymentList />}
        />

        <Route
          path="/admin/pembayaran/:tahun/:bulan/edit/:paymentId"
          element={<EditStatus />}
        />
        <Route path="/admin/pembayaran/edit/:id" element={<EditStatus />} />
        <Route
          path="/admin/buktipembayaran/:paymentId"
          element={<ProofOfPayment />}
        />

        <Route path="/admin/laporan-keuangan" element={<FinancialReport />} />

        <Route path="/admin/berita" element={<NewsList />} />
        <Route path="/admin/berita/add" element={<AddNews />} />
        <Route path="/admin/berita/edit/:id" element={<EditNews />} />

        <Route path="/admin/roomchat" element={<RoomChat />} />

        {/* User Route */}
        <Route path="/users" element={<CardUser />}></Route>
        <Route path="/users/bayar/:tahun/:bulan" element={<PayDues />}></Route>
        <Route
          path="/users/bayar/:tahun/:bulan/:paymentId"
          element={<PayItNow />}
        ></Route>
        <Route path="/users/berita" element={<NewsListUser />}></Route>
        <Route path="/users/roomchat" element={<RoomChatUser />}></Route>
        <Route path="/water" element={<WaterDataTable />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
