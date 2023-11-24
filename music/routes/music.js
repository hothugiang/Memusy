const axios = require("axios");

const dotenv = require("dotenv");
const path = require("path");
const router = require(".");

const envPath = path.resolve(__dirname, "../.env");

dotenv.config({ path: envPath });

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const base64Auth = Buffer.from(`${clientId}:${clientSecret}`).toString(
  "base64"
);

let accessToken = "";

async function getAccessToken() {
  if (accessToken) {
    // Kiểm tra nếu access token hiện tại còn hợp lệ
    const isValid = await validateAccessToken(accessToken);
    if (isValid) {
      console.log("Reusing existing access token:", accessToken);
      return accessToken;
    }
  }

  try {
    const response = await axios({
      method: "post",
      url: "https://accounts.spotify.com/api/token",
      params: {
        grant_type: "client_credentials",
      },
      headers: {
        Authorization: `Basic ${base64Auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    accessToken = response.data.access_token;

    console.log("Access Token:", accessToken);
    return accessToken;
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw error; // Re-throw the error for the calling code to handle
  }
}

async function validateAccessToken(token) {
  try {
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.json());
    return response.status === 200;
  } catch (error) {
    console.error(error);
    return false;
  }
}

router.get("/genres", async (req, res) => {
  try {
    // Get Spotify access token
    const accessToken = await getAccessToken();

    // Make a request to get Spotify genres
    const response = await axios.get(
      "https://api.spotify.com/v1/recommendations/available-genre-seeds",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Extract genres from the response
    const genres = response.data.genres;

    // Send the genres as JSON
    res.json({ genres });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/songs", async (req, res) => {
  const db = req.app.locals.db;
  const query =
    "SELECT s.id as s_id, s.title, s.album, s.image, a.id as artist, a.name FROM song s INNER JOIN artist a ON a.id = s.artist";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Lỗi truy vấn cơ sở dữ liệu: " + err.message);
      return res.status(500).json({ message: "Lỗi nhận bài hát." });
    }

    console.log(results);
    return res.status(200).json({ results: results });
  });
});

router.get("/song/:id", async (req, res) => {
  const db = req.app.locals.db;
  const id = req.params.id;
  const query =
    "SELECT s.id as s_id, s.title, s.album, s.image, a.id as artist, a.name FROM song s INNER JOIN artist a ON a.id = s.artist WHERE s.id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Lỗi truy vấn cơ sở dữ liệu: " + err.message);
      return res.status(500).json({ message: "Lỗi nhận bài hát." });
    }

    console.log(results[0]);
    return res.status(200).json({ results: results[0] });
  });
});

router.get("/song_file/:id", async(req, res) => {
  const db = req.app.locals.db;
  const id = req.params.id;
  const query =
    "SELECT id FROM song WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Lỗi truy vấn cơ sở dữ liệu: " + err.message);
      return res.status(500).json({ message: "Lỗi nhận bài hát." });
    }

    console.log(results[0]);
    const music_file_path = 'E:/MobileApp/assets/mp3/' + id + '.mp3';
    res.sendFile(path.resolve(music_file_path));
  });
});

module.exports = router;
