const refresh = async (req, res, next) => {
    console.log('refresh');
    next();
}

module.exports = refresh;