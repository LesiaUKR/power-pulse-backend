const { ctrlWrapper, createError, errorType } = require("../helpers")
const { Exercises } = require('../models/exercise')

const getAllExercises = async (req, res) => {
    const exercises = await Exercises.find()
    if (!exercises) {
        throw createError(errorType.BAD_REQUEST)
    }
    res.json(exercises)
}

const getAllBodyParts = async (req, res) => {
    const exercises = await Exercises.find();
    if (!exercises) {
        throw createError(errorType.BAD_REQUEST)
    }
    const bodyParts = [...new Set(exercises.map(exercise => exercise.bodyPart))]
    res.json(bodyParts)
}

const getAllEquipments = async (req, res) => {
    const exercises = await Exercises.find();
    if (!exercises) {
        throw createError(errorType.BAD_REQUEST)
    }
    const equipments = [...new Set(exercises.map(exercise => exercise.equipment))]
    res.json(equipments)
}

const getAllMuscles = async (req, res) => {
    const exercises = await Exercises.find();
    if (!exercises) {
        throw createError(errorType.BAD_REQUEST)
    }
    const muscles = [...new Set(exercises.map(exercise => exercise.target))]
    res.json(muscles)
}

module.exports = {
    getAllExercises: ctrlWrapper(getAllExercises),
    getAllBodyParts: ctrlWrapper(getAllBodyParts),
    getAllEquipments: ctrlWrapper(getAllEquipments),
    getAllMuscles: ctrlWrapper(getAllMuscles)
}