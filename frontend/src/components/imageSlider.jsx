import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&q=80",
    tag: "New Arrivals",
    title: "Premium Sound,\nUnmatched Quality",
    subtitle: "Discover the latest in audio technology crafted for perfection.",
    cta: "Shop Now",
  },
  {
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1600&q=80'",
    tag: "Top Picks",
    title: "Elevate Your\nWardobe Game",
    subtitle: "Curated fashion collections for every style and occasion.",
    cta: "Explore",
  },
  {
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=80",
    tag: "Best Sellers",
    title: "Time Pieces\nBuilt to Last",
    subtitle: "Iconic watches blending precision engineering with bold design.",
    cta: "View Collection",
  },
];

const ImageSlider = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(
      () => goTo((prev) => (prev + 1) % slides.length),
      5000,
    );
    return () => clearInterval(interval);
  }, []);

  const goTo = (indexOrUpdater) => {
    if (animating) return;
    setAnimating(true);
    setCurrent(indexOrUpdater);
    setTimeout(() => setAnimating(false), 700);
  };

  const prevSlide = () =>
    goTo((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () => goTo((prev) => (prev + 1) % slides.length);

  return (
    <div className="relative w-full overflow-hidden shadow-2xl bg-gray-900 h-[320px] md:h-[520px]">
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full h-full shrink-0">
            {/* Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 gap-4 max-w-2xl">
              <span className="w-fit text-xs font-semibold uppercase tracking-widest text-blue-400 bg-blue-400/10 border border-blue-400/30 px-3 py-1 rounded-full">
                {slide.tag}
              </span>
              <h2 className="text-2xl md:text-5xl font-extrabold text-white leading-tight tracking-tight whitespace-pre-line drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-sm">
                {slide.subtitle}
              </p>
              <div>
                <button className="mt-1 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-full shadow-lg transition-all duration-200 hover:shadow-blue-500/40 hover:shadow-xl">
                  {slide.cta}
                  <ChevronRight size={15} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prev Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white backdrop-blur-sm transition-all duration-200 hover:scale-105"
        aria-label="Previous"
      >
        <ChevronLeft size={20} strokeWidth={2} />
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white backdrop-blur-sm transition-all duration-200 hover:scale-105"
        aria-label="Next"
      >
        <ChevronRight size={20} strokeWidth={2} />
      </button>

      {/* Slide Counter */}
      <div className="absolute top-4 right-5 text-xs font-semibold text-white/60 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
        {current + 1} / {slides.length}
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              current === index
                ? "w-8 bg-white"
                : "w-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
