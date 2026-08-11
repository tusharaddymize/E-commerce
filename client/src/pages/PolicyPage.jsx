import { useParams } from "react-router-dom";
import { FileText } from "lucide-react";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import ScrollToTopButton from "../components/common/ScrollToTopButton";

import useWebsiteSettings from "../hooks/useWebsiteSettings";

// ==========================================
// Policy Configuration
// ==========================================

const policyConfig = {
  privacy: {
    title: "Privacy Policy",
    field: "privacyPolicy",
  },

  terms: {
    title: "Terms & Conditions",
    field: "termsConditions",
  },

  refund: {
    title: "Refund Policy",
    field: "refundPolicy",
  },

  shipping: {
    title: "Shipping Policy",
    field: "shippingPolicy",
  },

  cancellation: {
    title: "Cancellation Policy",
    field: "cancellationPolicy",
  },
};

// ==========================================
// Policy Page
// ==========================================

const PolicyPage = () => {
  const { type } = useParams();

  // ========================================
  // Current Policy
  // ========================================

  const currentPolicy = policyConfig[type];

  // ========================================
  // Website Settings
  //
  // React Query cached data
  // ========================================

  const {
    data,
    isLoading,
    isError,
  } = useWebsiteSettings();

  // ========================================
  // Normalize API Response
  // ========================================

  const settings =
    data?.data || data || {};

  // ========================================
  // Policies
  // ========================================

  const policies =
    settings?.policies || {};

  // ========================================
  // Invalid Policy
  // ========================================

  if (!currentPolicy) {
    return (
      <>
        <Header />

        <main
          className="
            min-h-[60vh]
            flex
            items-center
            justify-center
            bg-gray-50
            px-4
          "
        >
          <div className="text-center">
            <FileText
              size={48}
              className="
                mx-auto
                text-gray-300
              "
            />

            <h1
              className="
                mt-4
                text-2xl
                font-bold
                text-gray-800
              "
            >
              Policy Not Found
            </h1>

            <p
              className="
                mt-2
                text-gray-500
              "
            >
              The requested policy could not
              be found.
            </p>
          </div>
        </main>

        <Footer />

        <ScrollToTopButton />
      </>
    );
  }

  // ========================================
  // Loading
  // ========================================

  if (isLoading) {
    return (
      <>
        <Header />

        <main
          className="
            min-h-[60vh]
            flex
            items-center
            justify-center
            bg-gray-50
            px-4
          "
        >
          <div className="text-center">
            <div
              className="
                w-12
                h-12
                mx-auto
                border-4
                border-green-600
                border-t-transparent
                rounded-full
                animate-spin
              "
            />

            <p
              className="
                mt-4
                text-gray-500
              "
            >
              Loading Policy...
            </p>
          </div>
        </main>

        <Footer />

        <ScrollToTopButton />
      </>
    );
  }

  // ========================================
  // API Error
  // ========================================

  if (isError) {
    return (
      <>
        <Header />

        <main
          className="
            min-h-[60vh]
            flex
            items-center
            justify-center
            bg-gray-50
            px-4
          "
        >
          <div className="text-center">
            <FileText
              size={48}
              className="
                mx-auto
                text-red-300
              "
            />

            <h1
              className="
                mt-4
                text-2xl
                font-bold
                text-gray-800
              "
            >
              Unable to Load Policy
            </h1>

            <p
              className="
                mt-2
                text-gray-500
              "
            >
              Please try again later.
            </p>
          </div>
        </main>

        <Footer />

        <ScrollToTopButton />
      </>
    );
  }

  // ========================================
  // Policy Content
  // ========================================

  const content =
    policies[currentPolicy.field];

  // ========================================
  // Render
  // ========================================

  return (
    <>
      <Header />

      <main
        className="
          min-h-[60vh]
          bg-gray-50
        "
      >
        {/* ==================================
            Policy Header
        ================================== */}

        <section
          className="
            bg-[#1E3422]
            text-white
          "
        >
          <div
            className="
              max-w-5xl
              mx-auto
              px-4
              sm:px-6
              py-14
              md:py-20
              text-center
            "
          >
            <div
              className="
                w-14
                h-14
                mx-auto
                bg-white/10
                rounded-2xl
                flex
                items-center
                justify-center
              "
            >
              <FileText size={28} />
            </div>

            <h1
              className="
                mt-5
                text-3xl
                sm:text-4xl
                font-bold
              "
            >
              {currentPolicy.title}
            </h1>

            <p
              className="
                mt-3
                text-gray-300
              "
            >
              Please read the following
              information carefully.
            </p>
          </div>
        </section>

        {/* ==================================
            Policy Content
        ================================== */}

        <section
          className="
            py-10
            md:py-16
          "
        >
          <div
            className="
              max-w-5xl
              mx-auto
              px-4
              sm:px-6
            "
          >
            <div
              className="
                bg-white
                border
                border-gray-200
                rounded-2xl
                shadow-sm
                p-6
                sm:p-8
                md:p-10
              "
            >
              {content ? (
                <div
                  className="
                    text-gray-700
                    leading-8
                    whitespace-pre-line
                    break-words
                  "
                >
                  {content}
                </div>
              ) : (
                <div
                  className="
                    py-12
                    text-center
                  "
                >
                  <FileText
                    size={42}
                    className="
                      mx-auto
                      text-gray-300
                    "
                  />

                  <p
                    className="
                      mt-4
                      text-gray-500
                    "
                  >
                    Policy information is
                    currently unavailable.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <ScrollToTopButton />
    </>
  );
};

export default PolicyPage;