// FETCH REVIEWS FROM JSON AND DISPLAY ON THE WEBSITE 

// google API URL is based on a place ID and API key:
var googleAPI = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJDUhcRqKVFkcRBFG3CKyWqrM&fields=review&key=AIzaSyCMPw99oS6ha9M4ufOSp0tcA450Qd7sbNk";
var localReviews = "reviews.json";


//loadJSON(googleAPI, 'google');
loadJSON(localReviews, 'local');


function loadJSON(JSONsource, JSONtype) {
	var request = new XMLHttpRequest();
	request.open('GET', JSONsource, true);

	request.onload = function() {
	  if (request.status >= 200 && request.status < 400) {
	  	parseData(JSONtype, request);
	  	hideLoader();
	  } else {
	    console.log('Target server returned an error');
	  }
	};
	request.onerror = function() {
	  console.log('Connection error');
	};
	request.send();
};

function parseData(type, req){
	var data = JSON.parse(req.responseText);
	var dataReviews = data['result']['reviews'];

	if (type === 'google') {
		buildUI(dataReviews, 'reviews__google');
	} else if (type === 'local') {
	    buildUI(dataReviews, 'reviews__local');
	} else {
		console.log('The \'type\' argument is invalid');
	};
};

// create three new html elements and display data from JSON array
var counter = 0;
function buildUI(dataArray, parentElement) {
	var reviewText, reviewAuthor, reviewAuthorSplit, reviewAuthorName, reviewRating, reviewImage, html, iconHtml;

	for (var i = 0; i <= 2; i++) {

		reviewText = '“' + dataArray[counter]['text'] + '”';
		reviewAuthor = dataArray[counter]['author_name'];
		reviewAuthorSplit = reviewAuthor.split(/[\s]/); // split to get only the author's name 
		reviewAuthorName = reviewAuthorSplit[0];
		reviewRating = dataArray[counter]['rating'];
		reviewImage = dataArray[counter]['profile_photo_url'];

		html = '<div class="review__item"><img src="%reviewImg%" class="review__img"/><p class="review__text">%reviewText%</p><h3 class="review__author">%reviewAuthorName%</h3>';

		for (var j = 1; j <= reviewRating; j++) { // iterate over the rating value and add one star icon each time
			iconHtml = '<i class="review__icon fa fa-star fa-2x" aria-hidden="true"></i>';
			html += iconHtml;
		};

		html += '</div>'; // close the node
		newHtml = html.replace('%reviewText%', reviewText);
		newHtml = newHtml.replace('%reviewAuthorName%', reviewAuthorName);
		newHtml = newHtml.replace('%reviewImg%', reviewImage);
		document.getElementById(parentElement).insertAdjacentHTML('beforeend', newHtml); //insert review element

		if (counter == dataArray.length - 1) { // if there is no more new reviews - display from the beginning 
			counter = 0;
		} else {
			counter += 1;
		};
	}
};



document.getElementById('more__btn').addEventListener('click', function() {

	// 1. Delete displayed reviews
	var reviewsContainer = document.getElementById('reviews__local');
	// as long as there is a first element - remove it from the container
	while (reviewsContainer.firstChild) { 
		reviewsContainer.removeChild(reviewsContainer.firstChild); 
	};

	// 2.Fetch 3 new reviews and dispay them 
	loadJSON(localReviews, 'local');

});


//////////////////////////////////////////////////////////////////////////////////
//// STAR RATING
document.querySelector('.rating__container').addEventListener('mouseover', function(event) {

	var element = document.getElementById(event.target.id);
	if (element !== null) {
		var elementID = parseInt(element.id); 
		var strID = "";
		var i = 1;

		while (i <= elementID) { // while mouse is over the star icon change the color of it and the lower ID stars to gold
			strID = i.toString();
			var gold = document.getElementById(strID);
			gold.style.color = 'gold';
			i++;
		};

		while (i <= 5) { // while mouse is over the star icon change the color of the stars with higher ID back to gray
			strID = i.toString();
			var gray = document.getElementById(strID);
			gray.style.color = 'gray';
			i++;
		};
	};
});

//////////////////////////////////////////////////////////////////////////////////
//// REVIEW FORM
//// Save submitted review in the json file 

function saveReview(reviewData) {

    console.log(reviewData);
    var request = new XMLHttpRequest();
    var URL = "save.php?data=" + encodeURI(reviewData);
    request.open("GET", URL);
    request.setRequestHeader("Content-Type",
                             "text/plain;charset=UTF-8");
    request.send();
}

function getReviewInput(stars) {
	var name = document.getElementById('form__name').value;
	var text = document.getElementById('form__text').value;

	newReview = {
		author_name: name,
		text: text,
		rating: stars
	};

	if (newReview.author_name !== "" && newReview.text !== "") {
		var newReviewJSON = JSON.stringify(newReview);
		saveReview(newReviewJSON);
	};
};

function countRating() {

	var starsArray = [];
	var starIcons = document.getElementsByClassName('rating__icon');

	for (var i = 0; i < starIcons.length; i++) {

		if (starIcons[i].style.color === "gold") {
			starsArray.push(starIcons[i].style.color);
		} ;
	}
	starRating = starsArray.length;

	getReviewInput(starRating);
};

function modalMessage() {
	var modal = document.querySelector('.modal');
	modal.style.display = 'block';

	document.querySelector('.close').addEventListener('click', function(){
		modal.style.display = 'none';
	});
};

document.getElementById('form__button').addEventListener('click', function(e) {

	e.preventDefault();
	countRating();
	modalMessage();

});



