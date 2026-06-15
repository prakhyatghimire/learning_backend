
function authorize(...allowedRoles) {
    return (req, res, next) => {
      if (!req.user) return res.sendStatus(401);
      if (!allowedRoles.includes(req.user.role)) return res.sendStatus(403);
      next();
    };
  }
  
  // Admin-only route
  app.delete('/users/:id', authMiddleware, authorize('admin'), async (req, res) => {
    await db.users.delete(req.params.id);
    res.json({ message: 'User deleted' });
  });