const User = require('../models').User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const secret = process.env.SECRET_KEY||'someemptystring';

module.exports = {
	create(req, res){
		let hash = bcrypt.hashSync(req.body.password,saltRounds);
	    return User.create({
	    	name: req.body.name,
	    	email: req.body.email,
	    	password_digest: hash
	    }).then(user=> res.status(201).send({
	    	status:"OK",
	    	result: user,
	    	errors:{}
	    })).catch(error=> res.status(400).send({
	    	errors: error
	    }));
	},
	login(req,res){
		return User.findOne({
			where: {email:req.body.email}
		}).then(user=>{
			console.log(secret)
			res.status(200).send({
				status:"OK",
		    	result: {
		    		access_token: jwt.sign({id:user.id},secret,{expiresIn:86400})
		    	},
		    	errors:{}
		    });
		}).catch(error=> res.status(400).send({
	    	errors: error
		}));
	}
};