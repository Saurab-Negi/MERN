require("dotenv").config();
const express= require('express');
const app= express();
const router= require("./router/auth-router");
const connectDB= require("./utils/db");

app.use(express.json()); //It adds Express middleware that parses incoming request bodies with JSON payloads
app.use("/api/auth", router); //To use the router in your main express app, you can "mount" it at a specific URL

const port= 3000;
connectDB().then(() =>{ //If Database connection is successful then start the server
    app.listen(port, () =>{
        console.log(`server is listening at port: ${port}`);
    })
})