const { ctrlWrapper, createError, errorType } = require("../helpers")
const { Exercises } = require('../models/exercise')

const getAllExercises = async (req, res) => {
    const exercises = await Exercises.find()
    if (!exercises) {
        throw createError(errorType.BAD_REQUEST)
    }
    res.json(exercises)
}

const getAllDetails = async (req, res) => {
    const exercises = await Exercises.find();
    if (!exercises) {
        throw createError(errorType.BAD_REQUEST)
    }
    const bodyParts = [...new Set(exercises.map(exercise => exercise.bodyPart))]
    const equipments = [...new Set(exercises.map(exercise => exercise.equipment))]
    const muscles = [...new Set(exercises.map(exercise => exercise.target))]

    const details = {
        bodyParts,
        equipments,
        muscles
    }
    res.status(200).json(details)
    
}

module.exports = {
    getAllExercises: ctrlWrapper(getAllExercises),
    getAllDetails: ctrlWrapper(getAllDetails)
}