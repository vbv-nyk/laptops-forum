const checkAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
        return res.send("User not logged in");
    }
    next();
}

module.exports = checkAuth;

