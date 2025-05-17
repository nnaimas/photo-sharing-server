const express = require("express");
const User = require("../db/userModel");
const Photo = require("../db/photoModel");
const router = express.Router();

// GET /user/list - Return list of users for navigation sidebar
router.get("/list", async (request, response) => {
  try {
    const users = await User.find({}, '_id first_name last_name');
    response.json(users);
  } catch (error) {
    response.status(500).json({ error: "Error fetching users" });
  }
});

// GET /user/:id - Return detailed user information
router.get("/:id", async (request, response) => {
  try {
    const user = await User.findById(request.params.id);
    if (!user) {
      return response.status(400).json({ error: "User not found" });
    }
    response.json(user);
  } catch (error) {
    response.status(400).json({ error: "Invalid user ID" });
  }
});

// GET /photosOfUser/:id - Return photos of a specific user
router.get("/photosOfUser/:id", async (request, response) => {
  try {
    // First verify the user exists
    const user = await User.findById(request.params.id);
    if (!user) {
      return response.status(400).json({ error: "User not found" });
    }

    // Get all photos for the user
    const photos = await Photo.find({ user_id: request.params.id })
      .populate('comments.user_id', '_id first_name last_name');

    // Transform the data to match the required format
    const formattedPhotos = photos.map(photo => ({
      _id: photo._id,
      user_id: photo.user_id,
      file_name: photo.file_name,
      date_time: photo.date_time,
      comments: photo.comments.map(comment => ({
        _id: comment._id,
        comment: comment.comment,
        date_time: comment.date_time,
        user: {
          _id: comment.user_id._id,
          first_name: comment.user_id.first_name,
          last_name: comment.user_id.last_name
        }
      }))
    }));

    response.json(formattedPhotos);
  } catch (error) {
    response.status(400).json({ error: "Error fetching user photos" });
  }
});

module.exports = router;