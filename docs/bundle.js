(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
var fs = require('fs');

var googleAPI = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJDUhcRqKVFkcRBFG3CKyWqrM&fields=review&key=AIzaSyCMPw99oS6ha9M4ufOSp0tcA450Qd7sbNk";
var localReviews = "reviews.json";

loadJSON(googleAPI, 'google');
loadJSON(localReviews, 'local');

function loadJSON(JSONsource, JSONtype) {
	var request = new XMLHttpRequest();
	request.open('GET', JSONsource, true);
	request.onload = function() {
	  if (request.status >= 200 && request.status < 400) {
	  	parseData(JSONtype, request);
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
		buildUI(dataReviews, '.review__container');
	} else if (type === 'local') {
	    buildUI(dataReviews, '.local__reviews__container');
	} else {
		console.log('The \'type\' argument is invalid');
	};
};

function buildUI(dataArray, parentElement) {
	var reviewText, reviewAuthor, reviewAuthorSplit, reviewAuthorName, reviewRating, reviewImage, html, iconHtml;

	for (var i = 0; i <= 2; i++) {
		reviewText = '“' + dataArray[i]['text'] + '”';
		reviewAuthor = dataArray[i]['author_name'];
		reviewAuthorSplit = reviewAuthor.split(/[\s]/); // split to get only the author's name 
		reviewAuthorName = reviewAuthorSplit[0];
		reviewRating = dataArray[i]['rating'];
		reviewImage = dataArray[i]['profile_photo_url'];

		html = '<div class="review__item"><img src="%reviewImg%" class="review__img"/><p class="review__text">%reviewText%</p><h3 class="review__author">%reviewAuthorName%</h3>';

		for (var j = 1; j <= reviewRating; j++) { // iterate over the rating value and add one star icon each time
			iconHtml = '<span class="review__icon lnr lnr-star"></span>';
			html += iconHtml;
		};

		html += '</div>'; // close the node
		newHtml = html.replace('%reviewText%', reviewText);
		newHtml = newHtml.replace('%reviewAuthorName%', reviewAuthorName);
		newHtml = newHtml.replace('%reviewImg%', reviewImage);
		document.querySelector(parentElement).insertAdjacentHTML('beforeend', newHtml); //insert review element
	};
};

/* TO DO
1. After clicking the submit button - add event listener function +
2. Select input fields and retrieve their value +
3. Store those value in a variables +
4. Create object for a submitted review+
5. Stringify object to JSON
6. Write object to the reviews.json file

!-- CSS & JS rating ! - stars
*/

document.querySelector('.form__button').addEventListener('click', function() {
	var name = document.getElementById('form__name').value;
	var text = document.getElementById('form__text').value;
	
	newReview = {
		author_name: name,
		text: text
	};

	var newReviewJSON = JSON.stringify(newReview);  
	console.log(newReviewJSON);

	
	fs.writeFile('form-reviews.json', newReviewJSON, finished);

    function finished(err)
       { console.log('success');}

    console.log("File has been created");
});






},{"fs":1}]},{},[2]);
