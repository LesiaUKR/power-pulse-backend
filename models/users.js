const { default: mongoose } = require('mongoose');
const UserSchema = require('./usersSchema');

const Users = mongoose.model('user', UserSchema);
module.exports = Users;