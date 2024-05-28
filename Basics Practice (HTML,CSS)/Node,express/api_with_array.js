const express= require("express");
const app= express();


const products=['laptop','rtx 3080', 'ryzen 7 5800x'];

//get
app.get("/api/products/:ind", function(req,res)

            { if (!products[req.params.ind])
                return res.status(404).send("product not found");
                
                else{
                    res.send(products[req.params.ind])
                }
            } );


app.listen(3000);

// update
