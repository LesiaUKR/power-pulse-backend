const express = require('express');
const ctrl = require('../controllers/diary');
const router = express.Router();
const { schemas } = require('../models/diary');
const validate  = require('../middlewares/validate');
const auth  = require('../middlewares/auth');

router.post('/addproduct',auth,validate(schemas.productSchema),ctrl.addProduct);

router.post('/addexercise',auth,validate(schemas.exerciseSchema),ctrl.addExercise);

router.delete('/deleteproduct',auth,ctrl.deleteProduct);

router.delete('/deleteexercise',auth,ctrl.deleteExercise);

router.get('/', auth, ctrl.getDiary);

module.exports = router;