// Weather Site JavaScript Functions
console.log('My javascript is being read.');

// Set global variable for custom header required by NWS API
var idHeader = {
  headers: {
    "User-Agent": "Student Learning Project - dur18011@byui.edu"
  }
};

const storage = localStorage;

// Variables for Function Use
const temp = 31;
const speed = 5;
buildWC(speed, temp);
const direction = document.getElementById("direction").innerHTML;
windDial(direction);
const weather = document.getElementById("weather").innerHTML;
let type = getCondition(weather);
changeSummaryImage(type);
const meters = document.getElementById("elevation").innerHTML;
console.log(meters);
const feet = convertMeters(meters);
console.log(feet);
document.getElementById("elevation").innerHTML = feet;
// Get the next hour based on the current time
let date = new Date();
let nextHour = date.getHours() + 1;

// Calculate the Windchill
function buildWC(speed, temp) {
  const feelTemp = document.getElementById('feels').value;
  // Compute the windchill
  let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
  console.log(wc);
  // Round the answer down to integer
  wc = Math.floor(wc);
  // If chill is greater than temp, return the temp
  wc = (wc > temp) ? temp : wc;
  // Display the windchill
  console.log(wc);
  let cw = 'Feels like ' + wc + '&deg;F';
  document.getElementById("feels").innerHTML = cw;
}

// Wind Dial Function
function windDial(d) {
  let type = "North";
  console.log(d);
  if (d != null) {
    d = d.toString();
    d = d.toLowerCase();
    if ((d == "ne" || d == "nne" || d == "ene") || (d <= "60" && d >= "30")) {
      dial.setAttribute("class", "ne");
      console.log("ne");
      type = "NE";
    } else if ((d == "nw" || d == "nnw" || d == "wnw") || (d <= "330" && d >= "300")) {
      dial.setAttribute("class", "nw");
      console.log("nw");
      type = "NW";
    } else if ((d == "se" || d == "sse" || d == "ese") || (d <= "150" && d >= "120")) {
      dial.setAttribute("class", "se");
      console.log("se");
      type = "SE";
    } else if ((d == "sw" || d == "ssw" || d == "wsw") || (d <= "240" && d >= "210")) {
      dial.setAttribute("class", "sw");
      console.log("sw");
      type = "SW";
    } else if ((d == "e" || d == "east") || (d < "60" && d > "120")) {
      dial.setAttribute("class", "e");
      console.log("e");
      type = "East";
    } else if ((d == "w" || d == "west") || (d < "300" && d > "240")) {
      dial.setAttribute("class", "w");
      console.log("w");
      type = "West";
    } else if ((d == "s" || d == "south") || (d < "210" && d > "150")) {
      dial.setAttribute("class", "s");
      console.log("s");
      type = "South";
    }
  } else {
    dial.setAttribute("class", "n");
    console.log("n");
    type = "None";
  }
  document.getElementById('direction').innerHTML = type;
}

//Finding the weather condition
function getCondition(type) {
  type = type.toLowerCase();
  console.log(type);
  if (type == "rainy" || type == "rain" || type == "drizzly" || type == "wet" || type == "thunderstorm" || type == "thunderstorms" || type == "stormy" || type == "storm") {
    type = "rain";
  } else if (type == "clear" || type == "nothing" || type == "") {
    type = "clear";
  } else if (type == "cloudy" || type == "clouds" || type == "overcast") {
    type = "clouds";
  } else if (type == "fog" || type == "foggy" || type == "hazy") {
    type = "fog";
  } else if (type == "snow" || type == "snowy" || type == "blizzard") {
    type = "snow";
  }
  console.log(type);
  return type;
}

//Changing the picture in the background to match the weather condition
function changeSummaryImage(type) {
  if (type == "rain") {
    content.setAttribute("class", "rain");
  } else if (type == "clear") {
    content.setAttribute("class", "clear");
  } else if (type == "clouds") {
    content.setAttribute("class", "clouds");
  } else if (type == "fog") {
    content.setAttribute("class", "fog");
  } else {
    content.setAttribute("class", "snow");
  }
  weatherimg.setAttribute("src", "images/" + type + "-small.jpg");
  weatherimg.setAttribute("alt", type + " weather image");
  console.log(type);
}

function convertMeters(meters) {
  let feet = meters * 3.28084;
  feet = Math.round(feet);
  console.log(feet);
  return feet;
}

function celsiusToFarenheit(c) {
  let f = ((c * (9 / 5)) + 32);
  f = Math.floor(f);
  console.log(f);
  return f;
}

function metersToMiles(meters) {
  let mph = meters * 2.237;
  mph = Math.round(mph);
  console.log(mph);
  return mph;
}

// Convert, Format time to 12 hour format
function format_time(hour) {
  if (hour > 23) {
    hour -= 24;
  }
  let amPM = (hour > 11) ? "pm" : "am";
  if (hour > 12) {
    hour -= 12;
  }
  if (hour == 0) {
    hour = "12";
  }
  return hour + amPM;
}

// Build the hourly temperature list
function buildHourlyData(nextHour, hourlyTemps) {
  // Data comes from a JavaScript object of hourly temp name - value pairs
  // Next hour should have a value between 0-23
  // The hourlyTemps variable holds an array of temperatures
  // Line 8 builds a list item showing the time for the next hour 
  // and then the first element (value in index 0) from the hourly temps array
  let hourlyListItems = '<li>' + format_time(nextHour) + ': ' + hourlyTemps[0] + '&deg;F</li>';
  // Build the remaining list items using a for loop
  for (let i = 1, x = hourlyTemps.length; i < x; i++) {
    hourlyListItems += '<li> | ' + format_time(nextHour + i) + ': ' + hourlyTemps[i] + '&deg;F</li>';
  }
  console.log('HourlyList is: ' + hourlyListItems);
  return hourlyListItems;
}

