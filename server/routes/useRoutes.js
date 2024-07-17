const userControl = require('../controllers/userControl');

const router = require('express').Router()


router.post('/register', userControl.register)
router.post('/login', userControl.login)
router.get('/logout',userControl.logout)
router.post('/refresh_token', userControl.refreshtoken)
router.get('/infor',auth,userControl.getUser)


module.exports = router;