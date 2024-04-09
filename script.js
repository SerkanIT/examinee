let urlAPI = "https://restcountries.com/v3.1/region/europe";
let card = document.querySelector(".cardsFlag");
let countrySearch = document.querySelector(".countrySearch");

async function searchData(data, input) {
  return data.filter((item) => {
    let searchTerm = input.toLowerCase();
    return item.name.common.toLowerCase().includes(searchTerm);
  });
}

async function getData() {
  const res = await axios.get(urlAPI);
  let countries = res.data;
  card.innerHTML = "";
  countries.forEach((item) => {
    renderCountryCard(item);
  });

  countrySearch.addEventListener("input", async () => {
    let searchTerm = countrySearch.value.trim();
    let filteredData = await searchData(countries, searchTerm);
    renderCountries(filteredData);
  });
}

function renderCountryCard(item) {
  let div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `<img class="flagImage" src="${item.flags.svg}" alt="">
        <div class="intoFlag">
            <p class="flagName">${item.name.common}</p>
            <div class="flagInfo">
                <p class="population">Population: ${item.population}</p>
                <p class="region">Region: ${item.region}</p>
                <p class="capital">Capital: ${item.capital}</p>
            </div>
        </div>`;
  card.append(div);
}

function renderCountries(data) {
  card.innerHTML = "";
  data.forEach((item) => {
    renderCountryCard(item);
  });
}

getData();

function toggleDarkMode() {
  const body = document.body;
  const isDarkMode = body.classList.contains("dark-mode");
  body.classList.toggle("dark-mode", !isDarkMode);

  const darkModeButton = document.querySelector(".toggle-dark-mode");
  if (isDarkMode) {
    darkModeButton.textContent = "Light Mode";
  } else {
    darkModeButton.textContent = "Dark Mode";
  }
}

const darkModeButton = document.querySelector(".toggle-dark-mode");
darkModeButton.addEventListener("click", toggleDarkMode);
