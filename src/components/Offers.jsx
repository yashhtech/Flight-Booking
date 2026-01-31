const Offers = () => {
  return (
    <div className="bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">🔥 Deals & Offers</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-4 rounded-lg bg-blue-50">
          <h3 className="font-bold">FLY500</h3>
          <p>Get ₹500 off on domestic flights</p>
        </div>

        <div className="p-4 rounded-lg bg-green-50">
          <h3 className="font-bold">INTL10</h3>
          <p>10% off on international bookings</p>
        </div>

        <div className="p-4 rounded-lg bg-yellow-50">
          <h3 className="font-bold">HOTEL200</h3>
          <p>₹200 off on hotel bookings</p>
        </div>
      </div>
    </div>
  );
};

export default Offers;
