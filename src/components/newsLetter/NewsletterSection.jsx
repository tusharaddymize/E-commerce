import { motion } from "framer-motion";
import { FiMail, FiSend } from "react-icons/fi";

const NewsletterSection = () => {
  return (
    <section className="py-24 bg-[#f7faf7]">
      <div className="max-w-[1450px] mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-[#355E3B] via-[#44724A] to-[#355E3B] px-10 py-16 lg:px-20"
        >

          {/* Background Circles */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">

            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                <FiMail className="text-white text-4xl" />
              </div>
            </div>

            <h2 className="mt-8 text-center text-white text-5xl font-bold">
              Subscribe To Our Newsletter
            </h2>

            <p className="mt-5 max-w-2xl mx-auto text-center text-white/80 text-lg">
              Get exclusive offers, latest arrivals, special discounts,
              and fashion updates delivered straight to your inbox.
            </p>

            {/* Form */}
            <form className="mt-12 max-w-3xl mx-auto">

              <div className="bg-white rounded-full p-2 flex flex-col md:flex-row gap-3">

                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-full outline-none text-lg"
                />

                <button
                  type="submit"
                  className="bg-[#355E3B] hover:bg-[#27452d] transition text-white px-8 py-4 rounded-full flex items-center justify-center gap-3 font-semibold"
                >
                  <FiSend />
                  Subscribe
                </button>

              </div>

            </form>

            {/* Bottom Text */}

            <p className="mt-6 text-center text-white/70 text-sm">
              No spam. Unsubscribe anytime.
            </p>

          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default NewsletterSection;