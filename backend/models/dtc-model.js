const mongoose = require('mongoose');

const { Schema } = mongoose;

const dtcSchema = new Schema({
  system: {
    title: { type: String, required: true },
    subCode: { type: String, required: true },
    subName: { type: String, required: true },
  },
  code: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: false },
  },
  date: {
    created: { type: Date },
    edited: { type: Date },
  },
});

module.exports = mongoose.model('Dtc', dtcSchema);
