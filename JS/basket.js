//Page products
// Initialise the Variables
let products;
let productsTableInfo;
let totalPrice = 0;
let productsTotalSub = [];
let productsTotalQuant = [];
let productsTotalName = [];
let productsTotalId = [];
const $productsTableBody = document.querySelector("#products-tablebody");

// get our localstorage in json
let storage = localStorage.getItem("basket");
const tableRow = () => {
  for (let i = 0; i < products.length; i++) {
    productsTableInfo = products[i];
  }
};

// Product's table in the basket

const productsTable = (productToAdd) => {
  let myTr = document.createElement("tr");
  myTr.id = "parent-price";
  console.log("myTr", myTr);
  $productsTableBody.appendChild(myTr);

  //td name
  let myTd = document.createElement("td");
  myTd.className = "text-center";
  myTd.textContent = `${productToAdd.name}  ${productToAdd.lenses}`;
  console.log("myTd", myTd);
  myTr.appendChild(myTd);

  //td quantity
  myTd = document.createElement("td");
  myTd.className = "text-center";
  console.log("myTd2", myTd);
  myTr.appendChild(myTd);

  // creat "-" button
  let myButton = document.createElement("button");
  myButton.className = "btn mx-auto quantity-reduce";
  myButton.type = "button";
  myButton.addEventListener("click", () => {
    buttonBasketReduce(productToAdd);
    window.localStorage.setItem("basket", JSON.stringify(storage)); //update the quantity in the localstorage
  });
  myButton.textContent = "-";
  console.log("myButton", myButton);
  myTd.appendChild(myButton);

  // Quantity span
  let mySpan = document.createElement("span");
  mySpan.id = "quantity-span-" + productToAdd._id;
  mySpan.className = "quantity-product";
  mySpan.textContent = `${productToAdd.quantity}`;
  myTd.appendChild(mySpan);

  // Creat "+" button
  myButton = document.createElement("button");
  myButton.className = "btn mx-auto quantity-plus";
  myButton.type = "button";
  myButton.addEventListener("click", () => {
    buttonBasketPlus(productToAdd);
    window.localStorage.setItem("basket", JSON.stringify(storage)); //update the quantity in the localstorage
  });
  myButton.textContent = "+";
  console.log("myButton", myButton);
  myTd.appendChild(myButton);

  // td price
  myTd = document.createElement("td");
  myTd.id = "product-price-" + productToAdd._id;
  myTd.className = "text-center";
  myTd.textContent = `${productToAdd.price + " €"}`;
  console.log("myTd", myTd);
  myTr.appendChild(myTd);

  //supprimer

  xButton = document.createElement("button");
  xButton.addEventListener("click", () => {
    newProductTable = products.filter(
      (product) => product._id != productToAdd._id
    );
    storage.products = newProductTable;
    localStorage.setItem("basket", JSON.stringify(storage)); // update the basket in LS after deleting a product
    window.location.reload(); // reload the page to display the updated basket
  });

  xButton.id = "supprimer";
  xButton.textContent = "X";
  xButton.type = "button";
  myTr.appendChild(xButton);
};

// reduce product's quantity fonction

const buttonBasketReduce = (product) => {
  if (product.quantity <= 1) {
    // no negative values
    return;
  }

  const reducedQuantity = --product.quantity;
  setQuantity(product._id, reducedQuantity);
  setPrice(product._id, product.priceByItems, reducedQuantity);
  updateTotalPrice(-product.priceByItems);
};

// increase product's quantity fonction

const buttonBasketPlus = (product) => {
  const increasedQuantity = ++product.quantity;
  setQuantity(product._id, increasedQuantity);
  setPrice(product._id, product.priceByItems, increasedQuantity);
  updateTotalPrice(product.priceByItems);
};

const setQuantity = (productId, quantity) => {
  //to get the quantity of the products
  let $quantityProduct = document.querySelector("#quantity-span-" + productId);
  $quantityProduct.innerHTML = quantity;
};

const setPrice = (productId, price, quantity) => {
  //get the product prices and id to do the calculations
  const $priceTable = document.querySelector("#product-price-" + productId);
  const priceTableTotal = price * quantity;

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    if (product._id == productId) {
      product.price = price * quantity;
    }
  }
  storage.products = products;
  localStorage.setItem("basket", JSON.stringify(storage));

  $priceTable.innerHTML = priceTableTotal + " €";
};

