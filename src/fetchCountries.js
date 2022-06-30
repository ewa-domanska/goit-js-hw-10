export function fetchCountries(name) {
  return fetch("https://restcountries.com/v2/name/" + name + "?fields=name,capital,languages,population,flag").then(function (response) {
    return response.json();
  });
}