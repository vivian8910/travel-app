const mongoose = require('mongoose');

const { Schema } = mongoose;

const requiredNumber = {
    type: Number,
    required: true,
};

const logEntrySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    comments: String,
    image: String,
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0,
    },
    latitude: requiredNumber,
    longitude: requiredNumber,
    visitDate: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = logEntrySchema;
