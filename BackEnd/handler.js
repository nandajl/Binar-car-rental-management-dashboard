const { Car } = require('./models');
const express = require("express");
const app = express();

app.use(express.json());


function handleCreatecar(req, res) {
  const body = req.body;  
  Car.create(body).then(car => {
      res.status(201).json({car})
    }).catch(err => {
      res.status(422).json("Can't create car", err)
    })
}

function handleListcars(req, res) {
  Car.findAll().then(cars=>{
    res.status(200).json({cars})
  }).catch(err => {
    res.status(422).json("Car doesn't exist", err)
  })
}

function handleGetcar(req, res) {
    Car.findOne({
        where: { id:req.params.id }
    }).then(car=>{
        res.status(200).json({car})
      }).catch(err => {
        res.status(422).json("Car doesn't exist", err)
      })
}

function handleUpdatecar(req, res) {
    const body = req.body;
    Car.update(body,{
      where: { id:req.params.id }
    }).then(car => {
      res.status(201).json({car})
    }).catch(err => {
      res.status(422).json("Can't update car", err)
    })
}

function handleDeletecar(req, res) {
    Car.destroy({
        where: { id:req.params.id }
    }).then(()=>{
        res.status(200).json("Delete success")
      })
}

function handleListSizecar(req, res){
  const query = req.query.size
  console.log(query)
  Car.findAll({
    where: {
      size: query
    }
  }).then(cars=>{
    res.status(200).json({cars})
  }).catch(err => {
    res.status(422).json("Car doesn't exist", err)
  })
}

module.exports = {
  handleCreatecar,
  handleListcars,
  handleGetcar,
  handleUpdatecar,
  handleDeletecar,
  handleListSizecar
};
