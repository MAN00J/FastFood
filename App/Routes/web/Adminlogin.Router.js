import express from "express";
import { AdminLogin } from "../../Controller/Admin/AdminLogin.Controller.js";

let AdminLoginRouter = express.Router()

AdminLoginRouter.post('/Admin',AdminLogin);

export default AdminLoginRouter;