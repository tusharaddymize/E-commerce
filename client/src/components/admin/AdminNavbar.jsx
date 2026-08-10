import {
  Search,
  Menu,
  Bell,
} from "lucide-react";

const AdminNavbar = ({ setSidebarOpen }) => {
  return (
    <header
      className="
        sticky
        top-0
        z-50
        w-full
        h-14
        sm:h-16
        bg-white
        border-b
        border-gray-200
        shadow-sm
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

        {/* =========================================
            LEFT SECTION
        ========================================= */}

        <div
          className="
            flex
            items-center
            gap-2
            sm:gap-3
            min-w-0
          "
        >

          {/* Mobile / Tablet Menu Button */}

          <button
            type="button"
            onClick={() => {
              if (setSidebarOpen) {
                setSidebarOpen((prev) => !prev);
              }
            }}
            className="
              lg:hidden
              flex
              items-center
              justify-center
              w-9
              h-9
              shrink-0
              rounded-lg
              text-slate-700
              hover:bg-gray-100
              active:bg-gray-200
              transition
              cursor-pointer
            "
            aria-label="Open admin menu"
          >
            <Menu size={22} strokeWidth={2} />
          </button>


          {/* Dashboard Title */}

          <div className="min-w-0">

            <h1
              className="
                text-base
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


        {/* =========================================
            SEARCH
        ========================================= */}

        <div
          className="
            hidden
            lg:flex
            flex-1
            max-w-xl
            mx-6
            xl:mx-10
          "
        >

          <div className="relative w-full">

            <Search
              size={19}
              strokeWidth={2}
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-slate-400
                pointer-events-none
              "
            />

            <input
              type="text"
              placeholder="Search products, orders..."
              className="
                w-full
                h-11
                pl-10
                pr-4
                rounded-xl
                border
                border-gray-200
                bg-gray-50
                text-sm
                text-slate-800
                placeholder:text-gray-400
                outline-none
                transition
                focus:bg-white
                focus:border-green-600
                focus:ring-2
                focus:ring-green-600/10
              "
            />

          </div>

        </div>


        {/* =========================================
            RIGHT SECTION
        ========================================= */}

        <div
          className="
            flex
            items-center
            justify-end
            shrink-0
          "
        >

          {/* Notification Bell */}

          <button
            type="button"
            className="
              relative
              flex
              items-center
              justify-center
              w-10
              h-10
              rounded-xl
              text-slate-700
              bg-white
              hover:bg-gray-100
              active:bg-gray-200
              transition
              cursor-pointer
            "
            aria-label="Notifications"
          >

            <Bell
              size={22}
              strokeWidth={2}
              className="text-slate-700"
            />

            {/* Notification Count */}

            <span
              className="
                absolute
                -top-0.5
                -right-0.5
                flex
                items-center
                justify-center
                min-w-[20px]
                h-5
                px-1
                rounded-full
                bg-red-600
                text-white
                text-[11px]
                font-bold
                leading-none
                border-2
                border-white
              "
            >
              1
            </span>

          </button>

        </div>

      </div>
    </header>
  );
};

export default AdminNavbar;