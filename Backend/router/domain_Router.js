// domainRouter.js
const express = require('express');
const router = express.Router();
const Domain = require('../models/domain_M');

router.get('/', async (req, res) => {
  try {
    const domains = await Domain.find();
    res.json(domains);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const domain = new Domain({
    name: req.body.name,
  });

  try {
    const newDomain = await domain.save();
    res.status(201).json(newDomain);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
