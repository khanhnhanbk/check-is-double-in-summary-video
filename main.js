// get button
let button = document.getElementById('search-button');
let input = document.getElementById('search');
let catagory = document.getElementById('select');
// add button funtion
const options = ['Search by part of name', 'Search by url'];
button.addEventListener('click', function () {
  let searchValue = input.value;
  let catagoryValue = catagory.value;
  if (catagoryValue == options[0]) {
    document.getElementById('results').innerHTML = searchByName(searchValue);
  } else if (catagoryValue == options[1]) {
    document.getElementById('results').innerHTML = searchByUrl(searchValue);
  }
});

// input enter
input.addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    button.click();
  }
});
