import { useState } from "react";
import { db } from "../config/firebase_config"; // Firebase setup
import { collection, addDoc } from "firebase/firestore"; // Import các hàm cần thiết

export default function AddProduct() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [imageUrl, setImageUrl] = useState(""); // Lưu trữ URL hình ảnh
    const [category, setCategory] = useState("Áo");

    // Hàm upload hình ảnh lên Cloudinary
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("file", file);  // Thêm tệp vào FormData
        formData.append("upload_preset", "ml_default"); // Thay "your_upload_preset" bằng preset của bạn
        formData.append("cloud_name", "deq1douln");  // Thay "your_cloud_name" bằng tên Cloud của bạn

        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/deq1douln/image/upload", {
                method: "POST",
                body: formData,  // Gửi FormData chứa tệp hình ảnh
            });
            const data = await response.json();

            if (response.ok) {
                console.log("Upload thành công!", data.secure_url);
                setImageUrl(data.secure_url);  // Lưu URL của hình ảnh
            } else {
                console.error("Cloudinary upload failed: ", data.error.message);
            }
        } catch (error) {
            console.error("Lỗi khi upload hình ảnh: ", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !description || !price || !stock || !imageUrl) {
            alert("Vui lòng điền đầy đủ thông tin");
            return;
        }

        // Lưu sản phẩm vào Firestore
        try {
            // Cập nhật cú pháp đúng với Firestore v9+
            const docRef = await addDoc(collection(db, "products"), {
                name,
                description,
                price: parseInt(price),
                stock: parseInt(stock),
                imageUrl,
                category,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            alert("Sản phẩm đã được thêm thành công!");
        } catch (error) {
            console.error("Error adding product: ", error);
        }
    };

    return (
        <div className="container px-4 py-8 mx-auto">
            <h1 className="text-3xl font-bold mb-6">Thêm Sản Phẩm Mới</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Tên Sản Phẩm</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Mô Tả</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Giá</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Số Lượng</label>
                    <input
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Hình Ảnh</label>
                    <input
                        type="file"
                        onChange={handleImageUpload}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                    {imageUrl && <img src={imageUrl} alt="Product" className="mt-4 w-32 h-32 object-cover" />}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Danh Mục</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="Áo">Áo</option>
                        <option value="Quần">Quần</option>
                        {/* Thêm các danh mục khác nếu cần */}
                    </select>
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded-md"
                >
                    Thêm Sản Phẩm
                </button>
            </form>
        </div>
    );
}
