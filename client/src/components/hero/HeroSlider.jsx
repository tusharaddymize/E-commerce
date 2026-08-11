import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import HeroNavigation from "./HeroNavigation";
import HeroDots from "./HeroDots";

import useWebsiteSettings from "../../hooks/useWebsiteSettings";

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

// ==========================================
// Hero Slider
// ==========================================

const HeroSlider = () => {
  const navigate = useNavigate();

  // ========================================
  // Website Settings
  // ========================================

  const {
    data,
    isLoading,
    isError,
  } = useWebsiteSettings();

  // ========================================
  // Normalize API Response
  // ========================================

  const websiteSettings =
    data?.data || data || {};

  // ========================================
  // Backend Hero Banners
  // ========================================

  const backendSlides = useMemo(() => {
    const banners = Array.isArray(
      websiteSettings?.heroBanners
    )
      ? websiteSettings.heroBanners
      : [];

    return banners
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
  }, [websiteSettings]);

  // ========================================
  // Final Slides
  // Backend first
  // Local fallback otherwise
  // ========================================

  const slides = useMemo(() => {
    if (backendSlides.length > 0) {
      return backendSlides;
    }

    return fallbackSlides;
  }, [backendSlides]);

  // ========================================
  // Current Slide
  // ========================================

  const [current, setCurrent] = useState(0);

  // ========================================
  // Keep Current Index Valid
  // ========================================

  useEffect(() => {
    if (
      current >= slides.length &&
      slides.length > 0
    ) {
      setCurrent(0);
    }
  }, [current, slides.length]);

  // ========================================
  // Auto Slider - 4 Seconds
  // ========================================

  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setCurrent((prev) =>
        prev >= slides.length - 1
          ? 0
          : prev + 1
      );
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [slides.length]);

  // ========================================
  // Next Slide
  // ========================================

  const nextSlide = () => {
    if (slides.length <= 1) {
      return;
    }

    setCurrent((prev) =>
      prev >= slides.length - 1
        ? 0
        : prev + 1
    );
  };

  // ========================================
  // Previous Slide
  // ========================================

  const prevSlide = () => {
    if (slides.length <= 1) {
      return;
    }

    setCurrent((prev) =>
      prev === 0
        ? slides.length - 1
        : prev - 1
    );
  };

  // ========================================
  // Banner Click
  // ========================================

  const handleBannerClick = (slide) => {
    const link =
      slide?.buttonLink ||
      slide?.link ||
      "";

    // No link
    if (!link) {
      return;
    }

    // External URL
    if (
      link.startsWith("http://") ||
      link.startsWith("https://")
    ) {
      window.location.href = link;
      return;
    }

    // Internal React Route
    navigate(
      link.startsWith("/")
        ? link
        : `/${link}`
    );
  };

  // ========================================
  // Loading
  // ========================================

  if (isLoading) {
    return (
      <section
        className="
          w-full

          bg-[#fff7f5]

          pt-4
          sm:pt-5
          lg:pt-6

          pb-6
          sm:pb-7
          lg:pb-10
        "
      >
        <div
          className="
            relative
            mx-auto

            w-[94%]
            sm:w-[94%]
            md:w-[92%]
            lg:w-[90%]
            xl:w-[88%]

            max-w-[1450px]

            overflow-hidden

            rounded-xl
            lg:rounded-2xl

            bg-gray-100
          "
        >
          <div
            className="
              h-[180px]
              sm:h-[260px]
              md:h-[340px]
              lg:h-[400px]
              xl:h-[440px]

              w-full

              animate-pulse

              bg-gray-200
            "
          />
        </div>
      </section>
    );
  }

  // ========================================
  // Error
  // ========================================

  if (isError) {
    console.warn(
      "Website settings could not be loaded. Using local hero banners."
    );
  }

  // ========================================
  // No Slides
  // ========================================

  if (!slides.length) {
    return null;
  }

  // ========================================
  // Active Slide
  // ========================================

  const activeSlide =
    slides[current] || slides[0];

  // ========================================
  // Has Link
  // ========================================

  const hasLink = Boolean(
    activeSlide?.buttonLink ||
      activeSlide?.link
  );

  // ========================================
  // Render
  // ========================================

  return (
    <section
      className="
        w-full

        bg-[#fff7f5]

        pt-4
        sm:pt-5
        lg:pt-6

        pb-6
        sm:pb-7
        lg:pb-10
      "
    >
      {/* ==================================
          Banner Container
      ================================== */}

      <div
        className="
          relative
          mx-auto

          w-[94%]
          sm:w-[94%]
          md:w-[92%]
          lg:w-[90%]
          xl:w-[88%]

          max-w-[1450px]

          overflow-hidden

          rounded-xl
          lg:rounded-2xl

          shadow-sm
        "
      >
        {/* ==================================
            Clickable Banner
        ================================== */}

        <div
          onClick={() =>
            handleBannerClick(
              activeSlide
            )
          }
          className={
            hasLink
              ? "cursor-pointer"
              : "cursor-default"
          }
          role={
            hasLink
              ? "link"
              : undefined
          }
          tabIndex={
            hasLink
              ? 0
              : undefined
          }
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              hasLink
            ) {
              handleBannerClick(
                activeSlide
              );
            }
          }}
        >
          {/* ==================================
              Banner Image
          ================================== */}

          <img
            src={activeSlide.image}
            alt={`Hero Banner ${
              current + 1
            }`}
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

        {/* ==================================
            Navigation Arrows
        ================================== */}

        {slides.length > 1 && (
          <HeroNavigation
            prevSlide={prevSlide}
            nextSlide={nextSlide}
          />
        )}

        {/* ==================================
            Slider Dots
        ================================== */}

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