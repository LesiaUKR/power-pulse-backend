const { Schema, model } = require("mongoose");

const filterSchema = new Schema({
    filter: {
        type: String
    },
    name: {
        type: String
    },
    imgURL: {
        type: String
    }
});

const Filters = model("filter", filterSchema);

module.exports = { Filters };