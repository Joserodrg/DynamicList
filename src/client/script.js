
let list = [];
let listForm = document.getElementById('listForm');

listForm.addEventListener('submit', saveItem);

//
function saveItem(event) {
    event.preventDefault();
    console.log('Formulario enviado'); 

    const itemInput = document.getElementById('inputText');
    const item = itemInput.value.trim();

    if (item !== '') {

    fetch('http://localhost:5000/items', { 
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({item}),
        })
    .then(response => response.json())
    .then(function (data) {
        if (data.success) {
            itemInput.value = '';
            loadItems();  
        }        
    });
    }
}


function listView() {
    const listElement = document.getElementById('list');
    listElement.innerHTML = ''; 

    list.forEach(function(item) {
        const li = document.createElement('li');
        li.textContent = item;
        listElement.appendChild(li);
    });
}


//
function loadItems() {
    fetch('http://localhost:5000/items')
        .then(response => response.json())
        .then(function (data) {
            list = data.map(item => item.name);
            listView();
        });
}


document.addEventListener('DOMContentLoaded', function () {
    loadItems();
});







