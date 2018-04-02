process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../app');
const models = require('../../server/models/index');
const seed = require('../user-seed');
describe('Users Routes', ()=>{
	beforeEach(done => {
		models.sequelize.sync({ force: true, match: /_test$/, logging: false })
	    .then(() => {
	      return seed(models)
	    }).then(() => {
	      done()
	    })
	});
	describe("[POST] /auth/signup",()=>{
		it("should create user", (done)=>{
			chai.request(server)
			.post('/auth/signup')
			.send({
					name: "albert",
					email: "me@albert.id",
					password: "toostrong"
				})
			.end((err,res)=>{
				should.not.exist(err);
				res.status.should.equal(201);
				res.type.should.equal('application/json');
				res.body.status.should.equal("OK")
				res.body.result.should.include.keys(
					'id','name','email','password_digest','createdAt','updatedAt'
				);
				res.body.errors.should.be.empty;
				done();
			});
		});
	});
	describe("[POST] /auth/login",()=>{
		it("should do login",(done)=>{
			chai.request(server)
			.post('/auth/login')
			.send({
				email:"albert@me.com",
				password:"toostrong"
			})
			.end((err,res)=>{
				should.not.exist(err);
				res.status.should.equal(200);
				res.body.status.should.equal("OK")
				res.body.result.should.include.keys(
					'access_token'
				);
				res.body.errors.should.be.empty;
				done();
			})
		});
	});
	
});