function isAuthenticated(req, res, next) {
    const user = auth.currentUser; // Get the current user from Firebase Authentication
  
    if (user) {
      req.user = user; // Attach the user object to the request for further use in the route handlers
      next(); // User is authenticated, proceed to the next middleware or route handler
    } else {
      res.status(401).send("Unauthorized"); // User is not authenticated, send 401 Unauthorized status
    }
  }
  
  module.exports={isAuthenticated}