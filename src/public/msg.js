const socketClient = io();

const form = document.getElementById('formMsg');
const inputUser = document.getElementById('user');
const inputMensaje = document.getElementById('mensaje');



form.onsubmit = (e) => {
    e.preventDefault();
    const user = inputUser.value;
    const mensaje = inputMensaje.value;
    

    socketClient.emit('newMensaje', { user, mensaje });
}


socketClient.on('arrayMensajes', (array) => {
    productTable.innerHTML = '';
    array.forEach((p) => {
      const row = document.createElement('tr');
      const userCell = document.createElement('td');
      const mensajeCell = document.createElement('td');
     
  
      userCell.innerText = p.user;
      mensajeCell.innerText = p.mensaje;
      
  
      
  
      row.appendChild(userCell);
      row.appendChild(mensajeCell);
 
  
      msgTable.appendChild(row);
    });
})
    