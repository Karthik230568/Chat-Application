Simple Chat Application (Backend)

Overview

This project is a simple backend chat application designed to demonstrate message sending and read/unread message tracking between two users.


Technology Stack

Node.js

Express.js

MongoDB

Mongoose (ORM)

Server and Database Setup

The application runs on a local Express server.

MongoDB is used as the database and is expected to be running locally. The application connects to a local MongoDB instance and uses a database named chat_app. All required collections are created automatically when the seed script is executed.

Read and Unread Message Design

This project uses the “last read message per user per conversation” approach to track message read status.

For each conversation, a separate participant record is maintained for every user. This record stores:

lastReadMessageId

lastReadAt

Unread messages are determined using the following rules:

Messages sent by the other user are unread by default

A message is considered unread if its ID is greater than the stored lastReadMessageId for that user

This design was chosen because it avoids updating multiple message records, keeps read state user-specific, and allows efficient unread message count calculation.

Database Schema (ORM Models)

User

name

Conversation

createdAt

Message

conversationId

senderId

content

createdAt

updatedAt

Participant (Read Status Tracking)

conversationId

userId

lastReadMessageId

lastReadAt

API Endpoints

Send a message
POST /messages

List conversations with unread message count
GET /conversations?userId=<USER_ID>

Fetch messages in a conversation
GET /conversations/:id/messages

Mark messages as read
POST /conversations/:id/read

Setup Instructions

Install Node.js and MongoDB

Clone this repository

Install dependencies
npm install

Seed the database (creates two users and one conversation)
node src/seed.js

Start the server
node src/server.js

The server will start on port 3000.

API Testing

API testing is demonstrated using PowerShell commands.

Send message (Alice → Bob)
Invoke-RestMethod -Uri http://localhost:3000/messages
 -Method Post -ContentType "application/json" -Body '{"conversationId":"6969219fcb11be4105ec02c6","senderId":"6969219fcb11be4105ec02c2","content":"Hello Bob"}'

Send message (Bob → Alice)
Invoke-RestMethod -Uri http://localhost:3000/messages
 -Method Post -ContentType "application/json" -Body '{"conversationId":"6969219fcb11be4105ec02c6","senderId":"6969219fcb11be4105ec02c4","content":"Hi Alice"}'

Get conversations with unread count (Alice)
Invoke-RestMethod -Uri "http://localhost:3000/conversations?userId=6969219fcb11be4105ec02c2
"

Fetch messages in a conversation
Invoke-RestMethod -Uri "http://localhost:3000/conversations/6969219fcb11be4105ec02c6/messages
"

Mark messages as read (Alice)
Invoke-RestMethod -Uri http://localhost:3000/conversations/6969219fcb11be4105ec02c6/read
 -Method Post -ContentType "application/json" -Body '{"userId":"6969219fcb11be4105ec02c2"}'

Verify unread count after reading
Invoke-RestMethod -Uri "http://localhost:3000/conversations?userId=6969219fcb11be4105ec02c2
"

Edge Case Handling

Conversations with no messages return an unread count of zero

Repeated read requests are handled safely without errors

Messages sent by a user are never counted as unread for that user

Read status is tracked independently for each user
