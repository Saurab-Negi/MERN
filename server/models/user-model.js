//Schema defines the structure of the documents within a collecton

const bcrypt = require('bcrypt');
const mongoose= require("mongoose");
const userSchema= new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true, 
    },
    phone: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
})

//Secure the password with the bcrypt
userSchema.pre('save', async function(next){ //This pre() will act as a middleware
    //console.log("pre method", this);
    const user= this;
    if(!userSchema.isModified("password")){
        next();
    }
    try{
        const saltRound= await bcrypt.genSalt(10);
        const hash_password= await bcrypt.hash(user.password, saltRound);
        user.password= hash_password; //password will be converted into hash password
    }
    catch(error){
        next(error);
    }
})

const User= new mongoose.model("User", userSchema);

module.exports= User;