
try{
    if (!req.body)
        return res.status(400).send("Invalid request body");
    const {name,price,photo,description} = req.body;
    if (!name, !price, !photo, !description){
        res.status(501).send("All field required")
    }


    
}catch(err){
    
}