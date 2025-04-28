import { useState } from "react";
import { db } from "../config/firebase_config"; // Firebase setup
import { collection, addDoc } from "firebase/firestore"; // Import các hàm cần thiết

export default function AddProduct() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState([
        { size: "S", quantity: 0 },
        { size: "M", quantity: 0 },
        { size: "L", quantity: 0 },
        { size: "XL", quantity: 0 },
    ]); // Khởi tạo stock dưới dạng mảng
    const [imageUrl, setImageUrl] = useState(""); // Lưu trữ URL hình ảnh
    const [category, setCategory] = useState("Áo");

    // Hàm upload hình ảnh lên Cloudinary
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("file", file);  // Thêm tệp vào FormData
        formData.append("upload_preset", "ml_default");
        formData.append("cloud_name", "deq1douln");

        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/deq1douln/image/upload", {
                method: "POST",
                body: formData,
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

    // Hàm cập nhật stock theo size
    const handleStockChange = (size, value) => {
        setStock((prevStock) =>
            prevStock.map((item) =>
                item.size === size ? { ...item, quantity: value } : item
            )
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !description || !price || !stock.some((item) => item.quantity > 0) || !imageUrl) {
            alert("Vui lòng điền đầy đủ thông tin và đảm bảo có ít nhất một size có stock");
            return;
        }

        // Lưu sản phẩm vào Firestore
        try {
            const docRef = await addDoc(collection(db, "products"), {
                name,
                description,
                price: parseInt(price), // Chuyển giá thành số nguyên
                stock, // Lưu stock cho từng size
                imageUrl,
                category,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            alert("Sản phẩm đã được thêm thành công!");
            setName("");  // Reset form sau khi thêm
            setDescription("");
            setPrice("");
            setStock([
                { size: "S", quantity: 0 },
                { size: "M", quantity: 0 },
                { size: "L", quantity: 0 },
                { size: "XL", quantity: 0 },
            ]);  // Reset stock cho các size
            setImageUrl("");
            setCategory("Áo");
        } catch (error) {
            console.error("Error adding product: ", error);
            alert("Có lỗi xảy ra khi thêm sản phẩm!");
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

                {/* Chỉnh sửa stock cho từng size */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Số Lượng Theo Kích Thước</label>
                    {stock.map(({ size, quantity }) => (
                        <div key={size} className="flex items-center mb-2">
                            <span className="w-16">{size}</span>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => handleStockChange(size, e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                min="0"
                                required
                            />
                        </div>
                    ))}
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
