// Variables for Function Use
let pageNav = document.getElementById('page-nav');
let statusContainer = document.getElementById('status');
let contentContainer = document.getElementById('main-content');
let weatherURL = "https://durfinator.github.io/weather/weather.json";
fetchData(weatherURL);

function fetchData(weatherURL) {
  let cityName = 'Greenville'; // The data we want from the weather.json file
  fetch(weatherURL)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new ERROR('Network response was not OK.');
    })
    .then(function (data) {
      // Check the data object that was retrieved
      console.log(data);
      // data is the full JavaScript object, but we only want the greenville part
      // shorten the variable and focus only on the data we want to reduce typing
      let g = data[cityName];

      // ************ Get the content ******************************

      // Get the location data
      let locName = g.City;
      let locState = g.State;
      // Put them together
      let fullName = locName + ', ' + locState;
      // See if it worked
      console.log('fullName is: ' + fullName);

      // Get the temperature data
      let locHighTemp = g.High;
      let locLowTemp = g.Low;
      let locTemp = g.Temp;

      // Get the wind data 
      let locWind = g.Wind;
      let locWindDirection = g.Direction;
      let locGusts = g.Gusts;

      // Get the current conditions
      let locPrecip = g.Precip;
      let locSummary = g.Summary;
      let locLongitude = g.Longitude;
      let locLatitude = g.Latitude;
      let locElevation = g.Elevation;
      let locZip = g.Zip;

      // Get the hourly data
      let locHourly = g.Hourly;

      // ************ Display the content ******************************
      // Set the title with the location name at the first
      // Gets the title element so it can be worked with
      let pageTitle = document.getElementById('page-title');
      // Create a text node containing the full name 
      let fullNameNode = document.createTextNode(fullName);
      // inserts the fullName value before any other content that might exist
      pageTitle.insertBefore(fullNameNode, pageTitle.childNodes[0]);
      // When this is done the title should look something like this:
      // Greenville, SC | The Weather Site

      // Set the Location information
      locElevation = convertMeters(locElevation);
      locLongitude = convertMeters(locLongitude);
      locLatitude = convertMeters(locLatitude);
      document.getElementById("zip").innerHTML = locZip;
      document.getElementById("elevation").innerHTML = locElevation;
      document.getElementById("longitude").innerHTML = locLongitude;
      document.getElementById("latitude").innerHTML = locLatitude;

      // Get the h1 to display the city location
      let contentHeading = document.getElementById('content-heading');
      contentHeading.innerHTML = fullName;
      // The h1 in main h1 should now say "Greenville, SC"


      // Set the temperature information
      buildWC(locWind, locTemp);
      document.getElementById("deg").innerHTML = locTemp + "&deg;F";
      document.getElementById("high").innerHTML = locHighTemp + "&deg;F";
      document.getElementById("low").innerHTML = locLowTemp + "&deg;F";

      // Set the wind information
      windDial(locWindDirection);
      document.getElementById("gusts").innerHTML = locGusts;
      document.getElementById("direction").innerHTML = locWindDirection;
      document.getElementById("mph").innerHTML = locWind + " mph";

      // Set the current conditions information
      type = getCondition(locSummary);
      changeSummaryImage(type);
      document.getElementById("weather").innerHTML = locSummary;

      // Set the hourly temperature information
      document.getElementById("hourly-list").innerHTML = buildHourlyData(nextHour, locHourly);

      // Change the status of the containers
      contentContainer.setAttribute('class', ''); // removes the hide class
      statusContainer.setAttribute('class', 'hide'); // hides the status container
    })
    .catch(function (error) {
      console.log('There was a fetch problem: ', error.message);
      statusContainer.innerHTML = 'Sorry, the data could not be processed.';
    })
}