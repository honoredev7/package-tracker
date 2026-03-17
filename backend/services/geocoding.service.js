import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const geocodeAddress = async (address) => {
	const apiKey = process.env.OPENCAGE_API_KEY;

	const response = await axios.get(
		"https://api.opencagedata.com/geocode/v1/json",
		{
			params: {
				q: address,
				key: apiKey,
			},
		}
	);

	const location = response.data.results[0].geometry;

	return {
		lat: location.lat,
		lng: location.lng,
	};
}