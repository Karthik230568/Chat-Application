const express = require("express");
const router = express.Router();
const Participant = require("../models/Participant");
const Message = require("../models/Message");

router.get("/", async (req, res) => {
  const { userId } = req.query;
  const participants = await Participant.find({ userId });
  const response = [];

  for (const p of participants) {
    const query = {
      conversationId: p.conversationId,
      senderId: { $ne: userId }
    };

    if (p.lastReadMessageId) {
      query._id = { $gt: p.lastReadMessageId };
    }

    const unreadCount = await Message.countDocuments(query);

    response.push({
      conversationId: p.conversationId,
      unreadCount
    });
  }

  res.json(response);
});

router.get("/:id/messages", async (req, res) => {
  const messages = await Message.find({
    conversationId: req.params.id
  }).sort({ createdAt: 1 });

  res.json(messages);
});

router.post("/:id/read", async (req, res) => {
  const { userId } = req.body;

  const latestMessage = await Message.findOne({
    conversationId: req.params.id,
    senderId: { $ne: userId }
  }).sort({ _id: -1 });

  if (latestMessage) {
    await Participant.findOneAndUpdate(
      { conversationId: req.params.id, userId },
      {
        lastReadMessageId: latestMessage._id,
        lastReadAt: new Date()
      }
    );
  }

  res.json({ status: "Read updated" });
});

module.exports = router;
