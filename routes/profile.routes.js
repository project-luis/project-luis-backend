const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Teacher = require('../models/Teacher.model');
const Student = require('../models/Student.model');

//POST /profile
router.post('/', (req, res, next) => {
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
		aboutUser,
		bootcamps,
		modules,
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
		aboutUser,
		bootcamps: [],
		modules: [],
	}).then((newTeacher) => {
		return Teacher.findByIdAndUpdate();
	});
});

// GET for testing all profiles
router.get('/', (req, res, next) => {
	Teacher.find()
		.populate('bootcamps')
		.populate('modules')
		.then((allTeachers) => res.json(allTeachers))
		.catch((err) => res.json(err));
});

//GET /:teacherId
router.get('/:teacherId', (req, res, next) => {
	const { teacherId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(teacherId)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	Teacher.findById(teacherId)
		.populate('bootcamps')
		.populate('modules')
		.then((teacherDetails) => res.json(teacherDetails))
		.catch((err) => res.json(err));
});

//PUT /:teacherId
router.put('/:teacherId', (req, res, next) => {
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
router.delete('/:teacherId', (req, res, next) => {
	const { teacherId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(teacherId)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	Teacher.findByIdAndDelete(teacherId)
		.then(() =>
			res.json({
				message: 'Teacher was successfully deleted',
			})
		)
		.catch((err) => res.json(err));
});

module.exports = router;
