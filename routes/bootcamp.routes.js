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

//POST /bootcamps - Creates a new module
router.post('/bootcamps/:bootcampId/module', (req, res, next) => {
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
				$push: { module: newModule._id },
			});
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

//GET /bootcamps/:bootcampId - Retrieves a spesific Bootcamp by id
router.get('/bootcamps/:bootcampId', (res, req, next) => {
	const { bootcampId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(bootcampId)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	Bootcamp.findById(bootcampId)
		.populate('Module')
		.populate('Teacher')
		.then((bootcamp) => res.status(200).json(bootcamp))
		.catch((err) => res.json(err));
});

// PUT /bootcamps/:bootcampsId - update specific bootcamp by id
router.put('/bootcamps/:bootcampId', (req, res, next) => {
	const { bootcampId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(bootcampId)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	Module.findByIdAndUpdate(bootcampId, req.body, { new: true })
		.then((updatedBootcamp) => res.json(updatedBootcamp))
		.catch((err) => res.json(err));
});

// DELETE /bootcamps/:bootcampId
router.delete('/bootcamps/:bootcampId', (req, res, next) => {
	const { bootcampId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(bootcampId)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	Module.findByIdAnRemove(bootcampId)
		.then(() =>
			res.json({
				message: `Bootcamp with ${bootcampId} is removed successfully`,
			})
		)
		.catch((err) => res.json(err));
});

// --------------------------------------------------------------------  //

//POST /bootcamps - Creates a new module
router.post('/bootcamps/:bootcampId', (req, res, next) => {
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
