const route = require("express").Router();
const { getAllProduct, createProduct, getProductById, deleteProduct, editProduct, findProductCategory, searchProduct } = require("../controller/ProductController");
const { authApiAdmin } = require('../controller/authorizeRoutes')

// authorization belum buat
route.get("/api/product", getAllProduct);
route.get("/api/productCategory", findProductCategory);
route.post("/api/searchProduct", searchProduct);
route.post("/api/create-product", createProduct);
route.get("/api/product/:id", getProductById);
route.patch("/api/edit-data/:id", editProduct);
route.delete("/api/delete-product/:id", authApiAdmin, deleteProduct);
route.post("/detail", (req, res) => {
  const detail = req.body;
  res.send(detail);
});

module.exports = route;
