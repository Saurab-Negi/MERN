//Controllers are typically used to process incoming request

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
        res.status(200).json({messsage: req.body});
    }
    catch(error){
        res.status(500).json("Internal server error");
    }
}

module.exports= {home, register};