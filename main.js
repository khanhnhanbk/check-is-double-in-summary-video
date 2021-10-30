let myData;
// get data from local json file
fetch('./data/finallyData.json')
  .then((response) => response.json())
  .then((data) => {
    myData = data;
  });

function youtube_parser(url) {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
}

let input = document.getElementById('input');
let button = document.getElementById('button-check');
let divResult = document.getElementById('div-result');

button.onclick = function () {
  clearDivResult();

  let inputValue = youtube_parser(input.value);
  input.value = '';

  if (inputValue == false) {
    alert('Please enter a valid youtube url');
  } else if (myData == null) {
    alert('Please wait for data to load');
  } else {
    // check if input value is in data

    let check = myData.find((element) => element.videoId == inputValue);

    if (check == undefined) {
      divResult.innerHTML += '<h2>Video has not already been added</h2>';
    } else {
      // if video is found
      renderResult(check);
    }
  }
};

// click button when input enter key is pressed
input.onkeypress = function (event) {
  if (event.keyCode === 13) {
    button.click();
  }
};

function renderResult(check) {
  let h1 = document.createElement('h1');
  h1.innerHTML = check.title;
  divResult.appendChild(h1);

  let a = document.createElement('a');
  a.setAttribute('href', check.url);
  a.innerHTML = 'Click here to watch';
  a.classList.add('a-link');
  divResult.appendChild(a);
}

function clearDivResult() {
  divResult.innerHTML = '<h2> Result </h2>';
}
