const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Bootcamp = require('../models/Bootcamp.model.js');

const Module = require('../models/Module.model.js');

// GET /modules/:moduleId - Retrieve single the Module
router.get('/:moduleId', (req, res, next) => {
	const { moduleId } = req.params;
	Module.findById(moduleId)
		.then((moduleDetails) => res.json(moduleDetails))
		.catch((err) => res.json(err));
});

// PUT /modules/:moduleId - update specific module
router.put('/:moduleId', (req, res, next) => {
	const { moduleId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(moduleId)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	Module.findByIdAndUpdate(moduleId, req.body, { new: true })
		.then((updatedModule) => res.json(updatedModule))
		.catch((err) => res.json(err));
});

// PUT /modules/:moduleId/associate/:bootcampId - associate module with bootcamp
router.put('/:moduleId/associate/:bootcampId', async (req, res, next) => {
	const { moduleId, bootcampId } = req.params;

	console.log('Module ID:', moduleId);
	console.log('Bootcamp ID:', bootcampId);

	try {
		if (
			!mongoose.Types.ObjectId.isValid(moduleId) ||
			!mongoose.Types.ObjectId.isValid(bootcampId)
		) {
			return res.status(400).json({ message: 'Specified id is not valid' });
		}

		const bootcamp = await Bootcamp.findById(bootcampId);
		if (!bootcamp) {
			return res.status(404).json({ message: 'Bootcamp not found' });
		}

		const module = await Module.findById(moduleId);
		if (!module) {
			return res.status(404).json({ message: 'Module not found' });
		}

		// Check if the module is already associated with the bootcamp
		if (bootcamp.modules.includes(moduleId)) {
			return res
				.status(400)
				.json({ message: 'Module already associated with the bootcamp' });
		}

		// Associate the module with the bootcamp
		bootcamp.modules.push(moduleId);
		await bootcamp.save();

		res.json({ message: 'Module associated with the bootcamp successfully' });
	} catch (error) {
		console.error(
			'Error in PUT /modules/:moduleId/associate/:bootcampId:',
			error
		);
		res.status(500).json({ message: 'Internal server error' });
	}
});

// DELETE /modules/:moduleId
router.delete('/:moduleId', (req, res, next) => {
	const { moduleId } = req.params;

	if (!mongoose.Types.ObjectId.isValid(moduleId)) {
		res.status(400).json({ message: 'Specified id is not valid' });
		return;
	}

	Module.findByIdAndDelete(moduleId)
		.then(() =>
			res.json({ message: `Bootcamp with ${moduleId} is removed successfully` })
		)
		.catch((err) => res.json(err));
});

module.exports = router;
