const { ctrlWrapper } = require("../helpers");
const { Exercises } = require("../models/exercise");
const { DiaryExercises } = require("../models/diaryExercise");
const User = require("../models/users");

const getStatistics = async (req, res) => {
  const totalUsersExercises = await DiaryExercises.countDocuments();
  const exercisesQuantity = await Exercises.countDocuments();
  const usersQuantity = await User.countDocuments();

  const totalExercisesTime = await DiaryExercises.aggregate([
    { $group: { _id: null, time: { $sum: "$time" } } },
  ]);
  const totalBurnedCalories = await DiaryExercises.aggregate([
    { $group: { _id: null, burnedCalories: { $sum: "$burnedCalories" } } },
  ]);

  res.json({
    totalUsersExercises: totalUsersExercises,
    exercisesQuantity: exercisesQuantity,
    usersQuantity: usersQuantity,
    totalExercisesTime: totalExercisesTime[0].time,
    totalBurnedCalories: totalBurnedCalories[0].burnedCalories,
  });
};
module.exports = { getStatistics: ctrlWrapper(getStatistics) };
