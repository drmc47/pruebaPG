const User = require('../../models/User');

async function verifyAdmin(req, res, next) {
    const {token} = req.body;
    // console.log('REQ PUNTO BARI',req.body)
    const user = await User.findOne({token});
    const found = user.roles.find(e => e == '613bd8b725b8702ce89f7474')


    // console.log('TOKEN DB => ', user.token)
    found ? next() : res.sendStatus(401)
}

module.exports = verifyAdmin;
