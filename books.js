// JavaScript Document
var nextItem = 0; //The index of next ietm to be added
var currentCart = new Array(); //This array contains the current items in the cart
// global object
var store;
function display_title() {
	var cate = location.search.substring(1).split("category=")[1];				
	var replaced = cate.split('%20').join(' ');
	document.getElementById("book_cate").innerHTML = replaced;
	document.title = replaced;
}
function product_info(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        myFunction(xhttp);
    }
};
xhttp.open("GET", "book.xml", false);
xhttp.send();

function myFunction(xml) {
    var x, i, attnode, xmlDoc, cate,name,description,id , img,img2,price,addToCart;
    xmlDoc = xml.responseXML;
	name = "";
	description = "";
	id = location.search.substring(1).split("id=")[1];
	cate = "";
	price ="";
	img = "";
	img2 = "";
	addToCart ="";
  	x = xmlDoc.getElementsByTagName("id");
    for (i = 0; i < x.length; i++) { 
		if(id == x[i].childNodes[0].nodeValue){
			name=xmlDoc.getElementsByTagName("name")[i].childNodes[0].nodeValue;	
			cate = xmlDoc.getElementsByTagName("category")[i].childNodes[0].nodeValue;	
            description=xmlDoc.getElementsByTagName("description")[i].childNodes[0].nodeValue;
			price=xmlDoc.getElementsByTagName("price")[i].childNodes[0].nodeValue;
			img = "<img src='images/"+cate+"/book"+id+".jpg'>"; 
			img2 = "<a href='images/"+cate+"/book"+id+".jpg'><button class='button'>View Full Size Image</button></a>";
 			addToCart = "<button type='button' id='bntAddTocart' onclick='addToCart("+id+")'>Add to Cart</button>";
			productName ="<div id='product_name"+id+"'>"+name+"</div>";
			productPrice = "Price:<div id='product_price"+id+"' style='color:green'>"+price+"</div>";
			productCate = "<div id='product_cate"+id+"'>Category: "+cate+"</div>";
    }
	}
	document.getElementById("bntAddTocart").innerHTML = addToCart;
	document.getElementById("product_price").innerHTML = productPrice;
	document.getElementById("img").innerHTML = img2;
	document.getElementById("product_img").innerHTML = img;
	document.getElementById("product_name").innerHTML= productName;
	document.getElementById("product_cate").innerHTML= productCate;
	document.getElementById("product_description").innerHTML= description;
	document.title = name;
}
}

function display_cate() {
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        myFunction(xhttp);
    }
};
xhttp.open("GET", "book.xml", false);
xhttp.send();

function myFunction(xml) {
    var x, i, attnode, xmlDoc, results, cate,name,description,id,results2,z,price;
    xmlDoc = xml.responseXML;
    results = "";
	results2 = "";
	name = "";
	description = "";
	id = "";
	z = 0;
	price="";
	cate = document.getElementById("book_cate").innerHTML;
  	x = xmlDoc.getElementsByTagName("category");
    for (i = 0; i < x.length; i++) { 
		if(cate == x[i].childNodes[0].nodeValue){
			z++;
			price=xmlDoc.getElementsByTagName("price")[i].childNodes[0].nodeValue;
  			id=xmlDoc.getElementsByTagName("id")[i].childNodes[0].nodeValue;
			name=xmlDoc.getElementsByTagName("name")[i].childNodes[0].nodeValue;
            description=xmlDoc.getElementsByTagName("description")[i].childNodes[0].nodeValue;

     		results += "<div class='dropdown'><ul><li><img src='images/"+cate+"/book"+id+".jpg' ><div class='dropdown-content'><p id='product_name"+id+"'>"+name+"</p><p id='product_price"+id+"'>"+price+"</p><p><button type='button' id='bntAddTocart' onclick='addToCart("+id+")'>Add to Cart</button></p><a href='product.html?id="+id+"'><button class='btnmoreInfo'>More info</button></a></div></li></div>";
			
    }
	}
	document.getElementById("results").innerHTML= results;


}
}

