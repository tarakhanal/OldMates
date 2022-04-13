const mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    FirstName: {
        type: String,
        required: true
    },
	LastName: {
        type: String,
        required: true
    },
	Email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
	Password: {
        type: String,
        required: true
    },
	Birthday: {
        Day: Number,
        Month: Number,
        Year: Number
    },
	CreatedOn: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    },
	UpdatedOn: {
        type: Date,
        default: () => Date.now()
    },
	Verified: {
        type: Boolean,
        default: false
    },
	ProfilePicture: {
        type: String,
        default: "profile.svg"
    },
	Socials: [String],
	Connections: [mongoose.SchemaTypes.ObjectId]

});

module.exports = mongoose.model("User", userSchema);
