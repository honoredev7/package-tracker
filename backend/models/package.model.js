import mongoose from "mongoose";

const PackageSchema = new mongoose.Schema({
	description: String,
	weight: Number,
	width: Number,
	height: Number,
	depth: Number,
	from_name: String,
	from_address: String,
	from_location: {
		lat: Number,
		lng: Number,
	},
	to_name: String,
	to_address: String,
	to_location: {
		lat: Number,
		lng: Number,
	},
}, { timestamps: true });

const Package = mongoose.models.Package || mongoose.model('Package', PackageSchema);

export default Package;