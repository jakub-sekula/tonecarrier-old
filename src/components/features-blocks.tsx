export default function FeaturesBlocks() {
  return (
    <section className="relative">
      {/* Section background (needs .relative class on parent and next sibling elements) */}
      <div
        className="absolute inset-0 top-0  lg:mt-0 bg-zinc-900 pointer-events-none"
        aria-hidden="true"
      ></div>
      <div className="absolute left-0 right-0 bottom-0 m-auto w-px p-px h-20 bg-gray-200 transform translate-y-1/2"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12">
            <h2 className="h2 mb-4 text-white">Key features</h2>
            {/* <p className="text-lg md:text-xl text-gray-600" >Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat.</p> */}
          </div>

          {/* Items */}
          <div className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none">
            {/* 1st item */}
            <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                Blazing fast scans
              </h4>
              <p className="text-gray-600 text-center">
                Stop wasting time and scan a full roll in less than 2 minutes.
              </p>
            </div>

            {/* 2nd item */}
            <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                35 mm and 120 support
              </h4>
              <p className="text-gray-600 text-center">
                Works with both of the most popular film formats.
              </p>
            </div>

            {/* 3rd item */}
            <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                Safe for your film
              </h4>
              <p className="text-gray-600 text-center">
                Zero emulsion contact with any part of the holder at any point.
              </p>
            </div>

            {/* 4th item */}
            <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                Perfectly flat
              </h4>
              <p className="text-gray-600 text-center">
                S-curve film channel ensures great flatness for great scans every time.
              </p>
            </div>

            {/* 5th item */}
            <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                Sprocket hole scanning
              </h4>
              <p className="text-gray-600 text-center">
                Sprocket holes and film borders are visible by default.
              </p>
            </div>

            {/* 6th item */}
            <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl">
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                Accessory system
              </h4>
              <p className="text-gray-600 text-center">
                Keep film safe with catch trays and eliminate reflections with a chimney.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
