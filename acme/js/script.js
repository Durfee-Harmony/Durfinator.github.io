//General variables and calling functions
const s = localStorage;
const title = document.getElementById('content-title');

//Fetching the JSON data
let json = '/acme/js/acme.json';
// fetchData('Anvils', json);
// fetchData('Explosives', json);
// function fetchData(page, json) {
//   fetch(json)
//     .then(function (response) {
//       if (response.ok) {
//         return response.json();
//       }
//       throw new ERROR('Network response was not OK.');
//     })
//     .then(function (data) {
//       console.log(data);
//       let d = data[page];
//       s.setItem('name', d.Name);
//       s.setItem('path', d.Path);
//       s.setItem('description', d.Description);
//       s.setItem('manufacturer', d.Manufacturer);
//       s.setItem('price', d.Price);
//       s.setItem('reviews', d.Reviews);
//       console.log(d);
//     })
//     .catch(function (error) {
//       console.log('There was a fetch problem: ', error.message);
//       statusContainer.innerHTML = 'Sorry, the data could not be processed.';
//     })
// }

//Function to build the navigation
buildNav(json);
function buildNav(json) {
  console.log(json);
  let nav = document.getElementById('page-nav');
  // Build the remaining list items using a for loop
  fetch(json)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new ERROR('Network response was not OK.');
    })
    .then(function (data) {
      console.log(data);
      let d = data['Titles'];
      console.log(d);
      nav.innerHTML += '<li><a onclick="home()" title="Home">Home</a></li>';
      for (let i = 1; i < 5; i++) {
        nav.innerHTML += '<li><a onclick="' + d[i] + '()" title="' + d[i] + '">' + d[i] + '</a></li>';
      }
    })
    .catch(function (error) {
      console.log('There was a fetch problem: ', error.message);
    })
}

function home() {
  title.innerHTML = 'Welcome to Acme!';
}

function Anvils() {
  title.innerHTML = 'Anvils';
}

function Explosives() {
  title.innerHTML = 'Explosives'
}

function Decoys() {
  title.innerHTML = 'Decoys';
}

function Traps() {
  title.innerHTML = 'Traps';
}