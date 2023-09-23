const router = require('express').Router()
const ctrls = require('../controller/user')

router.post('/register', ctrls.register)

module.exports = router


//CRUD | Create - Read - Update - Delete | POST - GET - PUSH - DELETE