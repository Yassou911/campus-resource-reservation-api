const sendError = require('../helpers/sendError');
const auth = require('../middleware/authMiddleware');
const validate = require('../middleware/validateRequest');
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const [rows] = await db.query('SELECT reservation_id, user_id, resource_id, start_time, end_time, status FROM reservations');
    res.json(rows);
  } catch (err) {
    next(err);   
  }
});

router.post(
  '/',
  auth,
  validate(['user_id', 'resource_id', 'start_time', 'end_time']),
  async (req, res) => {
    const { user_id, resource_id, start_time, end_time } = req.body;

    if (!req.body.start_time) {
      return res.status(400).json({
        error: 'start_time is required'
      });
    }

    if (!resource_id) {
        return res.status(400).json({
          error: 'resource_id is required'
        });
    }


    // End time must be after start time
    if (new Date(end_time) <= new Date(start_time)) {
      return sendError(res, 400, "End time must be after start time");
    }

    const [resource] = await db.query(
      'SELECT resource_id FROM resources WHERE resource_id = ?',
      [resource_id]
    );

    if (resource.length === 0) {
      return sendError(res, 400, "Resource does not exist");
    }

    const [result] = await db.query(
      `INSERT INTO reservations (user_id, resource_id, start_time, end_time)
       VALUES (?, ?, ?, ?)`,
      [user_id, resource_id, start_time, end_time]
    );

    res.status(201).json({ reservation_id: result.insertId });
  }
);


module.exports = router;

