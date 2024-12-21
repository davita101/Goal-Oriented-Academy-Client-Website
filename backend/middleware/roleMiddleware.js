export const roleMiddleware = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      const userRole = req.user.role;

      // If the user is a leader and trying to edit someone else's information
      if (userRole.includes('leader') && req.user.id !== req.params.leaderId && !allowedRoles.some(role => userRole.includes(role))) {
        return res.status(403).json({ message: "Access denied. You can only edit your own information." });
      }

      // If the user is a leader, check for restricted fields
      if (userRole.includes('leader')) {
        const LEADER_RESTRICTED_FIELDS = ['leaderLevel', 'githubCheck', 'parentRating', 'examResults', 'codewarsResult', 'projectResults', 'cards'];
        const attemptedToEdit = LEADER_RESTRICTED_FIELDS.filter(field => req.body.hasOwnProperty(field));

        if (attemptedToEdit.length > 0) {
          // Remove restricted fields from the request body
          attemptedToEdit.forEach(field => delete req.body[field]);
        }
      }

      next();
    } catch (error) {
      console.error("Role Middleware Error:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  };
};