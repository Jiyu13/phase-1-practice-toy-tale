let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


function renderOneToy(obj) {

  const cardTag = document.createElement("div");
  cardTag.className = "card"

  const toyNameTag = document.createElement("h2");
  toyNameTag.innerHTML = obj.name;

  const toyImgTag = document.createElement("img")
  toyImgTag.src = obj.image;
  toyImgTag.className = "toy-avatar";

  const toyLikeCount = document.createElement("p");
  toyLikeCount.innerHTML = `${obj.likes} likes`

  const toyLikeBtn = document.createElement("button")
  toyLikeBtn.className = "like-btn";
  toyLikeBtn.innerHTML = "Like ❤️"

  cardTag.appendChild(toyNameTag)
  cardTag.appendChild(toyImgTag)
  cardTag.appendChild(toyLikeCount)
  cardTag.appendChild(toyLikeBtn)

  // Add toy card to DOM
  const toyCollection = document.querySelector("#toy-collection");
  toyCollection.appendChild(cardTag)


  // Select like button and add event listener to it:
  const selectLikeBtn = cardTag.querySelector(".like-btn")
  selectLikeBtn.addEventListener("click", () => {
    obj.likes += 1;
    cardTag.querySelector("p").textContent = obj.likes;
    toyLikeCount.innerHTML = `${obj.likes} likes`
    updateLikes(obj);
  })
}


// Fetch Andy's Toys
function getAllToys() {
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  // .then(toyData => console.log(toyData))
  .then(toysData => toysData.forEach(toy => renderOneToy(toy)))
}

getAllToys()


// Update likes number
function updateLikes(toyObj) {
  fetch(`http://localhost:3000/toys/${toyObj.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": toyObj.likes
    })
  })
  .then(response => response.json())
  .then(toyData => console.log(toyData))
}


// create event listener to "create toy" button
const createToyForm = document.querySelector(".container")
let toyCollection = document.querySelector(".toy-collection")

createToyForm.addEventListener("submit", event => {
  event.preventDefault();
  postNewToy(event.target) 

})

function postNewToy(toyInfo) {
  const name = toyInfo.name.value
  const image = toyInfo.image.value
 
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": name,
      "image": image,
      "likes": 0,
    })
  })
  .then(response => response.json)
  .then((toyData) => {
    let newToy = renderOneToy(toyData);
    toyCollection.append(newToy)

  })
}



