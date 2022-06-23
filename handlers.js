import { productModel } from "./app.js";
const addProduct = async (req, res) => {
  const product = await productModel.create(req.body);
  res.status(200).json({
    success: true,
    product,
  });
};

export default addProduct;
