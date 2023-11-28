const express = require("express");
const router = express.Router();

const MusicController = require("./../controllers/MusicController");

// getSong
router.get("/song/:id", MusicController.getSong);

// getDetailPlaylist
router.get("/detailplaylist/:id", MusicController.getDetailPlaylist);

// getSongFromPlaylist
router.get("/songsplaylist/:id", MusicController.getSongsPlaylist)

// getHome
router.get("/home", MusicController.getHome);

// getHomeAlbum
router.get("/homealbum", MusicController.getHomeAlbum);

// getTop100
router.get("/top100", MusicController.getTop100);

// getChartHome
router.get("/charthome", MusicController.getChartHome);

// getNewReleaseChart
router.get("/newreleasechart", MusicController.getNewReleaseChart);

// getInfoSong
router.get("/infosong/:id", MusicController.getInfo);

// getArtist
router.get("/artist/:name", MusicController.getArtist);

// getArtistSong
router.get("/artistsong/:id/:page/:count", MusicController.getArtistSong);

// getLyric
router.get("/lyric/:id", MusicController.getLyric);

// search
router.get("/search/:q", MusicController.search);

module.exports = router;
