import { HeroCarouselProps } from "../../interfaces/HeroCarouselPropsType";
import { useState, useEffect } from "react";

const HeroCarousel = ({ images = [] }: HeroCarouselProps) => {
 const [currentSlide, setCurrentSlide] = useState<number>(0);
 const [loopImages, setLoopImages] = useState([...images]);
 const [isLargeScreen, setIsLargeScreen] = useState(false);

 useEffect(() => {
  const handleResize = () => {
   setIsLargeScreen(window.innerWidth > 1536); // 2xl breakpoint
  };

  // Initialize on mount
  handleResize();

  // Add event listener on window resize
  window.addEventListener("resize", handleResize);

  // Clean up the event listener
  return () => window.removeEventListener("resize", handleResize);
 }, []);

 // UseEffect to prepend images when we reach the first image
 useEffect(() => {
  if (currentSlide === 0 && loopImages.length > 0) {
   // Prepend images at the start of the array when at the first image
   setLoopImages((prevImages) => [
    ...images,
    ...prevImages, // Keep the existing loop after prepending new images
   ]);
  }
 }, [currentSlide, loopImages, images]);

 const nextSlide = () => {
  // Go to the next slide, but loop back to 0 if necessary
  setCurrentSlide((prevSlide) => (prevSlide + 1) % loopImages.length);
 };

 const previousSlide = () => {
  setCurrentSlide((prevSlide) =>
   prevSlide === 0 ? loopImages.length - 1 : prevSlide - 1
  );
 };

 return (
  <>
   <div className="w-full overflow-hidden relative h-auto max-w-full">
    <div
     className="flex transition ease-out duration-700 md:w-1/2 md:h-1/2"
     style={{
      transform: isLargeScreen
       ? `translateX(-${currentSlide * (200 / 3)}%)` // For larger screens
       : `translateX(-${currentSlide * 100}%)`, // For smaller screens
     }}>
     {loopImages.map((image, index) => (
      <img
       key={index}
       src={"data:image/jpeg;base64," + image.blob_img}
       alt={image.alt_text}
       className={`h-auto object-cover 2xl:w-2/3 md:-translate-x-2/4 2xl:translate-x-0 ${
        index === currentSlide + 1 ? "md:blur-0" : "md:blur-md"
       }`}
      />
     ))}
    </div>
    <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
     <circle r="15" cx="20" cy="20" fill="white" opacity="0.6" />
     {images.map((image, index) => (
      <button
       key={index}
       type="button"
       id={image.alt_text}
       className="w-10 h-10 rounded-full"
       aria-current={index === currentSlide ? "true" : "false"}
       aria-label={`Go to slide ${index + 1}`}
       onClick={nextSlide}>
       <svg height="30" width="30" xmlns="http://www.w3.org/2000/svg">
        <circle
         r="10"
         cx="15"
         cy="15"
         fill="white"
         opacity={index === currentSlide % images.length ? "0.9" : "0.6"}
        />
       </svg>
      </button>
     ))}
    </div>
    <button
     type="button"
     className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
     onClick={previousSlide}
     aria-label="Previous Slide">
     <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
      <svg
       className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
       aria-hidden="true"
       xmlns="http://www.w3.org/2000/svg"
       fill="none"
       viewBox="0 0 6 10">
       <path stroke="currentColor" d="M5 1 1 5l4 4" />
      </svg>
      <span className="sr-only">Previous</span>
     </span>
    </button>
    <button
     type="button"
     className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
     onClick={nextSlide}
     aria-label="Next Slide">
     <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
      <svg
       className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
       aria-hidden="true"
       xmlns="http://www.w3.org/2000/svg"
       fill="none"
       viewBox="0 0 6 10">
       <path stroke="currentColor" d="m1 9 4-4-4-4" />
      </svg>
      <span className="sr-only">Next</span>
     </span>
    </button>
   </div>
  </>
 );
};

export default HeroCarousel;
