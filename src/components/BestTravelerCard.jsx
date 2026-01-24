const BestTravelerCard = ({
  placeImage,
  personImage,
  name,
  quote,
}) => {
  return (
    <div
      className="
        group
        flex flex-col items-center text-center
        w-[230px] sm:w-[250px]
        rounded-[40px]
        rounded-t-[140px]
        border border-black/5
        bg-white
        shadow-[0_10px_25px_rgba(0,0,0,0.08)]
        hover:shadow-[0_28px_80px_rgba(0,0,0,0.30)]
        transition-all duration-500 ease-out
        hover:-translate-y-3
        pb-6
      "
    >
      {/* IMAGE WRAPPER (ROUNDED TOP) */}
      <div className="relative w-full h-[260px] overflow-visible">
        {/* PLACE IMAGE */}
        <div
          className="
            w-full h-full
            rounded-t-[140px]
            overflow-hidden
          "
        >
          <img
            src={placeImage}
            alt="place"
            className="
              w-full h-full object-cover
              group-hover:scale-110
              transition-transform duration-700 ease-out
            "
          />
        </div>

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 rounded-t-[140px] bg-black/10 group-hover:bg-black/20 transition" />

        {/* PERSON IMAGE (HALF IN / HALF OUT) */}
        <div
          className="
            absolute
            left-1/2 bottom-0
            -translate-x-1/2 translate-y-1/2
            w-24 h-24
            rounded-full
            border-[5px] border-white
            bg-white
            shadow-2xl
            z-20
            overflow-hidden
          "
        >
          <img
            src={personImage}
            alt={name}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>

      {/* TEXT */}
      <h3 className="mt-16 text-xl font-extrabold text-[#0d121b]">
        {name}
      </h3>

      <p className="mt-2 text-base  text-gray-900 font-serif font-medium max-w-[200px] leading-relaxed">
        {quote}
      </p>
    </div>
  )
}

export default BestTravelerCard
