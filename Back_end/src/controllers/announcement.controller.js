const Announcement = require('../models/announcement.model');
const Joi = require('joi');

const announcementSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  date: Joi.string().required(),
  priority: Joi.string().valid('low', 'medium', 'high').required(),
});

exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.status(200).json({
      success: true,
      message: 'Announcements retrieved successfully',
      data: announcements,
      count: announcements.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve announcements',
      error: error.message
    });
  }
};

exports.createAnnouncement = async (req, res) => {
  try {
    const { error } = announcementSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: error.details[0].message
      });
    }

    const announcement = new Announcement(req.body);
    await announcement.save();
    
    res.status(201).json({
      success: true,
      message: 'Announcement created successfully',
      data: announcement
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create announcement',
      error: error.message
    });
  }
};

exports.updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = announcementSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: error.details[0].message
      });
    }

    const updated = await Announcement.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found',
        error: 'No announcement exists with the provided ID'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Announcement updated successfully',
      data: updated
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update announcement',
      error: error.message
    });
  }
};

exports.deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Announcement.findByIdAndDelete(id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Announcement not found',
        error: 'No announcement exists with the provided ID'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Announcement deleted successfully',
      data: deleted
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete announcement',
      error: error.message
    });
  }
};