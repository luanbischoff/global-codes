const roleMiddleware = (requiredPermissions = []) => {
  return (req, res, next) => {
    const userPermissions = req.user.role.permissions;
    if (!userPermissions) {
      return res.status(403).json({ message: "No user permissions founded." });
    }

    if (userPermissions["fullAccess"]) {
      return next();
    }

    const hasPermission = requiredPermissions.every(
      (permission) => userPermissions[permission]
    );

    if (!hasPermission) {
      return res.status(403).json({ message: "Access denied." });
    }
    next();
  };
};

module.exports = roleMiddleware;
