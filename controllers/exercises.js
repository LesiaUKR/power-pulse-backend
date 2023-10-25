const { ctrlWrapper, createError, errorType } = require("../helpers")
const { Exercises } = require('../models/exercise')
const { Filters } = require ('../models/filter')

const getAllExercises = async (req, res) => {
    const exercises = await Exercises.find()
    if (!exercises) {
        throw createError(errorType.BAD_REQUEST)
    }
    res.json(exercises)
}

const getAllBodyParts = async (req, res) => {
    const filters = await Filters.find();
    if (!filters) {
        throw createError(errorType.NOT_FOUND)
    }
    const bodyParts = [...new Set(filters.filter(filter => filter.filter === "Body parts"))]
    res.json(bodyParts)
}

const getAllEquipments = async (req, res) => {
    const filters = await Filters.find();
    if (!filters) {
        throw createError(errorType.NOT_FOUND)
    }
    const equipments = [...new Set(filters.filter(filter => filter.filter === "Equipment"))]
    res.json(equipments)
}

const getAllMuscles = async (req, res) => {
    const filters = await Filters.find();
    if (!filters) {
        throw createError(errorType.NOT_FOUND)
    }
    const muscles = [...new Set(filters.filter(filter => filter.filter === "Muscles"))]
    res.json(muscles)
}

module.exports = {
    getAllExercises: ctrlWrapper(getAllExercises),
    getAllBodyParts: ctrlWrapper(getAllBodyParts),
    getAllEquipments: ctrlWrapper(getAllEquipments),
    getAllMuscles: ctrlWrapper(getAllMuscles)
}