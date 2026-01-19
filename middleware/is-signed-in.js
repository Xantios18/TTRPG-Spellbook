const isSignedIn = (req, res, next) => {
    if(req.session.player) {
        return next()
    }
    res.redirect('/')
}

module.exports = isSignedIn