import Router from "express";
import addProduct from "./handlers.js";

export const routering = Router();

routering.route("/api/v1/product/new").post(addProduct);
