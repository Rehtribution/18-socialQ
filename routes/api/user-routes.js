const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  unFriend
} = require('../../controllers/user-controller');

// /api/Users
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// /api/Users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// /api/Users/:id/friends/:friendId
router
  .route('/:id/friends/:friendId')
  .post(addFriend)
  .delete(unFriend)

module.exports = router;
