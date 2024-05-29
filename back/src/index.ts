import express, { Request, Response } from "express";
import cors from "cors";
// Router
import TaskRouter from "./tasks/router";
import UserRouter from "./users/router";
// Config
import { ApiList } from "./config";

const app = express();
const PORT = 3000;

app.use(cors())
app.use(express.json());
app.use('/tasks', TaskRouter);
app.use('/users', UserRouter);

app.get("/", (request: Request, response: Response) => { 
  response.status(200).send(ApiList);
}); 

app.listen(PORT, () => { 
  console.log("Server running at PORT: ", PORT); 
}).on("error", (error) => {
  throw new Error(error.message);
});