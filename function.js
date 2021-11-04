let myData;
// get data from local json file
fetch('./backEnd/data/finallyData.json')
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

function searchByName(searchValue) {
  if (searchValue == '') {
    return 'Please enter a value';
  } else {
    let data = myData.filter(function (item) {
      // check if item contains searchValue
      let title = convertVietnamese(item.title).toLowerCase();
      let searchValueTrim = convertVietnamese(searchValue).toLowerCase();
      return title.includes(searchValueTrim);
    });
    // check if data is empty
    if (data.length == 0) {
      // show error message
      return 'No result found';
    } else {
      return `<h1>Search Result</h1>
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
}

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

function searchByUrl(searchValue) {
  let inputValue = youtube_parser(searchValue);
  if (inputValue == false) {
    alert('Please enter a valid youtube url');
  } else if (myData == null) {
    alert('Please wait for data to load');
  } else {
    // check if input value is in data
    let check = myData.find((element) => element.videoId == inputValue);

    if (check == undefined) {
      return '<h2>Video has not already been added</h2>';
    } else {
      // if video is found
      return `
      <h1>${check.title}</h1>
      <a href="${check.url}">Click here to watch</a>
      `;
    }
  }
}
