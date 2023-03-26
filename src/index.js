import './css/styles.css';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries';

import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

// const inputRef = document.getElementById('search-box');
const inputEl = document.querySelector('#search-box');

const countryList = document.querySelector('.country-list');

const countryInfoDiv = document.querySelector('.country-info');

// inputEl.addEventListener('input', countrySearch);

inputEl.addEventListener('input', debounce(countrySearch, DEBOUNCE_DELAY));

function countrySearch (event) {
  let countryNameInput = event.target.value.trim();

  //   console.log(countryName);
  fetchCountries(countryNameInput)
    .then(countries => {
      console.log(countries);
      if (countries.length > 10) {
        clearData();
        NeedSpecificNameNotification();
      } else if (countries.length > 1 && countries.length <= 10) {
        clearData();
        countriesCard(countries);
      }
      if (countries.length === 1) {
        clearData();
        countriesListLayOut(countries);
      }
    })
    .catch(() => {
      clearData();
      showNoMatchNotification();
    });
}
// ------------------------------------

function countriesListLayOut (countries) {
  // создаем через map массив и переводим в строку join(''), добавляя разметку для данных
  let markup = countries
    .map(
      country => `<div class = "country-card">
        <img  class = "country-flag" width="70"
        src = "${country.flags.svg}"
         alt = "${country.name.official} flag" />
        <p class = "paragraph-name">Country: ${country.name.official}</p>
        <p class= "paragraph-name">Capital: ${country.capital}</p>
        <p class = "paragraph-name">Population: ${country.population}</p>
        <p class = "paragraph-name">Language: ${Object.values(
          country.languages
        )}</p>
        </div>`
    )
    .join('');
  countryList.innerHTML = markup;
}

// ------------------------------------
// создаем через map массив стран и переводим в строку join(''), добавляя разметку для данных

function countriesCard (countries) {
  let countryData = countries
    .map(
      country => `<li class = "country">
    <img  class = "picture" width="80"
   src = "${country.flags.svg}"
    alt = "${country.name.official} flag" />
     <p class = "paragraph-name">Country: ${country.name.official}</p>
     </li>`
    )
    .join('');
  countryInfoDiv.innerHTML = countryData;
}

function showNoMatchNotification () {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
function NeedSpecificNameNotification () {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}
// функция очищает список стран и их характеристик

function clearData () {
  countryList.innerHTML = '';
  countryInfoDiv.innerHTML = '';
}
