//display data from itemsdb.json to screen
function appendData(data) {
  i = 0

  for (var i; i < data.length; i++) {
      if (i%2 == 0) console.log("empty obj")
      else {
        const contentContainerDiv = document.getElementById('content-container')

        const productContainerElem = document.createElement('div')
        productContainerElem.classList.add('product-container')
        productContainerElem.classList.add(data[i].catagory)
        productContainerElem.id = data[i].pageId

        productContainerElem.onclick = function(){
          window.location = '/product-page?product='+productContainerElem.id;
        }
    
        const productImgElem = document.createElement('img')
        productImgElem.classList.add('thumbnail')
        productImgElem.alt = 'failed to load image'
        productImgElem.src = data[i].imgs.imgOne
      
        const productNameElem = document.createElement('p')
        productNameElem.classList.add('product-name')
        productNameElem.innerText = data[i].name
      
        const productPriceElem = document.createElement('p')
        productPriceElem.classList.add('product-price')
        productPriceElem.innerText = "£" + data[i].price
      
      
        //append elems
        productContainerElem.appendChild(productImgElem)
        productContainerElem.appendChild(productNameElem)
        productContainerElem.appendChild(productPriceElem)
        
        contentContainerDiv.appendChild(productContainerElem)
      }

  }
}


//get items data from itemsdb.json
fetch('itemsdb.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    appendData(data);
  })
  .catch(function (err) {
    console.log(err);
});