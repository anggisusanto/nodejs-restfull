const Product = require('../models').Product;

module.exports = {
	list(req,res){
		return Product.findAll()
		.then(products=>{
			res.status(200).send({
				status:"OK",
		    	result: products,
		    	errors:{}
			});
		}).catch(error=> res.status(400).send({
	    	errors: error
	    }));
	},
	show(req,res){
		return Product.findById(req.params.id)
		.then(product=>{
			res.status(200).send({
				status:"OK",
		    	result: product,
		    	errors:{}
			});
		}).catch(error=> res.status(400).send({
	    	errors: error
	    }));
	},
	create(req,res){
		return Product.create({
			name: req.body.name,
			price: req.body.price,
			imageurl: req.body.imageurl
		}).then(product=>{
			res.status(201).send({
				status:"OK",
		    	result: product,
		    	errors:{}
			});
		}).catch(error=> res.status(400).send({
	    	errors: error
	    }));
	},
	update(req,res){
		return Product.update(
			{
				name: req.body.name,
				price: req.body.price,
				imageurl: req.body.imageurl
			},{
				where:{
					id:req.params.id
				}
			}
		).then(()=>{
			Product.findById(req.params.id).then(product=>{
				res.status(201).send({
					status:"OK",
			    	result: product,
			    	errors:{}
				});
			});
		}).catch(error=> res.status(400).send({
	    	errors: error
	    }));
	},
	destroy(req,res){
		return Product.destroy({
			where: {
				id: req.params.id
			}
		}).then(()=>{
			res.status(200).send({
				status:"OK",
		    	result: {
		    		message: req.params.id+' deleted'
		    	},
		    	errors:{}
			})
		}).catch(error=> res.status(400).send({
	    	errors: error
	    }));
	}
}