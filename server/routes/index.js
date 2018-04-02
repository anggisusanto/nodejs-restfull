const controllers = require('../controllers');
const secret = process.env.SECRET_KEY||'someemptystring';
const jwt = require('jsonwebtoken');
module.exports = (app) => {
  app.post('/auth/signup', controllers.users.create);
  app.post('/auth/login', controllers.users.login);
  app.get('/api', authMiddleware,(req, res) => {
  	res.status(200).send({
		status: "OK",
		result: "Welcome to Simple Products API",
		errors:{}
	})
  });
  app.get('/api/v1/products',authMiddleware,controllers.products.list);
  app.get('/api/v1/products/:id?',authMiddleware,controllers.products.show);
  app.post('/api/v1/products',authMiddleware,controllers.products.create);
  app.put('/api/v1/products/:id?',authMiddleware,controllers.products.update);
  app.delete('/api/v1/products/:id?',authMiddleware,controllers.products.destroy);


};
var authMiddleware = (req,res,next) =>{
	var token  = req.headers['authorization'];
  	if(token){
  		jwt.verify(token,secret, (err,decoded)=>{
  			if(err){
  				res.status(401).send({
  					status: "FAILED",
  					errors: "Failed to authenticate token."
  				})
  			}else{
  				req.decoded = decoded;
  				next();
  			}
  		})
  	}else{
  		res.status(403).send({
  			status: "FAILED",
  			errors: "No Token Provided"
  		});
  	}
}