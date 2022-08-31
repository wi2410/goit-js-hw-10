import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountriesAPI from "./fetchCountries";

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('input#search-box');
const listEl = document.querySelector('.country-list')

inputEl.addEventListener('input', debounce(onInputText, DEBOUNCE_DELAY));

function onInputText(ev) {
    const inputValue = ev.target.value.trim();
    if (!inputValue) {
        listEl.innerHTML = '';
        return;
    };
    
    fetchCountriesAPI(inputValue)
        .then(data => {
            // console.log(data)
        renderMarkup(data);
    })
}


function renderMarkup(obj) {
    if (obj.length > 10) {
    
        return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    };

    if (obj.length >= 2 && obj.length < 10) {
        const markup = obj.map(country => {
            return `<li><img src="${country.flags.svg}" alt="${country.name.official}" width ="30"><span>${country.name.official}</span></li>`
        }).join('');
    
        listEl.innerHTML = markup;
    };
  
    if (obj.length === 1) {
        const markup = obj.map( country => {
            return `<li> 
            <h2><img src="${country.flags.svg}" alt="${country.name.official}" width ="30"> ${country.name.official}</h2>
            <p><b>Capital:</b> ${country.capital}</p>
            <p><b>Population:</b> ${country.population}</p>
            <p><b>Languages:</b> ${Object.values(country.languages)}</p>
            </li>`
        }).join('');
        listEl.innerHTML = markup;
    }
}
