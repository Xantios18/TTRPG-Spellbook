const passPlayerToView = (req, res, next) => {
    if(req.session.player) {
        res.locals.player = req.session.player
    } else {
        res.locals.player = null
    }
    next()
}

module.exports = passPlayerToView