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

//PUT /:teacherId

//DELETE /:teacherId
