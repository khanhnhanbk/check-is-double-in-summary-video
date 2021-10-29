let myData;
// get data from local json file
fetch('./data/finallyData.json')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    myData = data;
  });

function youtube_parser(url) {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : false;
}

let div = document.getElementById('root');
let h1 = document.createElement('h1');
h1.innerHTML = 'Check is exist';
div.appendChild(h1);
// creat a input field in div root
let input = document.createElement('input');
input.setAttribute('type', 'text');
input.setAttribute('id', 'input');
div.appendChild(input);
// creat a button in div root
let button = document.createElement('button');
button.innerHTML = 'Check';
div.appendChild(button);

// center div root
div.style.margin = '0 auto';
div.style.width = '50%';
// color h1
h1.style.color = 'red';
// beauty button
button.style.backgroundColor = '#ff0000';
button.style.color = '#fff';
button.style.padding = '10px';
button.style.margin = '10px';
input.style.margin = '10px';
input.style.padding = '10px';

// beautify input
input.style.border = '1px solid #ff0000';
input.style.borderRadius = '5px';
input.style.width = '70%';
// add hint input
input.placeholder = 'Enter youtube url you want to check';

// function when button is clicked
button.onclick = function () {
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
      alert('Video not found');
    }
    // if video is found
    else {
      let h1 = document.createElement('h1');
      h1.innerHTML = check.title;
      // beautify h1
      h1.style.color = 'red';
      h1.style.fontSize = '30px';

      div.appendChild(h1);
      let a = document.createElement('a');
      // beautify a to button
      a.style.backgroundColor = '#0000ff';
      a.style.color = '#fff';
      a.style.padding = '10px';
      a.style.width = 'auto';
      a.style.borderRadius = '5px';
      a.style.textAlign = 'center';
      // center a
      a.style.display = 'block';
      a.style.margin = '0 auto';
      a.innerHTML = 'Watch on notion';
      a.setAttribute('href', check.url);
      div.appendChild(a);
    }
  }
};
// click button when input enter key is pressed
input.onkeypress = function (event) {
  if (event.keyCode === 13) {
    button.click();
  }
};
