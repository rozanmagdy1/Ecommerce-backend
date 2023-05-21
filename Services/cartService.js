const {findAll, findOne, insertOne, updateOneByQuery} = require("../DB/Base");
const jwt = require('jsonwebtoken');
const dataBaseName = "E-commerce";
const collectionName = "carts";

class CartService {

    async listAllCarts() {
        try {
            return await findAll(dataBaseName, collectionName);
        } catch (e) {
            return null
        }
    }

    async listCartByUserId(id) {
        try {
            return await findOne(dataBaseName, collectionName, {userId: id});
        } catch (e) {
            return null;
        }
    }

    async listCartOfUserLoginNow(token) {
        try {
            let id = await this.getUserIdFromToken(token);
            let cart = await findOne(dataBaseName, collectionName, {userId: id});
            if (!cart) {
                return "no items in the cart";
            } else {
                return cart;
            }
        } catch (e) {
            return null;
        }
    }

    async addToCart(token, data) {
        try {
            //1-get id of the user from token
            let id = await this.getUserIdFromToken(token);

            //2-check if the user has cart or no
            let cart = await findOne(dataBaseName, collectionName, {userId: id});

            /* 3-check if user has cart before or no
                * if user don't have, we will create cart for him
                * if user has cart, we will update cart of him by adding new item
            */

            if (!cart) {
                data.userId = id;
                data.isActive = true;
                return await insertOne(dataBaseName, collectionName, data);
            } else {
                let newData = cart.items;
                newData.push(data);
                return await updateOneByQuery(dataBaseName, collectionName, {userId: id},
                    {items: newData});
            }
        } catch (e) {
            return null;
        }
    }

    async getUserIdFromToken(token) {
        let decoded = jwt.verify(token, 'shhhhh');
        return decoded.id;
    }
}

module.exports = {
    CartService,
}