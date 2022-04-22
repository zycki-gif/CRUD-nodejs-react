const express = require('express')
const { upload, uploadImage } = require('../controllers/userController')
const router = express.Router()
//localhost: 5000 / user / upload
router.post('upload', uploadImage, upload)

module.exports = router
