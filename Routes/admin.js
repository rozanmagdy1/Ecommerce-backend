const express = require('express');
const adminApp = express();
const {adminMiddleWare} = require("../middleWares/adminMiddleWare");
adminApp.use(adminMiddleWare);

/*** products ***/
const {ProductControllers} = require("../controllers/productControllers");
let PC = new ProductControllers();

adminApp.get('/products',PC.listProducts);
adminApp.get('/products/:id', PC.listProductById);
adminApp.get('/sale/products', PC.listProductHaveSale);
adminApp.get('/available/products', PC.listAvailableProducts);
adminApp.get('/products/generalCategory/:id', PC.listProductByGeneralCategoryId);
adminApp.get('/products/category/:id', PC.listProductByCategoryId);
adminApp.post('/products', PC.createProduct);
adminApp.put('/products/:id', PC.updateProduct);
adminApp.delete('/products/:id', PC.deleteProduct);
adminApp.delete('/products', PC.deleteAllProducts);
adminApp.delete('/notAvailable/products', PC.deleteNotAvailableProducts);
adminApp.put('/products/status/:id', PC.changeProductStatues);

/*** user ***/
const {authControllers} = require("../controllers/authControllers");
let AC = new authControllers();
const {userControllers} = require("../controllers/userControllers");
let UC = new userControllers();

adminApp.post('/login', AC.login);
adminApp.post('/register', AC.register);
adminApp.post('/forgotPassword', AC.forgotPassword);
adminApp.post('/resetPassword/:token', AC.resetPassword);
adminApp.post('/changePassword',AC.changePassword);
adminApp.post('/register', AC.register);
adminApp.post('/register', AC.register);
adminApp.get('/users', UC.listUsers);
adminApp.get('/users/:id', UC.listUserById);
adminApp.get('/user',UC.listUser);
adminApp.delete('/users/:id', UC.deleteUser);
adminApp.delete('/users', UC.deleteAllUser);
adminApp.put('/users/:id', UC.updateUser);
adminApp.put('/status/users/:id', UC.changeUserStatues);

/*** orders ***/
const {OrdersControllers} = require("../controllers/OrdersControllers");
let OC = new OrdersControllers();

adminApp.get('/orders',OC.listOrders);
adminApp.get('/orders/user/:id', OC.listOrderById);
adminApp.post('/orders', OC.createOrder);
adminApp.delete('/orders', OC.deleteAllOrders);
adminApp.delete('/orders/:id', OC.deleteOrder);
adminApp.delete('/orders/user/:id', OC.deleteOrdersBySpecificUser);

/*** generalCategories (Woman - Men - Kids - Home - Beauty) ***/
const {GeneralCategoryControllers} = require("../controllers/generalCategoryControllers");
let GCC = new GeneralCategoryControllers();

adminApp.get('/generalCategories',GCC.listGeneralCategories);
adminApp.get('/generalCategories/:id', GCC.listGeneralCategoryById);
adminApp.post('/generalCategories', GCC.createGeneralCategory);
adminApp.put('/generalCategories/:id', GCC.updateGeneralCategory);
adminApp.delete('/generalCategories/:id', GCC.deleteGeneralCategory);
adminApp.delete('/generalCategories', GCC.deleteAllGeneralCategories);
adminApp.put('/generalCategories/status/:id', GCC.changeGeneralCategoryStatus);

/*** categories (types inside each category) ***/
const {CategoryControllers} = require("../controllers/categoryControllers");
let CC = new CategoryControllers();

adminApp.get('/categories',CC.listCategories);
adminApp.get('/categories/:id', CC.listCategoryById);
adminApp.get('/categories/generalCategory/:gId', CC.listCategoryByGeneralCategoriesId);
adminApp.post('/categories', CC.createCategory);
adminApp.put('/categories/:id', CC.updateCategory);
adminApp.delete('/categories/:id', CC.deleteCategory);
adminApp.delete('/categories', CC.deleteAllCategories);
adminApp.put('/categories/status/:id', CC.changeCategoryStatus);


/*** cart ***/
//import filterTypeControllers
const {CartControllers} = require("../controllers/cartControllers");
let cartController = new CartControllers();

//list carts
adminApp.get('/carts',cartController.listCarts);

//get cart of specific user by id
adminApp.get('/carts/user/:id', cartController.listCartByUserId);

//get cart for user login now
adminApp.get('/user/cart', cartController.listCartOfUserLoginNow);

//create cart
adminApp.post('/carts', cartController.addToCart);

//delete cart of specific user
adminApp.delete('/carts/user/:id', cartController.deleteCartByUserId);

//delete all carts
adminApp.delete('/carts', cartController.deleteAllCarts);

//delete all items from cart of specific user (empty cart)
adminApp.delete('/cartItems/user/:id', cartController.deleteCartItemsForUser);

//delete all items from cart of user login now
adminApp.delete('/user/cartItems', cartController.deleteCartItemsForUserLoginNow);

//delete all items from cart of all user
adminApp.delete('/cartItems', cartController.deleteAllCartItemsForAllUsers);

//delete item from cart for specific user
adminApp.delete('/cartItem/user/:id', cartController.deleteItemInCartOfSpecificUser);

//delete item from cart for user login now
adminApp.delete('/user/cartItem', cartController.deleteItemInCartOfUserLoginNow);

//delete item from all carts of all users
//adminApp.delete('/cartItem', cartController.deleteItemInCartsOfAllUsers);

//update item in cart of specific user
adminApp.put('/cartItem/user/:id', cartController.updateItemInCartForSpecificUser);

//update item in cart of user login now
adminApp.put('/user/cartItem', cartController.updateItemInCartForUserLoginNow);

//update item in all carts for all users
//adminApp.put('/cartItem', cartController.updateItemInCartForAllUsers);

//update other data of carts for user
adminApp.put('/carts/user/:id', cartController.updateCartDataOfUser);

//activate or deactivate cart
adminApp.put('/carts/status/:id', cartController.changeCartStatusByUserId);

module.exports = {
    adminApp
}