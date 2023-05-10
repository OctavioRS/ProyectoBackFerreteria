const socketClient = io()

const form = document.getElementById('form');
const inputName = document.getElementById('name');
const inputPrice = document.getElementById('price');
const products = document.getElementById('products');

form.onsubmit = (e) =>{
    e.preventDefault();
    const name = inputName.value;
    const price = inputPrice.value;
    socketClient.emit('newProduct', { name, price });
}

socketClient.on('arrayProducts', (array) =>{
    console.log(array);
    let infoProducts = '';
    array.forEach(p => {
        infoProducts += `${p.name} - ${p.price} <br>`
    });
    products.innerHTML = infoProducts;
})