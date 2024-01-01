const { ZingMp3 } = require("zingmp3-api-full");
const { zing } = require("zingmp3-api-next");

class ZingController {
  async getSong(req, res) {
    try {
      const data = await ZingMp3.getSong(req.params.id);

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
  }

  async getDetailPlaylist(req, res) {
    try {
      const data = await ZingMp3.getDetailPlaylist(req.params.id);

      res.status(200).json({
        status: "success",
        data: data.data,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  }

  async getSongsPlaylist(req, res) {
    try {
      const data = await ZingMp3.getDetailPlaylist(req.params.id);

      res.status(200).json({
        status: "success",
        data: data.data.song.items,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  }

  async getHome(req, res) {
    try {
      const data = await ZingMp3.getHome();

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
  }

  async getTop100(req, res) {
    try {
      const data = await ZingMp3.getTop100();

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
  }

  async getChartHome(req, res) {
    try {
      const data = await ZingMp3.getChartHome();

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
  }

  async getHomeAlbum(req, res) {
    try {
      const data = await ZingMp3.getHome();
      var usingData
      if (data.data.items[0].sectionType !== "adBanner") {
        usingData = data.data.items[0].items;
      } else {
        usingData = data.data.items[1].items;
      }
      var albumIdList = [];
      usingData.forEach((element) => {
        albumIdList.push(element.encodeId);
      });

      console.log(usingData);
      console.log(albumIdList);

      res.status(200).json({
        status: "success",
        usingData: albumIdList,
        data: usingData,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  }

  async getNewReleaseChart(req, res) {
    try {
      const data = await ZingMp3.getNewReleaseChart();

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
  }

  async getInfo(req, res) {
    try {
      const data = await ZingMp3.getInfoSong(req.params.id);

      res.status(200).json({
        status: "success",
        data: data.data,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  }

  async getInfoSong(song_id) {
    try {
      const data = await ZingMp3.getInfoSong(song_id);

      return data.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getArtist(req, res) {
    try {
      const data = await ZingMp3.getArtist(req.params.name);

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
  }

  async getArtistSong(req, res) {
    try {
      const data = await ZingMp3.getListArtistSong(
        req.params.id,
        req.params.page,
        req.params.count
      );

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
  }

  async getLyric(req, res) {
    try {
      const data = await ZingMp3.getLyric(req.params.id);

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
  }

  async search(req, res) {
    try {
      const data = await ZingMp3.search(req.params.q);

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
  }

  async getListByGenre(req, res) {
    try {
      const data = await zing.get_hub_detail(req.params.id);

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
  }
}

module.exports = new ZingController();
