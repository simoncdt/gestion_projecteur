const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
      if (!req.user || !req.user.role) {
        return res.status(403).json({ message: 'Accès interdit, rôle manquant.' });
      }
  
      if (req.user.role !== requiredRole) {
        return res.status(403).json({ message: 'Accès refusé, rôle insuffisant.' });
      }
  
      next();
    };
  };
  
  module.exports = roleMiddleware;
  