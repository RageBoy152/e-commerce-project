'use strict';

require('dotenv').config()

const express = require('express')


const app = express()
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.json())


const paypal = require('@paypal/checkout-server-sdk')
const Environment = process.env.NODE_ENV === "production"
    ? paypal.core.LiveEnvironment
    : paypal.core.SandboxEnvironment
const paypalClient = new paypal.core.PayPalHttpClient(new Environment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET))



const fs = require('fs');
let rawdata = fs.readFileSync('itemsdb_server.json');
let data = JSON.parse(rawdata);


var productData = []

for (var i=0;i<data.length;i++) {
    if (i%2 == 0)
        console.log("")
    else {
        productData.push(data[i])
    }
}


const storeItems = new Map([
    [1 , productData[0]],
    [2 , productData[1]],
    [3 , productData[2]],
    [4 , productData[3]]
])


app.get('/', (req, res) => {
    res.render('index', {paypalClientId: process.env.PAYPAL_CLIENT_ID})
})

app.get('/product-page', (req, res) => {
    res.render('product-page', {paypalClientId: process.env.PAYPAL_CLIENT_ID})
})

app.get('/basket', (req, res) => {
    res.render('basket', {paypalClientId: process.env.PAYPAL_CLIENT_ID})
})

app.get('/contact', (req, res) => {
    res.render('contact', {paypalClientId: process.env.PAYPAL_CLIENT_ID})
})

app.get('/about', (req, res) => {
    res.render('about', {paypalClientId: process.env.PAYPAL_CLIENT_ID})
})

app.post('/create-order', async (req, res) => {
    const request = new paypal.orders.OrdersCreateRequest()
    
    const total = req.body.reduce((sum, item) => {
        return sum + storeItems.get(item.id).price * item.quantity
    }, 0)
    request.prefer("return=representation")
    request.requestBody({
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: 'GBP',
                    value: total,
                    breakdown: {
                        item_total: {
                            currency_code: 'GBP',
                            value: total
                        }
                    }
                },
                items: req.body.map(item => {
                    const storeItem = storeItems.get(item.id)
                    return {
                        name: storeItem.name,
                        unit_amount: {
                            currency_code: 'GBP',
                            value: storeItem.price
                        },
                        quantity: item.quantity
                    }
                })
            }
        ]
    })


    try {
        const order = await paypalClient.execute(request)
        res.json({ id: order.result.id })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})


app.listen(5500)