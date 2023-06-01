"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const auth_1 = __importDefault(require("./router/auth"));
const user_1 = __importDefault(require("./router/user"));
const socket_service_1 = __importDefault(require("./services/socket.service"));
const PORT = 4001;
mongoose_1.default.set("strictQuery", false);
(0, db_1.default)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, express_fileupload_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    },
});
const socketService = new socket_service_1.default();
global._io = io;
global._io.on("connection", socketService.connection);
io.listen(Number(process.env.SOCKET_IO_PORT) || 1234);
app.get("/", (req, res) => {
    res.send("I love you all ❤️");
});
app.use("/api/auth", auth_1.default);
app.use("/api/user", user_1.default);
app.listen(PORT, () => {
    console.log("love u");
    return console.log(`Express is listening at http://localhost:${PORT}`);
});
//# sourceMappingURL=app.js.map