const express = require('express');
const passport = require('passport');

const CpuData = require('../models/CpuData');


const router = express.Router();

router.get('/latestData', passport.authenticate('jwt', { session: false }), (req, res) => {
  CpuData.getLatestData((err, data) => {
    if (err) return res.json({});
    return res.json(data);
  });
});

module.exports = router;
