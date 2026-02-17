import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-6">
			<h1 className="text-6xl font-bold text-gray-800 mb-4">
				404
			</h1>

			<p className="text-lg text-gray-600 mb-6">
				The page you are looking for does not exist.
			</p>

			<Link
				to="/login"
				className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
			>
				Go to Login
			</Link>
		</div>
	);
}

export default NotFound
