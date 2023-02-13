const checkLoggedIn = (req, res, next) => {
    if (req.session.loggedIn)
        return res.redirect("/");
    next();
}

module.exports = checkLoggedIn;