function searchXML(){
	$(document).ready(function(){
    //$('#search').on('keyup', function(){
        $.ajax({
            type: "GET",
            url: "book.xml",
            dataType: "xml",
            success: parseXML
        });
    });
//});
function parseXML(xml){
	var replaced = location.search.substring(1).split("search=")[1];	
	var searchFor = replaced.split('+').join(' ');
	var results = "";
    //var searchFor = $('#search').val();
    var reg = new RegExp(searchFor, "i");
	$('#output').empty();
    $(xml).find('book').each(function(){
        var name = $(this).find('name').text();
        var nameSearch = name.search(reg);
        var desc = $(this).find('description').text();
        var descSearch = desc.search(reg);
		var id = $(this).find('id').text();
        var idSearch = id.search(reg);
        var cate = $(this).find('category').text();
        var cateSearch = cate.search(reg);
		var price = $(this).find('price').text();
        var priceSearch = price.search(reg);
		
    
		if(cateSearch > -1 || descSearch > -1 || nameSearch > -1 || idSearch > -1){
			results += "<div class='dropdown'><ul><li><img src='images/"+cate+"/book"+id+".jpg'><div class='dropdown-content'><p id='product_name"+id+"'>"+name+"</p><p id='product_price"+id+"'>"+price+"</p><p><button type='button' id='bntAddTocart' onclick='addToCart("+id+")'>Add to Cart</button></p><a href='product.html?id="+id+"'><button class='btnmoreInfo'>More info</button></a></div></li></ul></div>";
		}
		document.getElementById("output").innerHTML= results;
		document.getElementById("searchresults").innerHTML= "Results for:"+searchFor;
		if(results == ""){
			document.getElementById("output").innerHTML = "No results found";
		}
    }); 
}
}
function checkform() {
    if(document.form1.search.value == "" || document.form1.search.value == " ") {
        //alert("please enter keyword");
		window.location.replace("index.html");
        return false;
    } else {
        document.form1.submit();
    }
}

var menu_length = 24;                //the total number of web pages
var page_tray = new Array();  //an array to hold the page name and the file name

//Load page information into the array
function load_page() {
   page_tray[0] = new Array(24);
   page_tray[0]['name'] = "Art";
   page_tray[1] = new Array(24);
   page_tray[1]['name'] = "Biography";
   page_tray[2] = new Array(24);
   page_tray[2]['name'] = "Business";
   page_tray[3] = new Array(24);
   page_tray[3]['name'] = "Careers";
   page_tray[4] = new Array(24);
   page_tray[4]['name'] = "Cooking and Food";
   page_tray[5] = new Array(24);
   page_tray[5]['name'] = "Drama";
   page_tray[6] = new Array(24);
   page_tray[6]['name'] = "Education";
   page_tray[7] = new Array(24);
   page_tray[7]['name'] = "Fiction and Poetry";
   page_tray[8] = new Array(24);
   page_tray[8]['name'] = "Gardening";
   page_tray[9] = new Array(24);
   page_tray[9]['name'] = "Health and Self-Help";
   page_tray[10] = new Array(24);
   page_tray[10]['name'] = "Humanities";
   page_tray[11] = new Array(24);
   page_tray[11]['name'] = "Humour";
   page_tray[12] = new Array(24);
   page_tray[12]['name'] = "Interior Design";
   page_tray[13] = new Array(24);
   page_tray[13]['name'] = "Investing";
   page_tray[14] = new Array(24);
   page_tray[14]['name'] = "Medicine";
   page_tray[15] = new Array(24);
   page_tray[15]['name'] = "Music";
   page_tray[16] = new Array(24);
   page_tray[16]['name'] = "Nutrition";
   page_tray[17] = new Array(24);
   page_tray[17]['name'] = "Photography";
   page_tray[18] = new Array(24);
   page_tray[18]['name'] = "Psychology";
   page_tray[19] = new Array(24);
   page_tray[19]['name'] = "Recovery and Addition";
   page_tray[20] = new Array(24);
   page_tray[20]['name'] = "Relationships";
   page_tray[21] = new Array(24);
   page_tray[21]['name'] = "Sports";
   page_tray[22] = new Array(24);
   page_tray[22]['name'] = "Sustainable Living";
   page_tray[23] = new Array(24);
   page_tray[23]['name'] = "Travel";
   }

