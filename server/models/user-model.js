//Schema defines the structure of the documents within a collecton

const bcrypt = require('bcrypt');
const mongoose= require("mongoose");
const jwt= require("jsonwebtoken"); //Authentication & authorisation
//JWT is JSON Object which is used to securely transfer information over the web(between two parties).

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
userSchema.pre('save', async function(next){ //This pre() will act as a middleware and It will run before saving the data in the database
    //console.log("pre method", this);
    const user= this;
    if(!userSchema.isModified("password")){
        return next();
    }
    try{ //If password is new created or changed
        const saltRound= await bcrypt.genSalt(10);
        const hash_password= await bcrypt.hash(user.password, saltRound);
        user.password= hash_password; //password will be converted into hash password
    }
    catch(error){
        next(error);
    }
})

// Define the method to generate JWT token
userSchema.methods.generateToken = async function() {
    try{
        return jwt.sign(
            {
                userID: this._id.toString(),
                email: this.email,
                isAdmin: this.isAdmin,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "15d", //Automatically expires after 15 days
            }
        );
    }
    catch(error){
        console.log(error);
    }
};

const User= new mongoose.model("User", userSchema);

module.exports= User;