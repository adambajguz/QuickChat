var mongoose = require('mongoose'), Schema = mongoose.Schema;

var RoomSchema = new mongoose.Schema({
  room_name: String,
  room_description: { type: String, default: "" },
  room_category: { type: String, default: "Undefined" },
  highlighted_room: { type: Boolean, default: false },
  created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Room', RoomSchema);
