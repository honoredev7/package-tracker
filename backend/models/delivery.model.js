import mongoose from "mongoose";
import { deliveryStatus } from "../enums/delivery.enums.js";

const DeliverySchema = new mongoose.Schema({
	package: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Package",
		required: [true, "Package is required"],
	},
	pickup_time: Date,
	start_time: Date,
	end_time: Date,
	location: {
		lat: Number,
		lng: Number,
	},
	status: {
		type: String,
		enum: [deliveryStatus.OPEN, deliveryStatus.PICKED_UP, deliveryStatus.IN_TRANSIT, deliveryStatus.DELIVERED, deliveryStatus.FAILED],
		default: deliveryStatus.OPEN,
	},
}, { timestamps: true });

DeliverySchema.index(
	{ package: 1 },
	{
		unique: [true, "A delivery for this package already exists"],
		partialFilterExpression: {
			status: { $in: [deliveryStatus.OPEN, deliveryStatus.PICKED_UP, deliveryStatus.IN_TRANSIT] }
		}
	}
);

const Delivery = mongoose.models.Delivery || mongoose.model('Delivery', DeliverySchema);

export default Delivery;
