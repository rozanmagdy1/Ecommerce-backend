const {CartService} = require("../Services/cartService");
const service = new CartService;

class CartControllers {

    async listCarts(req,res) {
        let result = await service.listAllCarts();
        if(result === null){
            res.json({
                message : "there is error in listing all carts try another time"
            })
        }else{
            res.json({
                list : result
            })
        }
    }

    async listCartByUserId(req,res) {
        let id = req.params.id;
        let cart = await service.listCartByUserId(id);
        if(cart === null){
            res.status(400).json({
                list : "the user's cart don't have products"
            })
        }else{
            res.json({
                list : cart
            })
        }
    }

    async listCartOfUserLoginNow(req,res) {
        let token = req.headers["authorization"];
        let result = await service.listCartOfUserLoginNow(token);
        if(result === null){
            res.json({
                message : "there is error in list cart items try another time"
            })
        }else{
            res.json({
                result : result
            })
        }
    }

    async addToCart(req,res) {
        let token = req.headers["authorization"];
        let data = req.body;
        let result = await service.addToCart(token,data);
        if(result === null){
            res.json({
                message : "there is error to add item to the card"
            })
        }else{
            res.json({
                result : "the item added to cart successfully"
            })
        }
    }

    async deleteCartByUserId(req,res) {
        let id = req.params.id;
        let result = await service.deleteCart(id);
        if(result === null){
            res.status(400).json({
                message : "the user don't have items in cart"
            })
        }else{
            res.json({
                message : "cart deleted successfully"
            })
        }
    }


    async deleteAllCarts(req,res) {
        let result = await service.deleteAllCarts();
        if(result === null){
            res.json({
                message : "there is a problem in deleting all carts try another time!"
            })
        }else{
            res.json({
                message : "all carts deleted successfully"
            })
        }
    }

    async deleteCartItemsForUser(req,res) {
        let id = req.params.id;
        let result = await service.deleteCartItemsForUser(id);
        if(result === null){
            res.status(400).json({
                message : "the user cart don't have items"
            })
        }else{
            res.json({
                message : "cart items deleted successfully"
            })
        }
    }

    async deleteAllCartItemsForAllUsers(req,res) {
        let result = await service.deleteAllCartItemsForAllUsers();
        if(result === null){
            res.json({
                message : "there is a problem in deleting all items in carts of all users try another time!"
            })
        }else{
            res.json({
                message : "all items in all carts for all users deleted successfully"
            })
        }
    }

    async deleteCartItemsForUserLoginNow(req,res) {
        let token = req.headers["authorization"];
        let result = await service.deleteCartItemsForUserLoginNow(token);
        if(result === null){
            res.json({
                message : "there is error in delete cart items try another time"
            })
        }else{
            res.json({
                message : "all cart items deleted successfully"
            })
        }
    }

    async deleteItemInCartOfSpecificUser(req,res){
        let id = req.params.id;
        let barcode = req.body;
        let result = await service.deleteItemInCartForSpecificUser(id,barcode);
        if(result === null){
            res.status(400).json({
                message : "the cart don't have this item"
            })
        }else{
            res.json({
                message : "the item deleted from cart successfully"
            })
        }
    }

    async deleteItemInCartOfUserLoginNow(req,res) {
        let token = req.headers["authorization"];
        let barcode = req.body;
        let result = await service.deleteItemInCartOfUserLoginNow(token,barcode);
        if(result === null){
            res.json({
                message : "there is error in delete this item try another time"
            })
        }else{
            res.json({
                message : "the item delete successfully"
            })
        }
    }

    /*   async deleteItemInCartsOfAllUsers(req,res){
           let barcode = req.body;
           let result = await service.deleteItemInCartsOfAllUsers(barcode);
           if(result === null){
               res.json({
                   message : "there is error in delete this item in all carts of all users"
               })
           }else{
               res.json({
                   message : "the item deleted from all carts of all users successfully"
               })
           }
       }

     */

       async changeCartStatusByUserId(req,res) {
           let id = req.params.id;
           let result = await service.changeCartStatus(id);
           if(result === null){
               res.status(400).json({
                   message : "the user cart don't have items"
               })
           }else{
               res.json({
                   message : "the cart statues changed successfully"
               })
           }
       }

       async updateItemInCartForSpecificUser(req,res) {
           let id = req.params.id;
           let data = req.body;
           let result = await service.updateItemInCartForSpecificUser(id,data);
           if(result === null){
               res.status(400).json({
                   message : "the user cart don't have items"
               })
           }else{
               res.json({
                   message : "the data updated successfully"
               })
           }
       }

       async updateItemInCartForUserLoginNow(req,res) {
           let token = req.headers["authorization"];
           let data = req.body;
           let result = await service.updateItemInCartForUserLoginNow(token,data);
           if(result === null){
               res.json({
                   message : "there is problem in update this item "
               })
           }else{
               res.json({
                   message : "the item updated successfully"
               })
           }
       }

   /*    async updateItemInCartForAllUsers(req,res) {
           let data = req.body;
           let result = await service.updateItemInCartForAllUsers(data);
           if(result === null){
               res.json({
                   message : "there is problem in deleting this item in all carts of users"
               })
           }else{
               res.json({
                   message : "the item deleted successfully in all carts of all users"
               })
           }

       }

    */

    async updateCartDataOfUser(req,res) {
        let id = req.params.id;
        let data = req.body;
        let result = await service.updateCartDataOfUser(id,data);

        if(result === null){
            res.json({
                message : "the cart not found"
            })
        }else{
            res.json({
                message : "the data updated successfully"
            })
        }
    }

}

module.exports = {
    CartControllers
}