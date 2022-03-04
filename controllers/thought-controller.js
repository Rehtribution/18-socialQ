const { Thought, User } = require('../models');

const thoughtController = {

    // get all thoughts
    // GET /api/thought
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughts => res.json(dbThoughts))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get thoughts by id
    // GET /api/thought/:id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughts => {
                if (!dbThoughts) {
                    res.status(400).json({ message: "No one's thought of this yet!" });
                    return;
                }
                res.json(dbThoughts)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // create thought attached to user
    // POST /api/thought
    createThought({ params, body }, res) {
console.log(params);
        Thought.create(body)
            // find user by id
            .then(({ dbThoughts }) => {
                 User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: dbThoughts} },
                    { new: true }
                );
                console.log(dbThoughts);
            })
            // attach the thought
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(400).json({ message: "No one by that name here!" });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // update thought
    // PUT /api/thought/:id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId }, body, { new: true }
        )
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughts => {
                if (!dbThoughts) {
                    res.status(400).json({ message: "No one's thought of this yet!" });
                    return;
                }
                res.json(dbThoughts)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // delete thought
    // DELETE /api/thought/:id
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: "No one's thought of this yet!" });
                }
                return user.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true }
                );
            })
            .then(dbuserData => {
                if (!dbuserData) {
                    res.status(404).json({ message: "No one by that name here!" });
                    return;
                }
                res.json(dbuserData);
            })
            .catch(err => res.json(err));
    },

    // add reaction
    // delete reaction
}
module.exports = thoughtController