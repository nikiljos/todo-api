const db=require("../db")
const {hashInputPassword,verifyInputPassword}=require("../utils/password")
const {generateToken}=require("../utils/jwt");
const e = require("express");

const handler=(req,res)=>{
    res.send("hello");
}

const signUp = async(req, res) => {

    let { name, email, password } = req.body;
    if (typeof name !== "string"||typeof email !== "string" || typeof password !== "string") {
        res.status(400).send({
            status: false,
            message: "Invalid Input",
        });
        return;
    }
    let userExist=await db.users.find({
        email
    })
    .then(data=>{
        console.log(data)
        if(data.length>0){
            res.status(400).send({
                status:false,
                message:"User already exists!"
            })
            return true
        }
        return false
    })
    if(!userExist){
        let passwordHash=await hashInputPassword(password)
        db.users.create([{
            name,
            email,
            password:passwordHash
        }])
        .then(async data=>{
            console.log(data[0].id)
            let accessToken = await generateToken(data[0].id)
            console.log(accessToken)
            res.status(200).send({
                status:true,
                message:"SignUp Successfull",
                data:{
                    accessToken
                }
            })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).send({
                status:false,
                message:"Internal Server error"
            })
        })
    }  

};

const login = async (req, res) => {
    let { email, password } = req.body;
    if (
        typeof email !== "string" ||
        typeof password !== "string"
    ) {
        res.status(400).send({
            status: false,
            message: "Invalid Input",
        });
        return;
    }
    let user = await db.users
        .find({
            email
        })
        .then(async (data) => {
            console.log(data);
            if (data.length === 0) {
                res.status(400).send({
                    status: false,
                    message: "User does not exist!",
                });
                return false;
            }
            let correctPass=await verifyInputPassword(password,data[0].password)
            .then((status)=>{
                console.log(status)
                return status;
            })
            if (correctPass) {
                return data[0].id;
            } else {
                res.status(400).send({
                    status: false,
                    message: "Invalid Password!",
                });
                return false;
            }
        
        });
    if (user) {
        let accessToken=await generateToken(user)
        res.status(200).send({
            status:true,
            data:{
                accessToken
            }
        })
    }
};

module.exports={
    handler,
    signUp,
    login
}