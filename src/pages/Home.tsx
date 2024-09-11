import Blogs from "../components/homeComponents/Blogs";
import CardGallery from "../components/homeComponents/CardGallery";
import FeedbackComments from "../components/homeComponents/FeedbackComments";

import HeroCarousel from "../components/homeComponents/HeroCarousel";
import MissionStatement from "../components/homeComponents/MissionStatement";
// import Navbar from "../components/Navbar";
import Slogan from "../components/homeComponents/Slogan";


function Home() {
  

  const images = [
    { src: "../src/assets/chickens.jpg", alt: "chickens" },
    { src: "../src/assets/volunteers.jpg", alt: "Volunteers" },
    { src: "../src/assets/eggs.jpg", alt: "Eggs" },
    { src: "../src/assets/vegetable.jpg", alt: "farm work" },
    { src: "../src/assets/shiitake.jpg", alt: "mountain work" },
  ];

  return (
    <div className="bg-gradient-to-br from-green-300 to-white font-sans">
      <div className="w-full m-auto"></div>
      <HeroCarousel images={images}></HeroCarousel>
      <Slogan></Slogan>
      <MissionStatement/>
      <section id="cards" className={"min-h-80 flex flex-col px-4"}>
        <div className="flex flex-col flex-1 max-w-[1400] mx-auto w-full"></div>
        {/* <CardGallery/> */}
      </section>
      <section id="blogs" className={"min-h-80 flex flex-col px-4"}>
        <div className="flex flex-col flex-1 max-w-[1400] mx-auto w-full"></div>
        <Blogs />
      </section>
      <section id="kuchikomi" className={"min-h-80 flex px-4"}>
        <div className="flex max-w-[1400] mx-auto w-full ">
          <FeedbackComments 
            images = {images}
          />
        </div>
      </section>
    </div>
  );
}

export default Home;