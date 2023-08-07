import { Router } from "express";
import jwt from 'jsonwebtoken';
import AsyncHandler from "express-async-handler";
import { User, UserModel } from "../../models/users/User.model";
import { HTTP_BAD_REQUEST } from "../../constants/http_status";
import bcrypt from 'bcryptjs'

const router = Router()

router.post("/login", AsyncHandler( async (req, res) => {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email, password})

    if(user) {
        res.send(generateTokenResponse(user))
    } else {
        res.status(HTTP_BAD_REQUEST).send("Usuário ou senhas inválidos ")
    }
    
}))

router.post("/register", AsyncHandler(async (req, res) => {
    const {name, email, password, address} = req.body
    const user = await UserModel.findOne({email})
    if(user) {
        res.status(HTTP_BAD_REQUEST).send("Usuário já existe")
        return;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser: User = {
        name,
        email: email.toLowerCase(),
        password: encryptedPassword,
        address,
        isAdmin: false,
        imageUrl: ''
    }

    const dbUser = await UserModel.create(newUser);
     res.send(generateTokenResponse(dbUser))

}))

const generateTokenResponse = (user: User) => {
    const token = jwt.sign({
        id: user.id,email:user.email, isAdmin: user.isAdmin
    }, "sometext", {
        expiresIn: "1d",

    });
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        token: token
    };
}


export default router;