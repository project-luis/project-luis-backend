const express = require('express');
const router = express.Router();

// ℹ️ Handles password encryption
const bcrypt = require('bcrypt');

// ℹ️ Handles password encryption
const jwt = require('jsonwebtoken');

// Require the Teacher model in order to interact with the database
const Teacher = require('../models/Teacher.model.js');

// Require necessary (isAuthenticated) middleware in order to control access to specific routes
const { isAuthenticated } = require('../middleware/jwt.middleware.js');

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;

// POST /auth/signup  - Creates a new teacher in the database
router.post('/signup', (req, res, next) => {
	const { email, password, fullName } = req.body;

	// Check if email or password or name are provided as empty strings
	if (email === '' || password === '' || fullName === '') {
		res.status(400).json({ message: 'Provide email, password and name' });
		return;
	}

	// This regular expression check that the email is of a valid format
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
	if (!emailRegex.test(email)) {
		res.status(400).json({ message: 'Provide a valid email address.' });
		return;
	}

	// This regular expression checks password for special characters and minimum length
	const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
	if (!passwordRegex.test(password)) {
		res.status(400).json({
			message:
				'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.',
		});
		return;
	}

	// Check the teachers collection if a teacher with the same email already exists
	Teacher.findOne({ email })
		.then((foundTeacher) => {
			// If the teacher with the same email already exists, send an error response
			if (foundTeacher) {
				res.status(400).json({ message: 'Teacher already exists.' });
				return;
			}

			// If email is unique, proceed to hash the password
			const salt = bcrypt.genSaltSync(saltRounds);
			const hashedPassword = bcrypt.hashSync(password, salt);

			// Create the new teacher in the database
			// We return a pending promise, which allows us to chain another `then`
			return Teacher.create({ email, password: hashedPassword, fullName });
		})
		.then((createdTeacher) => {
			// Deconstruct the newly created teacher object to omit the password
			// We should never expose passwords publicly
			const { email, _id, fullName } = createdTeacher;

			// Create a new object that doesn't expose the password
			const teacher = { email, _id, fullName };

			// Send a json response containing the teacher object
			res.status(201).json({ teacher: teacher });
		})
		.catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
});

// POST  /auth/login - Verifies email and password and returns a JWT
router.post('/login', (req, res, next) => {
	const { email, password } = req.body;

	// Check if email or password are provided as empty string
	if (email === '' || password === '') {
		res.status(400).json({ message: 'Provide email and password.' });
		return;
	}

	// Check the teachers collection if a teacher with the same email exists
	Teacher.findOne({ email })
		.then((foundTeacher) => {
			if (!foundTeacher) {
				// If the teacher is not found, send an error response
				res.status(401).json({ message: 'Teacher not found.' });
				return;
			}

			// Compare the provided password with the one saved in the database
			const passwordCorrect = bcrypt.compareSync(
				password,
				foundTeacher.password
			);

			if (passwordCorrect) {
				// Deconstruct the teacher object to omit the password
				const { _id, email } = foundTeacher;

				// Create an object that will be set as the token payload
				const payload = { _id, email };

				// Create a JSON Web Token and sign it
				const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
					algorithm: 'HS256',
					expiresIn: '6h',
				});

				// Send the token as the response
				res.status(200).json({ authToken: authToken });
			} else {
				res.status(401).json({ message: 'Unable to authenticate the teacher' });
			}
		})
		.catch((err) => next(err)); // In this case, we send error handling to the error handling middleware.
});

// GET  /auth/verify  -  Used to verify JWT stored on the client
router.get('/verify', isAuthenticated, (req, res, next) => {
	// If JWT token is valid the payload gets decoded by the
	// isAuthenticated middleware and is made available on `req.payload`
	console.log(`req.payload`, req.payload);

	// Send back the token payload object containing the teacher data
	res.status(200).json(req.payload);
});

module.exports = router;
