const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
  conversationId: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId,
  lastReadMessageId: mongoose.Schema.Types.ObjectId,
  lastReadAt: Date
});

module.exports = mongoose.model("Participant", participantSchema);
