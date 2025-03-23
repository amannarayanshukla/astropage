const SocialConfig = require("../models/SocialConfig");
const axios = require("axios");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

exports.getSocialFeed = asyncHandler(async (req, res) => {
  const config = await SocialConfig.findOne();

  if (!config) {
    return res.status(400).json({
      success: false,
      error: "Social media not configured",
    });
  }

  const [instagram, youtube] = await Promise.all([
    fetchInstagramFeed(config.beholdUrl),
    fetchYouTubeVideos(config),
  ]);

  res.json({
    success: true,
    data: {
      instagram,
      youtube,
    },
  });
});

async function fetchInstagramFeed(beholdUrl) {
  try {
    const response = await axios.get(beholdUrl);
    console.log(response.data);
    return response.data.posts.map((post) => ({
      id: post.id,
      image: post.mediaUrl,
      caption: post.caption,
      timestamp: post.timestamp,
      url: post.permalink,
    }));
  } catch (error) {
    new ErrorResponse(`Instagram fetch error: ${error}`, 500);
    return [];
  }
}

async function fetchYouTubeVideos(config) {
  if (!config.youtubeApiKey || !config.youtubeChannelId) return [];

  try {
    const params = {
      part: "snippet",
      maxResults: 10,
      key: config.youtubeApiKey,
      channelId: config.youtubeChannelId,
      order: "date",
    };

    if (config.youtubePlaylistId) {
      params.playlistId = config.youtubePlaylistId;
      params.part = "snippet,contentDetails";
    }

    const endpoint = config.youtubePlaylistId
      ? "https://www.googleapis.com/youtube/v3/playlistItems"
      : "https://www.googleapis.com/youtube/v3/search";

    const response = await axios.get(endpoint, { params });

    return response.data.items.map((item) => {
      const vid = item.snippet.resourceId?.videoId || item.id?.videoId;
      return {
        id: vid,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails?.high?.url,
        publishedAt: item.snippet.publishedAt,
        url: `https://youtube.com/watch?v=${vid}`,
      };
    });
  } catch (error) {
    new ErrorResponse(`YouTube fetch error: ${error.response?.data}`, 500);
    return [];
  }
}
