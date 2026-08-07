// Complete AdminCoupons.jsx
// NOTE: This file is based on your latest version and includes:
// - Back to Dashboard button
// - Premium header
// - Existing functionality preserved

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaArrowLeft } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

import CouponTable from "../../components/admin/coupon/CouponTable";
import CouponSearch from "../../components/admin/coupon/CouponSearch";
import CouponFilter from "../../components/admin/coupon/CouponFilter";
import CouponStats from "../../components/admin/coupon/CouponStats";
import CouponAnalytics from "../../components/admin/coupon/CouponAnalytics";
import CouponModal from "../../components/admin/coupon/CouponModal";
import CouponPagination from "../../components/admin/coupon/CouponPagination";

import {
  getCoupons,
  getCouponAnalytics,
  deleteCoupon,
  toggleCouponStatus,
} from "../../services/couponService";

const AdminCoupons = () => {
  const navigate = useNavigate();

  const [coupons, setCoupons] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [openModal, setOpenModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const loadCoupons = async () => {
    try {
      setLoading(true);
      const data = await getCoupons(page, 10, search);
      setCoupons(data.coupons || []);
      setPagination(data.pagination || {});
    } catch (error) {
      toast.error(error?.message || "Failed to load coupons.");
    } finally {
      setLoading(false);
    }
  };

  const loadAnalytics = async () => {
    try {
      const data = await getCouponAnalytics();
      setAnalytics(data.analytics || {});
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this coupon?")) return;
    try {
      const data = await deleteCoupon(id);
      toast.success(data.message);
      loadCoupons();
      loadAnalytics();
    } catch (error) {
      toast.error(error?.message || "Unable to delete coupon.");
    }
  };

  const handleStatus = async (id) => {
    try {
      const data = await toggleCouponStatus(id);
      toast.success(data.message);
      loadCoupons();
      loadAnalytics();
    } catch (error) {
      toast.error(error?.message || "Status update failed.");
    }
  };

  useEffect(() => {
    loadCoupons();
    loadAnalytics();
  }, [page, search]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-3xl bg-gradient-to-r from-green-700 via-emerald-600 to-teal-600 shadow-2xl"
      >
        <div className="flex flex-col gap-8 p-6 md:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate("/admin/dashboard")}
                className="group flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-2 text-white backdrop-blur transition hover:bg-white hover:text-green-700"
              >
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                Back to Dashboard
              </button>

              <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur">
                <MdLocalOffer />
                Coupon Dashboard
              </div>
            </div>

            <h1 className="mt-6 text-4xl font-extrabold text-white">
              Coupon Management
            </h1>

            <p className="mt-3 max-w-2xl text-green-100">
              Create, manage and monitor discount coupons for your customers.
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedCoupon(null);
              setOpenModal(true);
            }}
            className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 font-semibold text-green-700 shadow-xl hover:-translate-y-1 transition"
          >
            <FaPlus />
            Add Coupon
          </button>
        </div>
      </motion.div>

      <CouponStats analytics={analytics} />
      <CouponAnalytics analytics={analytics} />

      <div className="rounded-2xl bg-white p-5 shadow-lg">
        <div className="grid gap-4 lg:grid-cols-2">
          <CouponSearch value={search} onChange={setSearch} />
          <CouponFilter value={filter} onChange={setFilter} />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-white shadow-xl">
        <CouponTable
          coupons={coupons}
          loading={loading}
          filter={filter}
          onEdit={(coupon)=>{setSelectedCoupon(coupon);setOpenModal(true);}}
          onDelete={handleDelete}
          onToggle={handleStatus}
        />
      </div>

      <div className="flex justify-center">
        <CouponPagination
          pagination={pagination}
          page={page}
          setPage={setPage}
        />
      </div>

      {openModal && (
        <CouponModal
          coupon={selectedCoupon}
          onClose={() => setOpenModal(false)}
          refresh={() => {
            loadCoupons();
            loadAnalytics();
            setOpenModal(false);
          }}
        />
      )}
    </div>
  );
};

export default AdminCoupons;
