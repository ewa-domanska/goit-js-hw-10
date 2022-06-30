import Debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
let countryInput = document.querySelector("#search-box");
let list = document.querySelector(".country-list");
let info = document.querySelector(".country-info");

function createListOfCountries(response) {
  let templates = "";
  for (const index in response) {
    let country = response[index]
    let countryTemplate = `<li><img src="${country.flag}"> ${country.name}</li>`;
    templates += countryTemplate;
  }
  list.innerHTML = templates;
}

function fetchCountries(name) {
  if (name.length > 0) {
    fetch("https://restcountries.com/v2/name/" + name).then(function (response) {
      return response.json();
    }).then((response) => {
      if (response.length) {
        if (response.length === 1) {
          Notiflix.Notify.info("later");
        } else if (response.length >= 2 && response.length <= 10) {
          createListOfCountries(response);
        } else if (response.length > 10) {
          list.innerHTML = "";
          Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
        }
      } else {
        Notiflix.Notify.failure("Oops, there is no country with that name");
      }
    })
  }
}

let debounceFetchCountries = Debounce(() => {
    fetchCountries(countryInput.value.trim())
  }
  , DEBOUNCE_DELAY);

countryInput.addEventListener("input", (e) => {
    debounceFetchCountries();
  }
);