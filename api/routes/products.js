const express = require('express');
const multer = require('multer');
const router = express.Router();
const adminAuth = require('../middleware/admin-auth');

const productController = require('../controllers/products');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 6
    },
    fileFilter: fileFilter
});

router.post('/CreateProductCategory', productController.create_product_category);

router.post('/UpdateProductCategory', productController.update_product_category);

router.get('/GetProductCategoryList', productController.get_product_category_list);

router.get('/GetProductCategoryById/:id', productController.get_product_category_by_id);

router.post('/CreateProduct', productController.create_product);

router.post('/UpdateProductDetails/:productId', productController.update_product_details_by_id);

router.post('/UpdateProductPrice/:productId', productController.update_product_price_by_id);

router.post('/UploadProductImage/:productId', upload.single('productImage'), productController.upload_product_image_by_id);

router.post('/SearchProduct/:keyword', productController.search_by_product_name)

router.get('/GetAllProductList', productController.get_all_product_list);

router.get('/GetProductListByCategory/:categoryId', productController.get_product_list_by_category_id);

router.get('/GetProductDetailsByProductId/:id', productController.get_product_details_by_product_Id);

router.delete('/DeleteProductById/:productId', adminAuth, productController.delete_product_by_id);

module.exports = router;