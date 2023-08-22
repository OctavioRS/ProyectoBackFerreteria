import { transporter, mailOptions } from "../services/email.services.js";
import { isValidPassword } from "../path.js";
import { createHash } from "../path.js";
import UserDao from "../daos/mongo/user.dao.js";


const userDao = new UserDao();

export const sendMailEthereal = async(req, res)=> {
    try {
        const response = await transporter.sendMail(mailOptions);
        console.log("🚀 ~ file: changePassControllers.js:6 ~ sendMailEthereal ~ response:", response)
        
        res.json(response);
    } catch (error) {
        throw new Error(error)
    }
}




    export const updatePassController = async (req, res) => {
        const email = req.body.email; // Obtén el correo electrónico ingresado por el usuario
        const { currentPassword, newPassword, confirmNewPassword } = req.body;
        console.log("🚀 ~ file: changePassControllers.js:25 ~ updatePassController ~ req.body:", req.body)
    
        // Verifica si la nueva contraseña y la confirmación coinciden
        if (newPassword !== confirmNewPassword) {
            return res.send('La nueva contraseña y la confirmación no coinciden.');
        }
    
        try {
            // Obtiene el usuario de la base de datos usando el correo electrónico
            const user = await userDao.getByEmail(email);
            if (!user) {
                return res.status(404).send('Usuario no encontrado.');
            }
    
            // Verifica si la contraseña actual ingresada coincide con la contraseña almacenada en la base de datos
            if (!isValidPassword(currentPassword, user)) {
                return res.send('La contraseña actual ingresada es incorrecta.');
            }
    
            // Genera el hash de la nueva contraseña
            const newPasswordHash = createHash(newPassword);
    
            // Actualiza la contraseña en la base de datos
            await userDao.updatePass(user._id, newPasswordHash);
            
            res.send('Contraseña actualizada correctamente.');
        } catch (error) {
            throw new Error (error)
        }
    }

