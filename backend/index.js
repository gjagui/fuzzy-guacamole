"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// import { routers } from './routers';
//import { createConnection } from 'typeorm';
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// createConnection().then(connection => {
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// routers(app);
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
// });
