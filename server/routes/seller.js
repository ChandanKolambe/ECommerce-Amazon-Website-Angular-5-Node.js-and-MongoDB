const router = require('express').Router();
const Product = require('../models/product');

const aws = require('aws-sdk'); //library to communicate with AWS API
const multer = require('multer');   //library to upload images
const multerS3 = require('multer-s3');  //library to upload images directly to s3
const s3 = new aws.S3({
    accessKeyId: "AKIAIBR5G5OP47EVSYJA",
    secretAccessKey: "mXU0TGX4NV0QXUsD2J8iwtJi9sSQmHSeEU9j2bqe"
}); //to communicate with bucket

const faker = require('faker');

const checkJWT = require('../middlewares/check-jwt');

const upload = multer({
    storage: multerS3({
        s3,
        bucket: 'amazonowebapplication',
        metadata: function (req, file, cb) {
            cb(null, {
                fieldName: file.fieldName
            });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString());
        }
    })
});

router.route('/products')
    .get(checkJWT, (req, res, next) => {

        Product.find({ owner: req.decoded.user._id })
            .populate('owner')  //without populate we will get only id. Here owner references to user object so using populate we will get all user attributes details
            .populate('category')
            .exec((err, products) => {

                if (err) {
                    console.log('error!!!');
                    console.log(err);
                }

                if (products) {
                    res.json({
                        success: true,
                        message: "Products",
                        products: products
                    });
                }
            });
    })
    // .post([checkJWT, upload.single('product_picture')], (req, res, next) => {
    .post([checkJWT], (req, res, next) => {
        let product = new Product();
        product.owner = req.decoded.user._id;
        product.category = req.body.categoryId;
        product.title = req.body.title;
        product.price = req.body.price;
        product.description = req.body.description;
        // product.image = req.file.location;
        product.image = "no-image";

        product.save();
        res.json({
            success: true,
            message: 'Successfullly Added the product'
        });
    });

/* Just for testing */  //using faker.js ato add dummy data
router.get('/faker/test', (req, res, next) => {
    for (i = 0; i < 20; i++) {
        let product = new Product();
        product.category = '5af5035967dec900f6d3b2cf';
        product.owner = '5af25ed501e40f0035c44c00';
        product.image = faker.image.cats();
        product.title = faker.commerce.productName();
        product.description = faker.lorem.words();
        product.price = faker.commerce.price();
        product.save();
    }

    res.json({
        message: "Successfully added 20 pictures"
    });
});

module.exports = router;