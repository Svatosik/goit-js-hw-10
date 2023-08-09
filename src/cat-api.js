import axios from 'axios'; // імпортуємо бібліотеку axios

export function fetchBreeds() {
  //декларація безагрументової функції fetchBreeds, яка буде експортуватись, данна функція повертає проміс зі всіма породами
  return axios.get('https://api.thecatapi.com/v1/breeds').then(resp => {
    return resp.data;
  });
}

export function fetchCatByBreed(breedId) {
  //декларація безагрументової функції fetchBreeds, яка буде експортуватись, данна функція повертає проміс з інформацією про певну породу
  return axios
    .get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=live_v3AzDsPEsw05lGsv86KKH9kk3GHpRImfwD997cCTqYa0MG9BADoIYmgYTjuNQpvJ`
    )
    .then(resp => {
      return resp.data;
    });
}
