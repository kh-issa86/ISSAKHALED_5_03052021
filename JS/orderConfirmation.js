const $orderSend = document.querySelector("#order-send");

const commandEmpty = () => {
  // fonction in case of an empty order
  $orderSend.innerHTML += `
     <p class="text-center">Vous n'avez pas de commande en cours</p>
     `;
};

//fonction to show the the order confirmation message with total price and order id

const showOrderMessage = (orderId, price) => {
  $orderSend.innerHTML += `
    <p>Votre commande d'un total de ${price} € a bien été enregistrée .</p> 
    <p>Votre numéro de commande est le : ${orderId}.</p>
    <p>Merci de votre achat et à bientôt</p>
    `;
};

const order = localStorage.order; //getting the order from LS
const orderResult = localStorage.orderResult; //getting the order id from LS
const price = localStorage.price; //getting the total price from LS

if (order && orderResult) {
  //condition to show the command page
  showOrderMessage(orderResult, price); //show confirmation message if the order been passed
} else {
  commandEmpty(); //show the empty table message if there is no order yet
}

// order cancel
const clearCommand = () => {
  localStorage.clear(); //empty the localstorage
};
