const User = require('../../models/User');

async function verifyToken(req, res, next) {
    const {token, username} = req.body;
    // console.log('REQ PUNTO BARI',req.body)
    const user = await User.findOne({username});
    console.log('TOKEN DB => ', user.token)
    user.token == token ? next() : res.sendStatus(404)
}

module.exports = verifyToken;
