var express = require("express");

var router = express.Router();

const { ZingMp3 } = require("zingmp3-api-full");

// GET /musics/song
router.get("/song", async (req, res) => {
  try {
    const data = await ZingMp3.getSong("ZOACFBBU");
    console.log(data);

    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

// GET /musics/playlist_detail
router.get("/playlist_detail", async (req, res) => {
  try {
    const data = await ZingMp3.getDetailPlaylist("ZWZB969E");
    console.log(data);

    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

// GET /musics/home
router.get("/home", async (req, res) => {
  try {
    const data = await ZingMp3.getHome();
    console.log(data);

    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

// GET /musics/Top100
router.get("/top100", async (req, res) => {
  try {
    const data = await ZingMp3.getTop100();
    console.log(data);

    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

// GET /musics/chartHome
router.get("/chartHome", async (req, res) => {
  try {
    const data = await ZingMp3.getChartHome();
    console.log(data);

    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

// GET /musics/songInfo
router.get("songInfo", async (req, res) => {
  try {
    const data = await ZingMp3.getInfoSong("ZOACFBBU");
    console.log(data);

    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

// GET /musics/artist
router.get("/artist", async (req, res) => {
  try {
    const data = await ZingMp3.getArtist("sontungmtp");
    console.log(data);

    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

// GET /musics/artistSongs
router.get("/artistSongs", async (req, res) => {
  try {
    const data = await ZingMp3.getListArtistSong("IWZ9ZD8A", "1", "15");
    console.log(data);

    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

// GET /musics/lyrics
router.get("/lyrics", async (req, res) => {
  try {
    const data = await ZingMp3.getLyric("ZOACFBBU");
    console.log(data);

    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

// GET /musics/search
router.get("/search", async (req, res) => {
  try {
    const data = await ZingMp3.search("sontungmtp");
    console.log(data);

    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
