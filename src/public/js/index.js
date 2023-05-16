const socketClient = io();

const form = document.getElementById('form');
const inputTitle = document.getElementById('title');
const inputPrice = document.getElementById('price');
const inputDescription = document.getElementById('description');
const productTable = document.getElementById('productTable');


form.onsubmit = (e) => {
    e.preventDefault();
    const title = inputTitle.value;
    const price = inputPrice.value;
    const description = inputDescription.value;

    socketClient.emit('newProduct', { title, price, description });
}


socketClient.on('arrayProducts', (array) => {
    productTable.innerHTML = '';
    array.forEach((p) => {
      const row = document.createElement('tr');
      const idCell = document.createElement('td');
      const titleCell = document.createElement('td');
      const descriptionCell = document.createElement('td');
      const priceCell = document.createElement('td');
      const deleteCell = document.createElement('td');
  
      idCell.innerText = p.id;
      titleCell.innerText = p.title;
      descriptionCell.innerText = p.description;
      priceCell.innerText = p.price;
  
      const deleteButton = document.createElement('button');
      deleteButton.innerText = 'Eliminar';
      deleteButton.addEventListener('click', () => {
        socketClient.emit('deleteProduct', p.id); 
      });
  
      deleteCell.appendChild(deleteButton);
  
      row.appendChild(idCell);
      row.appendChild(titleCell);
      row.appendChild(descriptionCell);
      row.appendChild(priceCell);
      row.appendChild(deleteCell);
  
      productTable.appendChild(row);
    });
  
    socketClient.on('deleteProduct', (id) => {
        const productRow = [...productTable.rows].find((row) => row.cells[0].innerText === String(id));
        if (productRow) {
          productRow.remove();
        }
      });
      
  });
  