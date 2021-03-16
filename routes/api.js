const router = require("express").Router();
const Workout = require("../models/workout");

router.post("/api/workouts", (req, res) => {
    Workout.create({}).then(workout => res.json(workout)
    ).catch(err => res.json (err))
})
router.put("/api/workouts/:id", (req, res) => {
    Workout.findByIdAndUpdate(
        req.params.id,
        { $push: { exercises: req.body } },
        {new: true, runValidators: true}
    ).then(workout => res.json(workout)).catch(err => res.json (err))
})
router.get("/api/workouts", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration",
                }
            }
        }
    ]).then(workout => res.json(workout)).catch(err => res.json (err))
})



module.exports = router;