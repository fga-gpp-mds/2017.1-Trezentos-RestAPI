var expect = require("chai").expect
var assert = require('chai').assert
var User = require('../model/schema/user')
var userController = require('../controller/user.js')
var sinon = require('sinon')
var testHelper = require('./test-helper')

const response = {
  status: function () {},
  end: function () {},
  send: function () {}
}

function isError(e) {
    if (typeof e === 'string') {
        return Promise.reject(new Error(e));
    }
    return Promise.resolve(e);
}

describe('Test suite for Users', () => {

  testHelper.setupTest()

  describe('User', () => {
    describe('when registered', () => {
      it('should successfully register user', (done) => {
        var query = {
          name: 'test',
          email: 'test@test.com',
          password: '123456',
          facebook: false,
          salt: '123',
          rates: [],
          ratesToDo: []
        }

        var savedUser = {
          name: 'test',
          email: 'test@test.com',
          password: '123456',
          isFromFacebook: false,
          salt: '123',
          rates: [],
          ratesToDo: []
        }

        var mock = sinon.mock(response)
        mock.expects('status').once().withExactArgs(200).returns(response)
        mock.expects('send').once().withExactArgs({ code: '200', message: 'user successfully registered', user: savedUser })

        userController.register({ query: query }, response)
        .then(() => {
          try {
            mock.verify()
            mock.restore()
            done()
          } catch (exception) {
            done(exception)
          }
        })
        .catch((err) => {
          done(err)
        })
      }),

      it('should sucessfully if user already exists', (done) => {
        var query = {
          name: 'test',
          email: 'test@test.com',
          password: '123456',
          facebook: false,
          salt: '123',
          rates: [],
          ratesToDo: []
        }

        var savedUser = {
          name: 'test',
          email: 'test@test.com',
          password: '123456',
          isFromFacebook: false,
          salt: '123',
          rates: [],
          ratesToDo: []
        }

        var mock = sinon.mock(response)
        mock.expects('status').once().withExactArgs(200).returns(response)
        mock.expects('send').once().withArgs({ code: 11000, message: 'user already exists'})

        userController.register({ query: query }, response)
        .then(() => {
          try {
            mock.verify()
            mock.restore()
            done()
          } catch (exception) {
            done(exception)
          }
        })
        .catch((err) => {
          done(err)
        })
      })

    })

    describe('when found rates', () => {
        it('should successfully find rate in exam', (done) => {
          var query = {
            email: 'test@test.com',
            userClass: 'class name',
            exam: 'testExam',
            userClassOwnerEmail: 'teacher@email.com'
          }
          
          var foundRate = [{ 
            userClass: 'class name',
            exam: 'testExam',
            email: 'test@test.com'
          }]

          var mock = sinon.mock(response)
          mock.expects('status').once().withExactArgs(200).returns(response)

          userController.findUserRateInExam({ query: query }, response)
          .then(() => {
            try {
              mock.verify()
              done()
            } catch (exception) {
              done(exception)
            }
          })
          .catch((err) => {
            done(err)
          })
        }),

        it('should successfully find rates to do', (done) => {
            var query = {
              email: 'test@test.com'
            }
            
            var foundRate = [{ 
              email: 'test@test.com'
            }]

            var mock = sinon.mock(response)
            mock.expects('status').once().withExactArgs(200).returns(response)

            userController.findUserRatesToDo({ query: query }, response)
            .then(() => {
              try {
                mock.verify()
                done()
              } catch (exception) {
                done(exception)
              }
            })
            .catch((err) => {
              done(err)
            })
        }),

        it('should successfully delete rates to do', (done) => {
            var query = {
              email: 'test@test.com',
              rate: {
                userClass: 'class name',
                exam: 'testExam',
                userClassOwnerEmail: 'teacher@email.com'
              }
            }

            var mock = sinon.mock(response)
            mock.expects('status').once().withExactArgs(200).returns(response)

            userController.deleteRatesToDo({ query: query }, response)
            .then(() => {
              try {
                mock.verify()
                done()
              } catch (exception) {
                done(exception)
              }
            })
            .catch((err) => {
              done(err)
            })
        })
    })

    describe('when saved rates', () => {
        it('should successfully save rate', (done) => {
          var body = {
            email: 'test@test.com',
            rate: {
              userClassOwnerEmail: 'teacher@email.com',
              userClass: 'class name',
              rate: 5
            }
          }
          
          var mock = sinon.mock(response)
          mock.expects('status').once().withExactArgs(200).returns(response)
          mock.expects('send').once().withExactArgs({result: true})
          
          userController.saveRates({ body: body }, response)
          .then(() => {
            try {
              mock.verify()
              mock.restore()
              done()
            } catch (exception) {
              done(exception)
            }
          })
          .catch((err) => {
             done(err)
          })

        }),

        it('should successfully save rates to do', (done) => {
          var body = {
            email: 'test@test.com',
            rate: {
              userClassOwnerEmail: 'teacher@email.com',
              userClass: 'class name',
              rate: 5
            }
          }
          
          var mock = sinon.mock(response)
          mock.expects('status').once().withExactArgs(200).returns(response)
          mock.expects('send').once().withExactArgs({result: true})
          
          userController.saveRatesToDo({ body: body }, response)
          .then(() => {
            try {
              mock.verify()
              mock.restore()
              done()
            } catch (exception) {
              done(exception)
            }
          })
          .catch((err) => {
            done(err)
            })

        })
    })

    describe('when authenticated', () => {
      it('should sucessfully authenticate user', (done) => {
        var query = {
          email: 'test@test.com'
        }

        var savedUser = {
          success: true,
          name: 'test',
          password: '123456',
          salt: '123'
        }

        var mock = sinon.mock(response)
        mock.expects('status').once().withExactArgs(200).returns(response)
        mock.expects('send').once().withArgs(savedUser)

        userController.authenticate({ query: query }, response)
        .then(() => {
          try {
            mock.verify()
            mock.restore()
            done()
          } catch (exception) {
            done(exception)
          }
        })
        .catch((err) => {
          done(err)
        })
      })

      it('should sucessfully if not authenticate user', (done) => {
        var query = {
          email: 'test12@test.com'
        }

        var savedUser = {
          success: false,
          name: null,
          password: null,
          salt: null
        }

        var mock = sinon.mock(response)
        mock.expects('status').once().withExactArgs(400).returns(response)
        mock.expects('send').once().withArgs(savedUser)

        userController.authenticate({ query: query }, response)
        .then(() => {
          try {
            mock.verify()
            mock.restore()
            done()
          } catch (exception) {
            done(exception)
          }
        })
        .catch((err) => {
            done(err)
          })
        })

      })
  })

  describe('when error occur', () => {
    it('when save user', (done) => {
      userController.register({ query: {} }, response)
      .then(() => {
        done('should reject')
      })
      .catch(isError)
      .then((err) => {
        assert.isDefined(err);
        done()
      })
    }),

    it('when authenticate', (done) => {
      userController.authenticate({ query: {} }, response)
      .then(() => {
        done('should reject')
      })
      .catch(isError)
      .then((err) => {
        assert.isDefined(err);
        done()
      })
    }), 

    it('when save rates', (done) => {
      userController.saveRates({ query: {} }, response)
      .then(() => {
        done('should reject')
      })
      .catch(isError)
      .then((err) => {
        assert.isDefined(err);
        done()
      })
    }),

    it('when save rates to do', (done) => {
      userController.saveRatesToDo({ query: {} }, response)
      .then(() => {
        done('should reject')
      })
      .catch(isError)
      .then((err) => {
        assert.isDefined(err);
        done()
      })
    }),

    it('when rates in exam', (done) => {
      userController.findUserRateInExam({ body: {} }, response)
      .then(() => {
        done('should reject')
      })
      .catch(isError)
      .then((err) => {
        assert.isDefined(err);
        done()
      })
    }),

    it('when find rates to do', (done) => {
      userController.findUserRatesToDo({ body: {} }, response)
      .then(() => {
        done('should reject')
      })
      .catch(isError)
      .then((err) => {
        assert.isDefined(err);
        done()
      })
    }),

    it('when delete rates to do', (done) => {
      userController.deleteRatesToDo({ body: {} }, response)
      .then(() => {
        done('should reject')
      })
      .catch(isError)
      .then((err) => {
        assert.isDefined(err);
        done()
      })
    })

  })

})
