import React, { memo, useEffect, useRef, useState } from "react"

const BestTravelerCard = memo(
  ({ placeImage, personImage, name, quote }) => {
    const cardRef = useRef(null)
    const [ready, setReady] = useState(false)

    useEffect(() => {
      // Let browser finish first paint
      const id = requestIdleCallback
        ? requestIdleCallback(() => setReady(true))
        : setTimeout(() => setReady(true), 300)

      return () => {
        if (requestIdleCallback) cancelIdleCallback(id)
        else clearTimeout(id)
      }
    }, [])

    return (
      <div
        ref={cardRef}
        className={`
          flex flex-col items-center text-center
          w-[230px]
          rounded-[40px] rounded-t-[140px]
          bg-white border border-black/5
          pb-6
          transform-gpu will-change-transform
          ${ready ? "group shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-out" : ""}
        `}
      >
       {/* IMAGE */}
<div className="relative w-full h-[260px] overflow-visible">
  
  {/* PLACE IMAGE */}
  <div className="w-full h-full rounded-t-[140px] overflow-hidden">
    <img
      src={placeImage}
      alt="place"
      loading="lazy"
      decoding="async"
      className={`
        w-full h-full object-cover
        ${ready ? "transition-transform duration-500 group-hover:scale-105" : ""}
      `}
    />
  </div>

  {/* OVERLAY */}
  <div
    className={`
      absolute inset-0 rounded-t-[140px] bg-black/10
      ${ready ? "group-hover:bg-black/15 transition-colors duration-300" : ""}
    `}
  />

  {/* PERSON IMAGE */}
  <div
    className="
      absolute left-1/2 -bottom-12
      -translate-x-1/2
      w-24 h-24
      rounded-full
      border-4 border-white
      bg-white
      shadow-lg
      z-30
      overflow-hidden
    "
  >
    <img
      src={personImage}
      alt={name}
      loading="lazy"
      decoding="async"
      className="w-full h-full object-cover rounded-full"
    />
  </div>
</div>


        <h3 className="mt-16 text-xl font-extrabold text-[#0d121b]">
          {name}
        </h3>

        <p className="mt-2 text-base text-gray-800 italic font-medium max-w-[200px] leading-relaxed">
          {quote}
        </p>
      </div>
    )
  }
)

export default BestTravelerCard
