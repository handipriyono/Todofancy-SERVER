let Todo = require('../models/todos')
var jwt = require('jsonwebtoken');
let User = require('../models/users')

module.exports = {

  //
  // viewTodo: function (req, res) {
  //   var decodeds = jwt.verify(req.headers.tokenapp, process.env.JWTsecret);
  //   console.log('ini idi decodes', decodeds.id)
  //   Todo.find({
  //       author: decodeds.id
  //     }).sort({
  //       createdAt: 'desc'
  //     })
  //     .populate('author')
  //     .exec(function (err, data) {
  //       if (err) {
  //         console.log(err)
  //         res.json(err)
  //       } else {
  //
  //         User.findById({
  //             _id: decodeds.id
  //           })
  //           .then(function (dataid) {
  //             console.log('dataid', dataid)
  //             res.json({
  //               data: data,
  //               nama: dataid
  //             })
  //
  //           })
  //           .catch(function (err) {
  //             console.log(err)
  //             res.json(err)
  //           })
  //
  //
  //
  //         // console.log('ini data', data)
  //
  //       }
  //     })
  // },
  //






  viewTodo: function (req, res) {
    var decodeds = jwt.verify(req.headers.tokenapp, process.env.JWTsecret);
    console.log('ini idi decodes', decodeds.id)
    Todo.find({
        author: decodeds.id
      }).sort({
        createdAt: 'desc'
      })
      .populate('author')
      .exec(function (err, data) {
        if (err) {
          console.log(err)
          res.json(err)
        } else {
          console.log('ini data', data)
          res.json(data)
        }
      })
  },


  addTodo: function (req, res) {
    var decodeds = jwt.verify(req.headers.tokenapp, process.env.JWTsecret);
    Todo.create({
        content: req.body.content,
        author: decodeds.id,
        isDone: false
      })
      .then(function (result) {
        res
          .status(201)
          .json(result)
      })
      .catch(function (err) {
        console.log(err)
        res.json(err)
      })
  },


  deleteTodo: function (req, res) {
    Todo.findByIdAndRemove({
        _id: req.params.id
      })
      .then(function (result) {
        res.json({
          message: "Todo telah dihapus",
          result
        })
      })
      .catch(function (err) {
        console.log(err)
        res.json(err)
      })
  },



  allTodo: function (req, res) {
    var decodeds = jwt.verify(req.headers.tokenapp, process.env.JWTsecret);
    console.log(decodeds)
    Todo.find({
        author: decodeds.id
      })
      .then(function (dataTodo) {
        console.log(dataTodo)
        res.json(dataTodo)
      })
      .catch(function (err) {
        console.log(err)
        res.json(err)
      })
  },

  updatetodo: function (req, res) {
    Todo.findByIdAndUpdate(req.params.id, {
        content: req.body.content
      })
      .then(function (dataUpdate) {
        console.log(dataUpdate)
        res.json(dataUpdate)
      })
      .catch(function (err) {
        console.log(err)
        res.json(err)
      })

  }

}
