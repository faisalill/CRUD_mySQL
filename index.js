const e = require('express')
const express = require('express')
const {Sequelize, DataTypes}  = require('sequelize')
const app = express()
app.use(express.json())
const sequelize = new Sequelize("crud","user_name","user_password", {
host: 'localhost',
dialect: 'mysql'
})
const User = sequelize.define("Users", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER
    }
})
app.get("/", (req,res)=>{
try {
    sequelize.authenticate()
    sequelize.sync()
    res.send("Table created successfully")
} catch (error) {
    res.send(error)
}
})
app.post("/createUser", (req,res)=>{
    User.create({
   name: req.body.name,
   username: req.body.username,
   age: req.body.age
    })
    .then(sequelize.sync())
    .catch((error)=>res.send(error))
})
app.get("/allUsers", (req,res)=>{
    User.findAll()
    .then(result=>{res.send(result)})
    .catch((error)=>{res.send(error)})
})
app.delete("/deleteUser", (req,res)=>{
    User.destroy({
        where: {
            id: req.body.id
        }
    }).then(result=>res.json(result))
    .catch((error)=>res.json(error))
})
app.put("/updateUser", (req,res)=>{
    User.update(
        {name: req.body.name}, {
            where: {
                id: req.body.id
            }
        }
    ).then((result)=>res.json(result))
    .catch((error)=>res.json(error))
})
app.listen("3000", ()=>{
    console.log("SErver runing")
})
