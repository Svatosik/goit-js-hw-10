import { fetchCatByBreed, fetchBreeds } from './cat-api'; // імпортуються функції
import SlimSelect from 'slim-select'; // імпортується бібліотека селектора
import 'slim-select/dist/slimselect.css'; // імпортується стилі селектора
import Notiflix from 'notiflix'; // імпортується бібліотека повідомлень

const selectForm = document.querySelector('.breed-select'); // змінна select ініціалізується селектом з класом breed-select
const loaderMessage = document.querySelector('.loader'); // змінна loader ініціалізується абзацом з класом loader
const errorMessage = document.querySelector('.error'); // змінна error ініціалізується абзацом з класом error
const catInfo = document.querySelector('.cat-info'); // змінна catInfo ініціалізується дівом з класом cat-info

function pageLoading() {
  // декларація безаргументвої функції, функція використовується для створення селектора
  loaderMessage.hidden = false; //ховаємо завантажувач 
  fetchBreeds() //використовуємо функцію, яка підтягує дані з бекенду
    .then(data => {
      selectForm.insertAdjacentHTML('beforeend', createMarkupSelect(data)); // створення елементів в selectForm
      new SlimSelect({
        // створення селектора задопомогою SlimSelect
        select: selectForm,
      });
    })

    .catch(error => { // ловимо помилку з проміса 
      Notiflix.Notify.failure(`❌Page is not working`);
      errorMessage.hidden = false;//показуємо рядок помилки 
      selectForm.hidden = true;//ховаємо селектор 
      console.log(error);//виводимо помилку в консоль 
    })

    .finally(() => {
      loaderMessage.hidden = true; //в незалежно від результату ховаємо рядок лоадера
    });
}

function createMarkupSelect(breedesArr) {
  // декларація  функції createMarkupSelect, яка приймає змінну breedesArr
  return breedesArr //повертаємо масив елементів для selectForm(селектора)
    .map(
      ({ id, name }) => `
    <option value="${id}">
    ${name}
    </option>
    `
    )
    .join('');
}

function onSelectBreed(breed) {
  //декларація функції onSelectBreed, яка приймає аргументом breed
  loaderMessage.hidden = false; //ховаємо рядок loaderMessage(лоадер)
  catInfo.hidden = true; //ховаємо інформацію про попереднього кота
  errorMessage.hidden = true; //ховаємо рядок errorMessage
  fetchCatByBreed(breed.target.value) // функція fetchCatByBreed отримує проміс з беку беручи аргументом ID породи
    .then(data => {
      const { url } = data[0]; //ініціалізуємо об'єкт url силочкою фотографії
      const { name, description, temperament } = data[0].breeds[0]; //ініціалізуємо об'єкт в який записуємо назву породи,інформацію про породу і темперамент породи
      catInfo.innerHTML = `
            <div class="container">
                <img src='${url}' alt='${name}' width=600 height=400/>
                <div class="info-container">
                    <h2>${name}</h2>
                    <p>${description}</p>
                    <p><b>Temperament:</b> ${temperament}.</p>
                </div>
            </div>`;
      catInfo.hidden = false; // показуємо інформацію про кота, яку напочатку функції виключили
    })

    .catch(error => { //ловимо помилку 
      Notiflix.Notify.failure('❌Page is not working');
      catInfo.hidden = true; // ховаємо інформацію про кота, адже в нас зловилась помилка 
      errorMessage.hidden = false; //показуємо рядок помилки
      console.log(error);// виводимо помилку в консоль 
    })
    .finally(() => {
      loaderMessage.hidden = true; //незалежно від результату ховаємо рядок лоадера
    });
}

errorMessage.hidden = true; 
selectForm.hidden = true;
selectForm.addEventListener('change', onSelectBreed);
pageLoading();
