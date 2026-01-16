const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  conversationId: mongoose.Schema.Types.ObjectId,
  senderId: mongoose.Schema.Types.ObjectId,
  content: String
}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);
