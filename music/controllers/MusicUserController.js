const ZingController = require("./MusicController");
class MusicUserController {

    async createPlaylist(req, res) {
        try {
            const { userId, playlistName } = req.body;
            const db = req.app.locals.db;

            const checkPlaylistQuery = "SELECT * FROM playlists WHERE name = ? AND user_id = ?;";
            db.query(checkPlaylistQuery, [playlistName, userId], (err, result) => {
                if (err) {
                    console.error("Lỗi kiểm tra playlist: " + err.message);
                    return res.status(500).json({ message: "Lỗi kiểm tra playlist." });
                }
                if (result.length > 0) {
                    return res.status(200).json({ message: "Playlist đã tồn tại." });
                }
            });
            const createPlaylistQuery = "INSERT INTO playlists (name, user_id) VALUES (?, ?);";
            db.query(createPlaylistQuery, [playlistName, userId], (err) => {
                if (err) {
                    console.error("Lỗi thêm playlist vào cơ sở dữ liệu: " + err.message);
                    return res.status(500).json({ message: "Lỗi thêm playlist." });
                }
                return res.status(201).json({ message: "Thêm playlist thành công." });
            });
        } catch (error) {
            console.error(error);

            res.status(500).json({
                status: "error",
                message: "Internal Server Error",
            });
        }
    }

    async addSongToPlaylist(req, res) {
        const db = req.app.locals.db;
        const { playlistId, songId } = req.body;

        try {
            const checkSongInPlaylistQuery = "SELECT * FROM playlistsongs WHERE playlist_id = ? AND song_id = ?;";
            db.query(checkSongInPlaylistQuery, [playlistId, songId], (err, result) => {
                if (err) {
                    console.error("Lỗi kiểm tra bài hát trong playlist: " + err.message);
                    return res.status(500).json({ message: "Lỗi kiểm tra bài hát trong playlist." });
                }
                if (result.length > 0) {
                    return res.status(200).json({ message: "Bài hát đã có trong playlist." });
                } else {
                    const checkSongExistQuery = "SELECT * FROM song WHERE id = ?;";
                    db.query(checkSongExistQuery, [songId], async (err, result) => {
                        if (err) {
                            console.error("Lỗi kiểm tra bài hát: " + err.message);
                            return res.status(500).json({ message: "Lỗi kiểm tra bài hát." });
                        }
                        if (result.length === 0) {
                            const songInfo = await ZingController.getInfoSong(songId);
                            const { encodeId, title, artistsNames, thumbnailM } = songInfo;
                            console.log("encodeId: " + encodeId);
                            console.log("title: " + title);
                            console.log("artistsNames: " + artistsNames);
                            console.log("thumbnailM: " + thumbnailM);

                            const addSongQuery = "INSERT INTO song (id, title, image, artist) VALUES (?, ?, ?, ?);";
                            db.query(addSongQuery, [encodeId, title, thumbnailM, artistsNames], (err) => {
                                if (err) {
                                    console.error("Lỗi thêm bài hát vào cơ sở dữ liệu: " + err.message);
                                    return res.status(500).json({ message: "Lỗi thêm bài hát vào cơ sở dữ liệu." });
                                }
                            });
                        }

                        const addSongToPlaylistQuery = "INSERT INTO playlistsongs (playlist_id, song_id) VALUES (?, ?);";
                        db.query(addSongToPlaylistQuery, [playlistId, songId], (err) => {
                            if (err) {
                                console.error("Lỗi thêm bài hát vào playlist: " + err.message);
                                return res.status(500).json({ message: "Lỗi thêm bài hát vào playlist." });
                            }
                            return res.status(201).json({ message: "Thêm bài hát vào playlist thành công." });
                        });
                    });
                }
            });
        } catch (error) {
            console.error(error);
        }
    }


    async addSongToFavorite(req, res) {
        try {
            const { userId, songId } = req.body;
            const db = req.app.locals.db;

            const checkSongInFavoriteQuery = "SELECT * FROM favorites WHERE user_id = ? AND song_id = ?;";
            db.query(checkSongInFavoriteQuery, [userId, songId], (err, result) => {
                if (err) {
                    console.error("Lỗi kiểm tra bài hát trong danh sách yêu thích: " + err.message);
                    return res.status(500).json({ message: "Lỗi kiểm tra bài hát trong danh sách yêu thích." });
                }
                if (result.length > 0) {
                    return res.status(200).json({ message: "Bài hát đã có trong danh sách yêu thích." });
                }
            });

            const addSongToFavoriteQuery = "INSERT INTO favorites (user_id, song_id) VALUES (?, ?);";
            db.query(addSongToFavoriteQuery, [userId, songId], (err) => {
                if (err) {
                    console.error("Lỗi thêm bài hát vào danh sách yêu thích: " + err.message);
                    return res.status(500).json({ message: "Lỗi thêm bài hát vào danh sách yêu thích." });
                }
                return res.status(201).json({ message: "Thêm bài hát vào danh sách yêu thích thành công." });
            });
        } catch (error) {
            console.error(error);

            res.status(500).json({
                status: "error",
                message: "Internal Server Error",
            });
        }
    }

