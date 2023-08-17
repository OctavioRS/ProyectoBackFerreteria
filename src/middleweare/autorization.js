
export const isAdmin = (req, res, next) => {
 
 
  const userRole = req.user.role;
  
    if (userRole === 'admin') {
      return next();
    } else {
      return res.status(403).json({ message: 'Acceso no autorizado, no es admin' });
    }
  };
  
 
 export const isUser = (req, res, next) => {
    if (req.user.role === 'user') {
      return next();
    } else {
      return res.status(403).json({ message: 'Acceso no autorizado, no es user' });
    }
  };

  export const isPremiumOrAdmin = (req, res, next) => {
    const userRole = req.user.role;
   
    if (userRole === 'admin' || userRole === 'premium') {
      return next();
    } else {
      return res.status(403).json({ message: 'Acceso no autorizado.' });
    }
  };
  
  
