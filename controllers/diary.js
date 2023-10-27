const { ctrlWrapper, createError } = require('../helpers');
const Users = require('../models/users')
const { DiaryProducts } = require('../models/diaryProduct');
const { Product } = require('../models/products');
const { DiaryExercises } = require('../models/diaryExercise');
const { Exercises } = require('../models/exercise');
const formatDate = require('../helpers/formatDiary');

const addProduct = async (req, res) => {
    const owner = req.user;
    const { bodyParams: { blood } } = await Users.findById(req.user);
    if (!blood) {
        throw createError('BAD_REQUEST', "Specify your blood type")
    }
    const { productId } = req.body
    const date = formatDate(new Date())
    let originalProduct = await DiaryProducts.findOne({ owner, date, productId }).populate('productId', "category title groupBloodNotAllowed")
    if (!originalProduct) {
        originalProduct = await Product.findById(productId)
        if (!originalProduct) {
            throw createError('NOT_FOUND')
        }
    }
    const { category, title, groupBloodNotAllowed } = originalProduct.productId || originalProduct
    const recommend = groupBloodNotAllowed[blood]
    const addedProduct = await DiaryProducts.create({
        ...req.body,
        owner,
        date,
    })
    const newProduct = { ...addedProduct['_doc'], category, title, recommend }

    res.status(201).json(newProduct)
}

const deleteProduct = async (req, res) => {
    const owner = req.user;
    const { productId: _id, date } = req.body
    const productToDelete = await DiaryProducts.findOneAndDelete({ _id, date, owner })
    if (!productToDelete) {
        throw createError('NOT_FOUND')
    }
    res.json(productToDelete)
}

const addExercise = async (req, res) => {
    const owner = req.user;
    const { exerciseId } = req.body
    const date = formatDate(new Date())
    let originalExercise = await DiaryExercises.findOne({ owner, date, exerciseId }).populate('exerciseId', 'bodyPart equipment name target');

    if (!originalExercise) {
        originalExercise = await Exercises.findById(exerciseId)
        if (!originalExercise) {
            throw createError('NOT_FOUND')
        }
    }
    const { bodyPart, equipment, name, target } = originalExercise.exerciseId || originalExercise
    const addedExercise = await DiaryExercises.create({
        ...req.body,
        owner,
        date,
    })
    const newExercise = { ...addedExercise['_doc'], bodyPart, equipment, name, target }
    res.status(201).json(newExercise)
}

const deleteExercise = async (req, res) => {
    const owner = req.user;
    const { exerciseId: _id, date } = req.body
    const exerciseToDelete = await DiaryExercises.findOneAndDelete({ _id, date, owner })
    if (!exerciseToDelete) {
        throw createError('NOT_FOUND')
    }
    res.json(exerciseToDelete)
}

const getDiary = async (req, res) => {
    const owner = req.user;
    const { date } = req.query;
    if (Object.keys(req.query).length < 1) {
        throw createError("NOT_FOUND", 'Enter the date!');
    }
    const eatenProducts = await DiaryProducts.find({ owner, date })
    const doneExercises = await DiaryExercises.find({ owner, date })

    const consumedCalories = eatenProducts.map((product) => product.calories).reduce((prev, val) => prev += val, 0)
    const burnedCalories = doneExercises.map((exercise) => exercise.burnedCalories).reduce((prev, val) => prev += val, 0)
    const sportTime = doneExercises.map((exercise) => exercise.time).reduce((prev, val) => prev += val, 0)

    res.json({
        eatenProducts,
        doneExercises,
        consumedCalories,
        burnedCalories,
        sportTime
    })
}


module.exports = {
    addProduct: ctrlWrapper(addProduct),
    deleteProduct: ctrlWrapper(deleteProduct),
    addExercise: ctrlWrapper(addExercise),
    deleteExercise: ctrlWrapper(deleteExercise),
    getDiary: ctrlWrapper(getDiary),
};
