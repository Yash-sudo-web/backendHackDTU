const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  location: { type: [String], required: true },
  wasteTypes: {
    recyclables: {
      days: { type: [String], required: true },
      times: { type: [String], required: true }
    },
    nonRecyclables: {
      days: { type: [String], required: true },
      times: { type: [String], required: true }
    },
    hazardousWaste: {
      days: { type: [String], required: true },
      times: { type: [String], required: true }
    },
    organicWaste: {
      days: { type: [String], required: true },
      times: { type: [String], required: true }
    }
  }
});

const Location = mongoose.model("location", locationSchema);

module.exports = { Location };
