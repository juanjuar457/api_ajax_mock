//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>> STATE OBJECT <<<<<<<<<<<<<
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
var state = {
	form_data: {
		units: [
		{
			name: "grams",
			value: "gm"
		},
		{
			name: "killograms",
			value: "kg"
		},
		{
			name: "milliliters",
			value: "ml"
		}
		], //call to api gets units for you
	},

	requested_materials: [],
}

var mock_data = {
	items_ordered: [
		{
			vendor: "",
			quantity: "",
			product_name: "",
			catalog_number: "",
			unit_size: "",
		}
	],

	user: [
		{
			id: "9181",
			name: "Rebecca",	
			type: 'admin'
		}, //say admin or guest

		{
			id: "1189",
			name: "Dolcemar",
			type: 'guest',
		}
	],

	company: {
		id: 7744,
		name: "Solutions Pharmacy"	
	}
}; 




$('#main_submit').submit(function(event){ //id is in main_page.html
    event.preventDefault()
    var url = 'http://localhost:8080/materials'
    var material = {
        vendor: $('#vendor').val(),
        quantity: $('#quantity').val(),
        product_name: $('#product_name').val(),
        catalog_number: $('#catalog_number').val(),
        units: $('#units').val(),
        unit_size: $('#unit_size').val()
    } 
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(material),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            console.log(data);
            material.id = data.id; 
            state.requested_materials.push(material);
            render_material_list();

        }
    }); 
});

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>> EVENT LISTENERS<<<<<<<<<<<<<<<<
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function  init_main_form () {

    for(i=0; i < state.form_data.units.length; i++){  //sets up the drop down with the units. 
        $('#units').append('<option value="' + state.form_data.units[i].value +'">' + state.form_data.units[i].name +'</option>') 
    };  

};

//this will be moved, login 1st etc.... don't know where quite yet. 
init_main_form();

//IFEE 
(function () {
    $('#login_admin_btn').click(check_pass_admin);
    $('#login_btn').click(check_pass_guest); 
    $('#admin_login_form').hide();
    $('#admin_tab').find('a').click(toggle_login);
    $('#guest_tab').find('a').click(toggle_login);
    //target the li href, check against the text, 
})(); 

function toggle_login (e) {
    var tab = $(e.currentTarget).text().toLowerCase();
    $('#admin_login_form').hide();
    $('#admin_tab').removeClass('active');
    $('#guest_login_form').hide();
    $('#guest_tab').removeClass('active');

    if (tab === 'admin login'){
        $('#admin_login_form').show();
        $('#admin_tab').addClass('active');
    } else {
        $('#guest_login_form').show();
        $('#guest_tab').addClass('active');
    }
}





//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>> ROUGH DRAFT AREA <<<<<<<<<<<<<
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// $('body').location.reload()  //>>>>>> to have the db reload the stuff on the browser?? 

//>>>>>>Example post from jquery docs
// $.post( "ajax/test.html", function( data ) {
//   $( ".result" ).html( data );

//renderpost goes here, then need one for get and put a delete ajax call!!
// });


//changning this to be a delete, need to get the id of the objects and add that to 
//a rolling var and be able to target 1 at a time to delete it if called, with if
//statement. 
$('#test-get').click(function(){ 
    var url = 'http://localhost:8080/materials';
    var blah = {};
    $.getJSON(url,
       function(data) { 
       console.log('test');   
       console.log(data);   
       blah = data.materials[0].id // i can save the id 
       var arrayId = []
       console.log(blah)
    var count = 0; 
        for(i = 0; i < blah.length; i++){
            // arrayId += blah.materials[i].id;
            //QQQ need to fix this, want the id from the obj pulled from the db and compare that to the id they
            //selected on the client. 1st just want to get the id from the db object materials. 
            
            count += 1; 
            arrayId = blah.materials[i].id ++;
            console.log(arrayId)
            console.log(count)
        }  
       console.log(blah)
        // estyQuery(petStoreState(data));
        // console.log(state.pets) //from capstone 1
        }
        );
    });

// $('#test-get').click(function() {
//     delete_material();
// })
// function delete_material (data) {
//     var idMaterials = 0 
//     var materials = {}
//     $.ajax({ 
//         type: "GET",
//         url: 'http://localhost:8080/materials/',
//         data: JSON,
//         contentType: "application/json; charset=utf-8",
//         datatype: 'json',
//         success: function () {
//             var idMaterials = materials.id 
//             console.log(idMaterials);
//             }
           
