import { useEffect, useState } from "react";
import HeroNavigation from "./HeroNavigation";
import HeroDots from "./HeroDots";

import hero1 from "../../assets/images/hero1.png";
import hero2 from "../../assets/images/hero2.png";
import hero3 from "../../assets/images/hero3.png";
import hero4 from "../../assets/images/hero4.png";
import hero5 from "../../assets/images/hero5.png";

const slides = [hero1, hero2, hero3, hero4, hero5];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) =>
      prev === slides.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  return (
<section className="w-full py-4">
  <div className="w-full relative overflow-hidden">
    <img
      src={slides[current]}
      alt="Hero Banner"
      className="block w-full h-auto"
    />

    <HeroNavigation
      prevSlide={prevSlide}
      nextSlide={nextSlide}
    />

    <HeroDots
      slides={slides}
      current={current}
      setCurrent={setCurrent}
    />
  </div>
</section>
  );
};

export default HeroSlider;