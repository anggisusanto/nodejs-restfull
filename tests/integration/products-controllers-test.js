process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY||'someemptystring';

chai.use(chaiHttp);

const server = require('../../app');
const models = require('../../server/models/index');
const productsSeed = require('../product-seed');
const usersSeed = require('../user-seed');
var token
describe('Products Routes', ()=>{
	beforeEach((done) => {
		models.sequelize.sync({ force: true, match: /_test$/, logging: false })
	    .then(() => {
	      return productsSeed(models)
	    }).then(()=> {
	      return usersSeed(models)
	    }).then((user) => {
	    	token = jwt.sign({id:user.id},secret,{expiresIn:86400})
	      done()
	    })
	});
	describe("[GET] /api/v1/product list", ()=>{
		it("Should get list of products", (done)=>{
			chai.request(server)
			.get('/api/v1/products')
			.set({'Authorization':token})
			.end((err,res)=>{
				should.not.exist(err);
				res.status.should.equal(200);
				res.body.status.should.equal("OK")
				res.body.result[0].should.include.keys(
					'id','name','price','imageurl','createdAt','updatedAt'
				);
				res.body.errors.should.be.empty;
				done();
			})
		});
	});
	describe("[GET] /api/v1/product/:id ", ()=>{
		it("Should get one product", (done)=>{
			chai.request(server)
			.get('/api/v1/products/'+1)
			.set({'Authorization':token})
			.end((err,res)=>{
				should.not.exist(err);
				res.status.should.equal(200);
				res.body.status.should.equal("OK")
				res.body.result.should.include.keys(
					'id','name','price','imageurl','createdAt','updatedAt'
				);
				res.body.errors.should.be.empty;
				done();
			})
		});
	});
	describe("[POST] /api/v1/product/ ", ()=>{
		it("Should create a product", (done)=>{
			chai.request(server)
			.post('/api/v1/products')
			.set({'Authorization':token})
			.send({
				name: "Giant Reign",
			    price: 2560,
			    imageurl: "http://www.sepedacycleshop.com/image-product/img2033-1368243649.jpg",
			})
			.end((err,res)=>{
				should.not.exist(err);
				res.status.should.equal(201);
				res.body.status.should.equal("OK")
				res.body.result.should.include.keys(
					'id','name','price','imageurl','createdAt','updatedAt'
				);
				res.body.result.id.should.equal(4);
				res.body.errors.should.be.empty;
				done();
			})
		});
	});
	describe("[PUT] /api/v1/product/:id ", ()=>{
		it("Should update a product", (done)=>{
			chai.request(server)
			.put('/api/v1/products/'+1)
			.set({'Authorization':token})
			.send({
				name: "Giant Reign",
			    price: 2560,
			    imageurl: "http://www.sepedacycleshop.com/image-product/img2033-1368243649.jpg",
			})
			.end((err,res)=>{
				should.not.exist(err);
				res.status.should.equal(201);
				res.body.status.should.equal("OK")
				res.body.result.should.include.keys(
					'id','name','price','imageurl','createdAt','updatedAt'
				);
				res.body.result.name.should.equal('Giant Reign');
				res.body.result.price.should.equal(2560);
				res.body.result.imageurl.should.equal('http://www.sepedacycleshop.com/image-product/img2033-1368243649.jpg');
				res.body.errors.should.be.empty;
				done();
			})
		});
	});
	describe("[DELETE] /api/v1/product/:id ", ()=>{
		it("Should delete a product", (done)=>{
			chai.request(server)
			.delete('/api/v1/products/'+1)
			.set({'Authorization':token})
			.end((err,res)=>{
				should.not.exist(err);
				res.status.should.equal(200);
				res.body.status.should.equal("OK")
				res.body.result.should.include.keys(
					'message'
				);
				res.body.result.message.should.equal('1 deleted');
				res.body.errors.should.be.empty;
				done();
			})
		});
	});
});