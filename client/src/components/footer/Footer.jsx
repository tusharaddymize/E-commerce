import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaWhatsapp,
  FaTelegramPlane,
  FaGithub,
} from "react-icons/fa";

import {
  FiMapPin,
  FiPhone,
  FiMail,
} from "react-icons/fi";

import { getWebsiteSettings } from "../../services/websiteSettingService";

// ==========================================
// Social Link Component
// ==========================================

const SocialLink = ({
  href,
  label,
  children,
}) => {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="
        w-9
        h-9
        sm:w-10
        sm:h-10
        lg:w-11
        lg:h-11

        rounded-full

        bg-white/10

        flex
        items-center
        justify-center

        text-sm
        sm:text-base

        transition-all
        duration-300

        hover:bg-[var(--primary-color)]
        hover:-translate-y-1
      "
    >
      {children}
    </a>
  );
};

// ==========================================
// Footer
// ==========================================

const Footer = () => {
  const [contact, setContact] =
    useState({});

  const [social, setSocial] =
    useState({});

  // ==========================================
  // Fetch Website Settings
  // ==========================================

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response =
          await getWebsiteSettings();

        const settings =
          response?.data || response;

        setContact(
          settings?.contact || {}
        );

        setSocial(
          settings?.social || {}
        );
      } catch (error) {
        console.error(
          "Footer Website Settings Error:",
          error
        );
      }
    };

    fetchSettings();
  }, []);

  return (
    <footer
      className="
        theme-secondary-bg
        text-white
        relative
        w-full
        overflow-hidden

        transition-colors
        duration-300
      "
    >
      {/* ====================================== */}
      {/* Main Footer */}
      {/* ====================================== */}

      <div
        className="
          theme-container

          w-full
          mx-auto

          px-4
          sm:px-6
          lg:px-8

          py-10
          sm:py-12
          lg:py-14
        "
      >
        <div
          className="
            grid
            grid-cols-1

            sm:grid-cols-2

            lg:grid-cols-4

            gap-x-8
            gap-y-10

            lg:gap-x-12
            lg:gap-y-8
          "
        >
          {/* ================================== */}
          {/* Company */}
          {/* ================================== */}

          <div
            className="
              sm:col-span-2
              lg:col-span-1

              min-w-0
            "
          >
            <h2
              className="
                text-2xl
                sm:text-3xl
                font-bold
                tracking-wide
              "
            >
              {contact.companyName ||
                "NATURIO"}
            </h2>

            <p
              className="
                mt-4

                text-sm
                sm:text-[15px]

                text-gray-300

                leading-6
                sm:leading-7

                max-w-md
              "
            >
              Discover premium fashion,
              electronics and lifestyle
              products with secure payments,
              fast delivery and exceptional
              customer service.
            </p>

            {/* Social Media */}

            <div
              className="
                flex
                flex-wrap

                gap-2.5
                sm:gap-3

                mt-6
              "
            >
              <SocialLink
                href={social.facebook}
                label="Facebook"
              >
                <FaFacebookF />
              </SocialLink>

              <SocialLink
                href={social.instagram}
                label="Instagram"
              >
                <FaInstagram />
              </SocialLink>

              <SocialLink
                href={social.twitter}
                label="Twitter"
              >
                <FaTwitter />
              </SocialLink>

              <SocialLink
                href={social.linkedin}
                label="LinkedIn"
              >
                <FaLinkedinIn />
              </SocialLink>

              <SocialLink
                href={social.youtube}
                label="YouTube"
              >
                <FaYoutube />
              </SocialLink>

              <SocialLink
                href={social.whatsapp}
                label="WhatsApp"
              >
                <FaWhatsapp />
              </SocialLink>

              <SocialLink
                href={social.telegram}
                label="Telegram"
              >
                <FaTelegramPlane />
              </SocialLink>

              <SocialLink
                href={social.github}
                label="GitHub"
              >
                <FaGithub />
              </SocialLink>
            </div>
          </div>

          {/* ================================== */}
          {/* Quick Links */}
          {/* ================================== */}

          <div className="min-w-0">
            <h3
              className="
                text-lg
                font-semibold
                mb-5
              "
            >
              Quick Links
            </h3>

            <ul
              className="
                space-y-3
                text-sm
                sm:text-[15px]
                text-gray-300
              "
            >
              <li>
                <Link
                  to="/"
                  className="
                    hover:text-white
                    transition-colors
                  "
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  className="
                    hover:text-white
                    transition-colors
                  "
                >
                  Shop
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  className="
                    hover:text-white
                    transition-colors
                  "
                >
                  Categories
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  className="
                    hover:text-white
                    transition-colors
                  "
                >
                  Deals
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  className="
                    hover:text-white
                    transition-colors
                  "
                >
                  Contact
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="
                    hover:text-white
                    transition-colors
                  "
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* ================================== */}
          {/* Customer */}
          {/* ================================== */}

          <div className="min-w-0">
            <h3
              className="
                text-lg
                font-semibold
                mb-5
              "
            >
              Customer
            </h3>

            <ul
              className="
                space-y-3
                text-sm
                sm:text-[15px]
                text-gray-300
              "
            >
              <li>
                <Link
                  to="/profile"
                  className="
                    hover:text-white
                    transition-colors
                  "
                >
                  My Account
                </Link>
              </li>

              <li>
                <Link
                  to="/orders"
                  className="
                    hover:text-white
                    transition-colors
                  "
                >
                  Orders
                </Link>
              </li>

              <li>
                <Link
                  to="/policy/privacy"
                  className="
                    hover:text-white
                    transition-colors
                  "
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/policy/terms"
                  className="
                    hover:text-white
                    transition-colors
                  "
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  to="/policy/shipping"
                  className="
                    hover:text-white
                    transition-colors
                  "
                >
                  Shipping Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/policy/refund"
                  className="
                    hover:text-white
                    transition-colors
                  "
                >
                  Refund Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/policy/cancellation"
                  className="
                    hover:text-white
                    transition-colors
                  "
                >
                  Cancellation Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* ================================== */}
          {/* Contact */}
          {/* ================================== */}

          <div className="min-w-0">
            <h3
              className="
                text-lg
                font-semibold
                mb-5
              "
            >
              Contact
            </h3>

            <div
              className="
                space-y-4

                text-sm
                sm:text-[15px]

                text-gray-300
              "
            >
              {/* Address */}

              {contact.address && (
                <div
                  className="
                    flex
                    items-start
                    gap-3
                  "
                >
                  <FiMapPin
                    className="
                      mt-1
                      flex-shrink-0
                      theme-accent-text
                    "
                    size={18}
                  />

                  <span
                    className="
                      leading-6
                      break-words
                      min-w-0
                    "
                  >
                    {contact.address}
                  </span>
                </div>
              )}

              {/* Phone */}

              {contact.phone && (
                <div
                  className="
                    flex
                    items-start
                    gap-3
                  "
                >
                  <FiPhone
                    className="
                      mt-1
                      flex-shrink-0
                      theme-accent-text
                    "
                    size={18}
                  />

                  <a
                    href={`tel:${contact.phone}`}
                    className="
                      min-w-0
                      break-words

                      hover:text-white
                      transition-colors
                    "
                  >
                    {contact.phone}
                  </a>
                </div>
              )}

              {/* Email */}

              {contact.email && (
                <div
                  className="
                    flex
                    items-start
                    gap-3
                  "
                >
                  <FiMail
                    className="
                      mt-1
                      flex-shrink-0
                      theme-accent-text
                    "
                    size={18}
                  />

                  <a
                    href={`mailto:${contact.email}`}
                    className="
                      min-w-0
                      break-all

                      hover:text-white
                      transition-colors
                    "
                  >
                    {contact.email}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ====================================== */}
      {/* Bottom Footer */}
      {/* ====================================== */}

      <div
        className="
          border-t
          border-white/10
        "
      >
        <div
          className="
            theme-container

            mx-auto

            px-4
            sm:px-6
            lg:px-8

            py-5

            flex
            flex-col
            sm:flex-row

            items-center
            justify-between

            gap-3
          "
        >
          <p
            className="
              text-xs
              sm:text-sm

              text-gray-400
              text-center
              sm:text-left
            "
          >
            © {new Date().getFullYear()}{" "}
            {contact.companyName ||
              "NATURIO"}
            . All Rights Reserved.
          </p>

          <div
            className="
              flex
              flex-wrap
              items-center
              justify-center

              gap-x-4
              gap-y-2

              text-xs
              sm:text-sm
              text-gray-400
            "
          >
            <Link
              to="/policy/privacy"
              className="
                hover:text-white
                transition-colors
              "
            >
              Privacy
            </Link>

            <Link
              to="/policy/terms"
              className="
                hover:text-white
                transition-colors
              "
            >
              Terms
            </Link>

            <Link
              to="/policy/shipping"
              className="
                hover:text-white
                transition-colors
              "
            >
              Shipping
            </Link>

            <Link
              to="/policy/refund"
              className="
                hover:text-white
                transition-colors
              "
            >
              Refund
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;