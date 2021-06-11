//Product Page
//Initialise the variables
let camera;
const $cameraProduct = document.querySelector("#camera-product");
const lenses = document.createElement("select");

//URL
const params = new URL(document.location).searchParams;
const id = params.get("id");

//Call the API
fetch("http://localhost:3000/api/cameras/" + id)
  .then(async (result_) => {
    const result = await result_.json();
    camera = result;
    lenseList();
    cameraCard();
  })
  .catch((error) => {
    console.log(error);
  });

//Lenses table's fonction
const lenseList = () => {
  for (let i = 0; i < camera.lenses.length; i++) {
    const option = document.createElement("option");
    option.setAttribute("value", camera.lenses[i]);
    option.innerHTML = camera.lenses[i];
    lenses.appendChild(option);
  }
};

//Camera card template
const cameraCard = () => {
  $cameraProduct.innerHTML += `<div id="camera-product" class="card col-2 mt-3 ml-1">
        </div>
            
        <div id="camera-item" class="card mb-3 justify-content-center">
            <div class="row g-0 ">
              <div class="col-md-5">
                <img src="${camera.imageUrl}" class="card-img" alt="...">
              </div>
              <div class="col-md-7">
                <div class="card-body">
                    <h5 class="card-title">${camera.name}</h5>
                    <p class="card-text">${camera.description}</p> 
                    <div id="camera-lense"class="input-group col-12">
                        <div class="input-group-prepend col-sm-4 col-12 d-none d-sm-block">
                            <label class="input-group-text" for="inputGroupSelect01">Lentilles</label>
                        </div>
                        <select class="custom-select col-sm-4 col-12" id="inputGroupSelect01">
                            ${lenses.innerHTML}
                        </select>
                        <label class="camera-quantity-selector col-sm-4 col-12 text-center " for="camera-quantity">Quantité: 
                            <select id="quantity" onchange="addToPrice()" class="text-center mx-auto" name="camera-quantity">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                            </select>
                        </label>
                        <p id="camera-price" class="card-text col-sm-4 col-12 mx-auto mt-3"></p>
                    </div>
                    <div class="col-12 mt-3">
                        <button type="button"  onclick="addToBasket()" id="camera-buy" class="add-to-products btn col-sm-6 col-12 mx-auto">Ajouter au panier</button>
                    </div>               
                </div>
              </div>
            </div>
          </div>
        `;
  addToPrice();
};

//changing the price according to the quantity
const addToPrice = () => {
  let $cameraPrice = document.querySelector("#camera-price");
  let quantity = document.querySelector("#quantity").value;
  $cameraPrice.innerHTML = `${(camera.price * quantity) / 100},00 €`;
};

//Fonction for localStorage

const addToBasket = () => {
  const quantity = document.querySelector("#quantity").value; //get the value of the quantity selected by the user
  let storage = window.localStorage.getItem("basket"); // Create our basket storage variable
  if (!storage) {
    storage = {
      products: [],
    };
  } else {
    storage = JSON.parse(storage); // Extracting our json
  }

  const existingProduct = storage.products.find(
    (productToFind) => productToFind._id === camera._id
  );

  if (existingProduct) {
    updateExistingProductInBasket(existingProduct, camera, quantity);
  } else {
    addNewProductToBasket(
      storage.products,
      camera,
      quantity,
      inputGroupSelect01
    );
  }

  window.localStorage.setItem("basket", JSON.stringify(storage)); //creat a LS element to store the basket 
  alert( //confirmation alert of added product, mode, price to the basket
    `${quantity} appareil ${camera.name} lentille  ${inputGroupSelect01.value} ajouté à votre panier !`
  );
};

const addNewProductToBasket = (
  allProducts,
  camera,
  quantity,
  inputGroupSelect01
) => {
  allProducts.push({
    name: camera.name,
    _id: camera._id,
    lenses: inputGroupSelect01.value,
    quantity: quantity,
    price: (camera.price * quantity) / 100,
    priceByItems: camera.price / 100,
    imageUrl: camera.imageUrl,
  });
};

//fonction to add an existing product to the basket will update the quantity not creat another line
const updateExistingProductInBasket = (
  existingProduct,
  camera,
  addedQuantity
) => {
  existingProduct.quantity =
    parseInt(existingProduct.quantity) + parseInt(addedQuantity);
  existingProduct.price = (camera.price * existingProduct.quantity) / 100;
};
