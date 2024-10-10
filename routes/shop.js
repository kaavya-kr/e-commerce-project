const path= require('path');

const express =require('express');
const shopController= require('../controllers/shop');
// const rootDir = require('../util/path');
// const adminData = require('./admin');  //need access for the products
const isAuth = require('../middleware/is-auth')


const router = express.Router();


router.get('/',shopController.getIndex )
router.get('/products', shopController.getProducts);

router.get('/products/:productId',shopController.getProduct);

router.get('/cart', isAuth,shopController.getCart);
router.post('/cart',isAuth, shopController.postCart);

router.post('/cart-delete-item',isAuth,shopController.postCartDeleteProduct);

router.post('/create-order',isAuth,shopController.postOrder);
router.get('/orders', isAuth,shopController.getOrders);

router.get('/orders/:orderId',isAuth,shopController.getInvoice)

module.exports=router;































// // router.get('/checkout', shopController.getCheckout);










  // (req, res, next) => { 
//     const products = adminData.products;
//     res.render('shop', {
//       prods: products,
//       pageTitle: 'Shop',
//       path: '/',
//       hasProducts: products.length > 0,
//       activeShop: true,
//       productCSS: true
//     });
//   });                                //'../' go to up one level 
    // console.log('shop.js',adminData.products);  //this line is responsible for output the add products page
    // // console.log('in another middleware');   //sendFile allow to send back a file to the  user
    // //the below line helps us for add html files in to our routes
    // res.sendFile(path.join( rootDir,'views', 'shop.html'));    //path.join will automatically build the path in a way that works on both linux and windows system  which means automatically knows which os we used  //__dirname is a global variable which simply holds the absolute path on our os   //./ or / is refers to the root folder on our os not to project folder
        // res.send('<h1> Hello Express js</h1>'); // we send some text here simply set an html conntent default
    // const products = adminData.products;
    // res.render('shop.pug',{prods:products, docTitle: 'shop'}); //response and a render method use default templating engine



   

