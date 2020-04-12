// Global variables
const api_key = 'insert_api_key_here';
var restaurants = new Array();

// Helper function to fetch data from Zomato API
function getRestaurants(requestURL) {
    fetch(requestURL, { headers: {'user-key': api_key} })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        // Get length of JSON (how many restaurants did the API returned)
        var size = Object.keys(data['restaurants']).length;

        // Store data to an array
        for (let ctr = 0; ctr < size; ctr++) {
            restaurants.push(data.restaurants[ctr]['restaurant']);
        }
    });
}

// Multiple API calls to solve the limitation of Zomato API's max return result of 20 per call.
function load(max_data) {
    for (let offset = 0; offset < max_data; offset += 20) {
        // MIND THE BACKTICKS NOT SINGLE QUOTES
        var url = `https://developers.zomato.com/api/v2.1/search?entity_id=1509&entity_type=landmark&q=Taft%20Avenue%2C%20Malate%2C%20Manila&start=${offset}&lat=14.5661520231&lon=120.9925855324&sort=real_distance&order=asc`;

        getRestaurants(url);
    }
}

// Generates a random number from 0 to max - 1
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// Returns a random restaurant 
function suggest() {
    let index = getRandomInt(restaurants.length);
    document.getElementById("name").innerHTML = restaurants[index]['name'];
    document.getElementById("address").innerHTML = restaurants[index]['location']['address'];
    document.getElementById("timings").innerHTML = restaurants[index]['timings'];
    document.getElementById("url").href = restaurants[index]['url'];
    document.getElementById("url").innerHTML = "more info";
}

// Execute function
load(100);





