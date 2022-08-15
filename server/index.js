// entry point of server
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const FoodModel = require('./models/Food')

const app = express()

// allow us to recieve info from front end in json format
app.use(express.json());
app.use(cors())
mongoose.connect(
    "mongodb+srv://Mubashir:Scorpionking90@crud.hp3ew.mongodb.net/food?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
    }
);

// add Data
app.post("/insert", async(req, res) => {

    const foodName = req.body.foodName
    const days = req.body.days

    const food  = new FoodModel({foodName: foodName, daysSinceAte: days})
    try
    {
        await food.save();
        res.send("Data Inserted")
    }
    catch(err)
    {
        console.log(err);
    }
})


// read data from database
app.get("/read", async(req, res) => {
    // {} to get everything from mongo 
    // e.g {$where: {foodName:"Apple"}} to get apple

    FoodModel.find({},(err,result) => {
        if(err){
            // closes everything
            console.log(err)
            res.send(err) 
        }
        res.send(result)
    })

})

// update 
app.put("/update", async(req, res) => {
// updating Food name in database
    const newFoodName = req.body.newFoodName
    const id = req.body.id

    try
    {
        // find name by id and pass in the an object updatedFood which we set to our new food name
        await FoodModel.findById(id, (err,updatedFood) =>{
            updatedFood.foodName = newFoodName   
            updatedFood.save()
            // end the req by res.send
            res.send("update")
        })

    }
    catch(err)
    {
        console.log(err);
    }
})

// delete 
app.delete("/delete/:id", async(req,res) => {
    const id  = req.params.id
    await FoodModel.findByIdAndRemove(id).exec()
    res.send("deleted")
})
app.listen(process.env.PORT || 3001, () =>{
    console.log("Server running on port 3001...");
});