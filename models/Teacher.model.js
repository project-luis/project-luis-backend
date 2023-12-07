const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const teacherSchema = new Schema(
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
		linkedInUrl: {
			type: String,
			default: '',
		},
		githubUrl: {
			type: String,
			default: '',
		},
		field: {
			type: [String],
			default: '',
		},
		serviceTime: {
			type: Number,
		},
		Bootcamps: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Bootcamp',
			},
		],
		Modules: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Module',
			},
		],
	},
	{
		// this second object adds extra properties: `createdAt` and `updatedAt`
		timestamps: true,
	}
);

const Teacher = model('Teacher', teacherSchema);

module.exports = Teacher;
