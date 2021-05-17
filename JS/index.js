//Index Script
//initialise the variables
let cameras;
let $cameraList = document.querySelector("#camera-list");

//requesting the API
fetch("http://localhost:3000/api/cameras")
    .then(async (result_) => {
        const result = await result_.json();
        result.forEach((result) => {
            camera = result;
            console.log("camera", camera);
            Card();
        });
    })
    .catch((error) => {
        console.log(error);
    });

//Cameras cards

const Card = () => {
    $cameraList.innerHTML += 
    `<div id="cam-list" class="col-12 mt-1 pt-4 pb-4">
        <div class="row camera-list row-cols-1 row-cols-md-2 row-cols-lg-3 justify-content-center">
            <div class="card col-lg-12 col-md-12 col-sm-12 col-12 mt-1">
                <img src="${camera.imageUrl}" class="card-img-top" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">${camera.name}</h5>
                    <p class="card-text">${camera.description}</p>
                    <a href="html/product.html?id=${camera._id}" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>
    </div>`;
};
