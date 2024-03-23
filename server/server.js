const express= require('express');
const app= express();
const router= require("./router/auth-router");

app.use("/api/auth", router); //To use the router in your main express app, you can "mount" it at a specific URL

const port= 3000;
app.listen(port, () =>{
    console.log(`server is listening at port: ${port}`);
})