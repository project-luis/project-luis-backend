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
			type: String,
			required: [true, 'Email is required.'],
			lowercase: true,
			trim: true,
			unique: true,
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
			default: "https://",
		},
		githubUrl: {
			type: String,
			default: "https://",
		},
		field: {
			type: [String],
			default: '',
		},
		serviceTime: {
			type: Number,
		},
		aboutUser: {
			type: String,
			default: "",
		},
		bootcamps: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Bootcamp',
			},
		],
		modules: [
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
