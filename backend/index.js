//connection with database procedure

const express = require("express");
const cors = require("cors");
const config = require("./db/config");
const userModel = require("./db/userModel");
const Product = require("./db/Product");
const Jwt = require('jsonwebtoken');
const jwtKey = 'e-comm'

const app = express();
// const mongoose=require("mongoose");
// const app=express();

// const connectDB=async()=>{
//  mongoose.connect('mongodb+srv://khaqan:khaqan@cluster0.1mwa4os.mongodb.net/e-comm?retryWrites=true&w=majority')  ;
//  const productSchema=new mongoose.Schema({});
//  const product=mongoose.model('product',productSchema);
//  const data=await product.find();
//  console.log(data);   
// }
// connectDB();
app.use(express.json())
app.use(cors());

app.post("/signup", async (req, resp) => {
    let user = new userModel(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    // resp.send(result);
    Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            resp.send({ result: "something went wrong" })
        }
        resp.send({result , auth: token})
    })
})

app.post("/login", async (req, resp) => {
    console.log(req.body)
    if (req.body.password && req.body.email) {
        let user = await userModel.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    resp.send({ result: "something went wrong" })
                }
                resp.send({user , auth: token})
            })

        } else {
            resp.send({ result: "no result found" })
        }
    } else {
        resp.send({ result: 'no user found' })
    }
})

app.post("/add-product", async (req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result)
})
app.get("/products", async (req, resp) => {
    let products = await Product.find();
    if (products.length > 0) {
        resp.send(products)
    } else {
        resp.send({ result: "No products found" })
    }
})
app.delete("/product/:id", async (req, resp) => {
    const result = await Product.deleteOne({ _id: req.params.id })
    resp.send(result);
})
app.get("/product/:id", async (req, resp) => {
    const result = await Product.findOne({ _id: req.params.id })
    if (result) { resp.send(result) }
    else {
        resp.send({ result: "No result found" })
    }
})
app.put("/product/:id", async (req, resp) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    resp.send(result)
});

app.get('/search/:key', async (req, resp) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { category: { $regex: req.params.key } }
        ]
    });
    resp.send(result)
})


app.listen(5000)

