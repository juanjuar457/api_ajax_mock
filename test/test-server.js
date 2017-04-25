const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

// this makes the should syntax available throughout
// this module
const should = chai.should();

const {Material} = require('../models');
const {app, runServer, closeServer} = require('../server');
const {DATABASE_URL} = require('../config');

chai.use(chaiHttp);


function seedMaterialData() {
  console.info('seeding Material data');
  const seedData = [];

  for (let i=1; i<=10; i++) {
    seedData.push(generateMaterialData());
  }
  // this will return a promise
  return Material.insertMany(seedData);
}

//note how the functions call other functions to about the module to execute the tests...
//to execute on the tests...
function generateMaterialData() {
  return {
    vendor: generateVendor(),
    quantity: generateQuantity(),
    product_name: generateProductName(),
    catalog_number: generateCatalogNumber(),
    unit_size: generateUnitSize(),
    units: generateUnits(), 
	}    
}


function tearDownDb() {
    console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
}

// //need open / close server return promise.
describe('Material API resource', function() {
  // we need each of these hook functions to return a promise
  // otherwise we'd need to call a `done` callback. `runServer`,
  // `seedRestaurantData` and `tearDownDb` each return a promise,
  // so we return the value returned by these function calls.
	  before(function() {
	    return runServer(DATABASE_URL);
	  });

	  beforeEach(function() {
	    return seedMaterialData();
	  });

	  afterEach(function() {
	    return tearDownDb();
	  });

	  after(function() {
	    return closeServer();
	  })


 // //whole thing is wrapped in a describe, like unit tests examples... 
	describe('DELETE endpoint', function() {
	    it('delete a material by id', function() {
	      let restaurant;
	      return Material
	        .findOne()
	        .exec()
	        .then(function(_material) {
	          material = _materials;
	          return chai.request(app).delete(`/materials/${materials.id}`);
	        })
	        .then(function(res) {
	          res.should.have.status(204);
	          return Material.findById(Material.id).exec();
	        })
	        .then(function(_material) {
	          // when a variable's value is null, chaining `should`
	          // doesn't work. so `_restaurant.should.be.null` would raise
	          // an error. `should.be.null(_restaurant)` is how we can
	          // make assertions about a null value.
	          should.not.exist(_restaurant);
	        })
	    })    
	})
})