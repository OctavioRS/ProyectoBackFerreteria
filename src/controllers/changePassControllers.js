import { transporter, mailOptions } from "../services/email.services.js";
import { isValidPassword } from "../path.js";
import { createHash } from "../path.js";
import UserDao from "../daos/mongo/user.dao.js";


const userDao = new UserDao();

export const sendMailEthereal = async (req, res) => {
    try {
        const response = await transporter.sendMail(mailOptions);
        console.log("🚀 ~ file: changePassControllers.js:6 ~ sendMailEthereal ~ response:", response)

        res.json(response);
    } catch (error) {
        throw new Error(error)
    }
}


export const updatePassController = async (req, res) => {
    const email = req.body.email; 
    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    if (newPassword !== confirmNewPassword) {
        return res.send('La nueva contraseña y la confirmación no coinciden.');
    }

    try {
       
        const user = await userDao.getByEmail(email);
        if (!user) {
            return res.status(404).send('Usuario no encontrado.');
        }

        if (!isValidPassword(currentPassword, user)) {
            return res.send('La contraseña actual ingresada es incorrecta.');
        }

        const newPasswordHash = createHash(newPassword);

        await userDao.updatePass(user._id, newPasswordHash);

        res.send('Contraseña actualizada correctamente.');
    } catch (error) {
        throw new Error(error)
    }
}

