const mongoose = require("mongoose");

const socialConfigSchema = new mongoose.Schema({
  beholdUrl: {
    type: String,
    match: [/^https:\/\/feeds\.behold\.so\/\w+$/, "Invalid Behold URL format"],
  },
  calendlyUrl: {
    type: String,
    match: [/^https:\/\/calendly\.com\/\w+$/, "Invalid Calendly URL format"],
  },
  youtubeApiKey: String,
  youtubeChannelId: String,
  youtubePlaylistId: String,
  lastUpdated: Date,
});

module.exports = mongoose.model("SocialConfig", socialConfigSchema);
