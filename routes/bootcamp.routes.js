const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Bootcamp = require('../models/Bootcamp.model.js');
const Module = require('../models/Module.model.js');

//POST /bootcamps - Creates a new bootcamp
router.post('/', (req, res, next) => {
	console.log(req.payload);
	const {
		name,
		description,
		avatarUrl,
		languages,
		fullOrPartTime,
		bootcampCode,
		hoursPerWeek,
		courseLength,
		startDate,
		endDate,
		daysofWeek,
		modules,
	} = req.body;

	Bootcamp.create({
		name,
		description,
		teacher: req.payload._id,
		avatarUrl,
		languages,
		fullOrPartTime,
		bootcampCode,
		hoursPerWeek,
		courseLength,
		startDate,
		endDate,
		daysofWeek,
		modules: [],
	})
		.then((response) => res.json(response))
		.catch((err) => {
			res.json(err);
		});
});

//POST /bootcamps - Creates a new module
router.post('/:bootcampId/module', (req, res, next) => {
	const {
		name,
		description,
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
		avatarUrl,
		moduleCode,
		hoursPerWeek,
		startDate,
		endDate,
		startTime,
		endTime,
		daysofWeek,
	})
		.then((newModule) => {
			const { bootcampId } = req.params;
			return Bootcamp.findByIdAndUpdate(bootcampId, {
				$push: { modules: newModule._id },
			});
		})
		.then((response) => {
			res.json(response);
		})
		.catch((err) => res.json(err));
});

//GET /bootcamps - Retreieve all of the bootcamps
router.get('/', (req, res, next) => {
	Bootcamp.find()
		.populate('modules')
		.populate('teacher')
		.then((allBootcamps) => res.json(allBootcamps))
		.catch((err) => res.json(err));
});

//GET /bootcamps/:bootcampId - Retrieves a spesific Bootcamp by id
router.get('/:bootcampId', (req, res, next) => {
	const { bootcampId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(bootcampId)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	Bootcamp.findById(bootcampId)
		.populate('modules')
		.populate('teacher')
		.then((bootcampDetails) => res.json(bootcampDetails))
		.catch((err) => res.json(err));
});

// PUT /bootcamps/:bootcampsId - update specific bootcamp by id
router.put('/:bootcampId', (req, res, next) => {
	const { bootcampId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(bootcampId)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	Bootcamp.findByIdAndUpdate(bootcampId, req.body, { new: true })
		.then((updatedBootcamp) => res.json(updatedBootcamp))
		.catch((err) => res.json(err));
});

// DELETE /bootcamps/:bootcampId
router.delete('/:bootcampId', (req, res, next) => {
	const { bootcampId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(bootcampId)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	Bootcamp.findByIdAndDelete(bootcampId)
		.then(() =>
			res.json({
				message: `Bootcamp with ${bootcampId} is removed successfully`,
			})
		)
		.catch((err) => res.json(err));
});

// --------------------------------------------------------------------  //

//POST /bootcamps - Creates a new module
router.post('/:bootcampId', (req, res, next) => {
	const {
		name,
		description,
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
		avatarUrl,
		moduleCode,
		hoursPerWeek,
		startDate,
		endDate,
		startTime,
		endTime,
		daysofWeek,
	})
		.then((newModule) => {
			const { bootcampId } = req.body._id;
			return Bootcamp.findByIdAndUpdate(bootcampId, {
				$push: { module: newModule._id },
			});
		})
		.then((response) => {
			res.json(response);
		})
		.catch((err) => res.json(err));
});

module.exports = router;
