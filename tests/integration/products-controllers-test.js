process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../app');
const models = require('../../server/models/index');
const seed = require('../product-seed');

describe('Products Routes', ()=>{
	beforeEach(done => {
		models.sequelize.sync({ force: true, match: /_test$/, logging: false })
	    .then(() => {
	      return seed(models)
	    }).then(() => {
	      done()
	    })
	});
});