const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Member = require('../models/Member');

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// POST /api/members - Add a new member
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, role, email, registrationNo } = req.body; // Extract registrationNo from the body
    const image = req.file.filename;

    // Validate that the required fields are present
    if (!name || !role || !email || !registrationNo || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newMember = new Member({
      name,
      role,
      email,
      registrationNo, // Save the registrationNo
      image,
    });

    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ message: 'Error adding member', error });
  }
});

// GET /api/members - Get all members
router.get('/', async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching members', error });
  }
});

// GET /api/members/:id - Get a specific member by ID
router.get('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching member', error });
  }
});

// DELETE /api/members/:id - Delete a specific member by ID
router.delete('/:id', async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json({ message: 'Member deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting member', error });
  }
});

module.exports = router;
