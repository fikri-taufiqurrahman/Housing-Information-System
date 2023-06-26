import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import FileUpload from "express-fileupload";
import db from "./config/Database.js";
import router from "./routes/index.js";
dotenv.config();
const app = express();
import { createServer } from "http";
import cors from "cors";
import { Server } from "socket.io";
import { addPaymentData } from "./cron.js";
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

(async() => {
    await db.sync();
})();

(async() => {
    try {
        await addPaymentData();
        console.log("Data pembayaran berhasil ditambahkan");
    } catch {
        console.log("Gagal menambahkan data pembayaran:");
    }
})();
try {
    await db.authenticate();
    console.log("Database Connected...");
} catch (error) {
    console.error(error);
}
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(FileUpload());

app.use(router);


io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
        console.log(data);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

server.listen(5000, () => {
    console.log("SERVER RUNNING");
});