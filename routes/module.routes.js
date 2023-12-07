const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

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

// DELETE /modules/:moduleId
router.delete('/:moduleId', (req, res, next) => {
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

module.exports = router;
