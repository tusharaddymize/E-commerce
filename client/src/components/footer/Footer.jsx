import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
} from "react-icons/fa";

import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiArrowUp,
} from "react-icons/fi";

const Footer = () => {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-[#1E3422] text-white relative">

      {/* Main Footer */}
      <div className="max-w-[1450px] mx-auto px-6 py-20">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Company */}
          <div className="lg:col-span-2">

            <h2 className="text-4xl font-bold">
              NATURIO
            </h2>

            <p className="mt-6 text-gray-300 leading-8">
              Discover premium fashion, electronics and lifestyle
              products with secure payments, fast delivery and
              exceptional customer service.
            </p>

            <div className="flex gap-4 mt-8">

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#355E3B] transition flex justify-center items-center"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#355E3B] transition flex justify-center items-center"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#355E3B] transition flex justify-center items-center"
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#355E3B] transition flex justify-center items-center"
              >
                <FaYoutube />
              </a>

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-xl font-semibold mb-6">
              Quick Links
            </h3>

            <ul className="space-y-4 text-gray-300">

              <li><a href="#">Home</a></li>
              <li><a href="#">Shop</a></li>
              <li><a href="#">Categories</a></li>
              <li><a href="#">Deals</a></li>
              <li><a href="#">Contact</a></li>

            </ul>

          </div>

          {/* Customer */}

          <div>

            <h3 className="text-xl font-semibold mb-6">
              Customer
            </h3>

            <ul className="space-y-4 text-gray-300">

              <li><a href="#">My Account</a></li>
              <li><a href="#">Wishlist</a></li>
              <li><a href="#">Orders</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">Support</a></li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-xl font-semibold mb-6">
              Contact
            </h3>

            <div className="space-y-5 text-gray-300">

              <div className="flex gap-3">
                <FiMapPin className="mt-1" />
                <span>Ghaziabad, Uttar Pradesh</span>
              </div>

              <div className="flex gap-3">
                <FiPhone className="mt-1" />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex gap-3">
                <FiMail className="mt-1" />
                <span>support@shopease.com</span>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-white/10">

        <div className="max-w-[1450px] mx-auto px-6 py-6 flex flex-col lg:flex-row justify-between items-center gap-6">

          <p className="text-gray-400 text-center">
            © 2026 ShopEase. All Rights Reserved.
          </p>

          <div className="flex gap-4 text-4xl">

            <FaCcVisa />

            <FaCcMastercard />

            <FaCcPaypal />

          </div>

        </div>

      </div>

      {/* Back To Top */}

      <button
        onClick={scrollTop}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-[#355E3B] hover:bg-[#27452d] shadow-xl flex justify-center items-center transition"
      >
        <FiArrowUp size={24} />
      </button>

    </footer>
  );
};

export default Footer;