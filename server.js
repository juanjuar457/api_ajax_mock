const bodyParser = require('body-parser');
const express = require('express');
const app = express();
// const routes = require("./routes");  //junkroutes at the moment.. 4/13 
const morgan = require("morgan"); 
const mongoose = require("mongoose"); 
// const jsonParser = require("body-parser").json();
const {PORT, DATABASE_URL} = require('./config');
const models = require('./models'); 
const Material = models.Material;
const User = models.User; 
// app.use(jsonParser);
app.use(morgan('common'));
app.use(bodyParser.json());
mongoose.Promise = global.Promise;

app.use(express.static('public'))




app.get('/materials', (req, res) => {
	Material
	.find()
	.limit(1000)
	.exec()
	.then(materials => {
		res.json({
			materials: materials.map(
				(material) => material.apiRepr())
		}); 
	})
	.catch(
		err => {
			console.error(err); 
			res.status(500).json({message: 'Internal Server error'}); 
		});
}); 


//get request for materials by id 
app.get('/materials/:id', (req, res) => {
  Material
    // this is a convenience method Mongoose provides for searching
    // by the object _id property
    .findById(req.params.id)
    .exec()
    .then(material =>res.json(material.apiRepr()))
    .catch(err => {
      console.error(err);
        res.status(500).json({message: 'Internal server error'})
    });
});

// POST req for new material IT WORKS, requires the 6 fields to post  
app.post('/materials', (req, res) => {
  console.log(req.body);
	const requiredFields = ['vendor', 'quantity', 'product_name', 'catalog_number', 'unit_size', 'units'];
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \ ${field}\` in request body`
			console.error(message); 
			return res.status(400).send(message); 
		}
	}

	Material
		.create({
			vendor: req.body.vendor,
			quantity: req.body.quantity,
			product_name: req.body.product_name,
			catalog_number: req.body.catalog_number,
			unit_size: req.body.unit_size,
			units: req.body.units})
		.then(
			material => res.status(201).json(material.apiRepr()))
		.catch(err => {
			console.error(err);
			res.status(500).json({message: 'Internal server error'}); 
			});
});

app.put('/materials', (req, res) => {
  console.log(req.body);
  const requiredFields = ['vendor', 'quantity', 'product_name', 'catalog_number', 'unit_size', 'units'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \ ${field}\` in request body`
      console.error(message); 
      return res.status(400).send(message); 
    }
  }

  Material
    .create({
      vendor: req.body.vendor,
      quantity: req.body.quantity,
      product_name: req.body.product_name,
      catalog_number: req.body.catalog_number,
      unit_size: req.body.unit_size,
      units: req.body.units})
    .then(
      material => res.status(201).json(material.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'}); 
      });
});

//how would you add code to highlight a material on the client?? 
// app.put('/materials', (req, res) => {
//   console.log(req.body);
//   res.json(req.body.name).end();
//   // Material
//   // res.json({response: "material on back order"})
//   //   .findOneAndUpdate({_id: id},{ $set: { onBackOrder: query.body.data.onBackOrder}}, )
//   //   .exec()
//   //   .then(material =>res.json(material.apiRepr()))
//   //   .catch(err => {
//   //     console.error(err);
//   //       res.status(500).json({message: 'Internal server error'})
//   //   });
// });

//look up PUT endpoints, look at all the ex's if not sure still... d
//need callback, as far as the args, not sure how they are arranged.. confusing since ex's are in 
//ES5 not ES6... 

//mongoose docs for example of PUT 
  // if a model is passed in instead of an id

//   if (id instanceof Document) {
//     id = id._id;
//   }

//   return this.findOneAndUpdate.call(this, {_id: id}, update, options, callback);
// };
//thinkful example for put's 
// app.put('/posts/:id', (req, res) => {
//   if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
//     res.status(400).json({
//       error: 'Request path id and request body id values must match'
//     });
//   }

//   const updated = {};
//   const updateableFields = ['title', 'content', 'author'];
//   updateableFields.forEach(field => {
//     if (field in req.body) {
//       updated[field] = req.body[field];
//     }
//   });

//   BlogPost
//     .findByIdAndUpdate(req.params.id, {$set: updated}, {new: true})
//     .exec()
//     .then(updatedPost => res.status(201).json(updatedPost.apiRepr()))
//     .catch(err => res.status(500).json({message: 'Something went wrong'}));
// });




//DELETE  /materials/:mID/ordered
//need to go back to F/e to make sure DEL button is added to the cells 
//Ajax & jquery calls.... 
//Add color to indicate ordered material, indicate already ordered..
app.delete('/materials/:id', (req, res) => {
  console.log('delete materials', req.params.id);
  Material
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => {
      res.status(204).json({message: 'success'});
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
});



//>>>>>start of run / close server....
let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Order For Later is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {runServer, app, closeServer};
