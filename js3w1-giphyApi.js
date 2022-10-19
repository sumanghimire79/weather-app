const giphySearchInput = document.getElementById('giphySearchInput');
const giphySearchNumberInput = document.getElementById('giphySearchNumberInput');
const giphyButton = document.getElementById('giphyButton');


giphyButton.addEventListener('click', gifyFunction);

function gifyFunction() {
  // const key = 'af0UzJLTnqchmST0yWEzPncNHX1q6klt';
  //  api =https://api.giphy.com/v1/gifs/af0UzJLTnqchmST0yWEzPncNHX1q6klt

  const searchGifyImage = giphySearchInput.value;
  const SearchNumberInput = giphySearchNumberInput.value;
 
  fetch(`https://api.giphy.com/v1/gifs/search?api_key=af0UzJLTnqchmST0yWEzPncNHX1q6klt&q=${searchGifyImage}&limit=${SearchNumberInput}&offset=0&rating=g&lang=en`)
    .then(response => response.json())
    .then(giphyData => {
      console.log(giphyData);
     let  gifImgDisplaySection = document.getElementById('gifImgDisplay');
     gifImgDisplaySection.innerHTML= "";
      for (let i = 0; i <= giphyData.data.length; i++) {
        let url = giphyData.data[i].images.downsized_medium.url;
        let imgList = document.createElement('li');
        let imge = document.createElement('img');
        imge.src = url;
        imge.style.width = '10rem';
        imge.style.height = '10rem';
        imgList.appendChild(imge);
        gifImgDisplaySection.appendChild(imgList);


      }


    });
}

