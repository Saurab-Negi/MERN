//Controllers are typically used to process incoming request, interact with models

const User= require("../models/user-model");
const bcrypt = require('bcrypt'); // A library to help you hash passwords

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
        const {username, email, phone, password}= req.body; //Getting the registration data
        const userExist= await User.findOne({email}) //Checking if the email ID exists or not
        if(userExist){
            return res.status(400).json({messsage: "Email already exists"});
        }

        //hash the password
        // const saltRound=10;
        // const hash_password= await bcrypt.hash(password, saltRound);

        const userCreated= await User.create({username, email, phone, password,}); //If user is not present then create the user

        res.status(200).json({
            messsage: "Registration successful", 
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
        });
    }
    catch(error){
        res.status(500).json("Internal server error");
    }
}

module.exports= {home, register};