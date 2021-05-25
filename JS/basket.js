//Page products
// Initialise the Variables
let products;
let productsTableInfo;
let totalPrice = 0;
let productsTotalSub = []; 
let productsTotalQuant = [];
let productsTotalName = [];
let productsTotalId = [];
const $productsTableBody = document.querySelector('#products-tablebody');

// get our localstorage in json
let storage = localStorage.getItem("orinocoCamera");
const tableRow = () => {
     for (let i = 0; i < products.length; i++) {
          productsTableInfo = products[i] 
     }
}

// Product's table in the basket

const productsTable = () => {
     let myTr = document.createElement('tr')
     myTr.id = 'parent-price'
     console.log("myTr", myTr)
     $productsTableBody.appendChild(myTr)

     //td name
     let myTd = document.createElement('td')
     myTd.className = 'text-center'
     myTd.textContent = (`${productsTableInfo.name}  ${productsTableInfo.lenses}`)
     console.log("myTd", myTd)
     myTr.appendChild(myTd)

     //td quantity
     myTd = document.createElement('td')
     myTd.className = 'text-center'
     console.log("myTd2", myTd)
     myTr.appendChild(myTd)

     
     // creat "-" button
     let myButton = document.createElement('button')
     myButton.className = 'btn mx-auto quantity-reduce'
     myButton.type = 'button'
     myButton.setAttribute('onclick', 'buttonBasketReduce()')
     myButton.textContent = '-'
     console.log("myButton", myButton)
     myTd.appendChild(myButton)

     // Quantity span
     let mySpan = document.createElement('span')
     mySpan.className = 'quantity-product'
     mySpan.textContent = (`${productsTableInfo.quantity}`)
     myTd.appendChild(mySpan)


     // Creat "+" button 
     myButton = document.createElement('button')
     myButton.className = 'btn mx-auto quantity-plus'
     myButton.type = 'button'
     myButton.setAttribute('onclick', 'buttonBasketPlus()')
     myButton.textContent = '+'
     console.log("myButton", myButton)
     myTd.appendChild(myButton)

     // td price
     myTd = document.createElement('td')
     myTd.id = 'price-table'
     myTd.className = 'text-center'
     myTd.textContent = (`${productsTableInfo.price + ' €'}`)
     console.log("myTd", myTd)
     myTr.appendChild(myTd)

}



const buttonBasketReduce = () => {
     let $quantityProduct = document.querySelector('.quantity-product')
     $quantityProduct.innerHTML = --productsTableInfo.quantity 
     const $priceTable = document.querySelector('#price-table')
     const priceTableTotal = productsTableInfo.priceByItems * productsTableInfo.quantity
     $priceTable.innerHTML = priceTableTotal 
     
}
const buttonBasketPlus = () => {
     let $quantityProduct = document.querySelector('.quantity-product')
     $quantityProduct.innerHTML = ++productsTableInfo.quantity 
     const $priceTable = document.querySelector('#price-table')
     const priceTableTotal = productsTableInfo.priceByItems * productsTableInfo.quantity
     $priceTable.innerHTML = priceTableTotal    
     
}



// Basket buttons (Passer la commande/Annuler la commande)
const tableFooter = () => {
     const $productsFooter = document.querySelector('#products-footer')
     $productsFooter.innerHTML += (`
     <tr class="container">
          <td class="text-center">
               <a href="../index.html">
                    <button type="button" onclick="clearCommand()" id="clear-command" class="btn col-md-6 col-12 mx-auto d-none d-sm-block">Annuler la commande</button>
               </a>
          </td>
          <td class="text-center">    
               <a href="order.html">
                    <button type="button" onclick="sendCommand()" id="confirm-command" class="btn col-md-6 col-12 mx-auto">Passer la commande</button>
               </a>
          </td>
          <td class="text-center">
               <p class="mt-3">Sous total : <span id="sub-total"></span>€</p>
          </td>
     </tr>`)
}

// Empty basket
const tableEmpty = () => {
     $productsTableBody.innerHTML += (`
     <tr id="title-table-empty" class="col-12 mx-auto">
          <td></td>
          <td class="text-center">Votre panier est vide</td>
          <td></td>
     </tr>
     `)
}

// Basket implémentation
const implementBasket = () => {
     const $productsCalcul = document.querySelector('#sub-total')
     products.forEach((result) => {
          productsTableInfo = result;
          totalPrice += productsTableInfo.price; 
          productsTotalId.push(productsTableInfo._id) 
          productsTotalSub.push(productsTableInfo.price)
          productsTotalQuant.push(productsTableInfo.quantity)
          productsTotalName.push(productsTableInfo.name)
     });
     $productsCalcul.innerHTML = totalPrice 
}


//Condition to show and use the basket

if (!storage) { //to verify if the storage exist
     storage = {
          products: [],
     }
     if (storage.products.length <= 0 || localStorage.order) {
          tableEmpty()
     }
} else {
     
     storage = JSON.parse(storage)
     products = storage.products 
     if (products.length >= 1 && (localStorage.order == undefined || localStorage.order)) {
          tableRow()
          tableFooter()
          implementBasket()
          products.forEach((result) => { 
               productsTableInfo = result
               productsTable()
          });
     } else if (products.length >= 1 && localStorage.order) { 
          tableEmpty()
     }
}



// order cancel
const clearCommand = () => {
     localStorage.clear() //empty the localstorage
     alert(`Commande annulée. Vous allez être redirigé vers la page d'accueil.`)
}





