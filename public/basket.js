const LOCAL_STORAGE_BASKET_KEY = 'rageboy.basket.list'

function getBasket() {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_BASKET_KEY)) || []
}

var basket = getBasket()



getBasket()


function checkIfEmptyBasket() {
    getBasket()
    if (basket.length <= 0)
        document.getElementById('no-items').style.display = 'block'
    else
        document.getElementById('no-items').style.display = 'none'
}

checkIfEmptyBasket()


function saveBasket() {
    localStorage.setItem(LOCAL_STORAGE_BASKET_KEY, JSON.stringify(basket))
}


function removeItemFromBasket(item) {
    getBasket()
    if (basket.includes(item)) {
        
        var itemIndex =  basket.indexOf(item)
        if (itemIndex != null)
            while (basket.includes(item))
                basket.splice(itemIndex, 1)
        
        saveBasket()
        checkIfEmptyBasket()
        location.reload()
    }
    else
        return
}


function appendData(data) {

    for (i=0;i < basket.length;i++) {

        if (basket[i] == 1) console.log(basket[i])


        else {
            var productData = data[basket[i] - 2]

            const contentContainerDiv = document.getElementById('content-container')
            
            const productContainerElem = document.createElement('div')
            productContainerElem.classList.add('product-container')
            productContainerElem.classList.add(productData.catagory)
            productContainerElem.id = productData.pageId



            const imgWrapperElem = document.createElement('div')
            imgWrapperElem.classList.add('img-wrapper')
        
            const productImgElem = document.createElement('img')
            productImgElem.classList.add('product-img')
            productImgElem.alt = 'failed to load image'
            productImgElem.src = productData.imgs.imgOne

            productImgElem.id = productData.pageId
            
            productImgElem.onclick = function(){
                window.location = '/product-page?product='+productImgElem.id;
            }

            const infoWrapperElem = document.createElement('div')
            infoWrapperElem.classList.add('info-wrapper')
            
            const productNameElem = document.createElement('p')
            productNameElem.classList.add('product-name')
            productNameElem.innerText = productData.name
            productNameElem.id = productData.pageId

            productNameElem.onclick = function(){
                window.location = '/product-page?product='+productNameElem.id;
            }
            
            const productPriceElem = document.createElement('p')
            productPriceElem.classList.add('product-price')
            productPriceElem.innerText = "£" + productData.price

            const functionsWrapperElem = document.createElement('div')
            functionsWrapperElem.classList.add('functions-wrapper')

            const removeFromCartBtnElem = document.createElement('button')
            removeFromCartBtnElem.classList.add('removeFromBasket')
            removeFromCartBtnElem.innerText = 'Delete'
            removeFromCartBtnElem.onclick = function() {
                var item = parseInt(productContainerElem.id)
                removeItemFromBasket(item)
                productContainerElem.remove()
            }

            const quantityWrapperElem = document.createElement('div')
            quantityWrapperElem.classList.add('quantity-wrapper')

            const quantitySelectElem = document.createElement('select')
            quantitySelectElem.id = 'quantity-select'

            for (x=1;x<10;x++) {
                //add an option 10 times
                const optionElem = document.createElement('option')
                optionElem.value = x
                optionElem.innerText = x
                quantitySelectElem.appendChild(optionElem)
            }


            //append elems
            quantityWrapperElem.appendChild(quantitySelectElem)

            functionsWrapperElem.appendChild(removeFromCartBtnElem)
            functionsWrapperElem.appendChild(quantityWrapperElem)

            infoWrapperElem.appendChild(productNameElem)
            infoWrapperElem.appendChild(productPriceElem)
            infoWrapperElem.appendChild(functionsWrapperElem)
            
            imgWrapperElem.appendChild(productImgElem)


            productContainerElem.appendChild(imgWrapperElem)
            productContainerElem.appendChild(infoWrapperElem)

            contentContainerDiv.appendChild(productContainerElem)
        }
    }
} 




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