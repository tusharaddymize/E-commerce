import {
  Search,
  Menu,
} from "lucide-react";

import NotificationBell from "./NotificationBell";

const AdminNavbar = ({
  setSidebarOpen,
}) => {
  return (
    <header
      className="
        sticky
        top-0
        z-30

        w-full

        h-12
        sm:h-16

        bg-white

        border-b
        border-gray-200
      "
    >
      <div
        className="
          w-full
          h-full

          flex
          items-center
          justify-between

          px-3
          sm:px-5
          lg:px-8
        "
      >
        {/* ================================== */}
        {/* LEFT */}
        {/* ================================== */}

        <div
          className="
            flex
            items-center

            gap-2
            sm:gap-3

            min-w-0
          "
        >
          {/* Mobile / Tablet Menu */}

<button
  type="button"
  onClick={() => {
    console.log("OPEN SIDEBAR");
    setSidebarOpen((prev) => !prev);
  }}
  className="
    lg:hidden

    relative
    z-[100]

    flex
    items-center
    justify-center

    w-8
    h-8

    shrink-0

    rounded-md

    text-slate-700

    cursor-pointer

    hover:bg-gray-100
    active:bg-gray-200

    transition
  "
  aria-label="Open admin menu"
>
  <Menu size={18} />
</button>
          {/* Title */}

          <div className="min-w-0">
            <h1
              className="
                text-sm
                sm:text-xl
                lg:text-2xl

                leading-none

                font-bold

                text-slate-800

                whitespace-nowrap
              "
            >
              Dashboard
            </h1>

            {/* Desktop / Large Tablet */}

            <p
              className="
                hidden
                sm:block

                mt-1

                text-xs
                lg:text-sm

                text-gray-500
              "
            >
              Welcome back, Admin 👋
            </p>
          </div>
        </div>

        {/* ================================== */}
        {/* SEARCH - DESKTOP ONLY */}
        {/* ================================== */}

        <div
          className="
            hidden
            lg:flex

            flex-1

            max-w-md

            mx-8
          "
        >
          <div className="relative w-full">
            <Search
              size={18}
              className="
                absolute

                left-3
                top-1/2

                -translate-y-1/2

                text-gray-400
              "
            />

            <input
              type="text"
              placeholder="Search products, orders..."
              className="
                w-full

                pl-10
                pr-4

                py-2.5

                rounded-xl

                border
                border-gray-200

                bg-gray-50

                text-sm

                outline-none

                focus:ring-2
                focus:ring-green-600

                focus:border-transparent
              "
            />
          </div>
        </div>

        {/* ================================== */}
        {/* RIGHT */}
        {/* ================================== */}

        <div
          className="
            flex
            items-center
            justify-end

            shrink-0
          "
        >
          <NotificationBell />
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;