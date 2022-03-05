const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    removeThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller.js');

// host to: /api/thought
router
    .route("/")
    .get(getAllThoughts)
    .post(createThought);


// host to: /api/thought/:thoughtId
router
    .route("/:id")
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);

// host to: /api/thought/:thoughtId/reactions
router
    .route("/:thoughtId/reactions")
    .post(createReaction);

// host to: /api/thought/:thoughtId/reactions/:reactionsId
router
    .route("/:thoughtId/reactions/:reactionId")
    .delete(deleteReaction);

module.exports = router;