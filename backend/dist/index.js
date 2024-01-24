"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("./database/knexfile"));
dotenv_1.default.config();
const database = (0, knex_1.default)(knexfile_1.default[process.env.NODE_ENV || 'development']);
// log if database is connected
database.raw("SELECT 1+1 as result").then((result) => {
    console.log(result.rows[0].result);
});
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
