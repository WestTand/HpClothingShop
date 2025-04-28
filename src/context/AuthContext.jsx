import { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";  // Dùng Firebase Authentication

// Tạo context cho Auth
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);  // Lưu thông tin người dùng
    const [loading, setLoading] = useState(true);  // Kiểm tra xem trạng thái người dùng đã sẵn sàng chưa

    const auth = getAuth();  // Firebase Authentication

    useEffect(() => {
        // Lắng nghe thay đổi trạng thái đăng nhập
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);  // Cập nhật thông tin người dùng
            setLoading(false);  // Đã sẵn sàng
        });

        return () => unsubscribe();  // Dọn dẹp khi component bị hủy
    }, [auth]);

    return (
        <AuthContext.Provider value={{ currentUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook để sử dụng AuthContext
export function useAuth() {
    return useContext(AuthContext);
}
