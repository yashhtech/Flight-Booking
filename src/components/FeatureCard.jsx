const FeatureCard = ({ title }) => {
  return (
    <div className="p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition">
      <div className="text-3xl mb-4">✈️</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-gray-500 text-sm">
        Lorem ipsum dolor sit amet consectetur.
      </p>
    </div>
  )
}

export default FeatureCard
