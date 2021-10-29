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
h1.innerHTML = 'Check is existed';
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
div.style.width = '100%';
// color h1
h1.style.color = '#D41C1C';
// center h1
h1.style.display = 'block';
h1.style.margin = '0 auto';
h1.style.width = '100%';
h1.style.textAlign = 'center';

// beauty button
button.style.backgroundColor = '#D41C1C';
button.style.color = '#fff';
button.style.fontSize = '20px';
button.style.padding = '10px';
input.style.padding = '10px';
button.style.display = 'block';
button.style.margin = '20px auto';
button.style.width = '30%';
button.style.borderRadius = '35px';
// beautify input
input.style.border = '1px solid #ff0000';
input.style.borderRadius = '5px';
input.style.width = '100%';
// add hint input
input.placeholder = 'Enter youtube url here';

let divResult = document.createElement('div');
divResult.setAttribute('id', 'result');
div.appendChild(divResult);

button.onclick = function () {
  let inputValue = youtube_parser(input.value);
  input.value = '';
  // create a div result in div root
  // clear div result
  divResult.innerHTML = '';
  // create a h2 in div result
  let h2 = document.createElement('h2');
  h2.innerHTML = 'Result';
  // beautify h2
  h2.style.color = '#0088A4';
  h2.style.textAlign = 'center';
  h2.style.margin = '0 auto';
  h2.style.width = '100%';
  // append h2 to div result
  divResult.appendChild(h2);

  if (inputValue == false) {
    alert('Please enter a valid youtube url');
  } else if (myData == null) {
    alert('Please wait for data to load');
  } else {
    // check if input value is in data
    let check = myData.find((element) => element.videoId == inputValue);
    if (check == undefined) {
      // render not found
      let h2 = document.createElement('h2');
      h2.innerHTML = 'Video has not already been added';
      divResult.appendChild(h2);
      h2.style.color = '#D41C1C';
      h2.style.display = 'block';
      h2.style.margin = '0 auto';
      h2.style.width = '100%';
      h2.style.textAlign = 'center';
    }
    // if video is found
    else {
      let h1 = document.createElement('h1');
      h1.innerHTML = check.title;
      // beautify h1
      h1.style.color = 'red';
      h1.style.fontSize = '30px';
      h1.style.display = 'block';
      h1.style.margin = '0 auto';
      h1.style.width = '100%';
      h1.style.textAlign = 'center';
      // append h1 to div result
      divResult.appendChild(h1);
      let a = document.createElement('a');
      // beautify a to button
      a.style.backgroundColor = '#D41C1C';
      a.style.color = '#fff';
      a.style.fontSize = '20px';
      a.style.padding = '10px';
      a.style.display = 'block';
      a.style.margin = '20px auto';
      a.style.width = '30%';
      a.style.borderRadius = '35px';
      a.style.textDecoration = 'none';
      a.style.textAlign = 'center';
      // center a
      a.style.display = 'block';
      a.innerHTML = 'Watch on notion';
      a.setAttribute('href', check.url);
      divResult.appendChild(a);
    }
  }
};
// click button when input enter key is pressed
input.onkeypress = function (event) {
  if (event.keyCode === 13) {
    button.click();
  }
};
