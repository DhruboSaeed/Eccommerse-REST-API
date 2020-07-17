const Product = require('../models/products');
const ProductCategory = require('../models/createproductcategory');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const today = new Date();

exports.create_product_category = (req, res, next) => {
    const categoryData = {
        productCategoryId: req.body.productCategoryId,
        name: req.body.name
    };
    ProductCategory.create(categoryData)
        .then(results => {
            const responce = {
                requestTime: today,
                responceTime: today,
                requestUrl: "http://localhost/8080/api/Product/CreateProductCategory",
                success: true,
                message: "Product Category Created Successfully",
                count: results.length,
                payload: results
            }
            res.status(200).json(responce);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.update_product_category = (req, res, next) => {
    const catId = req.body.productCategoryId;
    const prodCatName = req.body.name;
    ProductCategory.findByPk(catId)
        .then(catName => {
            catName.name = prodCatName;
            return catName.save();
        })
        .then(results => {
            const responce = {
                requestTime: today,
                responceTime: today,
                requestUrl: "http://localhost/8080/api/Product/UpdateProductCategory",
                success: true,
                message: "Product Category Updated Successfully",
                count: results.length,
                payload: results
            }
            res.status(201).json(responce);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err
            });
        })
};

exports.get_product_category_list = (req, res, next) => {
    ProductCategory.findAll()
        .then(results => {
            const responce = {
                requestTime: today,
                responceTime: today,
                requestUrl: "http://localhost/8080/api/Product/GetProductCategoryList",
                success: true,
                message: "Retrieved All Product Categories List Successfully",
                count: results.length,
                payload: results
            };
            res.status(201).json(responce);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.get_product_category_by_id = (req, res, next) => {
    const catId = req.params.id;
    ProductCategory.findAll({ where: { id: catId } })
        .then(results => {
            const responce = {
                requestTime: today,
                responceTime: today,
                requestUrl: "http://localhost/8080/api/Product/GetProductCategoryList/" + catId,
                success: true,
                message: "Retrieved Product Category By ID Successfully",
                count: results.length,
                payload: results
            };
            res.status(201).json(responce);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.create_product = (req, res, next) => {
    const productData = {
        productCategoryId: req.body.productCategoryId,
        productName: req.body.productName,
        salesPrice: req.body.salesPrice,
        productDescription: req.body.productDescription,
    };
    Product.create(productData)
        .then(results => {
            console.log(results);
            const responce = {
                requestTime: today,
                responceTime: today,
                requestUrl: "http://localhost/8080/api/Product/CreateProduct",
                success: true,
                message: "Product Created Successfully",
                count: results.length,
                payload: results
            };
            res.status(200).json(responce);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

};

exports.update_product_details_by_id = (req, res, next) => {
    const prodId = req.params.productId;
    const prodDesc = req.body.productDescription;
    Product.findByPk(prodId)
        .then(productDesc => {
            if (!productDesc) {
                return res.status(404).json({
                    message: "Product not found with this id!"
                });
            }
            productDesc.productDescription = prodDesc;
            return productDesc.save();
        })
        .then(results => {
            const responce = {
                requestTime: today,
                responceTime: today,
                requestUrl: "http://localhost/8080/api/Product/UpdateProductDetails/" + prodId,
                success: true,
                message: "Product Details Updated Successfully",
                count: results.length,
                payload: results
            };
            res.status(200).json(responce);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "err"
            });
        })
};

exports.update_product_price_by_id = (req, res, next) => {
    const productId = req.params.productId;
    const prodPrice = req.body.salesPrice;
    Product.findByPk(productId)
        .then(productPrice => {
            productPrice.salesPrice = prodPrice;
            return productPrice.save();
        })
        .then(results => {
            const responce = {
                requestTime: today,
                responceTime: today,
                requestUrl: "http://localhost/8080/api/Product/UpdateProductPrice/" + productId,
                success: true,
                message: "Product Price Updated Successfully",
                count: results.length,
                payload: results
            };
            res.status(200).json(responce);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err
            });
        })
};

exports.upload_product_image_by_id = (req, res, next) => {
    const prodId = req.params.productId;
    const productUploadImage = req.file.path;
    Product.findByPk(prodId)
        .then(uploadImage => {
            uploadImage.productImage = productUploadImage;
            return uploadImage.save();
        })
        .then(results => {
            const responce = {
                requestTime: today,
                responceTime: today,
                requestUrl: "http://localhost/8080/api/Product/UploadProductImage/" + prodId,
                success: true,
                message: "Product Image Uploaded Successfully",
                count: results.length,
                payload: results
            };
            res.status(200).json(responce);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err
            });
        })
};

exports.search_by_product_name = (req, res, next) => {
    var keyword = req.params.keyword;
    Product.findAll({
            where: {
                productName: {
                    [Op.like]: '%' + keyword + '%'
                }
            }
        })
        .then(results => {
            console.log(results)
            if (results != 0) {
                const responce = {
                    requestTime: today,
                    responceTime: today,
                    requestUrl: "http://localhost/8080/api/Product/SearchProduct/" + keyword,
                    success: true,
                    message: "Searched All Products With This Keyword Successfully",
                    count: results.length,
                    payload: results
                };
                res.status(201).json(responce);
            } else {
                res.status(404).json({
                    message: "Product Name Is Incorrect! Please Check Again!"
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: err
            });
        })
};

exports.get_all_product_list = (req, res, next) => {
    Product.findAll()
        .then(docs => {
            const responce = {
                requestTime: today,
                responceTime: today,
                requestUrl: "http://localhost/8080/api/Product/GetAllProductList",
                success: true,
                message: "Retrieved All Products Successfully",
                count: docs.length,
                payload: docs
            };
            res.status(201).json(responce);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
};

exports.get_product_list_by_category_id = (req, res, next) => {
    const catId = req.params.categoryId;
    Product.findAll({
            where: {
                productCategoryId: catId
            }
        })
        .then(results => {
            if (results) {
                const responce = {
                    requestTime: today,
                    responceTime: today,
                    requestUrl: "http://localhost/8080/api/Product/GetProductListByCategory/" + catId,
                    success: true,
                    message: "Retrieved All Products List By Category ID Successfully",
                    count: results.length,
                    payload: results
                };
                res.status(200).json(responce);
            } else {
                res.status(500).json({ message: 'Product Category Not Found With This id!' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })

};

exports.get_product_details_by_product_Id = (req, res, next) => {
    const productId = req.params.id;
    Product.findByPk(productId)
        .then(results => {
            if (results) {
                const responce = {
                    requestTime: today,
                    responceTime: today,
                    requestUrl: "http://localhost/8080/api/Product/GetProductDetailsByProductId/" + productId,
                    success: true,
                    message: "Retrieved Products By ID Successfully",
                    count: results.length,
                    payload: results
                };
                res.status(200).json(responce);
            } else {
                res.status(500).json({ message: 'Product Not Found With This ID!' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
};

exports.delete_product_by_id = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findByPk(prodId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: "Product Not Foud With This Id"
                });
            }
            return product.destroy();
        })
        .then(results => {
            const responce = {
                requestTime: today,
                responceTime: today,
                requestUrl: "http://localhost/8080/api/Product/DeleteProductById/",
                success: true,
                message: "Product Deleted Successfully",
                count: results.length,
                payload: results
            };
            res.status(201).json(responce);

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
};