//Write the HTML menu code 
function display_menu()
{
 //Load the page information
 load_page();
 
 //Construct list
 var cateList=""; 
 
  //This loop is executed to diplay menu items
  for (i=0; i<menu_length;  i++)
  {
		cateList += "<li><a href='Categories.html?category="+page_tray[i]['name']+"'>"+page_tray[i]['name']+"</a></li>";
  }
 
document.getElementById("cateList").innerHTML = cateList;
}
/*$(document).ready(function() { 
    $('#login_link').click(function() { 
        $.blockUI({ message: $('#login_form') }); 
    }); 
});*/
$(document).ready(function() {
display_login();
$("#close-button").click(function (e) {
	
	//display_login();
    e.preventDefault();
	$.unblockUI();
    //$("#login_modal").fadeOut('fast');
	
});
$("#login").click(function (e) {
	
	//display_login();
    e.preventDefault();
    //$("#login_modal").fadeIn('fast');
	$.blockUI({ message: $('#login_modal') }); 

}); 
});
function display_login(){
	var loginForm = "";
	
	loginForm = "<div id='login_modal' style='display:none'><div id='login_modalForm'> <a href='#' id='close-button'>x</a><ul><form method='get'><li><h4>Username/Email:</h4></li><li><input type='text' placeholder='demo@demo.com' autofocus></li><li><h4>Password:</h4></li><li><input type='password' placeholder='Password'></li><li><input type='reset' class='btn' value='Reset' id='cancel'><input type='submit' id='login' class='btn_primary' value='Log In'></li></form></ul></div></div>";
	
	document.getElementById("login_display").innerHTML = loginForm;
	
}
$(document).ready(function() {
display_signup();
$("#close-button").click(function (e) {

    e.preventDefault();
	$.unblockUI();
 
	
});
$("#signup").click(function (e) {
    e.preventDefault();
	$.blockUI({ message: $('#signup_modal') }); 

}); 
});
function display_signup(){
	var singupForm = "";
	
	singupForm = "<div id='signup_modal' style='display:none'><div id='signup_modalForm'><a href='#' id='close-button'>x</a><ul><form id='signupForm' method='post'><li><h4>Your Name:</h4></li><li><input name='name' type='text' placeholder='JackLee' autofocus></li><li><h4>Email:</h4></li><li><input name='email' type='text' placeholder='demo@demo.com' autofocus></li><li><h4>Password:</h4></li><li><input name='pwd' type='password' placeholder='Password' autofocus></li><li><h4>Password again:</h4></li><li><input type='password' placeholder='Password again'></li><li><input type='reset' class='btn' value='Reset' id='cancel'><input type='submit' id='signup' class='btn_primary' value='Sign Up'></li></form></ul></div></div>";
	
	document.getElementById("signup_display").innerHTML = singupForm;
	
}
$(document).ready(function(){
  $("#cart").on("click", function() {
    $(".shopping-cart").fadeToggle( "fast");
  });

  $(document).on("click", function(e){
    var $target = $(e.target);
    if(!$target.is("#cart") && !$target.is(".shopping-cart") && !$target.is(".container") && !$target.is("#displayCart") && !$target.is("#tblCart") && !$target.is(".fa-shopping-cart") && !$target.is(".badge") && !$target.is("#display_Cart") && !$target.is(".badge") && !$target.is(".shopping-cart-header") && !$target.is(".shopping-cart-total") && !$target.is(".shopping-cart-items") && !$target.is(".buttonCart") && !$target.is(".btnCartDel") && !$target.is(".btnCartQty") && !$target.is(".qtytext") && !$target.is("#totalCost") && !$target.is("#badge2") && !$target.is(".lighter-text") && !$target.is("#tblCart th") && !$target.is("#tblCart tr") && !$target.is("#tblCart td")){
        $('.shopping-cart').fadeOut('fast');
    }
});
  
})();


function load_data() {
// load persistent store after the DOM has loaded
      store = new Persist.Store('My Application');
	  var firstShow = localStorage.getItem('firstShow');
    if (firstShow == null) {
        localStorage.setItem('firstShow', 1);
		var currentCartJson = JSON.stringify(currentCart);
		store.set('shopping_cart', currentCartJson);
		store.save();
		 
    }
	  displayCart();
}

function addToCart(selectedItem)
{
	var addedIndex = -1;
	
	//Check if the selected item has been added once
	for (i=0;i<nextItem;i++)
	{
		if (currentCart[i][0]==selectedItem)
		{
			//The selected item has been added once, record the index
			addedIndex = i;
			break; //stop looping
		}
	}
	
	//If the selected item has not been added, add a new item to the shopping cart, otherwise, simply increase the quantity for the item by one,  

	if (addedIndex == -1)
	{
	  //Create a new item in the shopping cart
	  currentCart[nextItem] = new Array();
	  
	  //Put the item details into the shopping cart
	  currentCart[nextItem][0] = selectedItem;
	  currentCart[nextItem][1] = document.getElementById("product_name" + selectedItem).innerHTML;
	  var product_price = document.getElementById("product_price" + selectedItem).innerHTML;
	  var price = product_price.split('$').join('');
	  currentCart[nextItem][2] = price;
	  currentCart[nextItem][3] = 1; //set the quantity
	  
	  //Get ready to add next item
	  nextItem += 1;
	  
	}
	else
	{
		currentCart[addedIndex][3] += 1;
		
	}
	
	//Saving cart in Json 
	
	var currentCartJson = JSON.stringify(currentCart);
	store.set('shopping_cart', currentCartJson);
	store.save();
	displayCart();
}

