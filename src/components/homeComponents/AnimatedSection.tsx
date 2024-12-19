import { useEffect, useRef } from "react";

import { ReactNode } from "react";

interface AnimatedSectionProps {
 children: ReactNode;
 className?: string;
}

const AnimatedSection = ({
 children,
 className = "",
}: AnimatedSectionProps) => {
 const sectionRef = useRef(null);

 useEffect(() => {
  const section = sectionRef.current;

  const observer = new IntersectionObserver(
   (entries, observer) => {
    entries.forEach((entry) => {
     if (entry.isIntersecting) {
      entry.target.classList.add("animate-slidein");
      entry.target.classList.remove("opacity-0", "invisible"); // Remove opacity and visibility
      observer.unobserve(entry.target); // Stop observing once the element has appeared
     }
    });
   },
   {
    threshold: 0.2, // Trigger when 50% of the element is visible
    rootMargin: "0px 0px -20% 0px", // Trigger when the middle of the element hits the middle of the viewport
   }
  );

  if (section) {
   observer.observe(section);
  }

  return () => {
   if (section) {
    observer.unobserve(section); // Cleanup observer on component unmount
   }
  };
 }, []);

 return (
  <div
   ref={sectionRef}
   className={`${className} opacity-0 invisible`} // Initially hidden with visibility and opacity
  >
   {children}
  </div>
 );
};

export default AnimatedSection;
