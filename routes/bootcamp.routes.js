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
router.post('/bootcamps', (req, res, next) => {
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

// GET /bootcamps/modules/:moduleId **** ????
router.get('/bootcamps/modules/:moduleId', (req, res, next) => {
	const { moduleId } = req.params;
	Module.findById(moduleId)
		.then((moduleDetails) => res.json(moduleDetails))
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

// PUT /bootcamps/modules/:moduleId - update specific module
router.put('/bootcamps/modules/:moduleId', (req, res, next) => {
	const { moduleId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(moduleId)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	Module.findByIdAndUpdate(moduleId, req.body, { new: true })
		.then((updatedModule) => res.json(updatedModule))
		.catch((err) => res.json(err));
});

// DELETE /bootcamps/:bootcampId
router.delete('/bootcmaps/:bootcampId', (req, res, next) => {
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

// DELETE /bootcamps/modules/:moduleId
router.delete('/bootcamps/modules/:moduleId', (req, res, next) => {
	const { moduleId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(moduleId)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	Module.findByIdAnRemove(moduleId)
		.then(() =>
			res.json({ message: `Bootcamp with ${moduleId} is removed successfully` })
		)
		.catch((err) => res.json(err));
});



// add mod to boot
// - Boot,create()
// - Boot.fındBIdAndUpdate

// detaıls of Module, see related Bootcamps




// dısplay detaıls of Bootcamp --> Boot.fındById().populate("module")
// dısplay detaıls of a Module --> Module.fındBygiId() + Boot.fındById()


// opt 1 and opt 2:
// R  --> may be more dıffıcult 
// C U D  --> easıer

// opt 3:
// R  --> easıer
// C U D  --> may be more dıffıcult 

// create bootcamp UX
// Boot.create() + Module.fındByIdANdUpdate()