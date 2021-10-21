const LOCAL_STORAGE_BASKET_KEY_FOR_PAYMENT = 'rageboy.basket.list'

var basket = JSON.parse(localStorage.getItem(LOCAL_STORAGE_BASKET_KEY_FOR_PAYMENT)) || []


var itemsToBuy = []

function readData(data) {
  for (i=0;i < basket.length;i++) {
    var productData = data[basket[i] - 2]

    itemsToBuy.push({ id: productData.mapId, quantity: 1 })
  }
}


fetch('itemsdb.json')
.then(function (response) {
    return response.json();
})
.then(function (data) {
    readData(data);
})
.catch(function (err) {
    console.log(err);
});


paypal.Buttons({

    // Sets up the transaction when a payment button is clicked
    createOrder: function() {
      return fetch('/create-order', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        //order
        body: JSON.stringify(itemsToBuy)

      }).then(res => {
        if (res.ok) return res.json()
        return res.json().then(json => Promise.reject(json))
      }).then(({ id }) => {
        return id
      }).catch(e => {
        console.error(e.error)
      })
    },

    // Finalize the transaction after payer approval
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(orderData) {
        // Successful capture! For dev/demo purposes:
            console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
            var transaction = orderData.purchase_units[0].payments.captures[0];
            alert('Transaction '+ transaction.status + ': ' + transaction.id + '\n\nSee console for all available details');

        // When ready to go live, remove the alert and show a success message within this page. For example:
        // var element = document.getElementById('paypal-button-container');
        // element.innerHTML = '';
        // element.innerHTML = '<h3>Thank you for your payment!</h3>';
        // Or go to another URL:  actions.redirect('thank_you.html');
      });
    }
  }).render('#paypal');