// Gets location information from the NWS API
function getLocation(locale) {
  const URL = "https://api.weather.gov/points/" + locale;
  // NWS User-Agent header (built above) will be the second parameter 
  fetch(URL, idHeader)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new ERROR('Response not OK.');
    })
    .then(function (data) {
      // Let's see what we got back
      console.log('Json object from getLocation function:');
      console.log(data);
      // Store data to localstorage 
      storage.setItem("locName", data.properties.relativeLocation.properties.city);
      storage.setItem("locState", data.properties.relativeLocation.properties.state);

      // Next, get the weather station ID before requesting current conditions 
      // URL for station list is in the data object 
      let stationsURL = data.properties.observationStations;
      // Call the function to get the list of weather stations
      getStationId(stationsURL);
      let hourlyURL = data.properties.forecastHourly;
      getHourly(hourlyURL);
      let forecastURL = data.properties.forecast;
      getForecast(forecastURL);
    })
    .catch(error => console.log('There was a getLocation error: ', error))
} // end getLocation function

// Gets weather station list and the nearest weather station ID from the NWS API
function getStationId(stationsURL) {
  // NWS User-Agent header (built above) will be the second parameter 
  fetch(stationsURL, idHeader)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new ERROR('Response not OK.');
    })
    .then(function (data) {
      // Let's see what we got back
      console.log('From getStationId function:');
      console.log(data);

      // Store station ID and elevation (in meters - will need to be converted to feet) 
      let stationId = data.features[0].properties.stationIdentifier;
      let stationElevation = data.features[0].properties.elevation.value;
      console.log('Station and Elevation are: ' + stationId, stationElevation);

      // Store data to localstorage 
      storage.setItem("stationId", stationId);
      storage.setItem("stationElevation", stationElevation);

      // Request the Current Weather for this station 
      getWeather(stationId);
    })
    .catch(error => console.log('There was a getStationId error: ', error))
} // end getStationId function

// Gets current weather information for a specific weather station from the NWS API
function getWeather(stationId) {
  // This is the URL for current observation data 
  const URL = 'https://api.weather.gov/stations/' + stationId + '/observations/latest';
  // NWS User-Agent header (built above) will be the second parameter 
  fetch(URL, idHeader)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new ERROR('Response not OK.');
    })
    .then(function (data) {
      // Let's see what we got back
      console.log('From getWeather function:');
      console.log(data);

      // Store weather information to localStorage 
      localStorage = data['@context' ['properties']];
      console.log(localStorage);
      // Build the page for viewing
      buildPage(data.properties, data);
    })
    .catch(error => console.log('There was a getWeather error: ', error))
} // end getWeather function

// Gets hourly information for a specific weather station from the NWS API
function getHourly(link) {
  // NWS User-Agent header (built above) will be the second parameter 
  fetch(link, idHeader)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new ERROR('Response not OK.');
    })
    .then(function (data) {
      // Let's see what we got back
      console.log('From getHourly function:');
      console.log(data);

      let hourly = [];
      for(var i = 0; i<13; i++){
        hourly[i] = data.properties.periods[i].temperature;
      }
      storage.setItem("hourly", hourly);
    })
    .catch(error => console.log('There was a getHourly error: ', error))
} // end getHourly function

// Gets current weather forecast for a specific weather station from the NWS API
function getForecast(link) {
  // NWS User-Agent header (built above) will be the second parameter 
  fetch(link, idHeader)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new ERROR('Response not OK.');
    })
    .then(function (data) {
      // Let's see what we got back
      console.log('From getForecast function:');
      console.log(data);
      
      storage.setItem("high", data.properties.periods[0].temperature);
      storage.setItem("low", data.properties.periods[1].temperature);
    })
    .catch(error => console.log('There was a getForecast error: ', error))
} // end getForecast function

// Populate the current location weather page
function buildPage(c, data) {
  // Task 1 - Feed data to WC, Dial, Image, Meters to feet and hourly temps functions
  storage.setItem("temp", celsiusToFarenheit(c.temperature.value));
  buildWC(c.windSpeed.value, storage.getItem("temp"));
  storage.setItem("direction", c.windDirection.value);
  windDial(storage.getItem("direction"));
  storage.setItem("summary", getCondition(c.textDescription))
  changeSummaryImage(storage.getItem("summary"));
  storage.setItem("elevation", convertMeters(c.elevation.value));
  document.getElementById('elevation').innerHTML = storage.getItem("elevation");
  //buildHourlyData(nextHour, hourlyTemps);

  // Task 2 - Populate location information
  document.getElementById('zip');
  document.getElementById('latitude').innerHTML = convertMeters(storage.getItem("lat"));
  document.getElementById('longitude').innerHTML = convertMeters(storage.getItem("long"));

  // Task 3 - Populate weather information
  document.getElementById('page-title').innerHTML = storage.locName + ", " + storage.locState + " | Weather Site";
  document.getElementById('content-heading').innerHTML = storage.locName + ", " + storage.locState;
  document.getElementById('deg').innerHTML = storage.getItem("temp") + "&deg;F";
  document.getElementById('high').innerHTML = storage.getItem("high") + "&deg;F";
  document.getElementById('low').innerHTML = storage.getItem("low") + "&deg;F";
  storage.setItem("mph", metersToMiles(c.windSpeed.value));
  document.getElementById('mph').innerHTML = storage.getItem("mph") + " mph";
  document.getElementById('gusts').innerHTML = (c.windGust.value) ^ "None";
  document.getElementById('weather').innerHTML = storage.getItem("summary");

  // Task 4 - Hide status and show main
  document.getElementById('main-content').setAttribute('class', '');
  document.getElementById('status').setAttribute('class', 'hide');
}