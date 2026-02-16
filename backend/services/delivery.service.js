import { deliveryStatus } from "../enums/delivery.enums.js";
import Delivery from "../models/delivery.model.js";

export  const updateDeliveryStatus = async (delivery_id, newStatus) => {
	const delivery = await Delivery.findOne({ _id: delivery_id });

	if (!delivery) throw new Error("Delivery not found");

	const oldStatus = delivery.status;

	if (oldStatus === deliveryStatus.OPEN && newStatus === deliveryStatus.PICKED_UP) {
		delivery.pickup_time = new Date();
	}

	if (oldStatus === deliveryStatus.PICKED_UP && newStatus === deliveryStatus.IN_TRANSIT) {
		delivery.start_time = new Date();
	}

	if (
		oldStatus === deliveryStatus.IN_TRANSIT &&
		(newStatus === deliveryStatus.DELIVERED || newStatus === deliveryStatus.FAILED)
	) {
		delivery.end_time = new Date();
	}

	delivery.status = newStatus;

	await delivery.save();

	return delivery;
}
