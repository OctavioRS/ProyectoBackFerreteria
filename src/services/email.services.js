import { createTransport } from 'nodemailer'
import config from '../config.js';

export const transporter = createTransport({
    host: config.host,
    port: config.port_ethereal,
    auth: {
        user: config.email_ethereal,
        pass: config.password_ethereal
    }
});

export const mailOptions = {
    from: config.email_ethereal,
    to: config.email_ethereal,
    subject: 'Modificar contraseña',
    html: `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>LOGIN</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f1f1f1;
            padding: 20px;
            text-align: center;
          }
          h1 {
            color: #333;
            margin-bottom: 20px;
          }
          form {
            display: inline-block;
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }
          input[type='email'],
          input[type='password'] {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 3px;
            box-sizing: border-box;
          }
          input[type='submit'] {
            background-color: #4caf50;
            color: #fff;
            border: none;
            padding: 10px 20px;
            border-radius: 3px;
            cursor: pointer;
          }
          input[type='submit']:hover {
            background-color: #45a049;
          }
          h2 {
            color: #333;
            margin-top: 40px;
          }
          button {
            background-color: #008cba;
            color: #fff;
            border: none;
            padding: 10px 20px;
            border-radius: 3px;
            cursor: pointer;
          }
          button:hover {
            background-color: #007a9b;
          }
        </style>
      </head>
      <body>
        <h1>Presiona el boton para modificar la contraseña</h1>
    
        <a href="http://localhost:8080/views/changepass">
        <button>Cambiar contraseña</button>
      </a>
    
      </body>
    
    </html>`
};

