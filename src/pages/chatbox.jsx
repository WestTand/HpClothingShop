// import { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import { db } from "../config/firebase_config";
// import {
//     collection,
//     addDoc,
//     getDocs,
//     query,
//     where,
//     deleteDoc,
//     doc,
// } from "firebase/firestore";
// import { Send, Trash2, MessageCircle } from "lucide-react";
// import { toast } from "react-toastify";

// export default function ChatBox() {
//     const { currentUser, loading } = useAuth();
//     const [messages, setMessages] = useState([]);
//     const [input, setInput] = useState("");
//     const [isLoading, setIsLoading] = useState(false);
//     const [requestCount, setRequestCount] = useState(0);
//     const [isOpen, setIsOpen] = useState(false);

//     // Lấy lịch sử chat từ Firestore
//     useEffect(() => {
//         if (currentUser) {
//             const fetchChats = async () => {
//                 try {
//                     const q = query(collection(db, "chats"), where("userId", "==", currentUser.uid));
//                     const querySnapshot = await getDocs(q);
//                     const chatHistory = querySnapshot.docs.map((doc) => ({
//                         id: doc.id,
//                         ...doc.data(),
//                     }));
//                     setMessages(chatHistory.sort((a, b) => a.createdAt - b.createdAt));
//                 } catch (error) {
//                     console.error("Error fetching chats:", error);
//                     toast.error("Lỗi khi tải lịch sử trò chuyện!");
//                 }
//             };
//             fetchChats();
//         }
//     }, [currentUser]);

//     // Gửi tin nhắn đến server
//     const handleSend = async () => {
//         if (!input.trim()) {
//             toast.error("Vui lòng nhập tin nhắn!");
//             return;
//         }

//         if (!currentUser) {
//             toast.error("Vui lòng đăng nhập để trò chuyện!");
//             return;
//         }

//         if (requestCount >= 1500) {
//             toast.error("Đã vượt giới hạn 1,500 yêu cầu/ngày! Vui lòng thử lại sau.");
//             return;
//         }

//         const userMessage = {
//             userId: currentUser.uid,
//             text: input,
//             isUser: true,
//             createdAt: Date.now(),
//         };

//         setMessages((prev) => [...prev, userMessage]);
//         setInput("");
//         setIsLoading(true);
//         setRequestCount((prev) => prev + 1);

//         try {
//             const ordersQuery = query(
//                 collection(db, "orders"),
//                 where("userId", "==", currentUser.uid)
//             );
//             const ordersSnapshot = await getDocs(ordersQuery);
//             const orders = ordersSnapshot.docs.map((doc) => ({
//                 id: doc.id,
//                 ...doc.data(),
//             }));

//             const productsSnapshot = await getDocs(collection(db, "products"));
//             const products = productsSnapshot.docs.map((doc) => ({
//                 id: doc.id,
//                 ...doc.data(),
//             }));

//             const prompt = `
//             Bạn là trợ lý mua sắm thông minh, trả lời bằng tiếng Việt, ngắn gọn, thân thiện.
//             Người dùng hỏi: "${input}".
//             Dựa trên thông tin sau để trả lời chính xác:
    
//             **Đơn hàng của người dùng**:
//             ${orders.length > 0
//                     ? orders.map((order) => `
//                       - Mã đơn hàng: ${order.id}
//                       - Trạng thái: ${order.status === "pending" ? "Đang xử lý" : order.status}
//                       - Tổng tiền: ${order.total.toLocaleString()} đ
//                       - Sản phẩm: ${order.items.map(item =>
//                         `${item.name} (Size: ${item.selectedSize}, Số lượng: ${item.quantity})`
//                     ).join(", ")}
//                     `).join("\n")
//                     : "Người dùng chưa có đơn hàng."}
    
//             **Sản phẩm trong kho**:
//             ${products.map(product => `
//                   - Tên: ${product.name}
//                   - Giá: ${product.price.toLocaleString()} đ
//                   - Kích cỡ: ${product.stock.map(s => `${s.size} (${s.quantity} chiếc)`).join(", ")}
//                 `).join("\n")}
    
