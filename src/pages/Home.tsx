import Blogs from "../components/homeComponents/Blogs";
import { useState, useEffect } from "react";
// import CardGallery from "../components/homeComponents/CardGallery";
import FeedbackComments from "../components/homeComponents/FeedbackComments";
import { Image } from "../Admin/admin-interface/AdminGalleryTypes";
import * as layoutApi from "../Admin/admin-api/admin-layout";
import HeroCarousel from "../components/homeComponents/HeroCarousel";
import MissionStatement from "../components/homeComponents/MissionStatement";
import Slogan from "../components/homeComponents/Slogan";
import AnimatedSection from "../components/homeComponents/AnimatedSection";

function Home() {
 const [images, setHeroImages] = useState<Image[] | null>(null);

 useEffect(() => {
  fetchHeroImages();
 }, []);

 const fetchHeroImages = async () => {
  const images = await layoutApi.getHeroImages();
  setHeroImages(images);
 };

 return (
  <div className="bg-gradient-to-br from-green-300 to-white font-sans">
   <div className="w-full m-auto"></div>
   {images && <HeroCarousel images={images} />}
   <AnimatedSection>
    <Slogan />
   </AnimatedSection>
   <AnimatedSection>
    <MissionStatement />
   </AnimatedSection>
   {/* <section id="cards" className={"min-h-80 flex flex-col px-4"}>
        <div className="flex flex-col flex-1 max-w-[1400] mx-auto w-full"></div>
        <CardGallery/>
      </section> */}
   <section id="blogs" className={"min-h-80 flex flex-col px-4"}>
    <AnimatedSection>
     <div className="opacity-0 flex flex-col flex-1 max-w-[1400] mx-auto w-full"></div>
     <Blogs />
    </AnimatedSection>
   </section>
   <section id="kuchikomi" className={"min-h-80 flex px-4"}>
    <div className="flex max-w-[1400] mx-auto w-full ">
     <AnimatedSection>
      <FeedbackComments />
     </AnimatedSection>
    </div>
   </section>
  </div>
 );
}

export default Home;
