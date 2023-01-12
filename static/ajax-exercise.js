'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  evt.preventDefault();
  fetch('/fortune')
    .then((response) => response.text())
    .then((responseData) => {
      document.querySelector('#fortune-text').innerHTML = responseData;
    });
}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const url = '/weather.json';
  const zipcode = document.querySelector('#zipcode-field').value;
  const queryString = new URLSearchParams({ 'zipcode': zipcode}).toString();
  const fetchUrl = url + '?' + queryString

// payload = {
//   key1: 'value1',
//   key2: 'value2',
// }

// new URLSearchParams(payload).toString();
// --> key1=value1&key2=value2
// --> '/weather.json?key1=value1&key2=value2'

  fetch(fetchUrl)
    .then((response) => response.json())
    .then((responseData) => {
      const forecast = responseData.forecast;
      document.querySelector('#weather-info').innerText = forecast;
    })
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function checkError(responseJson) {
  if (responseJson.code === "ERROR") {
    document.querySelector('#order-status').classList.add('order-error');
  } else {
    document.querySelector('#order-status').classList.remove('order-error');
  }
  document.querySelector('#order-status').innerText = responseJson.msg;
}

function orderMelons(evt) {
  evt.preventDefault();

  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
  const formInputs = {
    melon_type: document.querySelector('#melon-type-field').value,
    qty: document.querySelector('#qty-field').value,
  };

  fetch('/order-melons.json', {
    method:'POST',
    body: JSON.stringify(formInputs),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((response) => response.json())
  .then((responseJson) => {
    checkError(responseJson)    
  });
};

document.querySelector('#order-form').addEventListener('submit', orderMelons);


// FURTHER STUDY

function addDogImage(evt) {
  evt.preventDefault();

 const url = 'https://dog.ceo/api/breeds/image/random'
  fetch(url)
    .then((response) => response.json())
    .then((responseData) => {
      const image_url = responseData.message;
      document.querySelector('#dog-image').innerHTML = `<img src=${image_url}>` 
    });
  };

  document.querySelector('#get-dog-image').addEventListener('click', addDogImage)


  // <img src="img_chania.jpg"
  // <a href=${image_url}></a>
  
