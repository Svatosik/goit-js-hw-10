import axios from 'axios'; // імпортуємо бібліотеку axios

axios.defaults.headers.common['x-api-key'] =
  'live_lUgpZbgC3NGGA3aWJrXy0vUJgWER9dLhz7duFnCnXJso88wePXI8yHUKVnA2IYIB';
const BASE_URL = ' https://api.thecatapi.com/v1';

function fetchBreeds() {
  //декларація безагрументової функції fetchBreeds, яка буде експортуватись, данна функція повертає проміс зі всіма породами
  return axios.get(`${BASE_URL}/breeds`)
        .then(resp => {
            return resp.data;
  });
}

function fetchCatByBreed(breedId) {
  //декларація безагрументової функції fetchBreeds, яка буде експортуватись, данна функція повертає проміс з інформацією про певну породу
   return axios
     .get(`${BASE_URL}/images/search?breed_ids=${breedId}`)
     .then(resp => {
       return resp.data;
     });

}

export { fetchCatByBreed, fetchBreeds };
