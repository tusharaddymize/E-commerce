import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import HeroNavigation from "./HeroNavigation";
import HeroDots from "./HeroDots";

import { getWebsiteSettings } from "../../services/websiteSettingService";

import hero1 from "../../assets/images/hero1.png";
import hero2 from "../../assets/images/hero2.png";
import hero3 from "../../assets/images/hero3.png";
import hero4 from "../../assets/images/hero4.png";
import hero5 from "../../assets/images/hero5.png";

// ==========================================
// Local Fallback Banners
// ==========================================

const fallbackSlides = [
  {
    image: hero1,
    buttonLink: "",
    active: true,
  },
  {
    image: hero2,
    buttonLink: "",
    active: true,
  },
  {
    image: hero3,
    buttonLink: "",
    active: true,
  },
  {
    image: hero4,
    buttonLink: "",
    active: true,
  },
  {
    image: hero5,
    buttonLink: "",
    active: true,
  },
];

const HeroSlider = () => {
  const navigate = useNavigate();

  const [backendSlides, setBackendSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // Fetch Hero Banners
  // ==========================================

  useEffect(() => {
    const fetchHeroBanners = async () => {
      try {
        setLoading(true);

        const response = await getWebsiteSettings();

        const settings = response?.data || response;

        const banners = Array.isArray(settings?.heroBanners)
          ? settings.heroBanners
          : [];

        // Only active banners having an image
        const activeBanners = banners
          .filter(
            (banner) =>
              banner?.image &&
              banner?.active !== false
          )
          .sort(
            (a, b) =>
              Number(a?.order || 0) -
              Number(b?.order || 0)
          );

        setBackendSlides(activeBanners);
      } catch (error) {
        console.error(
          "Failed to load hero banners:",
          error
        );

        setBackendSlides([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroBanners();
  }, []);

  // ==========================================
  // Final Slides
  // Backend first, local fallback otherwise
  // ==========================================

  const slides = useMemo(() => {
    if (backendSlides.length > 0) {
      return backendSlides;
    }

    return fallbackSlides;
  }, [backendSlides]);

  // ==========================================
  // Keep Current Index Valid
  // ==========================================

  useEffect(() => {
    if (current >= slides.length) {
      setCurrent(0);
    }
  }, [slides.length, current]);

  // ==========================================
  // Auto Slider - 4 Seconds
  // ==========================================

  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev >= slides.length - 1
          ? 0
          : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  // ==========================================
  // Next Slide
  // ==========================================

  const nextSlide = () => {
    if (slides.length <= 1) return;

    setCurrent((prev) =>
      prev >= slides.length - 1
        ? 0
        : prev + 1
    );
  };

  // ==========================================
  // Previous Slide
  // ==========================================

  const prevSlide = () => {
    if (slides.length <= 1) return;

    setCurrent((prev) =>
      prev === 0
        ? slides.length - 1
        : prev - 1
    );
  };

  // ==========================================
  // Banner Click
  // ==========================================

  const handleBannerClick = (slide) => {
    const link =
      slide?.buttonLink ||
      slide?.link ||
      "";

    if (!link) return;

    // External URL
    if (
      link.startsWith("http://") ||
      link.startsWith("https://")
    ) {
      window.location.href = link;
      return;
    }

    // Internal React route
    navigate(
      link.startsWith("/")
        ? link
        : `/${link}`
    );
  };

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <section className="w-full py-4">
        <div className="w-full aspect-[16/6] bg-gray-100 animate-pulse" />
      </section>
    );
  }

  // ==========================================
  // No Banner
  // ==========================================

  if (!slides.length) {
    return null;
  }

  const activeSlide = slides[current];

  return (
    <section className="w-full py-4">
    <div
  className="
    relative
    w-[94%]
    sm:w-[94%]
    md:w-[92%]
    lg:w-[90%]
    xl:w-[88%]
    max-w-[1450px]
    mx-auto
    overflow-hidden
    rounded-xl
  "
>
        {/* ================================
            Clickable Banner
        ================================= */}

        <div
          onClick={() =>
            handleBannerClick(activeSlide)
          }
          className={
            activeSlide?.buttonLink ||
            activeSlide?.link
              ? "cursor-pointer"
              : "cursor-default"
          }
          role={
            activeSlide?.buttonLink ||
            activeSlide?.link
              ? "link"
              : undefined
          }
          tabIndex={
            activeSlide?.buttonLink ||
            activeSlide?.link
              ? 0
              : undefined
          }
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              (activeSlide?.buttonLink ||
                activeSlide?.link)
            ) {
              handleBannerClick(activeSlide);
            }
          }}
        >
<img
  src={activeSlide.image}
  alt={`Hero Banner ${current + 1}`}
  className="
    block
    w-full

    h-[180px]
    sm:h-[260px]
    md:h-[340px]
    lg:h-[400px]
    xl:h-[440px]

    object-cover
    object-center
    select-none
  "
  draggable="false"
/>
        </div>

        {/* ================================
            Navigation Arrows
        ================================= */}

        {slides.length > 1 && (
          <HeroNavigation
            prevSlide={prevSlide}
            nextSlide={nextSlide}
          />
        )}

        {/* ================================
            Slider Dots
        ================================= */}

        {slides.length > 1 && (
          <HeroDots
            slides={slides}
            current={current}
            setCurrent={setCurrent}
          />
        )}

      </div>
    </section>
  );
};

export default HeroSlider;