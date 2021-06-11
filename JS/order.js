if (!localStorage.basket && localStorage.orderResult) {
  window.location.href = window.location.origin + "/html/order.html";
}

//Page order
// initialise the variables
const $orderForm = document.querySelector("#order-form");

//Fonction for the form of the command
const commandForm = () => {
  $orderForm.innerHTML += `
  <div class="form-container">
     <h3 class="caption-form text-center">Merci de compléter les différents champs pour finaliser votre commande</h3>
     <div class="row mt-3">
         <div class="form-group col-md-6">
           <label for="lastName">Nom</label>
           <input required type="text" class="form-control" id="lastName">
         </div>
         <div class="form-group col-md-6">
           <label for="firstName">Prénom</label>
           <input required type="text" class="form-control" id="firstName">
         </div>
     </div>
     <div class="row">
     <div class="form-group col-md-8">
         <label for="adress">Addresse</label>
         <input required type="text" class="form-control" id="adress">
     </div>
     <div class="form-group col-md-4">
             <label for="city">Ville</label>
             <input required type="text" class="form-control" id="city">
         </div>
     </div>

     <div class="form-row">
         <div class="form-group col-12">
           <label for="email">Email</label>
           <input required type="email" class="form-control" id="email">
         </div>
     </div>
     <button type="submit" id="camera-buy" class="commander btn col-sm-4 col-12 mx-auto mx-auto mt-4 mb-4">Commander</button>
     </div>
     `;
};

$orderForm.addEventListener("submit", () => { //get the user contact information from the form 
  const $lastName = document.querySelector("#lastName"); 
  const $firstName = document.querySelector("#firstName");
  const $adress = document.querySelector("#adress");
  const $city = document.querySelector("#city");
  const $email = document.querySelector("#email");

  //Condition to verify the validitition of the form fields

  if (
    $lastName.value.trim().length < 1 ||
    $firstName.value.trim().length < 1 ||
    $adress.value.trim().length < 1 ||
    $city.value.trim().length < 1
  ) {
    //trim() verify that the field is not empty
    alert(
      "Formulaire non valide ! Merci de renseigner correctement le formulaire (caractère incorrect dans l'un des champs)"
    );
    return;
  }
  //Condition to verify that the email is valide
  const email = $email.value;
  const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; //regex to validate the email format
  if (regexEmail.exec(email) == null) {
    alert("Merci de remplir un email correct"); //if the email entered not the right format
    return false;
  }

  const address = adress.value;
  const regexAddress = /^\d+\s[A-z]+\s[A-z]+/; //verify the format of postal address //15 rue de la Libération//
  if (regexAddress.exec(address) == null) {
    alert("Merci de remplir un address correct");
    return false;
  }

  let order = {
    contact: {
      //Objet contact
      firstName: $firstName.value.trim(),
      lastName: $lastName.value.trim(),
      address: $adress.value.trim(),
      city: $city.value.trim(),
      email: $email.value.trim(),
    },
    products: productsTotalId,
  };

  //Création de la requête POST
  fetch("http://localhost:3000/api/cameras/order", {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(order), //stringify the sent object
  })
    .then(async (result_) => {
      const result = await result_.json();
      window.localStorage.setItem(
        "orderResult",
        JSON.stringify(result.orderId) //stringify the sent object
      );
      window.localStorage.setItem("order", JSON.stringify(order));
      localStorage.removeItem("basket"); // remove the basket from LS if an order has been completed
      const price = document.querySelector("#sub-total").textContent;
      localStorage.setItem("price", price);
      localStorage.removeItem("sendCommand");
    })
    .catch((error) => {
      console.log(error);
    });
  alert(`Commande prise en compte. Merci de votre achat !`);
  document.location.reload(); 
});

//Condition to show and use our command
let storageCommand = localStorage.getItem("sendCommand"); //getting sendCommand in json
if (!storageCommand) {
  // verify if sendCommand exist
  //if not
  storageCommand = {
    products: [], //creat an empty table
  };
} else {
  //extract the json
  storageCommand = JSON.parse(storageCommand);
  products = storageCommand.products;
  //Condition to show the basket
  if (products.length >= 1) {
    commandForm();
    // commandFooter()
  }
}
