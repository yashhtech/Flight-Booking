const SearchCard = () => {
  return (
    <div className="mt-8 bg-white rounded-full shadow-md p-4 grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
      <input className="outline-none text-sm" placeholder="From" />
      <input className="outline-none text-sm" placeholder="To" />
      <input className="outline-none text-sm" placeholder="Date" />
      <input className="outline-none text-sm" placeholder="Travelers" />

      <button className="bg-primary text-white px-4 py-2 rounded-full text-sm">
        Find Ticket
      </button>
    </div>
  );
};

export default SearchCard;
