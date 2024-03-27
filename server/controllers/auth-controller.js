//Controllers are typically used to process incoming request

const User= require("../models/user-model");
//const bcrypt = require('bcrypt');

//Home logic
const home= async (req, res) =>{
    try{
        res.status(200).send("Hola!!");
    }
    catch(error){
        console.log(error);
    }
}

//Registration logic
const register= async (req, res) =>{
    try{
        console.log(req.body);
        const {username, email, phone, password}= req.body;
        const userExist= await User.findOne({email}) //Checking if the emailID exists or not
        if(userExist){
            return res.status(400).json({messsage: "Emsil already exists"});
        }

        //hash the password
        // const saltRound=10;
        // const hash_password= await bcrypt.hash(password, saltRound);

        const userCreated= await User.create({username, email, phone, password,});

        res.status(200).json({messsage: userCreated});
    }
    catch(error){
        res.status(500).json("Internal server error");
    }
}

module.exports= {home, register};