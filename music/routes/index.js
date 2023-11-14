var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  console.log("Done");
  res.send('Hello World!');
});

module.exports = router;
