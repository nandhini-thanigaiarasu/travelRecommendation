const searchButton = document.getElementById('search');
const clearButton = document.getElementById("clear")
const searchResultDiv =document.getElementById("search-result");


searchButton.addEventListener('click', searchPlaces);
clearButton.addEventListener('click', (event) => {
  searchResultDiv.innerHTML = '';
  document.getElementById("search-box").value = '';
})
function searchPlaces(event) {
  event.preventDefault();
  const searchInput = document.getElementById("search-box").value.trim().toLowerCase();

  fetch('travel_recommendation.json')
    .then(response => response.json())
    .then(data => {
      let searchResults = null;
      if(searchInput === 'countries' || searchInput === 'country') {
        getCountries(data.countries, searchResultDiv);
      } else if(searchInput === 'beach' || searchInput === 'beaches') {
        getOtherPlaces(data.beaches, searchResultDiv);
      } else if(searchInput === 'temple' || searchInput === 'temples') {
        getOtherPlaces(data.temples, searchResultDiv);
      }
    })
    .catch(error => console.log(error));
}

function getCountries(countries, searchResultDiv){
  for(let country of countries){
    for(let city of country.cities){
      searchResultDiv.appendChild(createTourCardDiv(city));
    }
  }
}

function getOtherPlaces(places, searchResultDiv){
  for(let place of places){
    searchResultDiv.appendChild(createTourCardDiv(place));
  }
}


function createTourCardDiv(data){
  const tourCardDiv = document.createElement("div");
  tourCardDiv.classList.add("tourism-card");

  const imagediv = document.createElement("div");
  imagediv.classList.add("card-image-wrapper");

  const imagetag = document.createElement("img");
  imagetag.classList.add("card-image");
  imagetag.src = data.imageUrl;
  imagediv.appendChild(imagetag);
  tourCardDiv.appendChild(imagediv);

  const titleDiv = document.createElement("div");
  titleDiv.classList.add("card-content");

  const header3 = document.createElement("h3");
  header3.classList.add("card-title");
  header3.innerText = data.name;
  titleDiv.appendChild(header3);

  const description = document.createElement("p");
  description.classList.add("card-description");
  description.innerText = data.description;
  titleDiv.appendChild(description);

  const visitButton = document.createElement("a");
  visitButton.classList.add("visit-button");
  visitButton.innerText = "Visit";
  titleDiv.appendChild(visitButton);

  tourCardDiv.appendChild(titleDiv);
  return tourCardDiv;
}
