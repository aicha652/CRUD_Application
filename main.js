let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')

//get Total

function getTotal() {
    if(price.value != ''){
        total.value = (+price.value + +taxes.value + +ads.value - +discount.value)
        total.innerHTML = total.value
        total.style.background = 'green'
    }
    else {
        total.innerHTML = ' '
        total.style.background = '#990606'
    }
}