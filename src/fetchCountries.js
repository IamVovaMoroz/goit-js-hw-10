// Основной URL запроса
const URL = 'https://restcountries.com/v3.1/name';
// Дополнительные параметры запроса, фильтр
const SEARCH_FIELDS = '?fields=name,capital,population,flags,languages';
// Создаём функцию для отправки запроса на сервер
// Основной URL сервера + name (параметр, который будет получать функция при вводе input) + SEARCH_FIELDS(фильтрация полученных данных)
// return fetch ставим, чтобы получить результат в then
// если response.ok расшифровываем его, если нет отправляем ошибку
// return response.json() чтобы можно было получить результат запроса дальше
export default function fetchCountries (name) {
  return fetch(`${URL}/${name}${SEARCH_FIELDS}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

// const URL = 'https://restcountries.com/v3.1/name';
// const SEARCH_FIELDS = '?fields=name,capital,population,flags,languages';

// export default function fetchCountries (name) {
//   return fetch(`${URL}/${name}${SEARCH_FIELDS}`).then(response => {
//     if (response.ok) {
//       return response.json();
//     }
//     throw new Error(response.statusText);
//   });
// }
