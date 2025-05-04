import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../config/firebase_config";
import { collection, query, where, getDocs } from "firebase/firestore";
import ProductCard from "../components/product-card"; // Giả sử bạn đã có component ProductCard

const SearchPage = () => {
    const [products, setProducts] = useState([]);
    const [queryString, setQueryString] = useState("");
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("query");

    useEffect(() => {
        if (searchQuery) {
            setQueryString(searchQuery);
            fetchProducts(searchQuery);
        }
    }, [searchQuery]);

    const fetchProducts = async (searchQuery) => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "products"));
            const lowerSearch = searchQuery.toLowerCase();
            const productsArray = querySnapshot.docs
                .map((doc) => ({ id: doc.id, ...doc.data() }))
                .filter((product) =>
                    product.name.toLowerCase().includes(lowerSearch)
                );
            setProducts(productsArray);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">
                Kết quả tìm kiếm cho: {queryString}
            </h1>
            {loading ? (
                <p>Đang tải...</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <p>Không tìm thấy sản phẩm nào!</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchPage;
