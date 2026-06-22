'use strict';
let pastries = JSON.parse(localStorage.getItem('pastries')) || [];
let editId = null;

//creating selectors
const btnNew = document.getElementById('btn-new');
const btnCancel = document.getElementById('btn-cancel');
const btnClose=document.getElementById('btn-close')
const modal = document.getElementById('modal');
const form = document.getElementById('form');
const pastryName = document.getElementById('pastry-name');
const pastryImage = document.getElementById('pastry-image');
const pastryDescription = document.getElementById('pastry-description');
const pastryPrice = document.getElementById('pastry-price');
const bodyTable = document.getElementById('body-table');
const filterInput = document.getElementById('filter');
//open al close (with cancel) modal

btnNew.addEventListener('click', function () {
  editId = null;
  modal.classList.remove('hidden');
  form.reset();
});
btnCancel.addEventListener('click', function () {
  modal.classList.add('hidden');
});

btnClose.addEventListener('click',function(){
    modal.classList.add('hidden')
} )

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
    } else {
      pastries = pastries.map((pastryElement) =>
        pastryElement.id == editId ? pastryData : pastryElement,
      );
    }
    savePastries(pastries);

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
        <td> $ ${pastryElement.price}</td>
        <td>
  <button class="btn-icon btn-edit" data-id='${pastryElement.id}' >Edit</button>
  <button class="btn-icon btn-delete"  data-id='${pastryElement.id}'>Delete</button>
        </td>
        </tr>
        `;
  });
}

//event delegation(for edit and delete)

bodyTable.addEventListener('click', function (event) {
  const idButton = Number(event.target.dataset.id);

  const classButton = event.target.classList;

  if (classButton.contains('btn-delete')) {
    const confirmDelete = confirm(
      'Are you sure you want to delete this pastry?',
    );

    if (confirmDelete) {
      pastries = pastries.filter(
        (pastryElement) => pastryElement.id !== idButton,
      );

      render(pastries);
      savePastries(pastries);
    } else {
      alert('Delete cancelled');
    }
  }

  if (classButton.contains('btn-edit')) {
    const pastryEdit = pastries.find(
      (pastryElement) => pastryElement.id === idButton,
    );
    pastryName.value = pastryEdit.name;
    pastryImage.value = pastryEdit.image;
    pastryDescription.value = pastryEdit.description;
    pastryPrice.value = pastryEdit.price;
    editId = idButton;

    modal.classList.remove('hidden');
  }
});

//search bt name with filter

filterInput.addEventListener('input', function (event) {
  const text = event.target.value.toLowerCase();

  const pastriesFiltered = pastries.filter((pastryElement) =>
    pastryElement.name.toLowerCase().includes(text),
  );

  render(pastriesFiltered);
});



//calling render function and creating local storage function
render(pastries);

function savePastries(pastries) {
  localStorage.setItem('pastries', JSON.stringify(pastries));
}
