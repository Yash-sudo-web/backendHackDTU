const router = require("express").Router();
const { Location } = require("../models/location");

// Route for fetching waste collection schedules
router.post("/", async (req, res) => {
  // Get the user's location from the request body or query parameters
  const { latitude, longitude } = req.body;
  console.log(latitude)
  console.log(longitude)
  // Query the database to find the polygon that contains the given location
  const location = await Location.findOne({
    location: {
      $geoIntersects: {
        $geometry: {
          type: "Point",
          coordinates: [longitude, latitude]
        }
      }
    }
  });

  // If no polygon contains the location, return an error response
  if (!location) {
    return res.status(400).json({ error: "No waste collection schedule found for the given location" });
  }

  // Determine the waste collection schedule based on the waste types and the day/time of the week
  const dayOfWeek = new Date().toLocaleString("en-US", { weekday: "long" });
  const currentTime = new Date().toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true });
  const wasteTypes = location.wasteTypes;
  let schedule = {};
  Object.keys(wasteTypes).forEach(type => {
    const typeSchedule = wasteTypes[type];
    if (typeSchedule.days.includes(dayOfWeek) && typeSchedule.times.includes(currentTime)) {
      schedule[type] = typeSchedule;
    }
  });

  // Send the waste collection schedules as a response
  res.json(schedule);
});

module.exports = router;