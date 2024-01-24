import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import knex from 'knex'
import connections from "./database/knexfile";

dotenv.config();

const database = knex(connections[process.env.NODE_ENV || 'development'])

// log if database is connected
database.raw("SELECT 1+1 as result").then((result) => {
  console.log(result.rows[0].result)
})

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});