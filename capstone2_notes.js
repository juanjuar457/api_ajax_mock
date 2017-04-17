//capstone 2 notes fix me later 4/14 - JJ

//error occurs, express finds 1st error handling middleware
//catch 404 and forward to error handler. 

//OUR OLD POST REQ 
    // $.post(url, JSON.stringify(material),  //just trying to get it to work, this is the post call we did the other night...
    //    function() { 
    //     state.requested_materials.push(material);
    //     render_material_list(); 
    //     console.log(state.requested_materials)
    // }
    //     );


//error handler -- they have 4 params!!!  
// app.use((err,req,res,next) => {
// 	res.status(err.status || 500)
// 	res.json({
// 		error: {
// 			message: err.message
// 		}
// 	});
// })

// app.use((req,res,next) => {
// 	if(req.body){
// 		console.log("the sky is", req.body.color);
// 	} else {
// 		console.log("there is no body property on the request"); 
// 	}
// }); 

//using middleware in epxress Making a REST api.. stupid gomix
// app.use((req,res,next) => {
// 	console.log("first Piece of middleware"); 
// 	next();
// });

//QQQ: will our app even need id??? 
// app.use("/different/:id", (req,res,next) => {
// 	console.log("Second Piece of middleware, ID:", req.params.id); 
// 	next();
// });



//adding route as 2nd param. 

//>>>>>filler get request to test
// app.get("/materials", (req, res) => {
// 	res.json({response: "You sent me a GET request"}); 
// });

//>>>>>>>>>>Accepting Data example <<<<<<<<<<
// let jsonCheck = ((req,res,next) => {
// 	if(req.body){
// 		console.log("the sky is", req.body.color);
// 	} else {
// 		console.log("there is no body property on the request"); 
// 	}
// 	next(); 
// }); 

// app.use(jsonCheck);


// app.use(function(req,res, next){
// 	if(req.body){
// 		console.log("The sky is", req.body.color );
// 	} else {
// 		console.log("There is no body property on the request"); 
// 	}	 
// 	next(); 
// });

// app.use((req,res,next) => {
// 	if(req.body){
// 		console.log("the sky is", req.body.color);
// 	} else {
// 		console.log("therre is no body property on the request"); 
// 	}
// });


// app.use((req, res, next) => {
// 	console.log("poopie"); 
// });

//by default browsers cannot dynamically make requests from 1 domain to another
//this allowed the browser to control the db, need the right ajax call though...
//need explicit permission by the api.. 
//didn't adjust to es6 syntax... 
//good CORS EXample 
// app.use( (req,res,next) => {
//   res.header("Access-Control-Allow-Origin", "*"); //could put a list of ip or domain names.
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
//   if(req.method === "OPTIONS"){
//     res.header("Access-Control-Allow-Methods", "PUT,POST,DELETE");
//     return res.status(200).json({});
//   }
//   next();
// });
