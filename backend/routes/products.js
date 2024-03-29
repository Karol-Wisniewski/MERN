const express = require("express");
const productsRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;


productsRoutes.route("/").get(function (req, res) {
    res.json("Connected to mongo instance!");
});


//GET ALL
productsRoutes.route("/products").get(function (req, res) {
    const { sort, search } = req.query;

    let findQuery = {};

    let sortQuery = {};

    if (search) {
        findQuery = { name: { $regex: search, $options: 'i' } }
    }
    if (sort) {
        if (sort === "price_low") {
            sortQuery = { price: 1 };
        } else if (sort === "price_hig") {
            sortQuery = { price: -1 };
        } else if (sort === "name_a_z") {
            sortQuery = { name: 1 };
        } else if (sort === "name_z_a") {
            sortQuery = { name: -1 };
        }
    }

    let db_connect = dbo.getDb("test");
    db_connect.collection("products").find(findQuery).sort(sortQuery).toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

//GET ONE
productsRoutes.route("/products/:id").get(function (req, res) {
    let db_connect = dbo.getDb("test");
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("products").findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
    });
});

//POST
productsRoutes.route("/products").post(function (req, response) {
    let db_connect = dbo.getDb("test");
    let myobj = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        amount: req.body.amount,
        size: req.body.size,
    };
    db_connect.collection("products").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

//UPDATE
productsRoutes.route("/products/:id").put(function (req, response) {
    let db_connect = dbo.getDb("test");
    let myquery = { _id: ObjectId(req.params.id) };
    let newValues = {
        $set: {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            amount: req.body.amount,
            size: req.body.size,
        },
    };
    db_connect.collection("products").updateOne(myquery, newValues, function (err, res) {
        if (err) throw err;
        console.log("Document updated successfully");
        response.json(res);
    });
});

//DELETE
productsRoutes.route("/products/:id").delete(function (req, res) {
    let db_connect = dbo.getDb("test");
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("products").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("Document deleted");
        res.json(obj);
    });
})

//REPORT
productsRoutes.route("/products/:id/report").get(function (req, res) {
    let db_connect = dbo.getDb("test");
    db_connect.collection("products").aggregate([{ $match: { _id: ObjectId(req.params.id) } },
    {
        $project: {
            name: 1,
            price: 1,
            amount: 1,
            value: { $multiply: ["$price", "$amount"] }
        }
    }]).toArray(function (err, obj) {
        if (err) throw err;
        res.json(obj);
    })
})

module.exports = productsRoutes;