import { WebSocketServer } from "ws";
import { updateDeliveryLocation, updateDeliveryStatus } from "../services/delivery.service.js";
import { wsEvents } from "../enums/websocket.enums.js";

let wss;

const initWebSocket = (server) => {
	wss = new WebSocketServer({ server });

	wss.on("connection", (ws) => {
		ws.on("message", async (message) => {
			const data = JSON.parse(message);

			if (data.event === wsEvents.LOCATION_CHANGED) {
				const delivery = await updateDeliveryLocation(
					data.delivery_id,
					data.location
				);

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

export default initWebSocket;
