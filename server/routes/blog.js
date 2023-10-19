const router = require('express').Router()
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const ctrls = require('../controller/blog')
const uploader = require('../config/cloudinary.config')

router.post('/', [verifyAccessToken, isAdmin], ctrls.createNewBlog)
router.get('/', ctrls.getBlogs)
router.put('/:bid', [verifyAccessToken, isAdmin], ctrls.updateBlog)
router.put('/like/:bid', [verifyAccessToken], ctrls.likeBlog)
router.put('/dislike/:bid', [verifyAccessToken], ctrls.dislikeBlog)
router.put('/uploadimage/:bid', [verifyAccessToken, isAdmin], uploader.single('image'), ctrls.uploadImagesBlog)
router.get('/one/:bid', ctrls.getBlog)
router.delete('/:bid', [verifyAccessToken, isAdmin], ctrls.deleteBlog)



module.exports = router