import http from "http";
import mongoose from "mongoose";
import app from "./app.js";
import { initWebSocket } from "./websocket/ws.server.js";

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(() => {
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
