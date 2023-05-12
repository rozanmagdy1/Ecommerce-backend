const {findOne, insertOne, findAll, deleteOne, updateOne, deleteSome, updateOneByQuery} = require("../DB/Base");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {ObjectId} = require("mongodb");
const crypto = require("crypto");
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const dataBaseName = "ZobaStore";
const collectionName = "users";

class UserService {
    async register(firstname, lastname, username, password, gender, isAdmin) {
        let user = await findOne(dataBaseName, collectionName, {username: username});
        if (!user) {
            password = await bcrypt.hash(password, 10);
            if (!isAdmin) {
                return await insertOne(dataBaseName, collectionName,
                    {firstname, lastname, username, password, gender, isActive: true, isAdmin: false});
            } else {
                return await insertOne(dataBaseName, collectionName,
                    {firstname, lastname, username, password, gender, isAdmin, isActive: true});
            }
        } else {
            return null;
        }
    }
    async login(username, password) {
        try {
            let user = await findOne(dataBaseName, collectionName, {username: username});
            if (!user) {
                return {statues: false, message: "user not found"};
            } else {
                if (!await bcrypt.compare(password, user.password)) {
                    return {statues: false, message: "password wrong"};
                } else{
                    if(user.isActive === false){
                        return {statues: false, message: "user not active"};
                    }else{
                        let loginToken = jwt.sign({username: user.username, id: user._id, isAdmin: user.isAdmin}
                            , 'shhhhh');
                        return {
                            statues: true,
                            message: "login successfully",
                            token: loginToken,
                        };
                    }
                }
            }
        } catch (e) {
            return null;
        }
    }
    async listUsers() {return await findAll(dataBaseName, collectionName);}
    async listUser(token) {
        try {
            let id = await this.getUserIdFromToken(token);
            return await findOne(dataBaseName, collectionName, {"_id": ObjectId(id)});
        } catch (e) {
            return null;
        }
    }

    async getUserById(id) {
        let user = await findOne(dataBaseName, collectionName, {_id: ObjectId(id)});
        if (!user) {
            return null
        } else {
            return user
        }
    }
    async deleteUserById(id) {
        let user = await findOne(dataBaseName, collectionName, {_id: ObjectId(id)});
        if (!user) {
            return null;
        } else {
            return await deleteOne(dataBaseName, collectionName, {_id: ObjectId(id)});
        }
    }
    async deleteAllUsers(token) {
        try {
            let username = await this.getUserNameFromToken(token);
            return await deleteSome(dataBaseName, collectionName, {username: {$ne: username}});
        } catch (e) {
            return null;
        }
    }
    async updateUserById(id, data) {
        let user = await findOne(dataBaseName, collectionName, {_id: ObjectId(id)});
        if (!user) {
            return null;
        } else {
            return updateOne(dataBaseName, collectionName, id, data);
        }
    }
    async changeUserStatus(id) {
        let user = await findOne(dataBaseName, collectionName, {_id: ObjectId(id)});
        if (!user) {
            return null;
        }
        if (!user.isActive || user.isActive === false) {
            return updateOne(dataBaseName, collectionName, id, {isActive: true});
        } else {
            return updateOne(dataBaseName, collectionName, id, {isActive: false});
        }
    }
    async getUserIdFromToken(token) {
        let decoded = jwt.verify(token, 'shhhhh');
        return decoded.id;
    }
    async getUserNameFromToken(token) {
        let decoded = jwt.verify(token, 'shhhhh');
        return decoded.username;
    }

    transporter = nodemailer.createTransport(sendGridTransport({
        service: 'gmail',
        auth: {
            api_key: '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'
        }
    }));

    async forgotPassword(req, email) {
        let resetLink
        let user = await findOne(dataBaseName, collectionName, {username: email});
        if (!user) {
            return "user not found";
        } else {
            const code = crypto.randomBytes(1).toString('hex');
            let token = jwt.sign({code}, 'resettoken', {expiresIn: '60m'});

            if (user.isAdmin === true) {
                resetLink = `http://${req.headers.host}/admin/resetPassword/${token}`;
            } else {
                resetLink = `http://${req.headers.host}/website/resetPassword/${token}`;
            }

            const mailOptions = {
                from: '0xalameda@gmail.com',
                to: email,
                subject: 'Reset your password',
                html: `
                        <h1 style="text-align: center;">E-commerce</h1><p>Please click the following link to reset your password:</p>
                        <a href=${resetLink}>${resetLink}</a>
                        <p style="opacity: 0.9;">Best regards,</p>
                        <p style="opacity: 0.9;">Your Website Team</p>
                        `
            };

            try {
                await this.transporter.sendMail(mailOptions);
                return {
                    message: 'Email sent',
                    resetLink: resetLink
                };
            } catch (error) {
                console.error(error);
                return 'Error sending email';
            }
        }
    }

    async resetPassword(resetToken, username, newPassword) {
        try {
            let user = await findOne(dataBaseName, collectionName, {username: username});
            if (!user) {
                return "The user not found";
            } else {
                try {
                    let decoded = jwt.verify(resetToken, "resettoken");
                    newPassword = await bcrypt.hash(newPassword, 10);
                    return updateOneByQuery(dataBaseName, collectionName, {"username": username}, {password: newPassword});
                } catch (e) {
                    return null
                }
            }
        } catch (e) {
            return null;
        }
    }

    async changePassword(username, oldPassword, newPassword) {
        try {
            let user = await findOne(dataBaseName, collectionName, {username: username});
            if (!user) {
                return "The user not found";
            } else {
                if (await bcrypt.compare(oldPassword, user.password)) {
                    newPassword = await bcrypt.hash(newPassword, 10);
                    return updateOneByQuery(dataBaseName, collectionName, {"username": username}, {password: newPassword});
                } else {
                    return "The old password wrong";
                }
            }
        } catch (e) {
            return null;
        }
    }
}

module.exports = {
    UserService
}