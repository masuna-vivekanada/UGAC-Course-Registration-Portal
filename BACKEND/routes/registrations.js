const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');
const Course = require('../models/Course');
const { authenticate, isAdmin } = require('../middleware/auth');

// Enroll in a course (logged in user)
router.post('/', authenticate, async (req, res) => {
  try {
    const { courseId } = req.body;

    // Already registered చేశాడా check
    const existing = await Registration.findOne({
      user: req.user.id,
      course: courseId
    });
    if (existing) {
      return res.status(400).json({ message: 'Already registered for this course' });
    }

    // Seats available గా ఉన్నాయా check
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (course.seatsLeft <= 0) {
      return res.status(400).json({ message: 'No seats available' });
    }

    const registration = new Registration({
      user: req.user.id,
      course: courseId
    });
    await registration.save();

    res.status(201).json({ message: 'Enrolled successfully', registration });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// My registrations (logged in user)
router.get('/my', authenticate, async (req, res) => {
  try {
    const registrations = await Registration.find({ user: req.user.id })
      .populate('course');
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// All registrations (admin only)
router.get('/all', authenticate, isAdmin, async (req, res) => {
  try {
    const registrations = await Registration.find()
      .populate('user', 'name ldapId')
      .populate('course', 'code title');
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Accept / Reject (admin only)
router.put('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;

    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    // Accept అయితే seats తగ్గించు
    if (status === 'accepted') {
      await Course.findByIdAndUpdate(
        registration.course,
        { $inc: { seatsLeft: -1 } }
      );
    }

    res.json(registration);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;