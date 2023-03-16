const router = require("express").Router();
const {
  models: { User, User_Friend },
} = require("../db");

// GET ALL
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// GET SINGLE
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// CREATE USER
router.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// UPDATE USER
router.put("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.update(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// GET /api/users/:id/friends
// Retrieves all friends for a specified user
router.get("/:id/friends", async (req, res, next) => {
  try {
    const friends = await User_Friend.findAll({
      where: { userId: req.params.id },
    });
    res.json(friends);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
