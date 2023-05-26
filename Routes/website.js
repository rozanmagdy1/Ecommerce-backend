const express = require('express');
const websiteApp = express()
const {WebsiteMiddleWare} = require("../middleWares/websiteMiddleWare");
websiteApp.use(WebsiteMiddleWare);

/*** products ***/
const {ProductControllers} = require("../controllers/productControllers");
let PC = new ProductControllers();

websiteApp.get('/products',PC.listProducts);
websiteApp.get('/products/:id', PC.listProductById);
websiteApp.get('/sale/products', PC.listProductHaveSale);
websiteApp.get('/available/products', PC.listAvailableProducts);
websiteApp.get('/products/generalCategory/:id', PC.listProductByGeneralCategoryId);
websiteApp.get('/products/category/:id', PC.listProductByCategoryId);

/*** users ***/
const {authControllers} = require("../controllers/authControllers");
let AC = new authControllers();
const {userControllers} = require("../controllers/userControllers");
let UC = new userControllers();

websiteApp.post('/login', AC.login);
websiteApp.post('/register', AC.register);
websiteApp.post('/forgotPassword', AC.forgotPassword);
websiteApp.post('/resetPassword', AC.resetPassword);
websiteApp.post('/changePassword',AC.changePassword);
websiteApp.get('/user',UC.listUser);

/*** orders ***/
const {OrdersControllers} = require("../controllers/ordersControllers");
let OC = new OrdersControllers();

websiteApp.post('/orders', OC.createOrder);
websiteApp.get('/orders/user',OC.listOrdersUserMake);

/*** general categories (Woman - Men - Kids - Home - Beauty) ***/
const {GeneralCategoryControllers} = require("../controllers/generalCategoryControllers");
let GCC = new GeneralCategoryControllers();

websiteApp.get('/generalCategories',GCC.listGeneralCategories);
websiteApp.get('/generalCategories/:id', GCC.listGeneralCategoryById);

/*** Categories (types inside each general category) ***/
const {CategoryControllers} = require("../controllers/categoryControllers");
let CC = new CategoryControllers();

websiteApp.get('/categories',CC.listCategories);
websiteApp.get('/categories/:id', CC.listCategoryById);
websiteApp.get('/categories/generalCategory/:gId', CC.listCategoryByGeneralCategoriesId);


/*** cart ***/
const {CartControllers} = require("../controllers/cartControllers");
let cartController = new CartControllers();

websiteApp.get('/user/cart', cartController.listCartOfUserLoginNow);
websiteApp.post('/carts', cartController.addToCart);


module.exports = {
    websiteApp
}

