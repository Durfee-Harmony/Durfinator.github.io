//General variables and calling functions
fetchData('Anvils');


//Fetching the JSON data
let json = 'https://durfinator.github.io/acme/js/acme.json';
function fetchData(page) {
  fetch(json)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new ERROR('Network response was not OK.');
    })
    .then(function (data) {
      console.log(data);
      let g = data[page];
      let name = g.Name;
      let path = g.Path;
      let description = g.Description;
      let manufacturer = g.Manufacturer;
      let price = g.Price;
      let reviews = g.Reviews;
      console.log(g);
    })
    .catch(function (error) {
      console.log('There was a fetch problem: ', error.message);
      statusContainer.innerHTML = 'Sorry, the data could not be processed.';
    })
}

//Function to build the navigation
function buildNav() {
    let navList = '<li>' + format_time(nextHour) + '</li>';
    // Build the remaining list items using a for loop
    for (let i = 1, x = hourlyTemps.length; i < x; i++) {
        navList += '<li> | ' + format_time(nextHour + i) + '</li>';
    }
    console.log('HourlyList is: ' + navList);
    return navList;
}