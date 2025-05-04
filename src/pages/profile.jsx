"use client";

import { useEffect, useState } from "react";
import { auth, db } from "../config/firebase_config";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          // Fetch user data
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            setUserData(userDocSnap.data());
          } else {
            console.error("Không tìm thấy dữ liệu người dùng.");
          }

          // Fetch user orders
          const ordersQuery = query(
            collection(db, "orders"),
            where("userId", "==", user.uid)
          );
          const querySnapshot = await getDocs(ordersQuery);
          const ordersData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setOrders(ordersData);
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu người dùng hoặc đơn hàng:", error);
        }
      } else {
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "processing":
        return "text-yellow-600 bg-yellow-100";
      case "shipped":
        return "text-blue-600 bg-blue-100";
      case "delivered":
        return "text-green-600 bg-green-100";
      case "cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  if (!userData) {
    return <div className="text-center py-10">Đang tải thông tin...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Thông Tin Cá Nhân
        </h1>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-8">
          <button
            className={`px-4 py-2 rounded-md font-semibold ${activeTab === "profile"
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-gray-700"
              }`}
            onClick={() => setActiveTab("profile")}
          >
            Thông Tin Cá Nhân
          </button>
          <button
            className={`px-4 py-2 rounded-md font-semibold ${activeTab === "orders"
                ? "bg-purple-600 text-white"
                : "bg-gray-200 text-gray-700"
              }`}
            onClick={() => setActiveTab("orders")}
          >
            Đơn Hàng
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "profile" && (
          <div className="space-y-4">
            <div>
              <span className="font-medium text-gray-700">Họ tên:</span>{" "}
              {userData.firstName} {userData.lastName}
            </div>
            <div>
              <span className="font-medium text-gray-700">Email:</span>{" "}
              {userData.email}
            </div>
            <div>
              <span className="font-medium text-gray-700">Vai trò:</span>{" "}
              {userData.role === "admin" ? "Quản trị viên" : "Khách hàng"}
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-2">Danh sách đơn hàng:</h3>
            {orders.length > 0 ? (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 border rounded-lg shadow-sm bg-gray-50"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-lg font-semibold">Đơn Hàng #{order.id}</h4>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status || "Không rõ"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Ngày đặt:{" "}
                    {order.createdAt?.toDate
                      ? order.createdAt.toDate().toLocaleDateString()
                      : "Không rõ"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Tổng tiền:{" "}
                    {(order.total || 0).toLocaleString("vi-VN")} đ
                  </p>
                  <button
                    className="mt-2 text-blue-600 hover:underline"
                    onClick={() => navigate(`/order/${order.id}`)}
                  >
                    Xem chi tiết
                  </button>
                </div>
              ))
            ) : (
              <p>Chưa có đơn hàng nào.</p>
            )}
          </div>
        )}

        <button
          onClick={handleLogout}
          className="mt-8 w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
}
