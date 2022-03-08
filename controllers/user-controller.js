const { User } = require('../models');

const userController = {

    // get all users
    // GET /api/user
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                //do not return the __v field
                select: '-__v'
            })
            .select('-__v')
            //sort in decending order newest first
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // get one user
    // GET /api/user/:id
    getUserById({ params }, res) {
        User.findOne(
            { _id: params.id }
        )
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User by that ID here! 🤷‍♂️' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            })
    },

    // createUser
    // POST /api/user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json({ message: '🎉 Welcome to SocialQ ' + dbUserData.username + '! 🎉' })
            )
            .catch(err => res.json(err));
    },

    // update User by id
    // PUT /api/user/:id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id! 🤷‍♂️' });
                    return;
                }
                res.json({ message: dbUserData.username +' info updated! 🪄~~' });
            })
            .catch(err => res.json(err));
    },

    // delete User
    // DELETE /api/user/:id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id! 🤷‍♂️' });
                    return;
                }
                // .then(remove user from friends here)
                // .then(remove user thoughts and comments here)

                res.json({ message: '💔 Sorry to see you go ' + dbUserData.username + '! 😢' });
            })
            .catch(err => res.json(err));
    },

    // add friend
    // POST /api/user/:id/friends/:friendId
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $push: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
            .populate({ path: 'friends', select: ('-__v') })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id! 🤷‍♂️' });
                    return;
                }
                res.json({ message: '✨ New friend successfully added! ✨' });
            })
            .catch(err => res.json(err));
    },

    // remove friend
    // DELETE /api/user/:id/friends/:friendId
    unFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            { $pull: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
            .populate({ path: 'friends', select: ('-__v') })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json({ message: '👻~~User successfully unfriended~~👻' });
            })
            .catch(err => res.json(err));
    }
};

module.exports = userController;