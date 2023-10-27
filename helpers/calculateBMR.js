const calculateBMR = (currentWeight, height, birthday, levelActivity, sex) => {
    const activityLevelFactor = {
        1: 1.2,
        2: 1.375,
        3: 1.55,
        4: 1.725,
        5: 1.9,
    };
    let BMR = 0;
    const age = new Date().getFullYear() - new Date(birthday).getFullYear();
    if (sex === 'female') {
        BMR = (10 * currentWeight + 6.25 * height - 5 * age - 161) * activityLevelFactor[levelActivity]
    } else {
        BMR = (10 * currentWeight + 6.25 * height - 5 * age + 5) * activityLevelFactor[levelActivity]
    }
    return BMR;
}

module.exports = calculateBMR;