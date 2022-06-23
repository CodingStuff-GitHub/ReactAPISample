import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { routering } from "./routes.js";
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(routering);
// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/Sample", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB : " + err.message);
  });

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});

export const productModel = new mongoose.model("Product", productSchema);

// Get a list of products
app.get("/api/v1/products", async (req, res) => {
  const products = await productModel.find();
  res.status(200).json({
    success: true,
    products,
  });
});

// Update a product
app.put("/api/v1/product/:id", async (req, res) => {
  let product = await productModel.findById(req.params.id);
  product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    useFindAndModify: false,
    runValidators: true,
  });
  if (!product) {
    res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  res.status(200).json({
    success: true,
    product,
  });
});

// Delete a product
app.delete("/api/v1/product/:id", async (req, res) => {
  const product = await productModel.findById(req.params.id);
  await product.remove();
  if (!product) {
    res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  res.status(200).json({
    success: true,
    message: "Product successfully deleted",
  });
});

// Starts the server in localhost.
app.listen(4500, () => {
  console.log("Server is running in http://localhost:4500");
});
