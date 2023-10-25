const express = require('express');
const ctrl = require('../controllers/diary');
const router = express.Router();
const { schemas: { diaryProductJoiSchema, delProductSchema } } = require("../models/diaryProduct")
const { schemas: { diaryExerciseJoiSchema, delExerciseSchema } } = require("../models/diaryExercise")
const validateBody = require('../middlewares/validateBody');
const auth = require('../middlewares/auth');

router.post('/addproduct', auth, validateBody(diaryProductJoiSchema) ,ctrl.addProduct);

router.post('/addexercise', auth, validateBody(diaryExerciseJoiSchema), ctrl.addExercise);

router.delete('/deleteproduct', auth, validateBody(delProductSchema), ctrl.deleteProduct);

router.delete('/deleteexercise', auth, validateBody(delExerciseSchema) ,ctrl.deleteExercise);

// router.get('/', auth, ctrl.getDiary);

module.exports = router;