const {OrderService} = require("../Services/orderService");
const service = new OrderService();

class OrdersControllers {

    async listOrders(req, res) {
        res.json({list: await service.listOrders()})
    }
    async listOrdersUserMake(req, res) {
        let token = req.headers["authorization"];
        let result = await service.listOrdersUserMake(token);
        if (result === null) {
            res.json({
                message: "error in list orders done by user login first"
            })
        } else {
            res.json({
                list: result
            })
        }
    }
    async listOrderById(req, res) {
        let id = req.params.id;
        let result = await service.listOrderById(id);
        if (result === null) {
            res.status(404).json({message: "The order not found"});
        } else {
            res.json({result})
        }
    }
    async createOrder(req, res) {
        let token = req.headers["authorization"];
        let data = req.body;
        let result = await service.createOrder(token, data);
        if (result === null) {
            res.json({message: "The order confirmation fail try another time or login first!"});
        } else {
            res.json({message: "The order confirmed successfully"});
        }
    }

    async deleteAllOrders(req, res) {
        let result = await service.deleteAllOrders();
        if (result === null) {
            res.json({message: "There is a problem in deleting all orders try another time!"})
        } else {
            res.json({message: "All orders deleted successfully"})
        }
    }

    async deleteOrder(req, res) {
        let id = req.params.id;
        let result = await service.deleteOrder(id);

        if (result === null) {
            res.status(404).json({message: "The order not found"})
        } else {
            res.json({message: "The order deleted successfully"})
        }
    }

    async deleteOrdersBySpecificUser(req, res) {
        let id = req.params.id;
        let result = await service.deleteOrdersBySpecificUser(id);
        if(result === "user not found"){
            res.status(404).json({message: "This user not found"})
        }else{
            if (result === null) {
                res.status(404).json({message: "This user don't make orders before"})
            } else {
                res.json({message: "The orders done by the user deleted successfully"})
            }
        }
    }
}

module.exports = {
    OrdersControllers
}