"use client";

import { useEffect, useState } from "react";
import { auth, db } from "../config/firebase_config";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            setUserData(userDocSnap.data());
          } else {
            console.error("Không tìm thấy dữ liệu người dùng.");
          }
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu người dùng:", error);
        }
      } else {
        // Nếu chưa đăng nhập thì đẩy về trang login
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  if (!userData) {
    return <div className="text-center py-10">Đang tải thông tin...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Thông Tin Cá Nhân</h1>

        <div className="space-y-4">
          <div>
            <span className="font-medium text-gray-700">Họ tên:</span> {userData.firstName} {userData.lastName}
          </div>
          <div>
            <span className="font-medium text-gray-700">Email:</span> {userData.email}
          </div>
          <div>
          <span className="font-medium text-gray-700">Vai trò:</span> {userData.role === "admin" ? "Quản trị viên" : "Khách hàng"}
          </div>
        </div>

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
