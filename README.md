# Vanilla JS Reviews Project
Explores ways to implement reviews on the website. *AJAX' style, no libraries.*
##### Fetch data from Google API
Fetch reviews from Google Maps API, based on a place ID and API key in a JSON file and display them on the website. Unfortunately it is a limited option because Google allows us to fetch only five "the most helpfull" reviews (at least for free). 
##### Fetch data from local file
Fetch reviews from local JSON file (stored on the server) and display them on the website. Since we're not limited here (you can store as many reviews as you want in your local file) click "more" button to show three new reviews. 
##### Review Form 
The form collects rating, review and author's name. After submitting, a modal message pops up and the input is stored in an object, which is then stringified, encoded and saved in a JSON file on the server. The file is updated every time a new review is submitted. Implemented without libraries, entirely in JavaScript (and with a pinch of PHP for a server-side script).
## See here: http://xyzalag.ayz.pl/reviews-project/
