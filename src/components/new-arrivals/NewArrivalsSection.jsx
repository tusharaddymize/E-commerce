import { motion } from "framer-motion";

import BackgroundGlow from "./BackgroundGlow";
import FloatingParticles from "./FloatingParticles";
import FloatingLeaves from "./FloatingLeaves";
import NewArrivalCard from "./NewArrivalCard";
import { newArrivals } from "./NewArrivalData";

const NewArrivalsSection = () => {
  return (
    <section className="relative overflow-hidden py-28">

      {/* Main Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#081b0b] via-[#163d24] to-[#355E3B]" />

      {/* Animated Grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)
          `,
          backgroundSize: "70px 70px",
        }}
      />

      {/* Aurora */}
      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute -left-52 -top-52 w-[650px] h-[650px] rounded-full bg-green-500/20 blur-[180px] animate-pulse" />

        <div className="absolute right-0 top-0 w-[600px] h-[600px] rounded-full bg-lime-300/20 blur-[200px] animate-pulse delay-1000" />

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[320px] rounded-full bg-emerald-300/20 blur-[180px]" />

      </div>

      {/* Spotlight */}

      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[950px] h-[500px] rounded-full bg-white/5 blur-[170px]" />

      {/* Existing Effects */}

      <BackgroundGlow />

      <FloatingParticles />

      <FloatingLeaves />

      {/* Blur Overlay */}

      <div className="absolute inset-0 backdrop-blur-[2px]" />

      {/* Main Content */}

      <div className="relative z-10 max-w-[1450px] mx-auto px-8">

        {/* Heading */}

        <motion.div
          initial={{
            opacity: 0,
            y: 60,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: .8,
          }}
          className="text-center mb-20"
        >

          <p className="uppercase tracking-[8px] text-green-300 font-semibold">

            Discover The Latest

          </p>

          <h2 className="mt-5 text-6xl font-black bg-gradient-to-r from-white via-green-200 to-lime-300 bg-clip-text text-transparent">

            New Arrivals

          </h2>

          <p className="mt-6 text-green-100 text-lg max-w-2xl mx-auto">

            Premium Collection Crafted For Modern Lifestyle

          </p>

        </motion.div>

        {/* Floating Icons */}

        <motion.div

          initial={{ opacity:0 }}

          whileInView={{ opacity:1 }}

          transition={{ delay:.4 }}

          className="flex justify-center gap-6 mb-16"

        >

          {["🎧","👟","💄","🏡"].map((icon,index)=>(

            <motion.div

              key={index}

              whileHover={{

                scale:1.15,

                rotate:8

              }}

              className="w-16 h-16 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl flex justify-center items-center text-3xl"

            >

              {icon}

            </motion.div>

          ))}

        </motion.div>

        {/* Product Grid */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {newArrivals.map((product,index)=>(

            <motion.div

              key={product.id}

              initial={{

                opacity:0,

                y:60

              }}

              whileInView={{

                opacity:1,

                y:0

              }}

              viewport={{

                once:true

              }}

              transition={{

                duration:.6,

                delay:index*.15

              }}

            >

              <NewArrivalCard

                product={product}

              />

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default NewArrivalsSection;