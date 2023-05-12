const socketClient = io()
const form = document.getElementById('form');
const inputName = document.getElementById('name');
const inputPrice = document.getElementById('price');
const inputDescription = document.getElementById('description');
const inputId = document.getElementById('id')
const productTable = document.getElementById('productTable')

form.onsubmit = (e) => {
    e.preventDefault();
    const name = inputName.value;
    const price = inputPrice.value;
    const description = inputDescription.value;

    socketClient.emit('newProduct', { name, price, description });
}

socketClient.on('arrayProducts', (array) => {
    productTable.innerHTML = '';
    array.forEach(p => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const descriptionCell = document.createElement('td');
        const priceCell = document.createElement('td');


        nameCell.innerText = p.name;
        descriptionCell.innerText = p.description;
        priceCell.innerText = p.price;


        row.appendChild(nameCell);
        row.appendChild(descriptionCell);
        row.appendChild(priceCell);

        productTable.appendChild(row);
    });


    socketClient.on('deleteProduct', (id) => {
        const productElement = document.getElementById(id);
        if (productElement) {
            productElement.remove();
        }
    });
});
