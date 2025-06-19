export const Hero = () => {
  return (
    <section className="min-h-screen flex items-start justify-center pt-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1
            className="
              text-6xl md:text-7xl font-bold font-mono m-0 p-0 leading-none text-left
              bg-gradient-to-r from-black via-blue-900 to-blue-700
              bg-clip-text text-transparent
              animate-gradient
            "
          >
            <span className="block">From Hello to</span>
            <span className="block">Booked! —</span>
            <span className="block">Smart Bots,</span>
            <span className="block">Zero Code</span>
          </h1>

          <div className="flex justify-start mt-10">
            <button
              className="
                font-mono text-white
                rounded-lg
                bg-gradient-to-r from-blue-900 via-blue-500 to-indigo-200
                animate-gradient
                px-8 py-3 mt-10
                transition-transform duration-300
                hover:scale-105 active:scale-95
              "
            >
              Get started for free
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};