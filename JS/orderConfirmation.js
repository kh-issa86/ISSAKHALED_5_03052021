const $orderSend = document.querySelector("#order-send");

const commandEmpty = () => {
  $orderSend.innerHTML += `
     <p class="text-center">Vous n'avez pas de commande en cours</p>
     `;
};

const showOrderMessage = (orderId, price) => {
  $orderSend.innerHTML += `
    <p>Votre commande d'un total de ${price} € a bien été enregistrée .</p>
    <p>Votre numéro de commande est le : ${orderId}.</p>
    <p>Merci de votre achat et à bientôt</p>
    `;
};

const order = localStorage.order;
const orderResult = localStorage.orderResult;
const price = localStorage.price;

if (order && orderResult) {
  showOrderMessage(orderResult, price);
} else {
  commandEmpty();
}
