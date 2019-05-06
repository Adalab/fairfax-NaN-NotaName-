const responseURL = document.querySelector('.card__link');
const responseText = document.querySelector('.form__share-subtitle');
const twitterButton = document.querySelector('.share__twitter');

//enviar datos
function sendRequest() {
  fillModel();
  fetch('https://us-central1-awesome-cards-cf6f0.cloudfunctions.net/card/', {
    method: 'POST',
    body: JSON.stringify(userCard),
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(function(resp) {
      return resp.json();
    })
    .then(function(result) {
      showTwitterButton();
      showURL(result);
    })
    .catch(function(error) {
      console.log(error);
    });
}

function showURL(result) {
  if (result.success) {
    responseText.innerHTML = 'La tarjeta ha sido creada';
    const newUrl = document.createElement('a');
    const newUrlText = document.createTextNode(`${result.cardURL}`);
    newUrl.setAttribute('href', `${result.cardURL}`);
    newUrl.appendChild(newUrlText);
    responseURL.appendChild(newUrl);
    twitterButton.href = `https://twitter.com/intent/tweet?text=Mira%20mi%20nueva%20tarjeta%20digital:%20${
      result.cardURL
    }`;
    twitterButton.classList.remove('hide');
  } else {
    twitterButton.classList.add('hide');
    responseText.innerHTML = 'Ha habido un error';
    buttonCreateEl.classList.remove('button__create--clicked');
    buttonCreateEl.classList.add('button__create');
    responseURL.innerHTML = 'ERROR:' + result.error;
  }
}

buttonCreateEl.addEventListener('click', sendRequest);