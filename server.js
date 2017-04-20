'use strict'; 
// const bodyParser = require('body-parser');
const express = require('express');
const app = express();
// const routes = require("./routes");  //junkroutes at the moment.. 4/13 
const morgan = require("morgan"); 
const mongoose = require("mongoose"); 
const jsonParser = require("body-parser").json();
const {PORT, DATABASE_URL} = require('./config');
const models = require('./models'); 
const Material = models.Material;
const User = models.User; 
app.use(jsonParser);
app.use(morgan('common'));
// app.use(bodyParser.json());
mongoose.Promise = global.Promise;


// using CORS for temporary sol to the browser from the DB SOL 
app.use( (req,res,next) => {
  res.header("Access-Control-Allow-Origin", "*"); //could put a list of ip or domain names.
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  if(req.method === "OPTIONS"){
    res.header("Access-Control-Allow-Methods", "PUT,POST,DELETE");
    return res.status(200).json({});
  }
  next();
});

app.get('/materials', (req, res) => {
	Material
	.find()
	.limit(500)
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

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>PUTPUTPUTPUTPUTPUTPUTPUTPU
app.put("/materials", (req, res) => {
  res.json({
    response: "You sent me a PUT request to /ordered",
    orderedId: req.params.mID,
    body: req.body
  })
})

//how would you add code to highlight a material on the client?? 
app.put('/materials/:id', (req, res) => {
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

//********* come back here ************
//PUT /materials/:mID/ordered
//Add color to indicate ordered material, indicate already ordered..
//Not sure how to implement to do something that would do a PUT operation on materials??
// app.put("/:mID/ordered", (req, res) => {
// 	res.json({
// 		response: "You sent me a PUT request to /ordered",
// 		orderedId: req.params.mID,
// 		body: req.body
// 	})
// })

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

//POST EXAMPLE >> REFACTOR ME!! 
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

// app.listen(process.env.PORT || 8080, () => {
//   console.log(`Order for later is listening on port: ${process.env.PORT || 8080}`);
// })



// >>>>>>>>NOTE!!! <<<<<<<<<<<<<<<<<<
//Express must parse incoming JSON with middleware!! it can't do it on its own! 

//also will need the users model...

// app.use(logger("dev")); //configures middlware for color codes in our api respones. 


