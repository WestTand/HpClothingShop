import { useEffect, useState } from "react";
import { db } from "../config/firebase_config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const snapshot = await getDocs(collection(db, "users"));
      const usersData = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          fullName: `${data.lastName || ""} ${data.firstName || ""}`.trim(),
          email: data.email || "N/A",
          createdAt: data.createdAt?.toDate().toLocaleDateString("vi-VN") || "N/A",
        };
      });
      setUsers(usersData);
    } catch (err) {
      setError("Không thể tải danh sách người dùng.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá người dùng này không?")) {
      try {
        await deleteDoc(doc(db, "users", id));
        setUsers((prev) => prev.filter((user) => user.id !== id));
      } catch (err) {
        alert("Không thể xoá người dùng.");
        console.error(err);
      }
    }
  };

  if (loading) return <p>Đang tải người dùng...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Quản lý người dùng</h2>
      {users.length === 0 ? (
        <p>Không có người dùng nào.</p>
      ) : (
        <table className="w-full table-auto border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Họ tên</th>
              <th className="border px-4 py-2 text-left">Email</th>
              <th className="border px-4 py-2 text-left">Ngày tạo</th>
              <th className="border px-4 py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{user.fullName || "Không rõ"}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.createdAt}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
