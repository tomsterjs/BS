const express = require('express');
const router = express.Router();

router.get('/search', function (req, res) {
  res.send('Works');
});

module.exports = router;
