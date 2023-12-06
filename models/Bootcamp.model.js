const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const bootcampSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Full name is required.'],
		},
		description: {
			type: String,
			default: '',
		},
		teacher: {
			type: Schema.Types.ObjectId,
			ref: 'Teacher',
		},
		avatarUrl: {
			type: String,
			default:
				'https://thenounproject.com/api/private/icons/1134418/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0',
		},
		languages: {
			type: [String],
			default: '',
		},
		fullOrPartTime: {
			type: [String],
			enum: ['Full-Time', 'Part-Time'],
		},
		bootcampCode: {
			type: String,
			default: '',
		},
		hoursPerWeek: {
			type: Number,
			default: '',
		},
		courseLength: {
			type: Number,
		},
		startDate: {
			type: Date,
		},
		endDate: {
			type: Date,
		},
		daysofWeek: {
			type: Number,
		},
		Modules: {
			type: Schema.Types.ObjectId,
			ref: 'Module',
		},
	},
	{
		// this second object adds extra properties: `createdAt` and `updatedAt`
		timestamps: true,
	}
);

const Bootcamp = model('Bootcamp', bootcampSchema);

module.exports = Bootcamp;
