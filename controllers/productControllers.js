let {ProductService} = require('../Services/poductService');
let service = new ProductService();

class ProductControllers{
    async listProducts(req,res) {
        let result = await service.listProducts();
        if(result === null){
            res.json({
                message : "there is error in list all products"
            })
        }else{
            res.json({
                list : result
            })
        }
    }
    async listProductById(req,res) {
        let id = req.params.id;
        let result = await service.listOneProduct(id);
        if(result === null){
            res.status(404).json({message : "The product not found"});
        }else{
            res.json({list : result});
        }
    }
    async listProductByGeneralCategoryId(req,res) {
        let g_id = req.params.id;
        let result = await service.listProductByGeneralCategoryId(g_id);
        if(result === null){
            res.status(404).json({message : "the general category not found"});
        }else{
            res.json({list : result});
        }
    }
    async listProductByCategoryId(req,res) {
        let c_id = req.params.id;
        let result = await service.listProductByCategoryId(c_id);
        if(result === null){
            res.status(404).json({message : "The category not found"})
        }else{
            res.json({list : result})
        }
    }
    async listProductHaveSale(req,res) {
        let result = await service.listProductsHaveSale();
        if(result === null){
            res.json({message : "There is error in list all products"});
        }else{
            res.json({list : result});
        }
    }
    async listAvailableProducts(req,res) {
        let result = await  service.listAvailableProducts();
        if(result === null){
            res.json({message : "There is error in list all products"});
        }else{
            res.json({list : result});
        }
    }
    async createProduct(req,res) {
        let data = req.body;
        let result = await service.createProduct(data);
        if(result === "change barcode"){
            res.json({message: "Change barcode please"});
        }else{
            if (result === null) {
                res.json({message: "The product creation fail"});
            } else {
                res.json({message: "The product created successfully"});
            }
        }
    }
    async updateProduct(req,res) {
        let id = req.params.id;
        let data = req.body;
        let result = await service.updateProduct(id , data);
        if(result === null){
            res.status(404).json({message : "The product not found"})
        }else{
            res.json({message : "The product updated successfully"})
        }
    }
    async deleteProduct(req,res) {
        let id = req.params.id;
        let result = await service.deleteProduct(id);

        if(result === null){
            res.status(404).json({message : "the product not found"})
        }else{
            res.json({message : "the product deleted successfully"})
        }
    }
    async deleteAllProducts(req,res) {
        let result = await service.deleteAllProducts();
        if(result === null){
            res.json({message : "There is a problem in deleting all products try another time!"})
        }else{
            res.json({message : "All products deleted successfully"})
        }
    }
    async deleteNotAvailableProducts(req,res) {
        let result = await service.deleteNotAvailableProducts();
        if(result === null){
            res.json({message : "There is a problem in deleting non available products try another time!"})
        }else{
            res.json({message : "All non available products deleted successfully"})
        }
    }
    async changeProductStatues(req,res) {
        let id = req.params.id;
        let result = await service.changeStatues(id);

        if(result === null){
            res.status(404).json({message : "The product not found"})
        }else{
            res.json({message : "The product statues changed successfully"})
        }
    }
}

module.exports = {
    ProductControllers
}