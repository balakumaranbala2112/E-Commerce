import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect } from "react";
import { useState } from "react";

const imageSlider = () => {
  const images = [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=80",
  ];

  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="w-full shadow-lg overflow-hidden relative">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            src={image}
            key={index}
            className="h-75 w-full md:h-113 object-cover shrink-0"
          />
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute bg-black/40 hover:bg-black/60  text-white rounded-full p-2 transition top-1/2 left-4 cursor-pointer"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute bg-black/40 hover:bg-black/60  text-white rounded-full p-2 transition top-1/2 right-4 cursor-pointer"
      >
        <ChevronRight />
      </button>
      <div className="absolute bottom-4 left-1/2 gap-2 -translate-x-1/2 flex">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all cursor-pointer  ${current === index ? "w-6 bg-white" : "w-2 bg-white/50"}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default imageSlider;
