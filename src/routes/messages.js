const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

router.post("/", async (req, res) => {
  const { conversationId, senderId, content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Message required" });
  }

  const message = await Message.create({
    conversationId,
    senderId,
    content
  });

  res.json(message);
});

module.exports = router;
