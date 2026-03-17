import { useState } from "react";
import api from "../../api/axios";

const CreatePackage = () => {
	const [form, setForm] = useState({});
	const [success, setSuccess] = useState("");

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		await api.post("/api/package", form, { withCredentials: true });
		setSuccess("Package created successfully!");
	};

	return (
		<div className="bg-white p-6 rounded-xl shadow-lg">
			<h2 className="text-xl font-semibold mb-4">Create Package</h2>

			{success && (
				<div className="mb-4 p-3 bg-green-100 text-green-600 rounded-lg text-sm">
					{success}
				</div>
			)}

			<form onSubmit={handleSubmit} className="space-y-4">

				<input
					name="description"
					placeholder="Description"
					className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
					onChange={handleChange}
					required
				/>

				<div className="flex grid-cols-4 gap-4">
					<input
						name="weight"
						placeholder="Weight (grams)"
						type="number"
						min={0}
						className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
						onChange={handleChange}
						required
					/>

					<input
						name="width"
						placeholder="Width (cm)"
						type="number"
						min={0}
						className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
						onChange={handleChange}
						required
					/>

					<input
						name="height"
						placeholder="Height (cm)"
						type="number"
						min={0}
						className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
						onChange={handleChange}
						required
					/>

					<input
						name="depth"
						placeholder="Depth (cm)"
						type="number"
						min={0}
						className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
						onChange={handleChange}
						required
					/>
				</div>

				<div className="flex grid-cols-2 gap-4">
					<input
						name="from_name"
						placeholder="From Name"
						className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
						onChange={handleChange}
						required
					/>

					<input
						name="from_address"
						placeholder="From Address"
						className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
						onChange={handleChange}
						required
					/>

				</div>

				<div className="flex grid-cols-2 gap-4">
					<input
						name="to_name"
						placeholder="To Name"
						className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
						onChange={handleChange}
						required
					/>

					<input
						name="to_address"
						placeholder="To Address"
						className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
						onChange={handleChange}
						required
					/>
				</div>

				<button
					type="submit"
					className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
				>
					Create Package
				</button>
			</form>
		</div>
	);
}

export default CreatePackage;
