var User = require('../model/schema/user')

module.exports = {

  register: (request, response) => {
    return new Promise((resolve, reject) => {
      var user = new User ({})
      Object.assign(user, request.body.user)
      user.save((err, user) => {
        if (!err) {
          response.status(200).send({code: '200', message: 'user sucessfully registered'})
          resolve(true)
        } else {
          if (err.code === 11000) {
            reponse.status(200).send({code: err.code, message: 'user already exists'})
            resolve(err)
          } else {
            reject(err)
          }
        }
      })
    })
  },

  authenticate: (request, response) => {
    return new Promise((resolve, reject) => {
      var user = request.body.user
      User.findOne({
        email: user.email,
        password: user.password
      }, {__v: 0, _id: 0, password: 0}, (err, user) => {
        var result = {
          sucess: err === null && user !== null,
          user: user
        }

        response.status(200).send(result)
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  test: (request, response) => {
    response.send({ test: true, production: true })
  },

  registerTest: (request, response) => {
    return new Promise((resolve, reject) => {
      var user =  new User({
        email: "test@test.com",
        age: 20,
        atributo: "13123e1231",
        oioi: true
      })
      user.save((err, user) => {
        if (!err) {
          response.status(200).send({code: '200', message: 'user sucessfully registered', user: user, age: user.age })
          resolve(true)
        } else {
          if (err.code === 11000) {
            reponse.status(200).send({code: err.code, message: 'user already exists'})
            resolve(err)
          } else {
            reject(err)
          }
        }
      })
    })
  },

}