const updateTotalPrice = (editedPrice) => {
  const subTotalNode = document.querySelector("#sub-total");
  const subTotalContent = subTotalNode.textContent;
  const productSubTotal = parseInt(subTotalContent);
  const newPrice = editedPrice + productSubTotal;
  subTotalNode.textContent = newPrice;
};

// Basket buttons (Passer la commande/Annuler la commande)
const tableFooter = () => {
  const $productsFooter = document.querySelector("#products-footer");
  $productsFooter.innerHTML += `
     <tr class="container">
          <td class="text-center">
               <a href="../index.html">
                  <button type="button" onclick="clearCommand()" id="clear-command" class="btn col-md-6 col-12 mx-auto d-none d-sm-block">Annuler la commande</button>
               </a>
          </td>
          <td class="text-center">    
               <a>
                  <button type="button" onclick="sendCommand()" id="confirm-command" class="btn col-md-6 col-12 mx-auto">Passer la commande</button>
               </a>
          </td>
          <td class="text-center">
               <p class="mt-3">Sous total : <span id="sub-total"></span>,00 €</p>
          </td>
     </tr>`;
};

// Empty basket
const tableEmpty = () => {
  $productsTableBody.innerHTML += `
     <tr id="title-table-empty" class="col-12 mx-auto">
          <td></td>
          <td class="text-center">Votre panier est vide</td>
          <td></td>
     </tr>
     `;
  localStorage.clear();
  window.onload = function () {
    if (!window.location.hash) {
      window.location = window.location + "#loaded"; //to reload the page only once to clear the command
      window.location.reload();
    }
  };
};

// Basket implémentation
const implementBasket = () => {
  const $productsCalcul = document.querySelector("#sub-total");
  products.forEach((result) => {
    productsTableInfo = result;
    totalPrice += productsTableInfo.price;
    productsTotalId.push(productsTableInfo._id);
    productsTotalSub.push(productsTableInfo.price);
    productsTotalQuant.push(productsTableInfo.quantity);
    productsTotalName.push(productsTableInfo.name);
  });
  $productsCalcul.innerHTML = totalPrice;
};

//Condition to show and use the basket
try {
  storage = JSON.parse(storage);
} catch (e) {
  console.error(e);
}

if (!storage || !storage.products) {
  storage = {
    products: [],
  };
}

if (storage.products.length <= 0) {
  //to verify if the storage exist
  tableEmpty();
} else {
  //creat product table in the basket page
  products = storage.products;
  if (
    products.length >= 1 &&
    (localStorage.order == undefined || localStorage.order)
  ) {
    tableRow();
    tableFooter(); //products table in the basket page
    implementBasket();

    products.forEach((productToAdd) => {
      productsTableInfo = productToAdd;
      console.log(productToAdd);
      productsTable(productToAdd);
    });
  } else if (products.length >= 1 && localStorage.order) {
    tableEmpty(); //show an empty basket
  }
}

//Send the command to localstorage

const sendCommand = () => {
  let order = window.localStorage.getItem("sendCommand");
  const $productsCalcul = document.querySelector("#sub-total");
  if (!order) {
    // check if there are any orders
    order = {
      products: [],
    };
  } else {
    order = JSON.parse(order);
  }
  order.products.unshift({
    //get the order infos
    name: productsTotalName,
    quantity: productsTotalQuant,
    price: productsTotalSub,
    id: productsTotalId,
  });
  if (order.products.length > 1) {
    const pos = 1;
    const n = 1;
    order.products.splice(pos, n);
  }
  window.localStorage.setItem("sendCommand", JSON.stringify(order));
  localStorage.removeItem("orderResult"); //remove old localstorage
  localStorage.removeItem("order"); //remove old localstorage
  alert(
    `Votre commande d'un total de ${$productsCalcul.textContent} € est envoyée. Merci de compléter le formulaire au dessous pour finaliser votre commande.`
  );
  document.location.reload();
};

// order cancel
const clearCommand = () => {
  localStorage.clear(); //empty the localstorage
  alert(`Commande annulée. Vous allez être redirigé vers la page d'accueil.`);
};
