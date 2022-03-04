const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    removeThought
} = require('../../controllers/thought-controller.js');

// GET /api/thought | POST /api/thought
router
    .route("/")
    .get(getAllThoughts)
    .post(createThought);


router
    .route("/thought/:id")
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);

module.exports = router;