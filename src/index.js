import Debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
let countryInput = document.querySelector("#search-box");
let list = document.querySelector(".country-list");
let info = document.querySelector(".country-info");

countryInput.addEventListener("input", (e) => {
  debounceFetchCountries();
});

let debounceFetchCountries = Debounce(() => {
  fetchCountries(countryInput.value.trim())
}, DEBOUNCE_DELAY);

function fetchCountries(name) {
  if (name.length > 0) {
    cleanList();
    cleanInfo();
    fetch("https://restcountries.com/v2/name/" + name).then(function (response) {
      return response.json();
    }).then((countries) => {
      if (countries.length) {
        if (countries.length === 1) {
          createCountryInfo(countries[0])
        } else if (countries.length >= 2 && countries.length <= 10) {
          createListOfCountries(countries);
        } else if (countries.length > 10) {
          Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
        }
      } else {
        Notiflix.Notify.failure("Oops, there is no country with that name");
      }
    })
  } else {
    cleanList();
    cleanInfo();
  }
}

function createCountryInfo(country) {
  info.innerHTML = `<div class="country-infoHeader"><img src="${country.flag}" alt="${country.name}" > ${country.name}</div>
<div><span>Capital:</span> ${country.capital}</div>
<div><span>Population:</span> ${country.population}</div>
<div><span>Languages:</span> ${country.languages.map(language => language.name).join(", ")}</div>`;
}

function createListOfCountries(countries) {
  let templates = "";
  for (const index in countries) {
    let country = countries[index]
    let countryTemplate = `<li><img src="${country.flag}" alt="${country.name}">&nbsp;${country.name}</li>`;
    templates += countryTemplate;
  }
  list.innerHTML = templates;
}

function cleanList() {
  list.innerHTML = "";
}

function cleanInfo() {
  info.innerHTML = "";
}