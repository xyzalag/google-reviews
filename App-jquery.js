/* GOOGLE REVIEWS TO DO
-- ! add a simple npm node server to the project folder! http-server
-- ! look up how to fetch and access data from JSON by pure JS instead of jQuery!!
1. Google only fetch 5 reviews in JSON file  - find out why and how to change it
--> I make a use of google Maps API, which is limited to display only five 'the most helpfull' reviews (It is unclear what does it mean, but the reviews are neiher is chronological or alphabetical order)
--> There are two possible solutions to this problem:
--> 1. Try to get the access to Google My Bussinnes API - they provide all the reviews, but it's highly possible, that it's not for free!
--> 2. If I won't be able to get the solution 1 working - I can rely on my current option - yes, it is limites, but I can indicated that and focus more on how to display them on a carousel or something else ! - To show my skills

1. Try to parse json file with pure JS, not jquery - rewrite everything 
2. Create HTML stucture for reviews - custom .container and 
	-- review content
	-- review author
	-- author profile photo
	-- rating - in stars - use icons

3. Making use of owl carousel
	-- try to find out the other way to display reviews properly on the carousel instead of if statement (it's really lame)
	-- various display options.


!-- we don't want to display someone's surname so we only take the first name ! -- using split method !
!-- how to display image?
		-- create normal image html element and place url from JSON inside the .src attribute! 
*/



jQuery(function ($) {

  'use strict';

  // Automatically load reviews from Google location account and append them to the Owl recommendation carousel
   (function () {
      $(document).ready(function(){
      //fetch reviews from Google API in JSON, based on place ID and API key:
      var googleAPI="https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJDUhcRqKVFkcRBFG3CKyWqrM&fields=review&key=AIzaSyCMPw99oS6ha9M4ufOSp0tcA450Qd7sbNk";
      $.getJSON(googleAPI, function(data){
        var reviewsArray = data["result"]["reviews"];
        var i; 
        //for each review extract text and author's name:
        for (i in reviewsArray) {
          var review = reviewsArray[i];
          var reviewText = review.text;
          var reviewAuthor = review.author_name;
          var count = i; 
          if (reviewText !== "") {
              //create a new div node -  for a new quote 
              var reviewsCarousel = document.querySelector(".recommendation-carousel");
              var reviewsItem = document.createElement("div");
              $(reviewsItem).addClass("recommendation-carousel__item");
              var reviewsHeading = document.createElement("h2");
              $(reviewsHeading).addClass("recommendation-carousel__quote");
              var reviewsHeadingText = document.createTextNode("“"+ reviewText + "”");
              reviewsHeading.appendChild(reviewsHeadingText);
              reviewsItem.appendChild(reviewsHeading);

              //create source span with author's name
              var reviewsSmall = document.createElement("small");
              $(reviewsSmall).addClass("recommendation-carousel__source");
              var reviewsSmallText = document.createTextNode(reviewAuthor);
              reviewsSmall.appendChild(reviewsSmallText);
              reviewsItem.appendChild(reviewsSmall);

              //append new item to the carousel's div 
              reviewsCarousel.appendChild(reviewsItem);
              count ++; 
            };
          };
        //if the reviews' elements are created - initialize Owl Carousel  
        if (count > 0) {
          $('.recommendation-carousel').owlCarousel({
            nav: true,
            navText: ["◀","▶"],
            items: 1,
            loop:true,
            autoplay: true,
            autoplayTimeout: 2000,
            smartSpeed: 500,
            autoplayHoverPause:true,
            margin:10,
            touchDrag: true,
          });
        };
     });
   });
}());