// recordRouter.js
const express = require('express');
const router = express.Router();
const Record = require('../models/Record');

router.get('/', async (req, res) => {
  try {
    const records = await Record.find().populate('domainId');
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const record = new Record({
    domainId: req.body.domainId,
    type: req.body.type,
    value: req.body.value,
  });

  try {
    const newRecord = await record.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const updatedRecord = await Record.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedRecord = await Record.findByIdAndDelete(req.params.id);
    res.json(deletedRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