    async deleteSongFromFavorite(req, res) {
        try {
            const { userId, songId } = req.body;
            const db = req.app.locals.db;

            const deleteSongFromFavoriteQuery = "DELETE FROM favorites WHERE user_id = ? AND song_id = ?;";
            db.query(deleteSongFromFavoriteQuery, [userId, songId], (err) => {
                if (err) {
                    console.error("Lỗi xóa bài hát khỏi danh sách yêu thích: " + err.message);
                    return res.status(500).json({ message: "Lỗi xóa bài hát khỏi danh sách yêu thích." });
                }
                return res.status(200).json({ message: "Xóa bài hát khỏi danh sách yêu thích thành công." });
            });
        } catch (error) {
            console.error(error);

            res.status(500).json({
                status: "error",
                message: "Internal Server Error",
            });
        }
    }

    async deleteSongFromPlaylist(req, res) {
        try {
            const { playlistId, songId } = req.body;
            const db = req.app.locals.db;

            const deleteSongFromPlaylistQuery = "DELETE FROM playlistsongs WHERE playlist_id = ? AND song_id = ?;";
            db.query(deleteSongFromPlaylistQuery, [playlistId, songId], (err) => {
                if (err) {
                    console.error("Lỗi xóa bài hát khỏi playlist: " + err.message);
                    return res.status(500).json({ message: "Lỗi xóa bài hát khỏi playlist." });
                }
                return res.status(200).json({ message: "Xóa bài hát khỏi playlist thành công." });
            });
        } catch (error) {
            console.error(error);

            res.status(500).json({
                status: "error",
                message: "Internal Server Error",
            });
        }
    }

    async deletePlaylist(req, res) {
        try {
            const { playlistId } = req.body;
            const db = req.app.locals.db;

            const deletePlaylistSongQuery = "DELETE FROM playlistsongs WHERE playlist_id = ?;";
            db.query(deletePlaylistSongQuery, [playlistId], (err) => {
                if (err) {
                    console.error("Lỗi xóa bài hát khỏi playlist: " + err.message);
                    return res.status(500).json({ message: "Lỗi xóa bài hát khỏi playlist." });
                }
            });

            const deletePlaylistQuery = "DELETE FROM playlists WHERE id = ?;";
            db.query(deletePlaylistQuery, [playlistId], (err) => {
                if (err) {
                    console.error("Lỗi xóa playlist: " + err.message);
                    return res.status(500).json({ message: "Lỗi xóa playlist." });
                }
                return res.status(200).json({ message: "Xóa playlist thành công." });
            });
        } catch (error) {
            console.error(error);

            res.status(500).json({
                status: "error",
                message: "Internal Server Error",
            });
        }
    }

    async getPlaylists(req, res) {
        try {
            const userId = req.params.id;
            console.log(userId);
            const db = req.app.locals.db;

            const getPlaylistsQuery = "SELECT * FROM playlists WHERE user_id = ?;";
            db.query(getPlaylistsQuery, [userId], (err, result) => {
                if (err) {
                    console.error("Lỗi lấy danh sách playlist: " + err.message);
                    return res.status(500).json({ message: "Lỗi lấy danh sách playlist." });
                }
                return res.status(200).json(result);
            });
        } catch (error) {
            console.error(error);

            res.status(500).json({
                status: "error",
                message: "Internal Server Error",
            });
        }
    }

    async getSongs(req, res) {
        try {
            const { playlistId } = req.query;
            const db = req.app.locals.db;

            const getSongsQuery = "SELECT * FROM playlistsongs WHERE playlist_id = ?;";
            db.query(getSongsQuery, [playlistId], (err, result) => {
                if (err) {
                    console.error("Lỗi lấy danh sách bài hát trong playlist: " + err.message);
                    return res.status(500).json({ message: "Lỗi lấy danh sách bài hát trong playlist." });
                }
                return res.status(200).json(result);
            });
        } catch (error) {
            console.error(error);

            res.status(500).json({
                status: "error",
                message: "Internal Server Error",
            });
        }
    }

    async getFavorites(req, res) {
        try {
            const { userId } = req.query;
            const db = req.app.locals.db;

            const getFavoritesQuery = "SELECT * FROM favorites WHERE user_id = ?;";
            db.query(getFavoritesQuery, [userId], (err, result) => {
                if (err) {
                    console.error("Lỗi lấy danh sách bài hát yêu thích: " + err.message);
                    return res.status(500).json({ message: "Lỗi lấy danh sách bài hát yêu thích." });
                }
                return res.status(200).json(result);
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

module.exports = new MusicUserController();