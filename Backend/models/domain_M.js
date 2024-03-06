const mongoose = require('mongoose');

// Define the schema for the domain model
const domainSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

// Create the Mongoose model named 'Domain' based on the schema
const Domain = mongoose.model('Domain', domainSchema);

// Export the 'Domain' model to be used elsewhere in the application
module.exports = Domain;

