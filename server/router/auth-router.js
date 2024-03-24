const express= require('express');
const router= express.Router();
const authControllers= require("../controllers/auth-controller");

// router.get("/", (req, res) =>{
//     res.status(200).send("Hola!!");
// })

router.route("/").get(authControllers.home); //GET: Read data

router.route("/register").post(authControllers.register); //POST: Insert data

module.exports= router;