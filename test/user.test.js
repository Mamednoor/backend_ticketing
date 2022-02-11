let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../index')

// Assertion Styles
let expect = chai.expect
let should = chai.should

// URL SERVER
let uri = 'http://localhost:8080'
let userData = {
  email:'compteservicecda@gmail.com',
  password:'Password1234@'
}

chai.use(chaiHttp)

describe('Testing API', () => {
	/**
	 * Test connexion to API
	 */
	describe('GET /', () => {
		it('Server connexion success', function (done) {
			chai
				.request(uri)
				.get('/')
				.end(function (err, res) {
					expect(res).to.have.status(200);
          expect(res.text).to.be.a('string');
          expect(res.text).to.equal('Serveur is running');
          expect(err).to.be.null
          done()
				})
		})
	})

	/**
	 * Test login route
	 */
  describe('POST /users/login', () => {
    it('User login route success', function(done) {
      chai
        .request(uri)
        .post('/users/login')
        .type('form')
        .send(
          userData
        )
        .end(function (err, res, req) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('Object');
          expect(res.body).to.have.property('status')
          expect(res.body).to.have.property('message')
          expect(res.body).to.have.property('refreshToken')
          expect(res.body).to.have.property('accessToken')
          expect(Object.keys(res.body)).to.have.lengthOf(4)
          expect(err).to.be.null
          done()
       });
    })
  })

  	/**
	 * Test GET profil
	 */
     describe('Get /users/profil', () => {
      it('Get user profil', function (done) {
        chai
          .request(uri)
          .get('/users/profil')
          .auth(userData)
          .send(userData)
          .end(function (err, res, req) {
            expect(err).to.be.null
            done()
          })
      })
    })

    



})
