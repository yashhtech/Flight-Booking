const DestinationCard = () => {
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg">
      <img
        src="img"
        alt="destination"
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg">Paris</h3>
        <p className="text-sm text-gray-500">France</p>
      </div>
    </div>
  )
}

export default DestinationCard
