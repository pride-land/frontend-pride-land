import { HeroCarouselProps } from '../../interfaces/HeroCarouselPropsType';
import { useState, useEffect } from "react";

const HeroCarousel = ({images}: HeroCarouselProps) => {

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [loopImages, setLoopImages] = useState([...images]);

  useEffect(() => {
    if (images.length > 0) {
      setLoopImages([...images]);
    }
  }, [images]);

 useEffect(() => {
    if (loopImages.length > 0 && currentSlide === loopImages.length - 2) {
        setLoopImages(prevImages => [...prevImages, ...images]); // Append images to the loop
    }
  }, [currentSlide, loopImages, images]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % loopImages.length);
  };

  const previousSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? loopImages.length - 1 : prevSlide - 1));
  };


  return (
    <>

    <div className="overflow-hidden relative">
  <div className="flex transition ease-out duration-700 lg:w-1/2"  style={{transform: `translateX(-${(currentSlide * 100)}%)`,}}>
  <img key={images.length} src={"data:image/jpeg;base64," + images[images.length - 1].blob_img} className={`lg:-translate-x-2/4 ${currentSlide === loopImages.length - 1 ? 'lg:blur-0' : 'lg:blur-md'}`}
  />
    {loopImages.map((image, index) => (
        <img key={index} src={"data:image/jpeg;base64," + image.blob_img} alt={image.alt_text} className={`lg:-translate-x-2/4 ${index === currentSlide ? "lg:blur-0" : "lg:blur-md"}`}
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
            onClick={() => setCurrentSlide(index)}
        >
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
    )
)}
    </div>
<button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" onClick={previousSlide} aria-label="Previous Slide">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" d="M5 1 1 5l4 4"/>
            </svg>
            <span className="sr-only">Previous</span>
        </span>
    </button>
    <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" onClick={nextSlide} aria-label="Next Slide">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" d="m1 9 4-4-4-4"/>
            </svg>
            <span className="sr-only">Next</span>
        </span>
    </button> 
    </div>
    </>
      );
}

export default HeroCarousel;