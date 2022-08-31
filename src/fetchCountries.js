import Notiflix from 'notiflix';

export default function fetchCountries(country) {
    const url = `https://restcountries.com/v3.1/name/${country}?fields=name,capital,population,flags,languages`
    return fetch(url).then(res => {
        if (!res.ok) {
            Notiflix.Notify.failure(`Oops, there is no country with that name`)
        }
        return res.json()
    });
};
