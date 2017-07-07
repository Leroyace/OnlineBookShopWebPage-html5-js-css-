// JavaScript Document

// JavaScript for deals page
var length = 10;                //the total number of images
var current = 1;               //the current slide number
var slide_tray = new Array();  //an array to hold the uploaded images

var menu_length = 2;                //the total number of web pages
var page_tray = new Array();  //an array to hold the page name and the file name

function load_slide(place,file) {
   slide_tray[place] = new Image();
   slide_tray[place].src = file;
   }
   
//This loop is executed when the page is uploaded to initialise the image array
for (i=1; i<=length;  i++)
{
   var file_name = "images/slide" + i + ".jpg";	//Generate current iamge file name
   load_slide(i, file_name);
}

//Load previous image

function gobackward() {
	page_tray = new Array();
	page_tray[0] = "product.html?id=54";
	page_tray[1] = "product.html?id=67";
	page_tray[2] = "product.html?id=76";
	page_tray[3] = "product.html?id=83";
	page_tray[4] = "product.html?id=97";
	page_tray[5] = "product.html?id=118";
	page_tray[6] = "product.html?id=126";
	page_tray[7] = "product.html?id=213";
	page_tray[8] = "product.html?id=289";
	page_tray[9] = "product.html?id=346";
  current = current - 1;
  if( current < 1 ) {
     current = length;
  }
  document.getElementById("link").setAttribute('href',page_tray[current - 1]);
  document.slide.src=slide_tray[current].src;  //update current image
  document.getElementById("PN").innerHTML = current;
}


//Load next image
function goforward() {
	page_tray = new Array();
	page_tray[0] = "product.html?id=54";
	page_tray[1] = "product.html?id=67";
	page_tray[2] = "product.html?id=76";
	page_tray[3] = "product.html?id=83";
	page_tray[4] = "product.html?id=97";
	page_tray[5] = "product.html?id=118";
	page_tray[6] = "product.html?id=126";
	page_tray[7] = "product.html?id=213";
	page_tray[8] = "product.html?id=289";
	page_tray[9] = "product.html?id=346";
   current = current + 1;
  if( current > length ) {
     current = 1;
  }
  document.getElementById("link").setAttribute('href',page_tray[current - 1]);
  document.slide.src=slide_tray[current].src; //update current image
  document.getElementById("PN").innerHTML = current;

} 



 