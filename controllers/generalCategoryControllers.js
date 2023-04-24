// import service that will use inside controllers
const {GeneralCategoryService} = require("../Services/generalCategoryService");
const service =  new GeneralCategoryService();

class GeneralCategoryControllers {

    async listGeneralCategories(req,res) {
        res.json({list : await service.listGeneralCategories()})
    }

    async listGeneralCategoryById(req,res) {
        let id = req.params.id;
        let result = await service.listGeneralCategoryById(id);
        if(result === null){
            res.status(404).json({message : "The general category not found"});
        }else{
            res.json({result});
        }
    }

    async createGeneralCategory(req,res) {
        let data = req.body;
        let result = await service.createGeneralCategory(data);
        if(result === null){
            res.json({message : "The general category creation fail"});
        }else{
            res.json({message : "The general category created successfully"});
        }
    }

    async updateGeneralCategory(req,res) {
        let id = req.params.id;
        let data = req.body;
        let result = await service.updateGeneralCategory(id,data);
        if(result === null){
            res.status(404).json({message : "The general category not found"})
        }else{
            res.json({message : "The general category updated successfully"})
        }
    }

    async deleteGeneralCategory(req,res) {
        let id = req.params.id;
        let result = await service.deleteGeneralCategory(id);
        if(result === null){
            res.status(404).json({message : "The general category not found"})
        }else{
            res.json({message : "The general category deleted successfully"})
        }
    }

    async deleteAllGeneralCategories(req,res) {
        let result = await service.deleteAllGeneralCategories();
        if(result === null){
            res.json({message : "There is a problem in deleting all general categories try another time!"})
        }else{
            res.json({message : "All general categories deleted successfully"})
        }
    }

    async changeGeneralCategoryStatus(req,res) {
        let id = req.params.id;
        let result = await service.changeGeneralCategoryStatus(id);

        if(result === null){
            res.status(404).json({message : "The general category not found"})
        }else{
            res.json({message : "The general category statue changed successfully"})
        }
    }
}

module.exports = {
    GeneralCategoryControllers
}