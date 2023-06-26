import express from "express";
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    Register,
    Login,
    Logout,
} from "../controllers/Users.js";

import {
    createPayment,
    createPaymentAutomaticWaterConnected,
    getPayment,
    getPaymentById,
    getPaymentByUserId,
    updatePaymentWater,
    updateStatusPayment,
    updateWaterUsage,
} from "../controllers/PaymentController.js";

import {
    getNews,
    getNewsById,
    saveNews,
    updateNews,
    deleteNews,
} from "../controllers/NewsController.js";

import {
    getProofOfPayment,
    uploadProofOfPayment,
    deleteProofOfPayment,
} from "../controllers/ProofOfPayment.js";

import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { getDataLaporan } from "../controllers/ReportController.js";
import { createWaterData, getWaterData, waterPenalty } from "../controllers/WaterController.js";
import { createPrice } from "../controllers/PriceController.js";
import { createWaterInstallationData, getWaterInstallationData, getWaterInstallationDataPrice, updateStatusWaterInstallation, updateWaterInstallation } from "../controllers/WaterInstallationController.js";
import { getFinancialReport } from "../controllers/FinanceController.js";
const router = express.Router();

router.get("/users", verifyToken, getUsers);

router.get("/users-data", getUsers);
router.get("/users/:id", getUserById);
router.post("/users/create", createUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.post("/users/register", Register);

router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

// router.get("/pembayaran/:id", getUserById);
router.get("/pembayaran/:tahun/:bulan", getPayment);
router.get("/pembayaran/:tahun/:bulan/:paymentId", getPaymentById);
router.patch("/pembayaran/:paymentId", updateWaterUsage);
router.get("/pembayaran/:paymentId", updateWaterUsage);

router.patch("/statusPembayaran/:paymentId", updateStatusPayment);
router.post("/createPayment", createPayment)
router.post("/waterPenalty", waterPenalty)
    // router.patch("/pembayaran/:id", updatePembayaran);
    // router.get("/update-pembayaran", getHargaById);
    // router.patch("/updateharga-pembayaran/:id", updateHarga);

// router.get("/buktipembayaran/:id", getProofOfPayment);
router.patch("/buktipembayaran/:paymentId", uploadProofOfPayment);
// router.delete("/buktipembayaran/:id", deleteProofOfPayment);

router.get("/news", getNews);
router.get("/news/:id", getNewsById);
router.post("/news", saveNews);
router.patch("/news/:id", updateNews);
router.delete("/news/:id", deleteNews);

router.get("/getFinancialReport", getFinancialReport);
// router.post("/report/admin", getDataLaporan);
// router.patch("/report", getDataLaporan);

router.post("/createPrice", createPrice);
// router.post("/createPaymentId", createPaymentID);

router.post("/createWaterData", createWaterData);
router.post("/createWaterInstallationData", createWaterInstallationData);
router.get("/getWaterInstallationData/:kelompokPelanggan", getWaterInstallationData);
router.get("/getWaterInstallationDataPrice/:kelompokPelanggan/:id", getWaterInstallationDataPrice);
router.patch("/updateWaterInstallation/:userId/:waterInstallationId", updateWaterInstallation);
router.patch("/updateStatusWaterInstallation/:userId/", updateStatusWaterInstallation);
router.patch("/updateWaterPayment/:id", updatePaymentWater);
router.get("/getWaterData", getWaterData);



router.get("/getPaymentById/:id", getPaymentByUserId)

export default router;