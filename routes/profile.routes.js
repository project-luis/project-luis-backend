const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Teacher = require('../models/Teacher.model');
const Student = require('../models/Student.model');

//POST /profile
router.post('/profile', (req, res, next) => {
	const {
		fullname,
		password,
		email,
		avatarUrl,
		languages,
		linkedInUrl,
		githubUrl,
		field,
		serviceTime,
		Bootcamps,
		Modules,
	} = req.body;

	Teacher.create({
		fullname,
		password,
		email,
		avatarUrl,
		languages,
		linkedInUrl,
		githubUrl,
		field,
		serviceTime,
		Bootcamps: [],
		Modules: [],
	}).then((newTeacher) => {
		return Teacher.findByIdAndUpdate();
	});
});



//GET /:teacherId
router.get('/profile/:teacherId', (req, res, next) => {
	const { teacherId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(teacherId)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	Teacher.findById(teacherId)
		.populate('Bootcamps')
		.populate('Modules')
		.then((teacherDetails) => res.json(teacherDetails))
		.catch((err) => res.json(err));
});

//PUT /:teacherId
router.put('/profile/:teacherId', (req, res, next) => {
	const { teacherId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(teacherId)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	Teacher.findByIdAndUpdate(teacherId, req.body, { new: true })
		.then((updatedTeacher) => res.json(updatedTeacher))
		.catch((err) => res.json(err));
});

//DELETE /:teacherId
router.delete('/profile/:teacherId', (req, res, next) => {
	const { teacherId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(teacherId)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	Teacher.findByIdAndDelete(teacherId)
		.then(() =>
			res.json({
				message: 'Teacher was successfully deleted'
			})
		)
		.catch((err) => res.json(err));
});