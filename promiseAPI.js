/*
let str = '{"file":"https:\/\/purr.objects-us-east-1.dream.io\/i\/060_-_tBzSqUc.gif"}';
str = str.replace(/\\/);
console.log(str);
str = str.replace(/file/g, 'url');
console.log(str);
str = JSON.parse(str);
console.log(str);
*/

//get a button and element from a page
const output = document.getElementById('output'),
  addCard = document.querySelectorAll('.add-card');


const postData = (body) => {
addCard.forEach((item) => {
  item.addEventListener('click', (event) => {
    let target = event.target,
    apiUrl;
    //check the button that was clicked
    if (!!target.dataset.cat) {
      apiUrl = `https://aws.random.cat/meow`;
    } else if (!!target.dataset.dog) {
      apiUrl = `https://random.dog/woof.json`;
    }
  //passing the string
  fetch(apiUrl, {
    method: 'GET',
    //cors for requests to other sites
    mode: 'cors',
    body: JSON.stringify(body)
  })
  .then((response) => {
    //catching an error
    if (response.status !== 200) {
      throw new Error ('status network not 200');
    }  
    return (response.text());
  })
  //replace string cat
  .then((body) => {
    apiOptimase(body);
    return body;
  }) 
  .then((body) => {
    addImg(body);
  })
  //if catch
  .catch((error) => console.error(error));
  });
});
};
postData();

const addImg = (body) => {
  //replace cat for url
  body = body.replace(/file/gi, 'url');
  //create img && video elements 
  const img = document.createElement('img'),
    video = document.createElement('video'),
    //parse to obj
    obj = JSON.parse(body);
    //attr for video && sourse for working
    video.setAttribute('autoplay', '');
    video.appendChild(document.createElement('source')).setAttribute('type', 'video/mp4');

    //check type file
    if (/.jp(e*)g|.png|.gif|webp/.test(body.toLowerCase())) {
        output.appendChild(img);
        img.setAttribute('src', `${obj.url}`);
    } else if (/.mp4|.webm/) {
      output.appendChild(video);
      video.children[0].setAttribute('src', `${obj.url}`); 
    }
};

const apiOptimase = (body) => {
body = JSON.stringify(body);
body = body.replace(/\\/gi, '');
};











/*
const output = document.getElementById('output');

const getData = (url) => {
return new Promise((resolve, reject) => {
const request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('readystatechange', () => {
    if (request.readyState !== 4) {
      return;
    }
    if (request.status === 200) {
      const response = JSON.parse(request.responseText);
      resolve(response);
    } else {
      reject(request.statusText);
    }
  });
  request.send();
});
  
};

const outputPhotos = (data) => {

  console.log(data);

  data.forEach((item) => {
  output.insertAdjacentHTML('beforebegin',
  `<h4>${item.title}</h4> 
  <img src="${item.thumbnailUrl}" alt="${item.title}">`);
  });

};

const urlPhotos = 'https://jsonplaceholder.typicode.com/photos';

const oneImg = getData(`https://jsonplaceholder.typicode.com/photos/1`),
      twoImg = getData(`https://jsonplaceholder.typicode.com/photos/2`),
      threeImg = getData(`https://jsonplaceholder.typicode.com/photos/3`);

Promise.all([oneImg, twoImg, threeImg])
  .then(outputPhotos)
  .catch(error => console.error(error));
*/