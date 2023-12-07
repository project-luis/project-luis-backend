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

const Bootcamp = model('Bootcamp', bootcampSchema);

module.exports = Bootcamp;

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
