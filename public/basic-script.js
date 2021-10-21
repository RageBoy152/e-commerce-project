function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}


if (window.location.search.includes("?catagory=")) {
  delay(40).then(() => {
    displayCatagory(window.location.search.replace("?catagory=", "").replace("%20", " ").replace("%20", " "))
  });
}
else {
  displayCatagory('clear-all')
}
  


function search() {
  if (location.pathname != "/")
    location.replace("/")
    
  else {
    const searchInput = document.getElementById('search-input')
    var input = searchInput.value.toUpperCase()
    const productContainers = document.getElementsByClassName('product-container')
  
    for (i=0; i< productContainers.length; i++) {
      productName = productContainers[i].getElementsByClassName('product-name')[0]
      productContainer = productName.parentNode
      txtValue = productName.textContent || name.innerText
  
      if (txtValue.toUpperCase().indexOf(input) > -1) {
        productContainer.style.display = ""
      } else {
        productContainer.style.display = "none"
      }
    }
  }
}
  
  function clearSearch() {
    const searchInput = document.getElementById('search-input')
    searchInput.value = ""
  
    search()
  }
  
  //dropdown menu handling
  function displayDropDown() {
    const dropDownMenu = document.getElementById('drop-down-menu')
  
    if (dropDownMenu.style.opacity == 1) {
      dropDownMenu.style.opacity = 0
      dropDownMenu.style.pointerEvents = "none"
    }
    else {
      dropDownMenu.style.opacity = 1
      dropDownMenu.style.pointerEvents = "auto"
    }
  }
  
  
  //is catagory active vars
  foodClicked = 1
  techClicked = 1
  audioClicked = 1
  
  function displayCatagory(catagory) {
    const techCatagoryProducts = document.getElementsByClassName("tech")
    const foodCatagoryProducts = document.getElementsByClassName("food")
    const audioCatagoryProducts = document.getElementsByClassName("audio")
  
    if (catagory == "clear-all") {

      if (window.location.search.includes("?catagory=")) {
        window.location.search = ""
      }

      //set display block for all items
      const allProducts = document.getElementsByClassName('product-container')

      const catagoryText = document.getElementById('catagory-text')
      catagoryText.style.display = "none"

      for (i=0;i < allProducts.length; i++) {
        product = allProducts[i]
  
        product.style.display = "block"
      }
  
      search()
    }
  
    else {
  
      //if not on home page redirect user to it
  
      if (window.location.pathname != "/") {
        window.location = '/?catagory='+catagory
      }



      const catagoryText = document.getElementById('catagory-text')

      if (catagory == null || catagory == "") {
        catagoryText.style.display = "none"
      }
      else {
        catagoryText.style.display = "block"
        catagoryText.innerText = catagory
      }

      for (i=0;i < techCatagoryProducts.length; i++) {
        product = techCatagoryProducts[i]
  
        if (catagory != "Technolgy and Computers")
          product.style.display = "none"
        else
          product.style.display = "block"
      }
  
  
  
      for (i=0;i < foodCatagoryProducts.length; i++) {
        product = foodCatagoryProducts[i]
  
        if (catagory != "Food and Groceries")
          product.style.display = "none"
        else
          product.style.display = "block"
      }
  
  
  
      for (i=0;i < audioCatagoryProducts.length; i++) {
        product = audioCatagoryProducts[i]
  
        if (catagory != "Audio and DJ")
          product.style.display = "none"
        else
          product.style.display = "block"
      }
    }
  }