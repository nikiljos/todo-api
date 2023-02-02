const mongoose = require("mongoose");
const { Schema } = mongoose;

// const fb = require("../services/firebase.js");

mongoose.connect(process.env.atlasURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("connection successful");
});

const userSchema = new Schema({
    name:String,
    email:String,
    password:String,
    tasks:[
        {
            title:String,
            priority:Number,
            status:String
        }
    ],
    deleteCount:Number
});

const users = mongoose.model("users", userSchema, "users");


module.exports={
    users
}
