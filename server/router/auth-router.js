const express= require('express');
const router= express.Router();

// router.get("/", (req, res) =>{
//     res.status(200).send("Hola!!");
// })

router.route("/").get((req, res) =>{
    res.status(200).send("Hola!!");
})

router.route("/register").get((req, res) =>{
    res.status(200).send("Registration page");
})

module.exports= router;