//Product Page
//Initialise the variables
let camera;
const $cameraProduct = document.querySelector('#camera-product')
const lenses = document.createElement("select");

//URL
const params = (new URL(document.location)).searchParams;
const id = params.get('id'); 

//Call the API
fetch("http://localhost:3000/api/cameras/" + id) 
    .then(async result_ => {  
        const result = await result_.json() 
        camera = result 
        lenseList()
        cameraCard()   
    })
    .catch((error) => {
        console.log(error);
    })

//Lenses table's fonction
const lenseList = () => {
    for (let i = 0; i < camera.lenses.length; i++) {
        const option = document.createElement("option")
        option.setAttribute("value", camera.lenses[i])             
        option.innerHTML = camera.lenses[i]
        lenses.appendChild(option)
    }
}

//Camera card template
const cameraCard = () => {
    $cameraProduct.innerHTML +=
        (`
        <div id="camera-item" class="card col-10 mx-auto mt-5 mb-5">
        <img src="${camera.imageUrl}" class="card-img-top" alt="..." />
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
                    <select id="quantity" onclick="addToPrice()" class="text-center mx-auto" name="camera-quantity">
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
    </div>`)
    addToPrice()
}

//changing the price according to the quantity
const addToPrice = () => {
    let $cameraPrice = document.querySelector('#camera-price')
    let quantity = document.querySelector('#quantity').value
    $cameraPrice.innerHTML = (`${camera.price * quantity} €`)
}

