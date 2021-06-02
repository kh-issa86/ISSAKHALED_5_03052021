//Page order
// initialise the variables
const $orderForm = document.querySelector('#order-form');

//Fonction for an emty order
const commandEmpty = () => {
     $orderForm.innerHTML += (`
     <p class="text-center">Vous n'avez pas de commande en cours</p>
     `)
}


//Fonction for the form of the command
const commandForm = () => {
     $orderForm.innerHTML += (`
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
     <div class="form-group">
         <label for="adress">Addresse</label>
         <input required type="text" class="form-control" id="adress">
     </div>
     <div class="form-group">
         <label for="inputComplement">Complément</label>
         <input type="text" class="form-control" id="inputComplement" placeholder="Appartement, étages...">
     </div>
     <div class="row">
         <div class="form-group col-md-5">
             <label for="city">Ville</label>
             <input required type="text" class="form-control" id="city">
         </div>
         <div class="form-group col-md-4">
             <label for="inputState">Région</label>
             <input required type="text" class="form-control" id="inputState">
         </div>
         <div class="form-group col-md-3">
                 <label for="inputZip">Code postal</label>
                 <input required type="text" class="form-control" id="inputZip">
         </div>
     </div>
     <div class="form-row">
         <div class="form-group col-12">
           <label for="email">Email</label>
           <input required type="email" class="form-control" id="email">
         </div>
     </div>
     <button type="submit" id="camera-buy" class="btn col-sm-4 col-12 mx-auto mx-auto mt-4 mb-4">Commander</button>
     `)
}

$orderForm.addEventListener('submit', () => {  
     
     const $lastName = document.querySelector('#lastName');
     const $firstName = document.querySelector('#firstName');
     const $adress = document.querySelector('#adress');
     const $city = document.querySelector('#city');
     const $email = document.querySelector('#email');

     //Condition to verify the validitition of the form fields
     
     if($lastName.value.trim().length < 1 || $firstName.value.trim().length < 1 || $adress.value.trim().length < 1 || $city.value.trim().length < 1){ //trim() verify that the field is not empty
          alert('Formulaire non valide ! Merci de renseigner correctement le formulaire (caractère incorrect dans l\'un des champs)')
          return;
     }
     //Condition to verify that the email is valide
     const email = $email.value;
     const regexEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/ //regex to validate the email format
     if (regexEmail.exec(email) == null) 
     {
          alert("Merci de remplir un email correct");
          return false;
     }

     let order = {
          contact: { //Objet contact
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
          method: 'POST', 
          headers: new Headers({
               "Content-Type": "application/json"
          }),
          body: JSON.stringify(order), //stringify the sent object
     })
          .then(async result_ => {
               const result = await result_.json() 
               window.localStorage.setItem("orderResult", JSON.stringify(result.orderId)) 
               window.localStorage.setItem("order", JSON.stringify(order)) 
          })
          .catch(error => {
               console.log(error);
          })
     alert(`Commande prise en compte. Merci de votre achat !`)
})

//Fonction when the comand is passed
const orderSend = () => {
     const $tableEmpty = document.querySelector('#table-empty')
     const $orderSend = document.querySelector('#order-send')
     $tableEmpty.classList.add("hide") //add the classe "hide" if the commande is passed
     $orderForm.classList.add("hide")
     $orderSend.innerHTML += (`
     <p>Votre commande a bien été enregistrée.</p>
     <p>Votre numéro de commande est le : ${localStorage.orderResult}.</p>
     <p>Merci de votre achat et à bientôt</p>
     `)
}

if (localStorage.order) {
     orderSend()
     localStorage.removeItem("basket")
     localStorage.removeItem("sendCommand")
}

//Condition to show and use our command
let storageCommand = localStorage.getItem("sendCommand"); //getting storageCommand in json
if (!storageCommand) { // verify if storageCommand exist
     //if not
     storageCommand = {
          products: [], //creat an empty table
     }
     if (storageCommand.products.length <= 0 && localStorage.order == undefined || localStorage.order <= 0) { 
          commandEmpty()
     }
} else {
     //if yes
     //extract the json 
     storageCommand = JSON.parse(storageCommand)
     products = storageCommand.products
     //Condition to show the basket
     if (products.length >= 1) {
          commandForm()
          commandFooter()
     }
}

