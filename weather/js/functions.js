// Weather Site JavaScript Functions
console.log('My javascript is being read.');

// Variables for Function Use
const temp = 31;
const speed = 5;
buildWC(speed, temp);
const direction = document.getElementById("direction").value;
windDial(direction);

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
  // Get the container
  const dial = document.getElementById("dial");
  console.log(direction);
  // Determine the dial class
  /*
  switch (direction) {
    case "North":
    case "N":
      dial.setAttribute("class", "n"); //"n" is the CSS rule selector
      break;
    case "NE":
    case "NNE":
    case "ENE":
      dial.setAttribute("class", "ne");
      break;
    case "NW":
    case "NNW":
    case "WNW":
      dial.setAttribute("class", "nw");
      break;
    case "South":
    case "S":
      dial.setAttribute("class", "s");
      break;
    case "SE":
    case "SSE":
    case "ESE":
      dial.setAttribute("class", "se");
      break;
    case "SW":
    case "SSW":
    case "WSW":
      dial.setAttribute("class", "sw");
      break;
    case "East":
    case "E":
      dial.setAttribute("class", "e");
      break;
    case "West":
    case "W":
      dial.setAttribute("class", "w");
      break;
  }*/
}

//Changing the weather condition picture in the background
function getCondition (type){
  type = type.toLowerCase();
  if(type == "rainy" || type == "rain" || type == "drizzly" || type == "wet"){
    type = "rain";
  }
  else if(type == "clear" || type == "nothing"){
    type = "clear";
  }
  else if(type == "cloudy" || type == "clouds" || type == "overcast"){
    type = "clouds";
  }
  else if(type == "fog" || type == "foggy"){
    type = "fog";
  }
  else if(type == "snow" || type == "snowy" || type == "blizzard"){
    type = "snow";
  }
  return type;
}
let type = getCondition("cloudy");
function changeSummaryImage(type){
  alert("function started");
  if(type.Equals("rain")){
    content.setAttribute("class", "rain");
    alert("success");
  }
  else if(type == "clear"){
    content.setAttribute("class", "clear");
    alert("success");
  }
  else if(type.Equals("clouds")){
    content.setAttribute("class", "clouds");
    alert("success");
  }
  else if(type == "fog"){
    content.setAttribute("class", "fog");
    alert("success");
  }
  else {
    content.setAttribute("class", "snow");
    alert("success");
  }
}
changeSummaryImage(type);