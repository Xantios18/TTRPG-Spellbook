const passPlayerToView = (req, res, next) => {
    if(res.locals.player = req.session.player) {
        return req.session.player
    } else {
        return null
    }
    next()
}

module.exports = passPlayerToView