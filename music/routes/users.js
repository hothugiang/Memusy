var express = require("express");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

var router = express.Router();

const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Lỗi mã hóa mật khẩu: " + error.message);
    throw "Lỗi đăng ký người dùng.";
  }
};

const createUser = async (username, email, password, db, res) => {
  // Kiểm tra có tồn tại mail chưa
  const checkUserQuery = "SELECT * FROM Users WHERE email = ? OR username = ?";
  console.log(username + " " + email + " " + password);
  const hashedPassword = await hashPassword(password);
  console.log(username + " " + email + " " + hashedPassword);
  db.query(checkUserQuery, [email, username], (err, results) => {
    if (err) {
      console.error("Lỗi truy vấn cơ sở dữ liệu: " + err.message);
      return res.status(500).json({ message: "Lỗi đăng ký người dùng." });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: "Người dùng đã tồn tại." });
    }

    // Thêm người dùng mới vào cơ sở dữ liệu
    const insertUserQuery =
      "INSERT INTO Users (username, email, password) VALUES (?, ?, ?);";
    db.query(insertUserQuery, [username, email, hashedPassword], (err) => {
      if (err) {
        console.error("Lỗi thêm người dùng vào cơ sở dữ liệu: " + err.message);
        return res.status(500).json({ message: "Lỗi đăng ký người dùng." });
      }
      return res.status(201).json({ message: "Đăng ký thành công." });
    });
  });
};

router.post("/register", (req, res) => {
  const db = req.app.locals.db;
  const { username, email, password } = req.body;

  return createUser(username, email, password, db, res);
});

const comparePasswords = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const db = req.app.locals.db;

    // Truy vấn người dùng theo email
    const userQuery = "SELECT * FROM Users WHERE email = ? OR username = ?";
    db.query(userQuery, [username, username], (err, results) => {
      if (err) {
        console.error("Lỗi truy vấn cơ sở dữ liệu: " + err.message);
        return res.status(500).json({ message: "Lỗi đăng nhập người dùng." });
      }

      console.log(results.length);
      if (results.length === 0) {
        return res.status(404).json({ message: "Người dùng không tồn tại." });
      }

      const user = results[0];
      // So sánh mật khẩu
      const isPasswordValid = comparePasswords(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Mật khẩu không đúng." });
      }
      console.log("oke 2");

      // Tạo token
      const token = jwt.sign(
        { userId: user.id, username: user.username },
        process.env.SECRET_KEY,
        {
          expiresIn: "1h", // Thời gian hết hạn của token
        }
      );

      res.status(200).json({ token: token, userId: user.user_id, expiresIn: 3600 });
    });
  } catch (error) {
    console.error("Lỗi đăng nhập: " + error.message);
    res.status(500).json({ message: "Lỗi đăng nhập." });
  }
});

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
