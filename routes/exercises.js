const { getAllExercises, getAllBodyParts, getAllEquipments, getAllMuscles } = require('../controllers/exercises')
const auth = require('../middlewares/auth')
const express = require('express')
const router = express.Router()

router.get('/', auth, getAllExercises)
router.get('/bodyParts', auth, getAllBodyParts)
router.get('/equipment', auth, getAllEquipments)
router.get('/muscles', auth, getAllMuscles)

module.exports = router;