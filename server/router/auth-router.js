const express= require('express');
const router= express.Router(); //Allows developers to define routes in a modular and organized way.
const authControllers= require("../controllers/auth-controller"); //It is a refernce for all the routes

// router.get("/", (req, res) =>{
//     res.status(200).send("Hola!!");
// })

router.route("/").get(authControllers.home); //GET: Read data

router.route("/register").post(authControllers.register); //POST: Insert data
router.route("/login").post(authControllers.login); //login route

module.exports= router;