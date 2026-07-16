import { useEffect, useState } from "react";
import axios from "axios";

import {
  FiShoppingBag,
  FiDollarSign,
  FiMapPin,
  FiCalendar,
} from "react-icons/fi";

const ProfileStats = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    savedAddresses: 0,
    memberSince: "",
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        "http://localhost:5000/api/users/profile/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(data.stats);
    } catch (error) {
      console.log(error);
    }
  };

  const cards = [
    {
      icon: <FiShoppingBag size={24} />,
      title: "Orders",
      value: stats.totalOrders,
    },
    {
      icon: <FiDollarSign size={24} />,
      title: "Spent",
      value: `₹${stats.totalSpent}`,
    },
    {
      icon: <FiMapPin size={24} />,
      title: "Addresses",
      value: stats.savedAddresses,
    },
    {
      icon: <FiCalendar size={24} />,
      title: "Member Since",
      value: stats.memberSince
        ? new Date(stats.memberSince).getFullYear()
        : "-",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
      {cards.map((item) => (
        <div
          key={item.title}
          className="bg-white rounded-xl shadow p-6 text-center"
        >
          <div className="text-green-600 flex justify-center">
            {item.icon}
          </div>

          <h2 className="mt-4 text-3xl font-bold">
            {item.value}
          </h2>

          <p className="text-gray-500 mt-1">
            {item.title}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProfileStats;