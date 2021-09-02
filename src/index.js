
//Add Event Listener to form
document.querySelector('#animal-form').addEventListener('submit', createRenderPost);

//Override the default behavior of form 
//Create animalObj based on the input in the form
//Call renderEachAnimal and pass in the animalObject as argument 
//Call postNewAnimalObj and pass in the animalIbject as argument
function createRenderPost (e){
    e.preventDefault();
    const animalObj = {
        name: e.target.name.value,
        imageUrl: e.target.image_url.value,
        description: e.target.description.value,
        donations: 0
    };
    renderEachAnimal(animalObj);
    postNewAnimalObj(animalObj);
}

//DOM Render Functions
function renderEachAnimal(animal){
    //Build Animal Card (format of displaying each object in animalData)
    let card = document.createElement('li');
    card.className = 'card';
    card.innerHTML = `
        <div class="image-frame">
            <img src="${animal.imageUrl}">
        </div>
        <div class="content">
            <h4>${animal.name}</h4>
            <p>${animal.description}</p>
            <p>
                $<span class="donation-count">${animal.donations}</span> Donated
            </p>
        </div>
        <div>
            <button id='donate'> Donate $10 </button>
            <button id='set_free'> Set Free </button>
        </div>
    `;

    //add event listener on Donate $10 button
    //add $10 to donation count per click 
    card.querySelector('#donate').addEventListener('click', () => {
        animal.donations += 10;
        card.querySelector('span').textContent=animal.donations;
        updateDonation(animal);
    })

    //add event listener on Set Free button
    //delete the card when the button is clicked
    //call deleteAnimal function and pass in animal.id as argument
    card.querySelector('#set_free').addEventListener('click', () =>{
        card.remove();
        deleteAnimal(animal.id);
    })

    //Add Animal Card to DOM
    document.querySelector('#animal-list').appendChild(card);
}


//Fetch Requests
//Get Fetch for animalData in db.json on json-server 
function getAllAnimals(){
    fetch('http://localhost:3000/animalData')
    .then(res => res.json())
    .then(animalData => animalData.forEach(animal => renderEachAnimal(animal)))
}

//Post Fetch to animalData in db.json on json-server 
function postNewAnimalObj(animalObj){
    fetch('http://localhost:3000/animalData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(animalObj)
    })
    .then(res => res.json())
    .then(animal => console.log(animal))
}

//Patch Fetch to animalData in db.json on json-server 
function updateDonation(animalObj){
    fetch(`http://localhost:3000/animalData/${animalObj.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(animalObj)
    })
    .then(res => res.json())
    .then(animalObj => console.log(animalObj))
}

//Delete Fetch to animalData in db.json on json-server
function deleteAnimal(id){
    fetch(`http://localhost:3000/animalData/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(animal => console.log(animal))
}

//Initialize Render (when DOM is loaded)
document.addEventListener('DOMContentLoaded', getAllAnimals);

