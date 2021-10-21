var productId = parseInt(window.location.search.replace("?product=", ""))

const LOCAL_STORAGE_BASKET_KEY = 'rageboy.basket.list'
var basket = JSON.parse(localStorage.getItem(LOCAL_STORAGE_BASKET_KEY)) || []




function changeMainImg(changeToThis, sideImg) {
    var active = document.getElementsByClassName("active");
    while (active.length)
        active[0].classList.remove("active");

    sideImg.classList.add('active')
    const mainImg = document.getElementById('main-img')
    mainImg.src = changeToThis
}

function appendData(data) {

    document.title = "E-Commerce Project - " + data.name

    const productName = document.getElementById('product-name')
    productName.innerText = data.name

    const productPrice = document.getElementById('product-price')
    productPrice.innerText = "Price: £" + data.price


    const mainImage = document.getElementById('main-img')
    mainImage.src = data.imgs.imgOne


    //side imgs
    const sideImgOne = document.getElementById('side-img-one')
    const sideImgTwo = document.getElementById('side-img-two')
    const sideImgThree = document.getElementById('side-img-three')
    const sideImgFour = document.getElementById('side-img-four')
    const sideImgFive = document.getElementById('side-img-five')
    const sideImgSix = document.getElementById('side-img-six')
    const sideImgSeven = document.getElementById('side-img-seven')

    sideImgOne.src = data.imgs.imgOne
    sideImgTwo.src = data.imgs.imgTwo
    sideImgThree.src = data.imgs.imgThree
    sideImgFour.src = data.imgs.imgFour
    sideImgFive.src = data.imgs.imgFive
    sideImgSix.src = data.imgs.imgSix
    sideImgSeven.src = data.imgs.imgSeven

    sideImgOne.onclick = function() {
        changeMainImg(this.src, this)
    }

    sideImgTwo.onclick = function() {
        changeMainImg(this.src, this)
    }

    sideImgThree.onclick = function() {
        changeMainImg(this.src, this)
    }

    sideImgFour.onclick = function() {
        changeMainImg(this.src, this)
    }

    sideImgFive.onclick = function() {
        changeMainImg(this.src, this)
    }

    sideImgSix.onclick = function() {
        changeMainImg(this.src, this)
    }

    sideImgSeven.onclick = function() {
        changeMainImg(this.src, this)
    }
}



//related items

function relatedItemData(currentProductCatagory, data) {
    for (var i = 0; i < data.length; i++) {
        if (i%2 == 0) console.log("empty obj")
        else {

            if (data[i].catagory == currentProductCatagory && data[i].pageId != productId) {
                const contentContainerDiv = document.getElementById('related-content-wrapper')
        
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
}


fetch('itemsdb.json')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    appendData(data[productId - 2]);
    relatedItemData(data[productId - 2].catagory, data)
  })
  .catch(function (err) {
    console.log(err);
});


function saveBasket() {
    localStorage.setItem(LOCAL_STORAGE_BASKET_KEY, JSON.stringify(basket))
}


function addToCart() {
    if (!basket.includes(productId))
        basket.push(parseInt(productId))
    saveBasket()
    console.log(basket)
}