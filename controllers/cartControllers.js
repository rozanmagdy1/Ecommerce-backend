const {CartService} = require("../Services/cartService");
const service = new CartService;

class CartControllers {

    async listCarts(req, res) {
        let result = await service.listAllCarts();
        if (result === null) {
            res.json({message: "There is error in listing all carts try another time"})
        } else {
            res.json({list: result})
        }
    }

    async listCartByUserId(req, res) {
        let id = req.params.id;
        let cart = await service.listCartByUserId(id);
        if (cart === null) {
            res.status(404).json({list: "The user's cart don't have products"})
        } else {
            res.json({list: cart})
        }
    }

    async listCartOfUserLoginNow(req, res) {
        let token = req.headers["authorization"];
        let result = await service.listCartOfUserLoginNow(token);
        if (result === null) {
            res.json({message: "There is error in list cart items try another time"})
        } else if (result === "no items in the cart") {
            res.status(404).json({message: "There is no items in the cart"})
        } else {
            res.json({result: result})
        }
    }

    async addToCart(req, res) {
        let token = req.headers["authorization"];
        let data = req.body;
        let result = await service.addToCart(token, data);
        if (result === null) {
            res.json({message: "There is error to add item to the card"})
        } else {
            res.json({result: "The item added to cart successfully"})
        }
    }
}

module.exports = {
    CartControllers
}