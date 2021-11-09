const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    url: {
        type: String,
        required :true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    images: {
        type: Array,
        required: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Project', projectSchema);