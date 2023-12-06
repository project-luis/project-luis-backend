const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const studentSchema = new Schema(
	{
		fullName: {
			type: String,
			required: [true, 'Full name is required.'],
		},
		password: {
			type: String,
			required: [true, 'Password is required.'],
		},
		email: {
			type: email,
			required: [true, 'Email is required.'],
			lowercase: true,
			trim: true,
		},
		avatarUrl: {
			type: String,
			default: 'https://static.thenounproject.com/png/1876981-200.png',
		},
		languages: {
			type: [String],
			default: '',
		},
		socialLink: {
			type: [String],
			default: '',
		},
		githubLink: {
			type: String,
			default: '',
		},
		startDate: {
			type: Date,
		},
		rank: {
			type: String,
			enum: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Challenger'],
		},
		Bootcamps: {
			type: Schema.Types.ObjectId,
			ref: 'Bootcamp',
		},
		Modules: {
			type: Schema.Types.ObjectId,
			ref: 'Module',
		},
		studentId: {
			type: Number,
			required: true,
		},
	},
	{
		// this second object adds extra properties: `createdAt` and `updatedAt`
		timestamps: true,
	}
);

const Student = model('Student', studentSchema);

module.exports = Student;
