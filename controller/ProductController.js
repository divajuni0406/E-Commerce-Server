const { Product } = require('../models/index')
const { uploader } = require('../helper/uploader')

const getAllProduct = async (req, res) => {
  const page = req?.query?.page
  const category = req?.query?.category

  if ((page === undefined) && (category === undefined)) {
    console.log("page from all", req?.query?.page)
    try {
      let product = await Product.find()

      res.status(200).json({
        statusCode: 200,
        message: 'successfully get data',
        result: product
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        statusCode: 500,
        message: 'failed to get data'
      })
    }
  } else {
    const page = req?.query?.page || 1
    const limitProduct = 16

    // console.log("page", page)

    const countProduct = await Product.find(category ? { category: category } : null).count() //diubah find cat
    // const categoryData = await Product.find({
    //   category: category?.toLowerCase(),
    // })
    const maxPage = Math.ceil(countProduct / limitProduct)
    console.log("maxPage", maxPage)

    const pageStartOne = parseInt(page) === 1 ? 0 * limitProduct : page * limitProduct - limitProduct

    try {
      let product = await Product
        .find(category ? { category: category } : null)
        .skip(pageStartOne)
        .limit(limitProduct)

      res.status(200).json({
        statusCode: 200,
        message: 'successfully get data',
        result: product,
        maxPage
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        statusCode: 500,
        message: 'failed to get data'
      })
    }
  }
}

const createProduct = (req, res) => {
  const path = '/product/images'
  const upload = uploader(path, 'PRODUCT').fields([{ name: 'images' }])
  upload(req, res, async (err) => {
    if (err) return res.status(500).json({ message: "Failed" })
    const { name, detail, summary, category, recommendation, price, discountId, size, deleted } = req.body
    const imagesLink = req.body.imagesLink
    const { images } = req.files
    try {
      if (!images) {
        const img = imagesLink
        const dataProduct = {
          name: name,
          detail: detail,
          summary: summary,
          category: category,
          recommendation: recommendation,
          price: price,
          images: img,
          size: size
        }
        const addProduct = await Product.create(dataProduct)
        res.json({
          message: "succesfull",
          result: addProduct
        })

      } else {
        const imagesFile = images.map(element => {
          return `${path}/${element.filename}`
        });
        const imgMix = imagesFile.concat(imagesLink)
        const dataProduct = {
          name: name,
          detail: detail,
          summary: summary,
          category: category,
          recommendation: recommendation,
          price: price,
          images: imgMix,
          size: size
        }
        const addProduct = await Product.create(dataProduct)
        res.json({
          message: "succesfull",
          result: addProduct
        })
      }
    } catch (error) {
      res.send({ err })
    }
  })

}

const getProductById = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findById({ _id: id });
    res.status(200).json({
      statusCode: 200,
      message: "successfully get data",
      product: product,
    });
  } catch (error) {
    res.status(500).json({ message: "failed to get data" });
  }
};

const updateImgProduct = (req, res) => {
  const path = '/product/images'
  const upload = uploader(path, 'PRODUCT').fields([{ name: 'images' }])
  upload(req, res, async (err) => {
    const id = req.params.id
    const { name, detail, summary, category, recommendation, price, discountId, size, deleted } = req.body
    const imagesLink = req.body.imagesLink
    const { images } = req.files
    try {
      if (!images) {
        const img = imagesLink
        const dataProduct = {
          name: name,
          detail: detail,
          summary: summary,
          category: category,
          recommendation: recommendation,
          price: price,
          images: img,
          size: size
        }
        const addProduct = await Product.updateOne({ _id: id }, { $set: dataProduct }, { new: true })
        res.status(200).json({
          message: "succesfull",
          result: addProduct
        })
      } else {
        const imagesFile = images.map(element => {
          return `${path}/${element.filename}`
        });
        const imgMix = imagesFile.concat(imagesLink)
        const dataProduct = {
          name: name,
          detail: detail,
          summary: summary,
          category: category,
          recommendation: recommendation,
          price: price,
          images: imgMix,
          size: size
        }
        const addProduct = await Product.updateOne({ _id: id }, { $set: dataProduct }, { new: true })
        res.json({
          message: "succesfull",
          result: addProduct
        })

      }
    } catch (error) {
      res.send(error)
    }
  })
}

const editProduct = async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  try {
    const editedProduct = await Product.updateOne({ _id: id }, { $set: data });
    res
      .status(201)
      .json({ message: "successfully edit data", data: editedProduct });
  } catch (error) {
    res.status(500).json({ message: "failed edit data" });
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id
  try {
    const deletedProduct = await Product.findByIdAndDelete({ _id: id })
    res.status(200).json({ message: 'successfully delete data', deletedProduct: deletedProduct })
  } catch (error) {
    res.status(500).json({ message: 'failed to delete data' })
  }
}

const findProductCategory = async (req, res) => {
  const { category } = req.body;
  try {
    const findProducts = await Product.find({
      category: category?.toLowerCase(),
    });
    if (findProducts.length > 0) {
      res.send({
        message: "Successfull to get products by category",
        statusCode: 200,
        result: findProducts,
      });
    } else if (findProducts.length === 0) {
      res.status(404).send({ message: "Products Not Found", statusCode: 404 });
    } else {
      res.status(400).send({
        message: "Failed to find products, something wrong!",
        statusCode: 400,
      });
    }
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
};

const searchProduct = async (req, res) => {
  const { search } = req.body;
  console.log(search, "jssssssssssssssssssssssss");
  if (search === undefined) {
    res.status(400).send({
      message: "something wrong in search",
      statusCode: 400,
    });
    return;
  }
  try {
    const searchProduct = await Product.find({
      $or: [
        { name: { $regex: new RegExp(search, "i") } },
        { detail: { $regex: new RegExp(search, "i") } },
        { category: { $regex: new RegExp(search, "i") } },
        { summary: { $regex: new RegExp(search, "i") } },
      ],
    });
    if (searchProduct.length > 0) {
      res.send({
        message: "Successfull to get products",
        statusCode: 200,
        result: searchProduct,
      });
    } else if (searchProduct.length === 0) {
      res.status(404).send({ message: "Products Not Found", statusCode: 404 });
    } else {
      res.status(400).send({
        message: "Failed to find products, something wrong!",
        statusCode: 400,
      });
    }
  } catch (error) {
    res.status(500).send(error.message);
    console.log(error);
  }
};

module.exports = {
  getAllProduct,
  createProduct,
  getProductById,
  deleteProduct,
  editProduct,
  findProductCategory,
  searchProduct,
  updateImgProduct
}
