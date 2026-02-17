import http from "http";
import mongoose from "mongoose";
import app from "./app.js";
import dotenv from "dotenv";
import initWebSocket from "./websocket/ws.socket.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connected to MongoDB");
        }).catch((err) => {
            console.error("Failed to connect to MongoDB", err);
            process.exit(1);
        });

const PORT = process.env.PORT || 7000;
const server = http.createServer(app);

initWebSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