//     });

// }

// highlight_material(); 

// function highlight_material () {
//     $('.example_entry').hover(function (event){
//         event.currentTarget.addClass('.highlighted');
//     })
// }


//try other classes??? 
// $('#requested_materials').click(function (event) {
//     $(this).addClass('highlighted')
// })
// $('.entry').click(function (event) {
// event.currentTarget.addClass('highlighted')
// })

// $('#requested_materials').click(function (event) {
//     $(this).addClass('highlighted');
// })

// function highlight_material () {
//     console.log('test')
//     $(".example_entry").click(function(){
//     $(this).addClass('highlighted');
// });
// } 



function check_pass_admin (event) {

	event.preventDefault();
	var inpass = $('#admin').val()
	console.log(inpass);
	if(inpass === mock_data.user[0].id) {
		//make that equal to what is on the db. 
        
		alert('Login Correct!');
		alert('Welcome Admin');
		window.location.href="main_page.html";
	}
	else {
		alert('Login incorrect! Try again!');
		window.location.href="admin.html";
	}
} 

//need to redo top, not workin!  loop for admin???!

//console log works here! 
function check_pass_guest (event) {

	event.preventDefault();
	var inpass = $('#guest').val() //id for input bar on start screen
	// console.log(inpass)
	// console.log(mock_data.user[1].id)
	if (inpass === mock_data.user[1].id) {
		console.log(mock_data.user[0].id); //this is hitting 9181 
		alert('Login Correct!');
		window.location.href="main_page.html"
	} 
	else {
		alert('Login incorrect! Try again!');
		window.location.href="index.html";
	};

}

//make alert box if correct or incorrect 
//use conditional 

//CONTROL ARM HERE 
function add_material_click (event) {
	event.preventDefault();
	add_material(); 
	render_material_list();
}

function add_material () { 
	var material = {};	
	
	material.product = $('#product').val();
	state.requested_materials.push(material);

	material.quantity = $('#quantity').val();
	// state.requested_materials.push(material); OOOOPS

	material.vendor = $('#vendor').val(); //do same for rest, quantity prod cat and units 
	// state.requested_materials.push(material);

	material.catalog_number = $('#catalog_number').val(); 
	// state.requested_materials.push(material);

	material.units = $('#units').val();

}




//alt use data prop it understands this.data.id , thats how it goes..  
function delete_material( event, id) {   
    event.stopPropigation(); 
    $.ajax({ 
        id: id,
        url: 'http://localhost:8080/materials/' + id, 
        // data: this.id, prop might work, not this way though.. 
        type: 'DELETE',
        success: function() {
            for(i=0; i < state.requested_materials.length; i++){
                console.log(this.id,state.requested_materials[i].id,this.id === state.requested_materials[i].id);
                if(this.id === state.requested_materials[i].id){
                    state.requested_materials.splice(i,1)
                     //returns empty array... if slice(i,0)
                    break;
                }

            }

            render_material_list(); 

        }
    });
}
//ajax, update state, call render material list to display 
function setBackOrder(id){
    var material = null;
    for(i=0; i < state.requested_materials.length; i++){
        if(this.id === state.requested_materials[i].id){
            state.requested_materials[i].onBackOrder = !state.requested_materials[i].onBackOrder; 
            material = state.requested_materialsp[i];
            break; 
        }
    }

    $.ajax({
    id: id, 
    url: 'http://localhost:8080/materials/' + id,
    type: 'PUT', //should be POST
    data: JSON.stringify(material),
    success: function() {
       
            render_material_list();
        }
    }); //closes ajax 

}


function render_material_list() {
     console.log('call see me twice.')
	var dom = $('#requested_materials');
	dom.empty(); //flushes out material

	for(i=0; i < state.requested_materials.length; i++){
		dom.append('<div class="example_entry '+ (state.requested_materials[i].onBackOrder ? "onBackOrder" : "") + '" onclick="setBackOrder(\''+ state.requested_materials[i].id + '\')" >'+ state.requested_materials[i].product_name +' | count:'+ state.requested_materials[i].quantity + ' | ' + 
			state.requested_materials[i].catalog_number + ' | '+ state.requested_materials[i].vendor + ' | ' + state.requested_materials[i].units + 
            '<i onclick="delete_material(this, \''+ state.requested_materials[i].id + '\')" class="glyphicon glyphicon-remove pull-right"></i></div> ')

	}
}

//call the class onBackOrder









































