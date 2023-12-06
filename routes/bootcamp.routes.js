const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Bootcamp = require('../models/Bootcamp.model.js');
const Module = require('../models/Module.model.js');

//POST /bootcamps - Creates a new bootcamp
router.post('/bootcamps', (req, res, next) => {
	const {
		name,
		description,
		teacher,
		avatarUrl,
		languages,
		fullOrPartTime,
		bootcampCode,
		hoursPerWeek,
		courseLength,
		startDate,
		endDate,
		daysofWeek,
		Modules,
	} = req.body;

	Bootcamp.create({
		name,
		description,
		teacher,
		avatarUrl,
		languages,
		fullOrPartTime,
		bootcampCode,
		hoursPerWeek,
		courseLength,
		startDate,
		endDate,
		daysofWeek,
		Modules: [],
	})
		.then((response) => res.json(response))
		.catch((err) => {
			res.json(err);
		});
});

//POST /boomcamps/modules - Creates a new module
router.post('/bootcamps/modules', (req, res, next) => {
	const {
		name,
		description,
		bootcamps,
		teachers,
		avatarUrl,
		moduleCode,
		hoursPerWeek,
		startDate,
		endDate,
		startTime,
		endTime,
		daysofWeek,
	} = req.body;

	Module.create({
		name,
		description,
		bootcamps: [],
		teachers: [],
		avatarUrl,
		moduleCode,
		hoursPerWeek,
		startDate,
		endDate,
		startTime,
		endTime,
		daysofWeek,
	})
		.then((response) => {
			res.json(response);
		})
		.catch((err) => res.json(err));
});

//GET /bootcamps - Retreieve all of the bootcamps
router.get('/bootcamps', (req, res, next) => {
	Bootcamp.find()
		.populate('Module')
		.populate('Teacher')
		.then((allBootcamps) => res.json(allBootcamps))
		.catch((err) => res.json(err));
});

//GET /bootcamps/:bootcampId - Retrieves a spesific module by id
router.get('/bootcamps/:bootcampId', (res, req, next) => {
	const { bootcampId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(bootcampId)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	Bootcamp.findById(bootcampId)
		.populate('module')
		.then((bootcamp) => res.status(200).json(bootcamp))
		.catch((err) => res.json(err));
});
