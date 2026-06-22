'use strict';
let pastries = JSON.parse(localStorage.getItem('pastries')) || [];
let editId = null;

//creating selectors
const btnNew = document.getElementById('btn-new');
const btnCancel = document.getElementById('btn-cancel');
const modal = document.getElementById('modal');
const form = document.getElementById('form');
const pastryName = document.getElementById('pastry-name');
const pastryImage = document.getElementById('pastry-image');
const pastryDescription = document.getElementById('pastry-description');
const pastryPrice = document.getElementById('pastry-price');
const bodyTable = document.getElementById('body-table');

//open al close (with cancel) modal

btnNew.addEventListener('click', function () {
  editId = null;
  modal.classList.remove('hidden');
  form.reset();
});
btnCancel.addEventListener('click', function () {
  modal.classList.add('hidden');
});

//save (new pastry or edit an existing pastry)

form.addEventListener('submit', function (event) {
  event.preventDefault();
  //validation

  if (
    !pastryName.value.trim() ||
    !pastryImage.value.trim() ||
    !pastryDescription.value.trim() ||
    !pastryPrice.value.trim()
  ) {
    alert('Please, complete all the fields before saving.');
  } else {
    const pastryData = {
      id: editId || Date.now(),
      name: pastryName.value,
      image: pastryImage.value,
      description: pastryDescription.value,
      price: pastryPrice.value,
    };

    if (!editId) {
      pastries.push(pastryData);
      savePastries(pastries);
    } else {
      pastries = pastries.map((pastryElement) =>
        pastryElement.id == editId ? pastryData : pastryElement,
      );
      savePastries(pastries);
    }

    modal.classList.add('hidden');
    render(pastries);
  }
});

function render(pastries) {
  bodyTable.innerHTML = ``;

  pastries.forEach((pastryElement) => {
    bodyTable.innerHTML += `
        <tr> 
        <td> ${pastryElement.name}</td>
        <td> <img  src="${pastryElement.image} " alt="Pastry image">  </td>
        <td> ${pastryElement.description}</td>
        <td> ${pastryElement.price}</td>
        <td>
  <button class="btn-icon btn-edit">Edit</button>
  <button class="btn-icon btn-delete">Delete</button>
        </td>
        </tr>
        `;
  });
}

//calling render function and creating local storage function
render(pastries);

function savePastries(pastries) {
  localStorage.setItem('pastries', JSON.stringify(pastries));
}
