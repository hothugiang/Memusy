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
        try {
            const { playlistId, songId } = req.body;
            const db = req.app.locals.db;

            const checkSongInPlaylistQuery = "SELECT * FROM playlistsongs WHERE playlist_id = ? AND song_id = ?;";
            db.query(checkSongInPlaylistQuery, [playlistId, songId], (err, result) => {
                if (err) {
                    console.error("Lỗi kiểm tra bài hát trong playlist: " + err.message);
                    return res.status(500).json({ message: "Lỗi kiểm tra bài hát trong playlist." });
                }
                if (result.length > 0) {
                    return res.status(200).json({ message: "Bài hát đã có trong playlist." });
                }
            });

            const addSongToPlaylistQuery = "INSERT INTO playlistsongs (playlist_id, song_id) VALUES (?, ?);";
            db.query(addSongToPlaylistQuery, [playlistId, songId], (err) => {
                if (err) {
                    console.error("Lỗi thêm bài hát vào playlist: " + err.message);
                    return res.status(500).json({ message: "Lỗi thêm bài hát vào playlist." });
                }
                return res.status(201).json({ message: "Thêm bài hát vào playlist thành công." });
            });
        } catch (error) {
            console.error(error);

            res.status(500).json({
                status: "error",
                message: "Internal Server Error",
            });
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
}

module.exports = new MusicUserController();