function displayCart()
{	
	
   //Construct shopping cart table heading
   txt="<table id='tblCart' border='5px' cellpadding='10px' cellspacing='5px' align='center' style='margin:0px;border:#666 solid;'>";
   txt+="<tr><th>Cover</th><th>Title</th><th>Price</th><th>Quantity</th></tr>";
    
   totalCost = 0;
   count = 0;
	
	if (store == undefined)
	{
		store = new Persist.Store('My Application');
	}
    // get value from store and prompt user
    store.get('shopping_cart', function(ok, val)
		{
			
			if (ok)
			{
				
				var currentCartJson = val;
				currentCart=JSON.parse(currentCartJson);
				nextItem = currentCart.length;
				//Construct shopping cart table body
				for (i=0;i<nextItem;i++)
				{
				  txt+="<tr>";
				  
				 cover = "<a href='product.html?id="+currentCart[i][0]+"'><img src='images/AllBooks/book"+currentCart[i][0]+".jpg' width='60px' height='85px'></a>";
				  txt+="<td align='left'>" + cover + "</td>";   
				  txt+="<td align='left'>" + currentCart[i][1] + "</td>"; 
				  txt+="<td align='left'>$" + currentCart[i][2] + "</td>"; 
				  txt+="<td align='center'><input type='text' name='quantity' id='quantity"+currentCart[i][0]+"' class='qtytext' size='6%' value='"+currentCart[i][3]+"'><input type='submit' value='Enter' class='btnCartQty' onClick='quantity("+currentCart[i][0]+")'/><input type='button' value='X' class='btnCartDel' onClick='deleteItem("+currentCart[i][0]+")'/></td>"; 
				  
				  
				  totalCost += currentCart[i][2] * currentCart[i][3];
				  count += currentCart[i][3]; 
				  txt=txt + "</tr>";
				}
			   
			   //Display the total cost
			   total=parseFloat(totalCost).toFixed(2) ;
			   //txt+="<td align='center' colspan='4' style='color:#900;'> Total Cost: " + parseFloat(totalCost).toFixed(2) + "</td>";
			   //Close shopping cart table
			   txt+="</table>";
			   
			   //Display shopping cart table in <div id="txtCart">
			   document.getElementById("displayCart").innerHTML=txt;
			   document.getElementById("totalCost").innerHTML="$"+ total;
			   document.getElementById("badge").innerHTML= count;
				document.getElementById("badge2").innerHTML= document.getElementById("badge").innerHTML;
			}
		}
	);
	
	
}

function quantity(selectedItem){
	qty = document.getElementById('quantity' + selectedItem).value;
	var addedIndex = 0;
	for (i=0;i<nextItem;i++)
	{
		if (currentCart[i][0]==selectedItem)
		{
			//The selected item has been added once, record the index
			addedIndex = i;
			break; //stop looping
		}
		
	}
	currentCart[addedIndex][3] = parseInt(qty);
	var currentCartJson = JSON.stringify(currentCart);
	store.set('shopping_cart', currentCartJson);
	store.save();
	displayCart();
}

function deleteItem(selectedItem){
	var addedIndex = 0;
	for (i=0;i<nextItem;i++)
	{
		if (currentCart[i][0]==selectedItem)
		{
			//The selected item has been added once, record the index
			addedIndex = i;
			break; //stop looping
		}
	}
	currentCart.splice(addedIndex,1);
	 //Get ready to add next item
	nextItem -= 1;
	var currentCartJson = JSON.stringify(currentCart);
	store.set('shopping_cart', currentCartJson);
	store.save();
	displayCart();
}


function clearCart()
{	
	//Reinitialise the current item array
	nextItem = 0;
    currentCart = new Array();
	currentCart =[];
    //Add some code here..........;
	var currentCartJson = JSON.stringify(currentCart);
	store.set('shopping_cart', currentCartJson);
	store.save();
	//Refresh the shopping cart
	displayCart();
}

function display_cart(){
	var cart = "";
	
	cart = "<div class='container'><div class='shopping-cart' style='display:none'><div class='shopping-cart-header'><i class='fa fa-shopping-cart cart-icon'></i><span class='badge' id='badge2'>0</span><div class='shopping-cart-total'><span class='lighter-text'>Total:</span><span class='main-color-text' id='totalCost'>$0.00</span></div></div><div id='displayCart'></div><a href='#' class='buttonCart' style='background-color:green'>Checkout</a><a href='#' class='buttonCart' onclick='clearCart()'>Clear Cart</a></div></div>";
	document.getElementById("display_Cart").innerHTML = cart;
	
}

