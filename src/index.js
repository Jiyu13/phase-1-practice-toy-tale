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
}


// Fetch Andy's Toys
function getAllToys() {
  return fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toysData => toysData.forEach(toy => renderOneToy(toy)))
  // .then(toysData => console.log(toysData))
}


getAllToys()