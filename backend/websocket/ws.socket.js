import WebSocket from "ws";
import Delivery from "../models/delivery.model.js";
import { updateDeliveryStatus } from "../services/delivery.service.js";
import { wsEvents } from "../enums/websocket.enums.js";

let wss;

const initWebSocket = (server) => {
	wss = new WebSocket.Server({ server });

	wss.on("connection", (ws) => {
		ws.on("message", async (message) => {
			const data = JSON.parse(message);

			if (data.event === wsEvents.LOCATION_CHANGED) {
				const delivery = await Delivery.findOne({
					_id: data.delivery_id,
				});

				delivery.location = data.location;
				await delivery.save();

				broadcast(wsEvents.DELIVERY_UPDATED, delivery);
			}

			if (data.event === wsEvents.STATUS_CHANGED) {
				const delivery = await updateDeliveryStatus(
					data.delivery_id,
					data.status
				);

				broadcast(wsEvents.DELIVERY_UPDATED, delivery);
			}
		});
	});
}

function broadcast(event, payload) {
	const message = JSON.stringify({
		event,
		data: payload,
	});

	wss.clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(message);
		}
	});
}

module.exports = { initWebSocket };
