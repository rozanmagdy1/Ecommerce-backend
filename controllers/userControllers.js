const {UserService} = require("../Services/userService")
const service = new UserService();

class userControllers {
    async listUsers(req,res) {res.json({list : await service.listUsers()})}

    async listUser(req,res) {
        let token = req.headers["authorization"];
        let result = await service.listUser(token);
        if(result === null){
            res.json({message : "login first"})
        }else{
            res.json({list : result})
        }
    }

    async listUserById(req,res) {
        let id = req.params.id;
        let user = await service.getUserById(id);
        if(user === null){res.status(404).json({message : "User not found"})
        }else{res.json({list : user})}
    }

    async deleteUser(req,res) {
        let id = req.params.id;
        let result = await service.deleteUserById(id);
        if(result === null){res.status(404).json({message : "User not found"})
        }else{res.json({message : "User deleted successfully"})}
    }

    async updateUser(req,res) {
        let id = req.params.id;
        let data = req.body;
        let result  = await service.updateUserById(id,data);
        if(result === null){res.status(404).json({message : "User not found"})
        }else{res.json({message : "User updated successfully"})}
    }

    async deleteAllUser(req,res) {
        let token = req.headers["authorization"];
        let result = await service.deleteAllUsers(token);
        if(result === null){res.json({message : "There is a problem in deleting all users try another time!"})
        }else{res.json({message : "All users deleted successfully"})}
    }

    async changeUserStatues(req,res) {
        let id = req.params.id;
        let result = await service.changeUserStatus(id);
        if(result === null){res.status(404).json({message : "User not found"})
        }else{res.json({message : "user statue changed"})}
    }
}

module.exports = {
    userControllers
}