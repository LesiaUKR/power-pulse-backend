const { getAllExercises, getAllDetails } = require('../controllers/exercises')
const auth = require('../middlewares/auth')
const express = require('express')
const router = express.Router()

router.get('/', auth, getAllExercises)
router.get('/details', auth, getAllDetails)

module.exports = router;