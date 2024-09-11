import CardPropsType from "../../interfaces/CardType"
import { Card } from "./Card"
import { useState, useEffect } from "react"


const cardRefs: CardPropsType[] = [
  { id: 1, title: "Gallery", description: "View our gallery of images", imgsrc: "../src/assets/cardassets/bamboo.png", link: "#",},
  { id: 2, title: "Blog", description: "Read about what's happening on the farm", imgsrc: "../src/assets/cardassets/goat.png", link: "/blogs",},
  { id: 3, title: "Produce", description: "Learn about our produce", imgsrc: "../src/assets/cardassets/cucumber.png", link: "#",},
  { id: 4, title: "Events", description: "View our upcoming events", imgsrc: "../src/assets/cardassets/chickens.png", link: "#",},
  { id: 5, title: "Volunteer", description: "Learn about volunteer opportunities", imgsrc: "../src/assets/cardassets/yellowwall.png", link: "#",},
  { id: 6, title: "Shop", description: "Shop our products", imgsrc: "../src/assets/prideland.png", link: "#",},
];

export default function CardCarousel() {
  const [currentCard, setCurrentCard] = useState<number>(0);
  const [mousedOver, setMousedOver] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!mousedOver) {
      timer = setInterval(() => {
        setCurrentCard((prevCard) => (prevCard + 1) % (cardRefs.length -1));
      }, 2000);
    }

    return () => clearInterval(timer);
  }, [mousedOver, currentCard]);

  return (
    <div className="hidden md:overflow-hidden md:relative lg:block">
      <div
        className="flex transition ease-out duration-700"
        style={{ transform: `translateX(-${currentCard * 33}%)` }}
        onMouseOver={() => setMousedOver(true)}
        onMouseOut={() => setMousedOver(false)}
      >
        {cardRefs.map((card, index) => (
          <Card
            key={card.id}  
            id={index}
            title={card.title}
            description={card.description}
            imgsrc={card.imgsrc}
            link={card.link}
          />
        ))}
      </div>
    </div>
  );
}
