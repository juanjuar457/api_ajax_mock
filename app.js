
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

// var mock_data = {
// 	items_ordered: [
// 		{
// 			vendor: "",
// 			quantity: "",
// 			product_name: "",
// 			catalog_number: "",
// 			unit_size: "",
// 		}
// 	],

// 	user: [
// 		{
// 			id: "9181",
// 			name: "Rebecca",	
// 			type: 'admin'
// 		}, //say admin or guest

// 		{
// 			id: "1189",
// 			name: "Dolcemar",
// 			type: 'guest',
// 		}
// 	],

// 	company: {
// 		id: 7744,
// 		name: "Solutions Pharmacy"	
// 	}
// }; 






function materialStoreState (data) {
    console.log(data);
    state.materials = data 
    console.log(state.materials);
    var materials = data 
    console.log(data)
    state.materials = data.materials.map(function (materials) {
        console.log('test');
        console.log(state.materials);
        // state_render_material_list(data); 
    }); 
}


function state_render_material_list () {
    var dom = $('#test_render');
    // console.log(state.materials);
    dom.empty(); //flushes out material

    for(i=0; i < state.materials.length; i++){
        dom.append('<p class="example_entry">'+ state.materials[i].product_name +' | count:'+ state.materials[i].quantity + ' | ' + 
            state.materials[i].catalog_number + ' | '+ state.materials[i].vendor + ' | ' + state.materials[i].units + '</p>')
    }
}

//change this to a refresh or something that would refresh, just want to get the 
//stuff on the db dammit to show on the webpage!!!!! 
$('#main_submit').submit(function(){ //id is in main_page.html
    var url = 'http://localhost:8080/materials'
    var material = {
        vendor: $('#vendor').val(),
        quantity: $('#quantity').val(),
        product_name: $('#product_name').val(),
        catalog_number: $('#catalog_number').val(),
        units: $('#units').val(),
        unit_size: $('#unit_size').val()
    }
    $.post(url, JSON.stringify(material), 
       function() { 
        state.requested_materials.push(material);
        render_material_list(); 
    }
        );
    });


//append where html will go with props from materials objects...



// $('body').location.reload()  //>>>>>> to have the db reload the stuff on the browser?? 

//>>>>>>Example post from jquery docs
// $.post( "ajax/test.html", function( data ) {
//   $( ".result" ).html( data );

//renderpost goes here, then need one for get and put a delete ajax call!!
// });


//THIS IS NOT GETTING ANYTHING IT WORKS THOUGH!!! BREAK DOWN TO MAKE THE POST!!!! 
$('#test-get').click(function(){ //id is in main_page.html
    var url = 'http://localhost:8080/materials'
    $.getJSON(url,
       function(data) { 
       console.log('test');   
       console.log(data);         
        // estyQuery(petStoreState(data));
        // console.log(state.pets) //from capstone 1
        }
        );
    });

// $('#main_submit').click(function() { 

//     var url = 'http://localhost:8080/materials'
//     $.post(url,[],['string'],['JSON']);
// });

    // $('#add_material').click(add_material_click); 


function  init_main_form () {

	for(i=0; i < state.form_data.units.length; i++){  //sets up the drop down with the units. 
		$('#units').append('<option value="' + state.form_data.units[i].value +'">' + state.form_data.units[i].name +'</option>') 
	};	

};
//this will be moved, login 1st etc.... don't know where quite yet. 
init_main_form();

//when user hits the submit, depending on what page they are on.
//how to set that up for diff pages?? just given them the correct id to target it form the js!!! 
//need 1 for admin and 1 for guest! 
//need to use page rederection 

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

function delete_material (id) {
    $.ajax({ 
        url: 'http://localhost:8080/materials?id=' + id ,
        type: 'DELETE',
        success: function (result) {
            for(i=0; i < state.requested_materials.length; i++){
                if(id === state.requested_materials[i].id){
                    state.requested_materials.slice(i,1);
                    break;
                }

            }
            render_material_list(); 
        }

    });

}

function render_material_list () {
	var dom = $('#requested_materials');
	dom.empty(); //flushes out material

	for(i=0; i < state.requested_materials.length; i++){
		dom.append('<div class="example_entry">'+ state.requested_materials[i].product +' | count:'+ state.requested_materials[i].quantity + ' | ' + 
			state.requested_materials[i].catalog_number + ' | '+ state.requested_materials[i].vendor + ' | ' + state.requested_materials[i].units + 
            '<a onclick="delete_material('+ state.requested_materials[i].id +')"><i class="glyphicon glyphicon-remove pull-right"></i></a> </div> ')
	}
}


//set up conditional to check for password entered client side in the index/admin.html
// function init_index_form () {
//  if()
// }