//             Nếu câu hỏi không liên quan đến đơn hàng hoặc sản phẩm, trả lời tự nhiên và hữu ích.
//             Đừng đề cập đến dữ liệu Firestore hoặc API trong câu trả lời.
//             `;

//             const response = await fetch("http://localhost:5000/chat", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ prompt }),
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }

//             const data = await response.json();
//             const aiResponseText = data.response;

//             const aiMessage = {
//                 userId: currentUser.uid,
//                 text: aiResponseText,
//                 isUser: false,
//                 createdAt: Date.now(),
//             };

//             setMessages((prev) => [...prev, aiMessage]);

//             await addDoc(collection(db, "chats"), userMessage);
//             await addDoc(collection(db, "chats"), aiMessage);
//             toast.success("Đã nhận phản hồi từ AI!");
//         } catch (error) {
//             console.error("Error sending message:", error);
//             toast.error("Lỗi khi trò chuyện với AI!");
//         } finally {
//             setIsLoading(false);
//         }
//     };


//     // Xóa lịch sử chat
//     const handleClearChat = async () => {
//         if (!currentUser) return;
//         try {
//             const q = query(collection(db, "chats"), where("userId", "==", currentUser.uid));
//             const querySnapshot = await getDocs(q);
//             const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
//             await Promise.all(deletePromises);
//             setMessages([]);
//             toast.success("Đã xóa lịch sử trò chuyện!");
//         } catch (error) {
//             console.error("Error clearing chat:", error);
//             toast.error("Lỗi khi xóa lịch sử trò chuyện!");
//         }
//     };

//     // Toggle chatbox
//     const toggleChatBox = () => {
//         setIsOpen((prev) => !prev);
//     };

//     if (loading) {
//         return <div className="text-center py-10">Loading...</div>;
//     }

//     return (
//         <div className="fixed bottom-4 right-4 z-50">
//             {/* Nút toggle */}
//             <button
//                 onClick={toggleChatBox}
//                 className="p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg transition-colors"
//             >
//                 <MessageCircle size={24} />
//             </button>

//             {/* Chatbox */}
//             {isOpen && (
//                 <div className="w-80 md:w-96 h-[500px] bg-gray-50 rounded-lg shadow-xl flex flex-col mt-2">
//                     <div className="p-4 bg-purple-600 text-white rounded-t-lg flex justify-between items-center">
//                         <h2 className="text-lg font-bold">AI Chat</h2>
//                         <button
//                             onClick={toggleChatBox}
//                             className="p-1 hover:bg-purple-700 rounded-full"
//                         >
//                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                         </button>
//                     </div>
//                     <div className="flex-1 overflow-y-auto p-4">
//                         {messages.length === 0 ? (
//                             <p className="text-gray-600 text-center">Bắt đầu trò chuyện với AI! 😊</p>
//                         ) : (
//                             messages.map((msg) => (
//                                 <div
//                                     key={msg.createdAt}
//                                     className={`mb-4 flex ${msg.isUser ? "justify-end" : "justify-start"}`}
//                                 >
//                                     <div
//                                         className={`max-w-[70%] p-3 rounded-lg ${msg.isUser ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-800"
//                                             }`}
//                                     >
//                                         {msg.text}
//                                     </div>
//                                 </div>
//                             ))
//                         )}
//                     </div>
//                     <div className="p-4 border-t border-gray-200">
//                         <div className="flex items-center gap-2">
//                             <input
//                                 type="text"
//                                 value={input}
//                                 onChange={(e) => setInput(e.target.value)}
//                                 onKeyPress={(e) => e.key === "Enter" && handleSend()}
//                                 placeholder="Nhập tin nhắn..."
//                                 className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-600"
//                                 disabled={isLoading}
//                             />
//                             <button
//                                 onClick={handleSend}
//                                 className={`p-2 rounded-md ${isLoading
//                                     ? "bg-gray-400 cursor-not-allowed"
//                                     : "bg-purple-600 hover:bg-purple-700"
//                                     } text-white`}
//                                 disabled={isLoading}
//                             >
//                                 <Send size={20} />
//                             </button>
//                             <button
//                                 onClick={handleClearChat}
//                                 className="p-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
//                             >
//                                 <Trash2 size={20} />
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }