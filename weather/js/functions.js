// Weather Site JavaScript Functions
console.log('My javascript is being read.');

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
function windDial(direction) {
  console.log(direction);
  direction = direction.toLowerCase();
  if(direction == "ne" || direction == "nne" || direction == "ene"){
    dial.setAttribute("class", "ne");
    console.log("ne");
  }
  else if (direction == "nw" || direction == "nnw" || direction == "wnw") {
    dial.setAttribute("class", "nw");
    console.log("nw");
  }
  else if (direction == "se" || direction == "sse" || direction == "ese") {
    dial.setAttribute("class", "se");
    console.log("se");
  }
  else if (direction == "sw" || direction == "ssw" || direction == "wsw") {
    dial.setAttribute("class", "sw");
    console.log("sw");
  }
  else if (direction == "e" || direction == "east") {
    dial.setAttribute("class", "e");
    console.log("e");
  }
  else if (direction == "w" || direction == "west") {
    dial.setAttribute("class", "w");
    console.log("w");
  }
  else if (direction == "s" || direction == "south") {
    dial.setAttribute("class", "s");
    console.log("s");
  }
  else{
    dial.setAttribute("class", "n");
    console.log("n");
  }
}

//Finding the weather condition
function getCondition (type){
  type = type.toLowerCase();
  console.log(type);
  if(type == "rainy" || type == "rain" || type == "drizzly" || type == "wet"){
    type = "rain";
  }
  else if(type == "clear" || type == "nothing"){
    type = "clear";
  }
  else if(type == "cloudy" || type == "clouds" || type == "overcast"){
    type = "clouds";
  }
  else if(type == "fog" || type == "foggy" || type == "hazy"){
    type = "fog";
  }
  else if(type == "snow" || type == "snowy" || type == "blizzard"){
    type = "snow";
  }
  console.log(type);
  return type;
}

//Changing the picture in the background to match the weather condition
function changeSummaryImage(type){
  if(type == "rain"){
    content.setAttribute("class", "rain");
    weatherimg.setAttribute("src", "images/rain-small.jpg");
  }
  else if(type == "clear"){
    content.setAttribute("class", "clear");
    weatherimg.setAttribute("src", "images/clear-small.jpg");
  }
  else if(type == "clouds"){
    content.setAttribute("class", "clouds");
    weatherimg.setAttribute("src", "images/clouds-small.jpg");
  }
  else if(type == "fog"){
    content.setAttribute("class", "fog");
    weatherimg.setAttribute("src", "images/fog-small.jpg");
  }
  else {
    content.setAttribute("class", "snow");
    weatherimg.setAttribute("src", "images/snow-small.jpg");
  }
  console.log(type);
}

function convertMeters(meters) {
 let feet = meters * 3.28084;
 feet = Math.round(feet);
  console.log(feet);
 return feet;
}