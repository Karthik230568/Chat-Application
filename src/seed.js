const connectDB = require("./config/db");
const User = require("./models/User");
const Conversation = require("./models/Conversation");
const Participant = require("./models/Participant");

async function seed() {
  await connectDB();

  await User.deleteMany();
  await Conversation.deleteMany();
  await Participant.deleteMany();

  const user1 = await User.create({ name: "Alice" });
  const user2 = await User.create({ name: "Bob" });

  const convo = await Conversation.create({});

  await Participant.create([
    { conversationId: convo._id, userId: user1._id },
    { conversationId: convo._id, userId: user2._id }
  ]);

  console.log("Seed completed");
  process.exit();
}

seed();
