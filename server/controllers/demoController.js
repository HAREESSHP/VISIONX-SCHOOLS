const DemoRequest = require('../models/DemoRequest');

// @desc    Submit a demo request
// @route   POST /api/demo
// @access  Public
const submitDemoRequest = async (req, res) => {
  try {
    const { name, email, phone, schoolName, message } = req.body;

    // Validation
    if (!name || !email || !phone || !schoolName) {
      return res.status(400).json({
        message: 'Name, email, phone, and school name are required'
      });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    const demoRequest = await DemoRequest.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      schoolName: schoolName.trim(),
      message: message ? message.trim() : ''
    });

    res.status(201).json({
      message: 'Demo request submitted successfully! Our team will contact you soon.',
      demoRequest: {
        id: demoRequest._id,
        name: demoRequest.name,
        email: demoRequest.email,
        schoolName: demoRequest.schoolName,
        status: demoRequest.status
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while submitting demo request' });
  }
};

module.exports = { submitDemoRequest };