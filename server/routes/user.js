const router = require('express').Router()
const ctrls = require('../controller/user')
const { verifyAccessToken } = require('../middlewares/verifyToken')

router.post('/register', ctrls.register)
router.post('/login', ctrls.login)
router.get('/current', verifyAccessToken, ctrls.getCurrent)
router.post('/refreshtoken', ctrls.refreshAccessToken)
router.get('/logout', ctrls.logout)
router.get('/forgotpassword', ctrls.forgotPassword)
router.put('/resetpassword', ctrls.resetPassword)


module.exports = router


//CRUD | Create - Read - Update - Delete | POST - GET - PUSH - DELETE
//CREATE (POST) + PUT - body
//GET + DELETE - query //