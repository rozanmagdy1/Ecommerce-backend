let {UserService} = require('../Services/userService');
let service = new UserService();

class authControllers {

    async register(req, res) {
        let {firstname, lastname, username, password, gender, isAdmin} = req.body;
        let result = await service.register(firstname, lastname, username, password, gender, isAdmin);
        if (result != null) {
            res.json({message: "Sign-up successfully"})
        } else {
            res.json({message: "The username already used try another one"})
        }
    }

    async login(req, res) {
        let {username, password} = req.body;
        let result = await service.login(username, password);
        if (result === null) {
            res.json({message: "Login fail try another time"})
        } else if (result.message === "user not found") {
            res.status(404).json({message: "User not found"})
        } else if (result.message === "password wrong") {
            res.json({message: "Password wrong try another time!"})
        } else if(result.message === "user not active"){
            res.json({message: "The user not active"})
        } else{
            res.json({result})
        }
    }

    async forgotPassword(req,res) {
        let email = req.body.username;
        let result = await service.forgotPassword(req,email);
        if(result === "user not found"){
            res.status(404).json({
                "message": "user not found"
            })
        }else if (result.message === "Email sent"){
            res.json(result)
        }else{
            res.json({
                "message": "Error sending email"
            })
        }
    }

    async resetPassword(req,res) {
        let reset_token = req.headers["authorization"];
        let {username, newPassword} = req.body;
        let result = await service.resetPassword(reset_token,username,newPassword);
        if (result === null){
            res.json({
                "message": "Time out , the link is expired"
            })
        }else if(result === "The user not found"){
            res.status(404).json({
                "message": "The user not found"
            })
        } else{
            res.json({
                "message": "The password retested successfully"
            })
        }
    }

    async changePassword(req,res) {
        let {username, oldPassword, newPassword} = req.body;
        let result = await service.changePassword(username,oldPassword,newPassword);
        if (result === null){
            res.json({
                "message": "Their is error in changing password"
            })
        }else if (result === "the old password wrong"){
            res.json({
                "message": "The old password is wrong"
            })
        }else if (result === "The user not found"){
            res.status(404).json({
                "message": "The user not found"
            })
        }else{
            res.json({
                "message": "The password changed successfully"
            })
        }
    }
}

module.exports = {
    authControllers
}