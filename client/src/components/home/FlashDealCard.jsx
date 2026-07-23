// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { FiArrowRight } from "react-icons/fi";

// const FlashDealCard = () => {
//   const [timeLeft, setTimeLeft] = useState({
//     days: 2,
//     hours: 15,
//     minutes: 45,
//     seconds: 30,
//   });

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         let { days, hours, minutes, seconds } = prev;

//         if (seconds > 0) {
//           seconds--;
//         } else {
//           seconds = 59;

//           if (minutes > 0) {
//             minutes--;
//           } else {
//             minutes = 59;

//             if (hours > 0) {
//               hours--;
//             } else {
//               hours = 23;

//               if (days > 0) {
//                 days--;
//               }
//             }
//           }
//         }

//         return {
//           days,
//           hours,
//           minutes,
//           seconds,
//         };
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const Box = ({ value, label }) => (
//     <div className="flex flex-col items-center">
//       <div className="bg-white rounded-xl shadow border w-14 h-14 flex items-center justify-center text-lg font-bold text-gray-800">
//         {String(value).padStart(2, "0")}
//       </div>

//       <span className="text-xs text-gray-500 mt-2">
//         {label}
//       </span>
//     </div>
//   );

//   return (
//     <motion.div
//       whileHover={{ y: -4 }}
//       className="rounded-3xl bg-white shadow-lg border p-6 h-full flex flex-col justify-between"
//     >
//       <div>
//         <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600">
//           🔥 Flash Deals
//         </span>

//         <h3 className="mt-4 text-2xl font-bold text-gray-900">
//           Hurry! Limited Time Offer
//         </h3>

//         <p className="mt-2 text-sm text-gray-500">
//           Grab your favourite products before the deal expires.
//         </p>

//         <div className="grid grid-cols-4 gap-3 mt-8">
//           <Box value={timeLeft.days} label="Days" />
//           <Box value={timeLeft.hours} label="Hours" />
//           <Box value={timeLeft.minutes} label="Mins" />
//           <Box value={timeLeft.seconds} label="Secs" />
//         </div>
//       </div>

//       <button
//         className="
//           mt-8
//           w-full
//           bg-[#355E3B]
//           hover:bg-[#28472c]
//           text-white
//           rounded-xl
//           py-3
//           font-semibold
//           flex
//           items-center
//           justify-center
//           gap-2
//           transition
//         "
//       >
//         View All Deals

//         <FiArrowRight />
//       </button>
//     </motion.div>
//   );
// };

// export default FlashDealCard;



import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const FlashDealCard = ({ flashDeal }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // ==========================================
  // Countdown Timer
  // ==========================================

  useEffect(() => {
    if (!flashDeal?.endDate) return;

    const updateCountdown = () => {
      const end = new Date(flashDeal.endDate).getTime();
      const now = new Date().getTime();

      const distance = end - now;

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
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        ),
        minutes: Math.floor(
          (distance % (1000 * 60 * 60)) /
            (1000 * 60)
        ),
        seconds: Math.floor(
          (distance % (1000 * 60)) /
            1000
        ),
      });
    };

    updateCountdown();

    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [flashDeal]);

  // ==========================================
  // No Flash Deal
  // ==========================================

  if (!flashDeal) {
    return (
      <div className="rounded-3xl border bg-white shadow-lg p-8 flex items-center justify-center min-h-[450px]">
        <p className="text-gray-500 font-medium">
          No Flash Deal Available
        </p>
      </div>
    );
  }

  // ==========================================
  // Time Box
  // ==========================================

  const Box = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className="w-14 h-14 rounded-xl bg-white/95 backdrop-blur border shadow flex items-center justify-center text-lg font-bold text-gray-900">
        {String(value).padStart(2, "0")}
      </div>

      <span className="text-xs mt-2 text-white font-medium">
        {label}
      </span>
    </div>
  );

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className="relative overflow-hidden rounded-3xl shadow-xl min-h-[520px]"
      style={{
        backgroundColor:
          flashDeal.backgroundColor || "#355E3B",
      }}
    >
            {/* Banner Image */}
      {flashDeal.bannerImage && (
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={flashDeal.bannerImage}
            alt={flashDeal.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/30" />
        </div>
      )}

      {/* Content */}
      <div className="p-6 flex flex-col justify-between h-[calc(520px-192px)]">

        <div>

          <span className="inline-flex items-center rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
            🔥 Flash Deals
          </span>

          <h3 className="mt-4 text-2xl font-bold text-white leading-tight">
            {flashDeal.title}
          </h3>

          <p className="mt-3 text-sm text-white/90 leading-6">
            {flashDeal.subtitle}
          </p>

          {/* Countdown */}
          <div className="grid grid-cols-4 gap-3 mt-8">

            <Box
              value={timeLeft.days}
              label="Days"
            />

            <Box
              value={timeLeft.hours}
              label="Hours"
            />

            <Box
              value={timeLeft.minutes}
              label="Mins"
            />

            <Box
              value={timeLeft.seconds}
              label="Secs"
            />

          </div>

        </div>

        {/* Button */}

        <Link
          to={flashDeal.buttonLink || "/"}
          className="
            mt-8
            w-full
            rounded-xl
            bg-white
            hover:bg-gray-100
            text-gray-900
            py-3
            font-semibold
            flex
            items-center
            justify-center
            gap-2
            transition-all
            duration-300
          "
        >
          {flashDeal.buttonText || "View Deals"}

          <FiArrowRight />
        </Link>

      </div>

    </motion.div>
  );
};

export default FlashDealCard;