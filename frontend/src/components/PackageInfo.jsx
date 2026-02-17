export default function PackageInfo({ pkg }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold mb-4">Package Details</h3>

      <p><span className="font-medium">Description:</span> {pkg.description}</p>
      <p><span className="font-medium">Weight:</span> {pkg.weight} g</p>
      <p><span className="font-medium">From:</span> {pkg.from_address}</p>
      <p><span className="font-medium">To:</span> {pkg.to_address}</p>
    </div>
  );
}
