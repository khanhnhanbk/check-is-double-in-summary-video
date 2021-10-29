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
h1.innerHTML = 'Hello World';
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
      div.appendChild(h1);
      let a = document.createElement('a');
      a.setAttribute('href', check.url);
      a.innerHTML = 'Link notion';
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
