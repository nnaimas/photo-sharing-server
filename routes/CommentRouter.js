const express = require("express");
const router = express.Router();
const Comment = require("../modelData/Comment");

// Get all comments
router.get("/", async (request, response) => {
  try {
    const comments = await Comment.find();
    response.json(comments);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

// Add a comment
router.post("/", async (request, response) => {
  const comment = new Comment({
    content: request.body.content,
    photoId: request.body.photoId,
    userId: request.body.userId,
  });

  try {
    const newComment = await comment.save();
    response.status(201).json(newComment);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

// Delete a comment
router.delete("/:id", async (request, response) => {
  try {
    const comment = await Comment.findById(request.params.id);
    if (comment) {
      await comment.deleteOne();
      response.json({ message: "Comment deleted" });
    } else {
      response.status(404).json({ message: "Comment not found" });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

module.exports = router; 