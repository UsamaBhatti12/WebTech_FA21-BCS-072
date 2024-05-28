const mongoose=require("mongoose")

const userschema= new mongoose.Schema({

    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, min: 18, max: 100 },
    createdAt: { type: Date, default: Date.now }

})

// now create a model of this schema

// (modelname, schemaname)

const usermodel=mongoose.model("user",userschema);
module.exports=usermodel;






//  name:"Shezan juice",
// flavour:"Mango",
// Chilled: true,
// fruit:"30%",
// quantity: "1Litre",