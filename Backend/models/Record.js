const mongoose = require('mongoose');

// Define the schema for the record model
const recordSchema = new mongoose.Schema({
  domainId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Domain',
    required: true
  },
  type: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
});

// Create the Mongoose model named 'Record' based on the schema
const Record = mongoose.model('Record', recordSchema);

// Export the 'Record' model to be used elsewhere in the application
module.exports = Record;
