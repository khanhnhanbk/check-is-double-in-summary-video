// get button
let searchButton = document.getElementById('searchButton');
// get input
let searchInput = document.getElementById('searchInput');
// get div result
let resultDiv = document.getElementById('resultDiv');
// button click event
searchButton.addEventListener('click', function () {
  // get value from input
  let searchValue = searchInput.value;
  // check if value is empty
  if (searchValue == '') {
    // show error message
    resultDiv.innerHTML = 'Please enter a value';
  } else {
    // show loading message
    resultDiv.innerHTML = 'Loading...';
    // get data from myData
    let data = myData.filter(function (item) {
      // check if item contains searchValue
      let title = convertVietnamese(item.title).toLowerCase();
      let searchValueTrim = convertVietnamese(searchValue).toLowerCase();
      return title.includes(searchValueTrim);
    });
    // check if data is empty
    if (data.length == 0) {
      // show error message
      resultDiv.innerHTML = 'No result found';
    } else {
      // show data
      resultDiv.innerHTML = `
      <h1>Search Result</h1>
        <ul>
            ${data
              .map(function (item) {
                return `<li>
                <a href="${item.url}">${item.title}</a>
                </li>`;
              })
              .join('')}
        </ul>  
      `;
    }
  }
});
//press enter event
searchInput.addEventListener('keypress', function (e) {
  if (e.keyCode == 13) {
    searchButton.click();
  }
});
// covert vietnamese to english
function convertVietnamese(str) {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,
    '-'
  );
  str = str.replace(/-+-/g, '-'); //thay thế 2- thành 1-
  str = str.replace(/^\-+|\-+$/g, ''); //cắt bỏ ký tự - ở đầu và cuối chuỗi
  return str;
}
