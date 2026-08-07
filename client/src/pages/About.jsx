import { useEffect, useState } from "react";
import {
  Target,
  Eye,
  Award,
  Users,
  CheckCircle2,
} from "lucide-react";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ScrollToTopButton from "../components/common/ScrollToTopButton";

import { getWebsiteSettings } from "../services/websiteSettingService";

const About = () => {
  const [about, setAbout] = useState({});
  const [loading, setLoading] = useState(true);

  // ==========================================
  // Fetch About Settings
  // ==========================================

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setLoading(true);

        const response = await getWebsiteSettings();

        const settings = response?.data || response;

        setAbout(settings?.about || {});
      } catch (error) {
        console.error(
          "Failed to load About settings:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <>
        <Header />

        <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto rounded-full border-4 border-green-600 border-t-transparent animate-spin" />

            <p className="mt-4 text-gray-500">
              Loading About Us...
            </p>
          </div>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="bg-white">

        {/* ===================================== */}
        {/* Hero */}
        {/* ===================================== */}

        <section className="bg-[#1E3422] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">

            <span className="inline-flex px-4 py-2 rounded-full bg-white/10 text-sm font-semibold">
              About Us
            </span>

            <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold">
              {about.title || "About Naturio"}
            </h1>

            {about.subtitle && (
              <p className="mt-5 max-w-3xl mx-auto text-base sm:text-lg text-gray-300 leading-8">
                {about.subtitle}
              </p>
            )}

          </div>
        </section>

        {/* ===================================== */}
        {/* Description */}
        {/* ===================================== */}

        <section className="py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="max-w-4xl mx-auto text-center">

              <div className="w-14 h-14 mx-auto rounded-2xl bg-green-100 text-green-700 flex items-center justify-center">
                <CheckCircle2 size={28} />
              </div>

              <h2 className="mt-6 text-2xl md:text-3xl font-bold text-gray-900">
                Who We Are
              </h2>

              <p className="mt-5 text-gray-600 leading-8 whitespace-pre-line">
                {about.description ||
                  "Discover more about our company, our values and what we do."}
              </p>

            </div>

          </div>
        </section>

        {/* ===================================== */}
        {/* Mission & Vision */}
        {/* ===================================== */}

        {(about.mission || about.vision) && (
          <section className="bg-gray-50 py-16 md:py-20">

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {about.mission && (
                  <div className="bg-white border border-gray-200 rounded-3xl p-7 md:p-9 shadow-sm">

                    <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center">
                      <Target size={27} />
                    </div>

                    <h2 className="mt-6 text-2xl font-bold text-gray-900">
                      Our Mission
                    </h2>

                    <p className="mt-4 text-gray-600 leading-8 whitespace-pre-line">
                      {about.mission}
                    </p>

                  </div>
                )}

                {about.vision && (
                  <div className="bg-white border border-gray-200 rounded-3xl p-7 md:p-9 shadow-sm">

                    <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center">
                      <Eye size={27} />
                    </div>

                    <h2 className="mt-6 text-2xl font-bold text-gray-900">
                      Our Vision
                    </h2>

                    <p className="mt-4 text-gray-600 leading-8 whitespace-pre-line">
                      {about.vision}
                    </p>

                  </div>
                )}

              </div>

            </div>
          </section>
        )}

        {/* ===================================== */}
        {/* Statistics */}
        {/* ===================================== */}

        <section className="py-16 md:py-20">

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

              <div className="rounded-2xl border border-gray-200 p-7 text-center shadow-sm">

                <Award
                  size={30}
                  className="mx-auto text-green-700"
                />

                <h3 className="mt-4 text-3xl font-bold text-gray-900">
                  {about.experience || 0}+
                </h3>

                <p className="mt-2 text-gray-500">
                  Years of Experience
                </p>

              </div>

              <div className="rounded-2xl border border-gray-200 p-7 text-center shadow-sm">

                <Users
                  size={30}
                  className="mx-auto text-green-700"
                />

                <h3 className="mt-4 text-3xl font-bold text-gray-900">
                  {Number(
                    about.customers || 0
                  ).toLocaleString("en-IN")}
                  +
                </h3>

                <p className="mt-2 text-gray-500">
                  Happy Customers
                </p>

              </div>

              <div className="rounded-2xl border border-gray-200 p-7 text-center shadow-sm">

                <CheckCircle2
                  size={30}
                  className="mx-auto text-green-700"
                />

                <h3 className="mt-4 text-3xl font-bold text-gray-900">
                  {Number(
                    about.projects || 0
                  ).toLocaleString("en-IN")}
                  +
                </h3>

                <p className="mt-2 text-gray-500">
                  Projects Completed
                </p>

              </div>

            </div>

          </div>

        </section>

      </main>

      <Footer />

      <ScrollToTopButton />
    </>
  );
};

export default About;