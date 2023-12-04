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

const isAuthenticated = (req, res, next) => {
  console.log("Hello 1");
  const token = req.headers.authorization.split(" ")[1];
  console.log("Hello 2", token);

  if (!token) {
    console.log("Not token");
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Xác thực token
    console.log("vào try");
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY, {
      algorithms: ["HS256"],
    });

    // Thêm thông tin người dùng vào req để sử dụng ở các middleware hoặc route khác
    console.log("sử dụng decodedToken");
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Invalid token:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

const createUser = async (username, email, password, db, res) => {
  // Kiểm tra có tồn tại mail chưa (injection)
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
        {
          userId: user.id,
          username: user.username,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );

      res
        .status(200)
        .json({ token: token, userId: user.user_id, userName: user.username, expiresIn: 3600 });
    });
  } catch (error) {
    console.error("Lỗi đăng nhập: " + error.message);
    res.status(500).json({ message: "Lỗi đăng nhập." });
  }
});

router.get("/me", isAuthenticated, (req, res) => {
  // Thông tin người dùng đã được thêm vào req.user trong quá trình xác thực
  const user = req.user;

  // Trả về thông tin người dùng
  return res
    .status(200)
    .json({ user: { userId: user.id, username: user.username } });
});

router.get("/logout", isAuthenticated, (req, res) => {
  try {
    res.setHeader("Authorization", ""); // Xóa token khỏi header
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
