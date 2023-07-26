
export const isAdmin = (req, res, next) => {
    if (req.user.role === 'admin') {
      return next();
    } else {
      return res.status(403).json({ message: 'Acceso no autorizado.' });
    }
  };
  
 
 export const isUser = (req, res, next) => {
    if (req.user.role === 'user') {
      return next();
    } else {
      return res.status(403).json({ message: 'Acceso no autorizado.' });
    }
  };
