let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')

let tmp

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

//Create Product
let dataPro
if(localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
}
else{
    dataPro = []
}

submit.onclick = () => {
    let newPro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value
    }
    if(submit.innerHTML === 'create') {
        if(newPro.count > 1) {
            for(let i = 0; i < newPro.count; i++) {
                dataPro.push(newPro)
            }
        }
        else {
            dataPro.push(newPro)
        }
    }
    else {
        dataPro[tmp] = newPro
        submit.innerHTML = 'create'
        count.style.display = 'block'
    }
    //save localstorage
    localStorage.setItem('product', JSON.stringify(dataPro))

    clearData()
    readData()
}


//clear inputs

function clearData() {
    title.value = ' '
    price.value = ' '
    taxes.value = ' '
    ads.value = ' '
    discount.value = ' '
    total.innerHTML = ' '
    count.value = ' '
    category.value = ' '
}


//read Data

let readData = () => {
    getTotal()
    let table = ' '
    for(let i = 0; i < dataPro.length; i++) {
        table = table + `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].count}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>
        ` 
    }
    document.getElementById('tbody').innerHTML = table

    let deleteAll = document.getElementById('deleteAll')

    if(dataPro.length > 0) {
        deleteAll.innerHTML = `<button onclick="deleteAll()">Delete All(${dataPro.length})</button>`
        deleteAll.style.margin = '20px 0'
    }
    else {
        deleteAll.innerHTML = ''
    }
}
readData()

//delete product

function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro)
    readData()
}

//delete All
function deleteAll() {
    localStorage.clear()
    dataPro.splice(0)
    readData()
}


//update
function updateData(i){
    title.value = dataPro[i].title
    price.value = dataPro[i].price
    taxes.value = dataPro[i].taxes
    ads.value = dataPro[i].ads
    discount.value = dataPro[i].discount
    getTotal()
    count.style.display = 'none'
    category.value = dataPro[i].category
    submit.innerHTML ='Update'
    tmp = i
    scroll({
        top: 0,
        behavior: 'smooth'
    })
}