import {
  useEffect,
  useState,
} from "react";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  FiArrowRight,
  FiZap,
} from "react-icons/fi";

const FlashDealCard = ({
  flashDeal,
}) => {
  const [timeLeft, setTimeLeft] =
    useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });

  // ==========================================
  // Countdown
  // ==========================================

  useEffect(() => {
    if (!flashDeal?.endDate) return;

    const updateCountdown = () => {
      const end = new Date(
        flashDeal.endDate
      ).getTime();

      const distance =
        end - Date.now();

      if (distance <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });

        return;
      }

      setTimeLeft({
        days: Math.floor(
          distance /
            (1000 * 60 * 60 * 24)
        ),

        hours: Math.floor(
          (distance %
            (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        ),

        minutes: Math.floor(
          (distance %
            (1000 * 60 * 60)) /
            (1000 * 60)
        ),

        seconds: Math.floor(
          (distance %
            (1000 * 60)) /
            1000
        ),
      });
    };

    updateCountdown();

    const timer = setInterval(
      updateCountdown,
      1000
    );

    return () =>
      clearInterval(timer);
  }, [flashDeal?.endDate]);

  // ==========================================
  // No Deal
  // ==========================================

  if (!flashDeal) {
    return null;
  }

  // ==========================================
  // Timer Box
  // ==========================================

  const TimerBox = ({
    value,
    label,
  }) => (
    <div
      className="
        min-w-0
        flex
        flex-col
        items-center
      "
    >
      <div
        className="
          w-full

          h-9
          min-[400px]:h-10
          sm:h-12
          md:h-14

          xl:h-12

          bg-white

          rounded-lg
          sm:rounded-xl

          flex
          items-center
          justify-center

          shadow-sm

          text-xs
          sm:text-sm
          md:text-base

          font-bold

          text-[var(--primary-color,#355E3B)]
        "
      >
        {String(value).padStart(
          2,
          "0"
        )}
      </div>

      <span
        className="
          mt-1

          text-[8px]
          sm:text-[9px]
          md:text-[10px]

          font-medium

          text-white/80
        "
      >
        {label}
      </span>
    </div>
  );

  // ==========================================
  // Card
  // ==========================================

  return (
    <motion.div
      whileHover={{
        y: -2,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        relative

        w-full
        h-full

        overflow-hidden

        rounded-xl
        sm:rounded-2xl

        shadow-md

        flex
        flex-row

        xl:flex-col
      "
      style={{
        backgroundColor:
          "var(--primary-color,#355E3B)",
      }}
    >
      {/* ====================================== */}
      {/* IMAGE */}
      {/* ====================================== */}

      <div
        className="
          relative
          shrink-0

          w-[40%]
          min-[400px]:w-[42%]
          sm:w-[40%]
          md:w-[38%]
          lg:w-[35%]

          h-auto
          min-h-[205px]

          sm:min-h-[230px]
          md:min-h-[250px]

          xl:w-full
          xl:h-44
          xl:min-h-0

          overflow-hidden

          bg-gray-200
        "
      >
        {flashDeal.bannerImage ? (
          <img
            src={
              flashDeal.bannerImage
            }
            alt={
              flashDeal.title ||
              "Flash Deal"
            }
            className="
              absolute
              inset-0

              w-full
              h-full

              object-cover

              transition-transform
              duration-500

              hover:scale-105
            "
          />
        ) : (
          <div
            className="
              absolute
              inset-0

              flex
              items-center
              justify-center

              bg-gray-200

              text-xs
              text-gray-500
            "
          >
            Flash Deal
          </div>
        )}

        {/* Overlay */}

        <div
          className="
            absolute
            inset-0

            bg-black/5
          "
        />

        {/* Flash Badge */}

        <div
          className="
            absolute

            top-2
            left-2

            sm:top-3
            sm:left-3

            flex
            items-center
            gap-1

            px-2
            sm:px-3

            py-1
            sm:py-1.5

            rounded-full

            bg-red-500

            text-white

            text-[8px]
            sm:text-[10px]
            md:text-xs

            font-bold

            shadow
          "
        >
          <FiZap />

          <span>
            Flash Deal
          </span>
        </div>
      </div>

      {/* ====================================== */}
      {/* CONTENT */}
      {/* ====================================== */}

      <div
        className="
          flex-1
          min-w-0

          p-2.5
          min-[400px]:p-3
          sm:p-4
          md:p-5

          xl:p-4

          flex
          flex-col
        "
      >
        {/* Title */}

        <h3
          className="
            text-sm
            min-[400px]:text-base
            sm:text-lg
            md:text-xl

            xl:text-xl

            font-bold

            leading-tight

            text-white

            line-clamp-2
          "
        >
          {flashDeal.title}
        </h3>

        {/* Subtitle */}

        {flashDeal.subtitle && (
          <p
            className="
              mt-1
              sm:mt-2

              text-[9px]
              min-[400px]:text-[10px]
              sm:text-xs
              md:text-sm

              leading-4

              text-white/80

              line-clamp-2
            "
          >
            {flashDeal.subtitle}
          </p>
        )}

        {/* Limited Offer */}

        <div
          className="
            mt-2
            sm:mt-3

            flex
            items-center

            gap-1.5

            text-[8px]
            sm:text-[10px]
            md:text-xs

            font-semibold

            uppercase

            text-white/80
          "
        >
          <span
            className="
              w-1.5
              h-1.5

              rounded-full

              bg-red-400

              animate-pulse
            "
          />

          Limited Time Offer
        </div>

        {/* ==================================== */}
        {/* Timer */}
        {/* ==================================== */}

        <div
          className="
            grid
            grid-cols-4

            gap-1
            min-[400px]:gap-1.5
            sm:gap-2
            md:gap-3

            mt-3
            sm:mt-4
          "
        >
          <TimerBox
            value={timeLeft.days}
            label="Days"
          />

          <TimerBox
            value={timeLeft.hours}
            label="Hours"
          />

          <TimerBox
            value={
              timeLeft.minutes
            }
            label="Mins"
          />

          <TimerBox
            value={
              timeLeft.seconds
            }
            label="Secs"
          />
        </div>

        {/* ==================================== */}
        {/* Button */}
        {/* ==================================== */}

        <Link
          to={
            flashDeal.buttonLink ||
            "/"
          }
          className="
            mt-auto
            pt-3
            sm:pt-4

            block
            w-full
          "
        >
          <span
            className="
              w-full

              h-9
              sm:h-10
              md:h-11

              px-2
              sm:px-4

              rounded-lg
              sm:rounded-xl

              bg-white

              text-[var(--primary-color,#355E3B)]

              text-[9px]
              sm:text-xs
              md:text-sm

              font-bold

              flex
              items-center
              justify-center

              gap-1
              sm:gap-2

              shadow-sm

              transition-all
              duration-300

              hover:shadow-md
            "
          >
            <span className="truncate">
              {flashDeal.buttonText ||
                "View All Deals"}
            </span>

            <FiArrowRight
              className="
                shrink-0
              "
            />
          </span>
        </Link>
      </div>
    </motion.div>
  );
};

export default FlashDealCard;